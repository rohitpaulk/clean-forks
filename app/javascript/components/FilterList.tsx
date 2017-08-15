import * as React from "react";

export interface FilterListProps {}

export const FilterList = function (props: FilterListProps) {
    return <div className="filter-list">
        <div className="filter-item active">
            <div className="text">No open pull requests</div>
            <div className="icon"></div>
            <div className="active-border"></div>
        </div>
        <div className="filter-item">
            <div className="text">No unmerged branches</div>
            <div className="icon"></div>
            <div className="active-border"></div>
        </div>
    </div>;
}
