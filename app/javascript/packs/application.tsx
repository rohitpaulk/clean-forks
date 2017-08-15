import * as React from "react";
import * as ReactDOM from "react-dom";

import { FilterList } from "../components/FilterList";
import { SearchResultList } from "../components/SearchResultList";
import { GitRepo } from "../models";

let repos = [
  {
    parentNameWithOwner: "gratipay/gratipay.com",
    description: "Gratitude? Gratipay! We help companies and others pay for open source.",
    forkedAt: 123
  },
  {
    parentNameWithOwner: "1egoman/backstroke",
    description: "🏊 A Github bot to keep repository forks up to date with their upstream. ",
    forkedAt: 123
  },
  {
    parentNameWithOwner: "qunitjs/qunit",
    description: "An easy-to-use JavaScript Unit Testing framework.",
    forkedAt: 123
  }
];

ReactDOM.render(
    <FilterList/>,
    document.getElementById("filter-list")
);

ReactDOM.render(
    <SearchResultList repos={repos}/>,
    document.getElementById("search-result-list")
);
