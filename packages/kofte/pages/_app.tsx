import "../styles/globals.scss";
import { AppProps } from "next/app";
import Axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";

Axios.defaults.withCredentials = true;

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
