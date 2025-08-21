import Image from "next/image";

function Hero({ imageSrc, imageAlt, data }) {
  console.log("Hero Data:", data.fields); //the actual title 
  // console.log(Array.isArray(data), data.length);
  return (
    <section id="hero" className="w-100% h-screen">
      {Object.entries(data).map(([key, value]) => {
        // console.log(value.title);
        return (
          <div key={key}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              // width={0}
            // height={0}
            // sizes="100vw"
            className="w-100% h-100% object-cover z-[-1] "
            priority
            fill
          />

          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-0 inset-0 flex items-center justify-center bg-opacity-50">
            <h1 className="text-red-900 text-4xl font-bold">{value.title}</h1>
          </div>
        </div>
      )})}
    </section>
  );
}

export default Hero;
