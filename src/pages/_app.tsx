import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider, Container } from "@chakra-ui/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Container maxW="3xl">
          <Component {...pageProps} />
          <ToastContainer />
        </Container>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
