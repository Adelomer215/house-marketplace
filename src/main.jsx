import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import SignInContextProvider from "./context/signIn/SignInContext";
import SignUpContextProvider from "./context/signUp/SignUpContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SignInContextProvider>
        <SignUpContextProvider>
          <App />
        </SignUpContextProvider>
      </SignInContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
