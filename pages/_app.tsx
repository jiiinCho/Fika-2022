import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "@network/apollo";
import AuthService from "@network/auth";
import { AuthContext } from "context/AuthContext";

const authService = new AuthService(); // asign instance of AuthService class as default variable
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authService}>
        <Component {...pageProps} />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
