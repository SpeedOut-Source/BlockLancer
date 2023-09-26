import Head from "next/head";
import Hero from "~/components/hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>BlockLancer</title>
        <meta
          name="description"
          content="Digital Services Marketplace: Empowering Freelancers with Blockchain"
        />
        <link rel="icon" href="icon.png" />
      </Head>

      <Hero />
    </>
  );
}
