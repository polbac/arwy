import { Desktop } from "@/components/Desktop";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PrismicProvider } from "@prismicio/react";
import { client } from "../prismic";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider client={client}>
      <Desktop>
        <Component {...pageProps} />
      </Desktop>
    </PrismicProvider>
  );
}
