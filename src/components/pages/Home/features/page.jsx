import Image from "next/image";

function Features({ data }) {
  const featureTitleFirstLetter = data.map((item) =>
    item.fields.featureTitle.charAt(0)
  );
  const featureTitleRest = data.map((item) =>
    item.fields.featureTitle.slice(1)
  );
  return (
    <section
      style={{ backgroundColor: "var(--secondary)" }}
      className="w-full flex-wrap flex justify-center items-center md:py-30 py-20 px-4 gap-4"
    >
      {data.map((feature, index) => (
        <div key={index} className="max-w-[260px] flex flex-col gap-6 ">
          <div className="relative w-[260px] h-[260px]">
            <Image
              className="object-cover rounded"
              src={`https:${feature.fields.featureImage.fields.file.url}`}
              alt={feature.fields.featureImage.fields?.title}
              fill
              priority
            />
          </div>
          <div className="flex flex-col align-start gap-4">
            <h3 className="text-black text-lg">
              <span className="text-accent-second">
                {featureTitleFirstLetter[index]}
              </span>
              <span className="text-black">{featureTitleRest[index]}</span>
            </h3>
            <p className="text-black max-h-[100px] overflow-hidden text-sm">
              {feature.fields.featureDescription}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Features;
