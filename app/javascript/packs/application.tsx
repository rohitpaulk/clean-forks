import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "../components/App";

let apiUrl = document.head.querySelector("[property=apiUrl]")!["content"];

ReactDOM.render(
    <App apiUrl={apiUrl}/>,
    document.getElementById("app")
);
