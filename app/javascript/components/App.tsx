import * as React from "react";
import * as ReactDOM from "react-dom";

import { FilterList } from "../components/FilterList";
import { SearchResultList } from "../components/SearchResultList";
import { GitRepo, User } from "../models";
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
        let app = this;

        this.refreshRepos();

        this.API.getUser().then(function(user) {
            app.setState({ user: user });
        });
    }

    refreshRepos() {
        console.log("Refreshing repo state");

        let app = this;

        this.API.getRepos().then(function(repos) {
            app.setState({ repos: repos });

            setTimeout(() => {
                app.refreshRepos();
            }, 1000);
        });
    }

    render() {
        return (
            <div>
                <div className="top-bar-container">
                    <TopBar user={this.state.user} />
                </div>
                <div className="filter-list-container">
                    <FilterList />
                </div>

                <div className="search-info">24 repositories matched</div>

                <div className="search-result-list-container">
                    <SearchResultList repos={this.state.repos} />
                </div>
            </div>
        );
    }
}
