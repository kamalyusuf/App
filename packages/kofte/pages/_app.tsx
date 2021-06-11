import "../styles/globals.scss";
import { AppProps } from "next/app";
import Axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../lib";
import { ReactQueryDevtools } from "react-query/devtools";
import React, { useEffect } from "react";
import { ErrorToast } from "../modules/errors";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { SocketHandler, SocketProvider } from "../modules/socket";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

Axios.defaults.withCredentials = true;

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if (Notification.permission === "granted") {
      return;
    }

    (async () => {
      await Notification.requestPermission();
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <SocketProvider>
          <Component {...pageProps} />
          <SocketHandler />
          <ErrorToast />
        </SocketProvider>
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
