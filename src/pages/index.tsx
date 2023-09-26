import Head from "next/head";
import Search from "~/components/search";

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

      <div className="mx-2 mt-6 flex justify-center">
        <Search className="w-full max-w-lg" />
      </div>
    </>
  );
}
