import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Philosopher&family=VT323&display=swap"
          rel="stylesheet"
        />
        <link href="/font/stylesheet.css" rel="stylesheet" />
        <link href="/font3/stylesheet.css" rel="stylesheet" />
        <link href="/margsa/stylesheet.css" rel="stylesheet" />
        <img src={"/nube_icon.png"} id="cursor_icon" />
      </body>
    </Html>
  );
}
