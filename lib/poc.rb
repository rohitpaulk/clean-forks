require "bundler"
Bundler.require(:default)

require "graphql/client/http"

raise "Github access token required!" unless ENV["GITHUB_ACCESS_TOKEN"]

# Token only requires 'public_repo' access as of now.
client = Octokit::Client.new(access_token: ENV["GITHUB_ACCESS_TOKEN"])
client.auto_paginate = true

USERNAME = 'rohitpaulk'

http = GraphQL::Client::HTTP.new("https://api.github.com/graphql") do
  def headers(context)
    { "Authorization": "Bearer #{ENV['GITHUB_ACCESS_TOKEN']}" }
  end
end
schema = GraphQL::Client.load_schema(http) # TODO: Load from file instead!
graph_client = GraphQL::Client.new(schema: schema, execute: http)

# TODO: Add pagination
FORKS_QUERY = graph_client.parse <<-GRAPHQL
  query($username: String!) {
    user(login: $username) {
      repositories(isFork:true, first:100, orderBy:{field:UPDATED_AT, direction:DESC}) {
        totalCount
        edges {
          node {
            id: databaseId
            nameWithOwner
            parent {
              id: databaseId
              nameWithOwner
            }
          }
        }
      }
    }
  }
GRAPHQL

def get_forks(graph_client, username)
  result = graph_client.query(FORKS_QUERY, variables: {username: username})
  result.data.user.repositories.edges.map(&:node).map { |node|
    {
      id: node.id,
      full_name: node.name_with_owner,
      parent_id: node.parent.id,
      parent_full_name: node.parent.name_with_owner
    }
  }
end

# Each repo in repos must be of the format:
#
# {
#   id: 1234
#   full_name: abcd/abcd.js
#   parent_id: 235
#   parent_full_name: yo/abcd.js
# }
def fill_open_prs(client, username, repos)
  # There is no good way to do this with the graph API, since the
  # "pullRequests" connection on users doesn't support filtering by repo, and
  # the connection on repos doesnt' support filtering by user.
  #
  # Using the legacy API, we've got two options:
  #
  # 1) Either run a search query for issues in every repo, filtered by author.
  # 2) Get all the users's pull requests, filter by repo name
  #
  # The latter is likely to be faster, if we assume that the number of pages of
  # outstanding pull requests a user has will be lesser than the number of
  # forked repositories a user has.
  #
  # For example, let's say a user has 50 forks lying around, and 10 open PRs
  # in total. If we were to go with option 1), it would take us 50 API calls to
  # get the result (50 repos * 1 query per repo). With option 2) though, it'll
  # only take a single API call since 10 open PRs fit in one search result page.

  query = "type:pr author:#{username} is:open"
  open_prs = client.search_issues(query).items
  repos.map { |repo|
    # TODO: Find a way around parsing the URL?
    repo_prs = open_prs.select { |pr| pr.repository_url.end_with?(repo[:parent_full_name]) }

    repo[:open_prs] = repo_prs.count

    repo
  }
end

# Each repo in repos must be of the format:
# {
#   id: 1234,
#   full_name: abcd/abcd.js
#   parent_id: 2345
#   parent_full_name: yoyo/abcd.js
# }
def fill_unmerged_branches(client, username, repos)
  # Short circuit if open_prs is already found?
  repos.map do |repo|
    if repo[:full_name] === 'rohitpaulk/heroku-buildpack-ruby'
      puts "HACK! Short-circuiting heroku-buildpack"
      repo[:unmerged_branches] = []
      next repo
    end

    puts "Filling unmerged branches for repo: #{repo[:full_name]}"

    fork_branches = client.branches(repo[:id]).map{ |x|
      { name: x[:name], sha: x[:commit][:sha] }
    }
    parent_branches = client.branches(repo[:parent_id]).map{ |x|
      { name: x[:name], sha: x[:commit][:sha] }
    }

    fork_shas = fork_branches.map { |x| x[:sha] }
    parent_shas = parent_branches.map { |x| x[:sha] }

    # Any fork branch that doesn't have a corresponding parent sha _could_ be
    # unmerged.
    possibly_unmerged_shas = fork_shas.uniq - parent_shas.uniq
    possibly_unmerged_branches = fork_branches.select { |branch|
      possibly_unmerged_shas.include? branch[:sha]
    }

    # Now, to actually confirm if the suspects are unmerged.
    repo[:unmerged_branch] = possibly_unmerged_branches.detect {|fork_branch|
      puts "  - Comparing #{fork_branch[:name]}..."

      # The match is most likely to be either:
      #
      # a) A branch with the same name
      # b) The 'master'/default branch
      #
      # Let's prioritize these to avoid extra API calls.
      #
      # TODO: Fetch the 'default' branch and consider that too?
      ordered_parent_branches = parent_branches.sort_by { |branch|
        case branch[:name]
        when fork_branch[:name] then 0
        when 'master' then 1
        else 2
        end
      }

      # If the sha is either identical or behind a single parent_sha,
      # then it isn't unmerged.
      ordered_parent_branches.none? { |parent_branch|
        puts "    - against #{parent_branch[:name]}"
        begin
          head = "#{username}:#{fork_branch[:sha]}"
          base = parent_branch[:sha]
          diff = client.compare(repo[:parent_id], base, head)
        rescue Octokit::NotFound
          # TODO: Refine the exception being caught here, check specifically for error message
          repo[:unmerged_branches] = []
          next false # No common ancestor, this isn't a match
        end

        # Possible values: 'ahead', 'behind', 'identical', 'diverged'
        ["behind", "identical"].include?(diff[:status])
      }
    }

    if repo[:unmerged_branch]
      puts "    ---- UNMERGED! #{repo[:unmerged_branch][:name]}"
    end

    repo
  end
end

repos = get_forks(graph_client, USERNAME)
puts "Found #{repos.count} forks."

puts "Filling open PRs..."
repos = fill_open_prs(client, USERNAME, repos)

puts "Repos with open PRs:"
p repos.select {|x| x[:open_prs] > 0 }

puts "Filling unmerged branches"
repos = fill_unmerged_branches(client, USERNAME, repos)

puts "Repo with unmerged commits"
p repos.select {|x| x[:unmerged_branch] }
