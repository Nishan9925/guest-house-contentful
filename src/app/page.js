import About from "@/components/pages/Home/about/page";
import Contact from "@/components/pages/Home/contact/page";
import Hero from "@/components/pages/Home/hero/page";

import HeroImg from "@/assets/images/hero.jpg";
import HeroRepository from "./lib/Hero";

const [heroData] = await HeroRepository.getInstance().getModels();

export default function Home() {
  return (
    <>
      <Hero
        imageSrc={HeroImg}
        imageAlt="Hero Image"
        data={heroData}
      />
      <Contact />
      <About />
    </>
  );
}
