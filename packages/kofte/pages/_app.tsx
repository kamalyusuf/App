import "../styles/globals.scss";
import { AppProps } from "next/app";
import Axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../lib";
import { ReactQueryDevtools } from "react-query/devtools";
import { wrapper } from "../redux";
import React from "react";
import { ErrorToast } from "../components/ErrorToast";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

Axios.defaults.withCredentials = true;

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Component {...pageProps} />
        <ErrorToast />
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default wrapper.withRedux(MyApp);
