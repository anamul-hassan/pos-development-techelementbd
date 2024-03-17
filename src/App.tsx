import { Suspense } from "react";
import PageLoader from "./components/common/loader/PageLoader";
import { RouterProvider } from "react-router-dom";
import router from "./routers/routers";
import { Toaster } from "./components/ui/toaster";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { CLIENT_DETAILS } from "./utils/constants/client_information/client_details";

const App = () => {
  return (
    <main className="font-anek">
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
