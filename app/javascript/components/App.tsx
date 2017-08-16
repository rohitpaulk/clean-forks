import * as React from "react";
import * as ReactDOM from "react-dom";

import { FilterList } from "../components/FilterList";
import { SearchResultList } from "../components/SearchResultList";
import { GitRepo } from "../models";
import { API } from "../API";
import { TopBar } from "./TopBar";

interface AppState {
    repos: GitRepo[]
}

export class App extends React.Component<{}, AppState> {
    API: API

    constructor(props) {
        super(props);

        this.API = new API("test_url");
        this.state = {repos: []};
    }

    componentWillMount() {
        let app = this;
        this.API.getRepos().then(function(repos) {
            console.log("Setting state");
            app.setState({repos: repos});
        });
    }

    render() {
        return <div>
            <div className="top-bar-container">
                <TopBar
                    avatarUrl="https://avatars1.githubusercontent.com/u/3893573?v=4"/>
            </div>
            <div className="filter-list-container">
                <FilterList/>
            </div>

            <div className="search-info">
                24 repositories matched
            </div>

            <div className="search-result-list-container">
                <SearchResultList repos={this.state.repos}/>
            </div>
        </div>;
    }
}
