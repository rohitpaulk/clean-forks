import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "../components/App";
import { API } from "../API";
import { initFakeBootAPI } from "../FakeBootAPIDriver";

let apiUrl = document.head.querySelector("[property=apiUrl]")!["content"];
let api = new API(apiUrl);

if (window.location.search === "?test") {
    let secondsDelayBetweenStages = 5;
    api = initFakeBootAPI(secondsDelayBetweenStages);
}

ReactDOM.render(<App api={api} />, document.getElementById("app"));
