import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "../components/App";
import { API } from "../API";
import { FakeBootAPI } from "../FakeBootAPI";

let apiUrl = document.head.querySelector("[property=apiUrl]")!["content"];
let api = new API(apiUrl);

if (window.location.search === "?test") {
    api = new FakeBootAPI("dummy_url");
}

ReactDOM.render(<App api={api} />, document.getElementById("app"));
