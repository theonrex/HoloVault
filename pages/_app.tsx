import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/navbar";
import Searchbox from "../components/searchBar/searchBox";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <>
        <NavBar />
        <Searchbox />
        <Component {...pageProps} />
      </>
    </div>
  );
}
