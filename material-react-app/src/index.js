/**
=========================================================
* GPT Toolkit React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { AuthContextProvider } from "context";


// GPT Toolkit React Context Provider
import { MaterialUIControllerProvider } from "context";
import { MusicKitProvider,ApiUsageProvider,WPSiteURLProvider } from "context";

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <WPSiteURLProvider>
      <ApiUsageProvider>
      <MusicKitProvider>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
      </MusicKitProvider>
      </ApiUsageProvider>
      </WPSiteURLProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
