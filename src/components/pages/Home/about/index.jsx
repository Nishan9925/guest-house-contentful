import { AirportShuttleIcon, EnvelopeIcon, MarkerIcon, PhoneIcon } from '@/components/Icons';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link';

function About({ aboutData }) {
  const data = aboutData[0];
  const title = data.fields.aboutUsTitle;
  const aboutUsTitle = data.fields.aboutGuestHouseTitle;
  const aboutUsDescription = data.fields.aboutGuestHouseDescription;
  const infoTitle = data.fields.infoGuestHouseTitle;
  const email = data.fields.email;
  const phoneNumber = data.fields.phoneNumber;
  const addressTitle = data.fields.addressTitle;
  const lat = data.fields.guestHouseLocation.lat;
  const lng = data.fields.guestHouseLocation.lng;
  const aboutUsFasilities = data.fields.aboutUsFasilities;
  
  return (
    <div id="about" className="flex flex-col justify-center items-center">
      <div className="w-full bg-accent-second md:py-10 py-5 px-4 flex flex-col text-center justify-center items-center md:gap-4 gap-2">
        <h2 className="md:text-4xl text:2xl text-black font-bold text-white">
          {title}
        </h2>
        <div className="max-w-[1100px-2] mx-auto flex md:flex-row flex-col items-start md:gap-0 gap-10">
          <div className="md:w-1/2 w-full flex flex-col justify-center md:items-start items:center gap-3 px-2">
            <h3 className="md:text-xl text-lg text-white">{aboutUsTitle}</h3>
            <div className="text-base text-white text-start">
              {documentToReactComponents(aboutUsDescription)}
            </div>
          </div>
          <div className="md:w-1/2 w-full h-96 flex flex-col justify-start items-center gap-4 px-2">
            <div className="md:w-1/2 flex flex-col justify-center items-start gap-3">
              <h3 className="md:text-xl text-lg text-white">{infoTitle}</h3>
              <EnvelopeIcon email={email} />
              <PhoneIcon phoneNumber={phoneNumber} />
              <MarkerIcon addressTitle={addressTitle} lng={lng} lat={lat} />
            </div>
            <div className="md:w-1/2 flex flex-col justify-center items-start gap-3">
              <h3 className="md:text-xl text-lg text-white">{aboutUsFasilities}</h3>
              <div className='flex flex-row items-center gap-3'>
                <AirportShuttleIcon text={"Airport shuttle"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
