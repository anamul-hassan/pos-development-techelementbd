import { Suspense } from "react";
import PageLoader from "./components/common/loader/PageLoader";

import { RouterProvider } from "react-router-dom";
import router from "./routers/routers";
import { useLocaleContext } from "./context/hook/useLocaleContext";
import { Toaster } from "./components/ui/toaster";

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
        <RouterProvider router={router} />
        <Toaster />
      </Suspense>
    </main>
  );
};

export default App;
