import Image from "next/image";
import Search from "./search";
import Link from "next/link";
import { Typewriter, useTypewriter, Cursor } from "react-simple-typewriter";

interface HeroProps {
  className?: string;
}

export default function Hero(props: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-content flex flex-col gap-5 py-3 text-center text-white/80 lg:gap-20 xl:gap-24 3xl:gap-28">
        <Search className="w-full max-w-lg" />
        <div className="flex h-full w-full flex-col-reverse items-center md:flex-row-reverse">
          <div>
            <h1 className="mb-5 text-3xl font-bold md:font-extrabold whitespace-nowrap">
              <Typewriter
                words={[
                  'Find what you need!',
                  'Search and find jobs!',
                  'Sell what you build!',
                  'Everything on Stellar!',
                ]}
                loop={5}
                cursor
                cursorStyle=" |"
                typeSpeed={80}
                deleteSpeed={80}
                delaySpeed={1000}
              />
            </h1>
            <p className="mb-5">
              Discover fair competition, security, and authenticity on our Stellar powered platform as a Seller or Buyer
            </p>
            <div className="gap-4 flex flex-col md:flex-row">
              <Link className="btn btn-outline btn-accent scale-75 xl:scale-100"  href="create">Share your talent</Link>
              <Link className="btn btn-outline btn-secondary scale-75 xl:scale-100"  href="/#latest-gigs">Hire someone</Link>
            </div>
          </div>
          <div className="relative h-[450px] w-full">
            <Image alt="Hero image" src="/images/workinggirl.png" fill />
          </div>
        </div>
      </div>
    </section>
  );
}
