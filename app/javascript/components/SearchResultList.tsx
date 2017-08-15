import * as React from "react";

import { GitRepo } from "../models";

export interface SearchResultListProps {
    repos: GitRepo[]
}

let InfoContainer = function(props: {repo: GitRepo}) {
    return <div className="info-container">
      <div className="title">
        <a href="https://github.com/">{props.repo.parentNameWithOwner}</a>
      </div>
      <div className="description">
        {props.repo.description}
      </div>
      <div className="footnote">
        Forked 3 months ago
      </div>
    </div>;
};

let ChecksContainer = function(props) {
    return <div className="checks-container">
      <div className="check-item">
        No open PRs <span className="check-icon icon-success"></span>
      </div>
      <div className="check-item">
        No unmerged branches <span className="check-icon icon-success"></span>
      </div>
    </div>;
};

let ActionsContainer = function(props) {
    return <div className="actions-container">
        <button className="delete-button">
            DELETE
        </button>
        <a className="small-action">
            Add to ignore list
        </a>
    </div>;
};

export const SearchResultList = function (props: SearchResultListProps) {
    let repoItems = props.repos.map(function(repo) {
        return <div className="search-result-item" key={repo.parentNameWithOwner}>
            <InfoContainer repo={repo} />
            <ChecksContainer />
            <ActionsContainer />
        </div>;
    });

    return <div className="search-result-list">
        {repoItems}
    </div>;
}
