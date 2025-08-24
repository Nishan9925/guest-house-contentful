import Image from "next/image";
import Link from "next/link";

function Hero({ imageSrc, imageAlt, data }) {
  const heroTitle = data?.fields?.title;
  const heroSubTitle = data?.fields?.subTitle;

  // console.log("Hero Data:", data.fields);
  // console.log(Array.isArray(data), data.length);
  return (
    <section id="hero" className="w-full h-[500px] relative flex item-center">
      <div className="relative w-full aspect-[21/9] h-[500px] overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          className="object-cover"
          priority
          fill
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="absolute z-0 inset-0 flex flex-col sm:items-start items-center justify-center px-4 gap-4">
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
            href="#rooms"
            className="border border-white py-2 px-4 rounded sm:w-[150px] w-[120px] text-center"
          >
            <span className="text-white">Book</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
