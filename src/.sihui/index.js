import React from "react";
import { createRoot } from "react-dom/client";
import App from '@pages/app';
// const { preprocessedRouting } = require('./core/tool.js')

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);




root.render(<App />)

// root.render(
//
// );
