import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "../components/App";
import { API } from "../API";

let apiUrl = document.head.querySelector("[property=apiUrl]")!["content"];
let api = new API(apiUrl);

ReactDOM.render(<App api={api} />, document.getElementById("app"));
