import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppWalletProvider from "@/components/AppWalletProvider";
// import NavBar from "@/components/navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <AppWalletProvider>
        {/* <NavBar /> */}
        <Component {...pageProps} />
      </AppWalletProvider>
    </div>
  );
}
