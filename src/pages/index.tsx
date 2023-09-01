import Head from "next/head";
import NavBar from "../components/navbar";
import Carousel from "../components/carousel";
import Card from "../components/cards";

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
      
      <div>
        <NavBar />
      </div>
      
      <div className="flex items-center justify-center">
        <Carousel />
      </div>

      <p className="text-center bg-yellow-400 text-black-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <div className="flex flex-row ">
      <Card
        itemName="Item name"
        product="Product"
        avatarImageUrl="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
        backgroundImageUrl="images/home.jpg"
        startingPrice="400$" 
        duration="7 Days"
        artistName ="Arnob"
/>
        <Card
          itemName="Item 2"
          product="Product Name Nai"
          avatarImageUrl="images\stylish-boy.png"
          backgroundImageUrl="images/bg_rando.avif"
          startingPrice="300$" 
          duration="2 Days"
          artistName ="Zonaid"
        />
        <Card
          itemName="Item 1"
          product="Product Name Hawa"
          avatarImageUrl="images\artist.png"
          backgroundImageUrl="images/bg_jpn.avif"
          startingPrice="400$" 
          duration="7 Days"
          artistName ="Mou"
        />
      </div>
      <div className="flex flex-row">
        <Card
          itemName="Item 4"
          product="Product Name Hawa"
          avatarImageUrl="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
          backgroundImageUrl="images/bg_jpn.avif"
          startingPrice="400$" 
          artistName ="Arnob"
          duration="7 Days"
        />
        <Card
          itemName="Item 6"
          product="Product Dead"
          avatarImageUrl="images\artist.png"
          backgroundImageUrl="images/home.jpg"
          startingPrice="400$" 
          duration="6 Days"
          artistName ="Arnob"
        />
        <Card
          itemName="Item 5"
          product="Product Name Nai"
          avatarImageUrl="images\stylish-boy.png"
          backgroundImageUrl="images/bg_rando.avif"
          startingPrice="600$" 
          artistName ="Biplob"
          duration="7 Days"
        />
      </div>
    </>
  );
}
