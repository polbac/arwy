import Head from "next/head";

export default function Home() {
  return (
    <Head>
      <title>A R W Y -- Nube Rosa</title>

      <meta property="og:title" content="ARWY NUBE ROSA" />
      <meta property="og:image" content={"/shared.jpg"} />
      <meta property="og:description" content={"música, bruja, performer"} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}
