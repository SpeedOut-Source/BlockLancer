import Image from "next/image";
import Search from "./search";

interface HeroProps {
  className?: string;
}
export default function Hero(props: HeroProps) {
  return (
    <section
      className="hero h-[calc(100vh-108px)]"
      style={{
        backgroundImage:
          "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content flex flex-col gap-5 py-4 text-center  text-neutral-content lg:gap-36">
        <Search className="w-full max-w-lg" />
        <div className="flex h-full w-full flex-col items-center gap-4 md:flex-row">
          <div>
            <h1 className="mb-5 text-5xl font-bold">Find What You Want!</h1>
            <p className="mb-5">
              Browse jobs posted on our-site, or jump right in and create a free
              profile to find the work that you love to do.
            </p>
          </div>
          <div className="relative h-[300px] w-full">
            <Image alt="Hero image" src="/images/hero-image.png" fill />
          </div>
        </div>
      </div>
    </section>
  );
}
