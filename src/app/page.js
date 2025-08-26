import Hero from "@/components/pages/Home/hero";
import Features from "@/components/pages/Home/features";
import About from "@/components/pages/Home/about";
import Contact from "@/components/pages/Home/contact";

import HeroImg from "@/assets/images/hero.jpg";

import FeaturesRepository from "./lib/Featues";
import HeroRepository from "./lib/Hero";
import GalleryRepository from "./lib/Gallery";
import AboutRepository from "./lib/About";
import FAQRepository from "./lib/FAQ";


const [heroData] = await HeroRepository.getInstance().getModels();
const featuresData = await FeaturesRepository.getInstance().getModels();
const galleryData = await GalleryRepository.getInstance().getModels();
const aboutData = await AboutRepository.getInstance().getModels();
const faqData = await FAQRepository.getInstance().getModels();


export default function Home() {
  console.log("Home About Data:", aboutData);
  return (
    <>
      <Hero
        imageSrc={HeroImg}
        imageAlt="Hero Image"
        data={heroData}
      />
      <Features 
        data={featuresData} />
      <About
        galleryData={galleryData}
        aboutData={aboutData}
      />
      <FAQ 
        data={faqData} 
      />
      {/* <Contact /> */}
    </>
  );
}
