import Image from "next/image";

function Hero({ imageSrc, imageAlt, data }) {
  const heroTitle = data?.fields?.title;

  // console.log("Hero Data:", data.fields); //the actual title
  // console.log(Array.isArray(data), data.length);
  return (
    <section id="hero" className="w-full max-h-[800px]">
      <div className=" relative w-full aspect-[21/9] max-h-[500px] min-h-[400px] overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          className="object-cover"
          priority
          fill
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="absolute z-0 inset-0 flex items-center justify-start">
        <h1 className="text-red-900 text-4xl font-bold">{heroTitle}</h1>
      </div>
    </section>
  );
}

export default Hero;
