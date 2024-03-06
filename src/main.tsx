import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { LocaleProvider } from "./context/LocaleContext.tsx";
import { AppProvider } from "./context/AppContext.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { CLIENT_DETAILS } from "./utils/constants/client_information/client_details.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocaleProvider>
      <ThemeProvider
        defaultTheme="dark"
        storageKey={`${CLIENT_DETAILS.companyCode}theme`}
      >
        <Provider store={store}>
          <AppProvider>
            <App />
          </AppProvider>
        </Provider>
      </ThemeProvider>
    </LocaleProvider>
  </React.StrictMode>
);
