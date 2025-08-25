import Hero from "@/components/pages/Home/hero/page";
import Features from "@/components/pages/Home/features/page";
import About from "@/components/pages/Home/about/page";
import Contact from "@/components/pages/Home/contact/page";

import HeroImg from "@/assets/images/hero.jpg";

import FeaturesRepository from "./lib/Featues";
import HeroRepository from "./lib/Hero";
import GalleryRepository from "./lib/Gallery";
import AboutRepository from "./lib/About";


const [heroData] = await HeroRepository.getInstance().getModels();
const featuresData = await FeaturesRepository.getInstance().getModels();
const galleryData = await GalleryRepository.getInstance().getModels();
const aboutData = await AboutRepository.getInstance().getModels();


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
      {/* <Contact /> */}
    </>
  );
}
