import "simplebar/dist/simplebar.min.css";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "simplebar/dist/simplebar.min.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { persistor, store } from "redux-store/store";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import nProgress from "nprogress";
import Head from "next/head";
import Router from "next/router";
import MuiTheme from "theme";
import { useEffect } from "react";
import ErrorBoundary from "components/general/ErrorBoundry";
import GlobalDataLoader from "components/app/GlobalDataLoader";
import SessionModal from "components/app/Modals/SessionModal";

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

nProgress.configure({
  showSpinner: false,
});

const MyApp = ({ Component, pageProps: { ...pageProps } }) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ErrorBoundary>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <title>Dozen | ONLINE BOZOR</title>
      </Head>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <GlobalDataLoader>
            <MuiTheme>
              {" "}
              <SessionModal />
              {getLayout(<Component {...pageProps} />)}
            </MuiTheme>
          </GlobalDataLoader>
          <ToastContainer />
        </PersistGate>
      </ReduxProvider>
    </ErrorBoundary>
  );
};

export default MyApp;
