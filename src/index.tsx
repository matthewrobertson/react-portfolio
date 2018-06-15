import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

initializeIcons();

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
