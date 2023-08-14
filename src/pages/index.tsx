import Head from "next/head";
import NavBar from "../components/navbar";
import Carousel from "../components/carousel";
import Card from "../components/cards";

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
      <div className="flex items-center justify-center ">
        <Carousel/>
      </div>
      
      
      <p className="text-black-500 text-center bg-yellow-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      </p>
      <div className="flex flex-row">
        <Card
          itemName="Item name"
          product="Product"
          avatarImageUrl="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
          backgroundImageUrl="images/home.jpg"
        />
        <Card
          itemName="Item 2"
          product="Product Name Nai"
          avatarImageUrl="images\stylish-boy.png"
          backgroundImageUrl="images/bg_rando.avif"
        />
        <Card
          itemName="Item 1"
          product="Product Name Hawa"
          avatarImageUrl="images\artist.png"
          backgroundImageUrl="images/bg_jpn.avif"
        />
      </div>
      <div className="flex flex-row">
        <Card
          itemName="Item 4"
          product="Product Name Hawa"
          avatarImageUrl="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
          backgroundImageUrl="images/bg_jpn.avif"
        />
        <Card
          itemName="Item 6"
          product="Product Dead"
          avatarImageUrl="images\artist.png"
          backgroundImageUrl="images/home.jpg"
        />
        <Card
          itemName="Item 5"
          product="Product Name Nai"
          avatarImageUrl="images\stylish-boy.png"
          backgroundImageUrl="images/bg_rando.avif"
        />
      </div>

    </>
  );
}
