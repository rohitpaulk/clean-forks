import * as React from "react";
import * as moment from "moment";

import { GitRepo, GitRepoCheck } from "../models";

export interface SearchResultListProps {
    repos: GitRepo[]
}

let InfoContainer = function(props: {repo: GitRepo}) {
    let timeFromNow = moment.unix(props.repo.forkedAt).fromNow();
    return <div className="info-container">
        <div className="title">
            <a href="https://github.com/">{props.repo.parentNameWithOwner}</a>
        </div>
        <div className="description">
            {props.repo.description}
        </div>
        <div className="footnote">
            Forked {timeFromNow}
        </div>
    </div>;
};

let ChecksContainer = function(props: {checks: GitRepoCheck[]}) {
    let checkItems = props.checks.map(function(check) {
        let iconClass = {
            "success": "icon-success",
            "failure": "icon-warning",
            "pending": "icon-pending"
        }[check.status];

        // TODO: Proper pluralization for zero, one, many
        let checkTextFormats = {
            "open_prs": {
                "success": "No open PRs",
                "pending": "Fetching open PRs...",
                "failure": `${check.data.count} open PRs`
            },
            "unmerged_branches": {
                "success": "No unmerged branches",
                "pending": "Fetching unmerged branches...",
                "failure": `${check.data.count} unmerged branches`
            }
        };

        let textClass = "check-text";
        if (check.status == "pending") {
            textClass += " greyed-out";
        }
        let checkText = checkTextFormats[check.type][check.status];

        return <div className="check-item" key={check.type}>
            <span className={textClass}>{checkText}</span>
            <span className={`check-icon ${iconClass}`}></span>
        </div>
    });

    return <div className="checks-container">
        {checkItems}
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
            <ChecksContainer checks={repo.checks}/>
            <ActionsContainer />
        </div>;
    });

    return <div className="search-result-list">
        {repoItems}
    </div>;
}
