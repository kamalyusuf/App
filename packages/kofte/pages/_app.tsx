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

Axios.defaults.withCredentials = true;

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Component {...pageProps} />
        <ErrorToast />
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default wrapper.withRedux(MyApp);
