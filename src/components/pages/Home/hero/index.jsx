import Image from "next/image";
import Link from "next/link";
import "flowbite";
import HeroCarousel from "@/components/shared/HeroBanner/HeroCarousel";

function Hero({ data }) {
  const heroTitle = data?.fields?.title;
  const heroSubTitle = data?.fields?.subTitle;
  const images = data?.fields?.heroImages;

  return (
    <section id="hero" className="w-full h-[500px] relative flex item-center z-1">
      <HeroCarousel images={images} />

      <div className="flex justify-center items-center absolute z-100 inset-0">
        <div className=" flex flex-col sm:items-start items-center justify-start px-4 gap-4 w-[1100px]">
          <h1 className="text-white md:text-4xl text-2xl font-bold max-w-[400px] sm:text-left text-center">
            {heroTitle}
          </h1>
          <p className="text-white sm:text-lg text-sm max-w-[400px] sm:text-left text-center">
            {heroSubTitle}
          </p>
          <div className="flex flex-row items-center justify-center gap-6">
            <Link
              href="#contact"
              className="bg-white text-black py-2 px-4 rounded display-block sm:min-w-[150px] w-[120px] text-center"
            >
              Contact Us
            </Link>
            <Link
              href = "tel:+37496109959"
              className="border border-white py-2 px-4 rounded sm:w-[150px] w-[120px] text-center"
            >
              <span className="text-white">Book</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
