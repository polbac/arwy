import { Desktop } from "@/components/Desktop";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PrismicProvider } from "@prismicio/react";
import { client } from "../prismic";
import { DesktopContextProvider } from "@/context/desktopContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider client={client}>
      <DesktopContextProvider>
        <Desktop>
          <Component {...pageProps} />
        </Desktop>
      </DesktopContextProvider>
    </PrismicProvider>
  );
}
