import Head from "next/head";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

async function getBackgroundDesktopImage(): Promise<string> {
  const data = await fetch(
    "https://arwy.cdn.prismic.io/api/v2/documents/search?q=%5B%5Bat%28document.type%2C+%22dektop%22%29%5D%5D&pageSize=1&ref=ZSQCQxAAACIAcvF0&routes=%5B%5D&access_token="
  ).then((res) => res.json());

  return data.results?.[0].data.desktop?.[0].image.url;
}

export const getServerSideProps = async (context) => {
  const backgroundImageURL = await getBackgroundDesktopImage();

  return { props: { backgroundImageURL } };
};

export default function Home({ backgroundImageURL }) {
  return (
    <Head>
      <title>A R W Y -- Nube Rosa</title>

      <meta property="og:title" content="ARWY NUBE ROSA" />
      <meta property="og:image" content={backgroundImageURL} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}
