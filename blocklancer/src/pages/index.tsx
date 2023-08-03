import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/navbar";
import Hero from "../components/hero";

export default function Home() {
  return (
    <>
    <main>
      <Head>
        <title>BlockLancer</title>
        <meta name="description" content="Digital Services Marketplace: Empowering Freelancers with Blockchain" />
        <link rel="icon" href="icon.png" />
      </Head>
      <Navbar />
      <Hero />
      <p className= "text-green-500 text-center bg-blue-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eligendi similique exercitationem aut corporis numquam consequuntur incidunt repudiandae minima cupiditate sit quibusdam, debitis optio impedit animi. Facilis quas eos at vitae quod aliquam exercitationem a eligendi dolore neque praesentium expedita voluptatum deserunt, quia voluptates reprehenderit. Illo esse modi error quae.
      </p>

    </main>
   </>
  );
}
