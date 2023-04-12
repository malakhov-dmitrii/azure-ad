import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { ChakraProvider, Container } from "@chakra-ui/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ChakraProvider>
      <Container maxW="3xl">
        <Component {...pageProps} />
        <ToastContainer />
      </Container>
    </ChakraProvider>
  );
};

export default MyApp;
