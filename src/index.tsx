import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

// CALCITE:
import "@esri/calcite-components/dist/calcite/calcite.css";

import { setAssetPath } from "@esri/calcite-components/dist/components";
// CDN hosted assets
setAssetPath("https://js.arcgis.com/calcite-components/1.0.7/assets");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
