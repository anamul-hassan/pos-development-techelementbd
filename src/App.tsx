import { Suspense } from "react";
import PageLoader from "./components/common/loader/PageLoader";

import { RouterProvider } from "react-router-dom";
import router from "./routers/routers";
import { useLocaleContext } from "./context/hook/useLocaleContext";
import { Toaster } from "./components/ui/toaster";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { CLIENT_DETAILS } from "./utils/constants/client_information/client_details";

const App = () => {
  const { locale } = useLocaleContext();

  return (
    <main
      className={
        locale === "en"
          ? "font-roboto"
          : locale === "bn"
          ? "font-anek"
          : "font-roboto"
      }
    >
      <Suspense fallback={<PageLoader />}>
        <HelmetProvider>
          <Helmet>
            <title>{CLIENT_DETAILS.companyName}</title>
            <link
              rel="shortcut icon"
              href={CLIENT_DETAILS.favicon || ""}
              type="image/x-icon"
            ></link>
          </Helmet>
          <RouterProvider router={router} />
          <Toaster />
        </HelmetProvider>
      </Suspense>
    </main>
  );
};

export default App;
