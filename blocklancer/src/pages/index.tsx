import Head from "next/head";
import NavBar from "../components/navbar";
import Carousel from " /components/carousel";

export default function Home() {
  return (
    <>
      <Head>
        <title>BlockLancer</title>
        <meta name="description" content="Digital Services Marketplace: Empowering Freelancers with Blockchain" />
        <link rel="icon" href="icon.png" />
      </Head>
      <div>
        <NavBar />
      </div>
      <p className="text-black-500 text-center bg-yellow-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      </p>
    </>
  );
}
