import Hero from "@/components/pages/Home/hero";
import Features from "@/components/pages/Home/features";
import About from "@/components/pages/Home/about";

import FeaturesRepository from "./lib/Featues";
import HeroRepository from "./lib/Hero";
import GalleryRepository from "./lib/Gallery";
import AboutRepository from "./lib/About";
import FAQRepository from "./lib/FAQ";
import FAQ from "@/components/pages/Home/faq";
import Gallery from "@/components/shared/Gallery";
import RoomsRepository from "./lib/Rooms";

export default async function Home() {
  const [heroData] = await HeroRepository.getInstance().getModels();
  const featuresData = await FeaturesRepository.getInstance().getModels();
  const galleryData = await GalleryRepository.getInstance().getModels();
  const aboutData = await AboutRepository.getInstance().getModels();
  const email = aboutData[0].fields.email;
  const phoneNumber = aboutData[0].fields.phoneNumber;
  const faqData = await FAQRepository.getInstance().getModels();
  const roomsData = await RoomsRepository.getInstance().getModels();
console.log(roomsData);
  return (
    <>
      <Hero
        email={email}
        phoneNumber={phoneNumber}
        data={heroData}
      />
      <Features
        data={featuresData} />
      <Gallery data={galleryData} />
      <About
        aboutData={aboutData}
      />
      <FAQ
        data={faqData}
      />
    </>
  );
}
