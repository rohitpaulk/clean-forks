import * as _ from "lodash";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { FilterList } from "../components/FilterList";
import { SearchResultList } from "../components/SearchResultList";
import { GitRepo, User, GitRepoCheck } from "../models";
import { API } from "../API";
import { TopBar } from "./TopBar";

interface AppState {
    repos: GitRepo[];
    user: User | null;
}

interface AppProps {
    api: API;
}

export class App extends React.Component<AppProps, AppState> {
    API: API;

    constructor(props) {
        super(props);

        this.API = props.api;
        this.state = { repos: [], user: null };
    }

    componentWillMount() {
        this.fetchStateFromAPI();
    }

    fetchStateFromAPI() {
        console.log("Fetching state from API");

        let app = this;

        let userPromise = this.API.getUser();
        let reposPromise = this.API.getRepos();

        Promise.all([userPromise, reposPromise]).then(results => {
            let [user, repos] = results;
            app.setState({ user: user, repos: repos });

            if (app.shouldPollAPI()) {
                setTimeout(() => {
                    app.fetchStateFromAPI();
                }, 1000);
            }
        });
    }

    shouldPollAPI() {
        return this.isFetchingRepos() || this.isRepoChecksPending();
    }

    isFetchingRepos() {
        let user = this.state.user;

        if (user === null) {
            return true;
        }

        return user.gitRepositoriesSyncedAt == 0;
    }

    isRepoChecksPending() {
        let repos = this.state.repos;
        let checkStatuses = _.flatMap(repos, function(repo: GitRepo) {
            return repo.checks.map(function(check: GitRepoCheck) {
                return check.status;
            });
        });

        return _.includes(checkStatuses, "pending");
    }

    render() {
        let headerText = "";
        if (this.isFetchingRepos()) {
            headerText = "Fetching repos...";
        } else {
            let repos = this.state.repos;
            headerText = repos.length + " repositories matched";
        }

        return (
            <div>
                <div className="top-bar-container">
                    <TopBar user={this.state.user} />
                </div>
                <div className="filter-list-container">
                    <FilterList />
                </div>

                <div className="search-info">{headerText}</div>

                <div className="search-result-list-container">
                    <SearchResultList repos={this.state.repos} />
                </div>
            </div>
        );
    }
}
