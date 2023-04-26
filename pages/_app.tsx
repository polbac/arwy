import { Desktop } from "@/components/Desktop";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Desktop>
      <Component {...pageProps} />
    </Desktop>
  );
}
