import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthService from "@network/auth";
import { AuthContext } from "context/AuthContext";

const authService = new AuthService(); // asign instance of AuthService class as default variable
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContext.Provider value={authService}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
