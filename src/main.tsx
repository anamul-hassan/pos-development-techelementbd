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
import { Helmet, HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <LocaleProvider>
        <ThemeProvider
          defaultTheme="dark"
          storageKey={`${CLIENT_DETAILS.companyCode}theme`}
        >
          <Provider store={store}>
            <AppProvider>
              <Helmet>
                <title>{CLIENT_DETAILS.companyName}</title>
                <link
                  rel="icon"
                  type="image/svg+xml"
                  href={CLIENT_DETAILS.favicon}
                />
              </Helmet>
              <App />
            </AppProvider>
          </Provider>
        </ThemeProvider>
      </LocaleProvider>
    </HelmetProvider>
  </React.StrictMode>
);
