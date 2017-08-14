# Work in Progress. Come back later.

## Clean dem forks!

I often have to fork github repositories just to send a single PR, and forget
to delete them after. This is a web-app to help you identify and clean up old
useless forks in your github account.

Here's how it looks:

![screenshot](/app/assets/images/screenshot.png)

Visit [link](link)

### Features

- Identify stale forks based on the following criteria:
  - No open PRs
  - No unmerged commits
- Delete stale forks from within the interface
- Add certain forks to an 'ignore' list
- Email notifications when a new stale fork is found.

### Under the hood

This backend is built with Ruby + Rails. The front-end uses Vue + Typescript.

#### Github Rate Limits

One primary challenge in this app is to work within Github's rate limits. To
achieve this, the following has been done:

- Most of the github queries run on async workers. This allows for easy
  retrial + splitting of jobs that can be done in parallel.
- Wherever possible, the GraphQL API (v4) is used to replace multiple REST
  queries.
- The github queries needed to fetch data have been split into stages. This
  allows for quick visual feedback. **TODO:** Add details about times for each
  stage

### Installing on your own

#### Easy

Deploy to heroku. You'll need a github developer app, fetch that from x

#### Medium

Install the app locally.

- Step one
- Step two

