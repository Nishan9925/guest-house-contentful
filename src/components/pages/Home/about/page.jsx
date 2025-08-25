import Gallery from "@/components/shared/Gallery";

function About({ galleryData, aboutData }) {
  const data = aboutData[0];
  const title = data.fields.aboutUsTitle;
  const aboutUsTitle = data.fields.aboutGuestHouseTitle;
  const aboutUsDescription = data.fields.aboutGuestHouseDescription;
  return (
    <div
      id="about"
      className="flex flex-col justify-center items-center"
    >
      <Gallery data={galleryData} />
      <div className="w-full bg-accent-second md:py-20 py-10 px-4 flex flex-col text-center justify-center items-center md:gap-4 gap-2">
        <h2 className="md:text-4xl text:2xl text-black font-bold text-white">
          {title}
        </h2>
        <div className="w-[1100px] flex md:flex-row flex-col md:justify-between bg-accent-first sm:px-4 ">
          <div className=" w-1/2 flex flex-col justify-center items-start gap-3">
            <h3 className="text-xl text-white">{aboutUsTitle}</h3>
            <p className="text-base text-white text-start">{aboutUsDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
