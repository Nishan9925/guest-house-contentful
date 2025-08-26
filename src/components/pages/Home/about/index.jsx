import Gallery from "@/components/shared/Gallery";

function About({ galleryData, aboutData }) {
  const data = aboutData[0];
  const title = data.fields.aboutUsTitle;
  const aboutUsTitle = data.fields.aboutGuestHouseTitle;
  const aboutUsDescription = data.fields.aboutGuestHouseDescription;
  const infoTitle = data.fields.infoGuestHouseTitle;
  const email = data.fields.email;
  const phoneNumber = data.fields.phoneNumber;
  const addressLon = data.fields.guestHouseLocation.lon;
  const addressLat = data.fields.guestHouseLocation.lat;
  return (
    <div id="about" className="flex flex-col justify-center items-center">
      <Gallery data={galleryData} />
      <div className="w-full bg-accent-second md:py-20 py-10 px-4 flex flex-col text-center justify-center items-center md:gap-4 gap-2">
        <h2 className="md:text-4xl text:2xl text-black font-bold text-white">
          {title}
        </h2>
        <div className="max-w-[1100px-2] mx-auto flex flex-wrap md:flex-row flex-col items-center md:gap-0 gap-10">
          <div className="md:w-1/2 w-full flex flex-col justify-center md:items-start items:center gap-3 px-2">
            <h3 className="md:text-xl text-lg text-white">{aboutUsTitle}</h3>
            <p className="text-base text-white text-start">
              {aboutUsDescription}
            </p>
          </div>
          <div className="md:w-1/2 w-full flex flex-col justify-center items-center gap-3 px-2">
            <h3 className="md:text-xl text-lg  text-white">{infoTitle}</h3>
            <p className="text-base text-white md:text-start text-center">
              {email}
            </p>
            <p className="text-base text-white md:text-start text-center">
              {phoneNumber}
            </p>
            <a
              className="text-base text-white md:text-start text-center"
              href={`https://www.google.com/maps?q=${addressLat},${addressLon}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
