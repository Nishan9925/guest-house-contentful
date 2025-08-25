import Gallery from "@/components/shared/Gallery";

function About({ galleryData }) {
  return (
    <div
      id="about"
      className="flex flex-col justify-center items-center bg-secondary"
    >
      <Gallery data={galleryData} />
      <div className="w-full bg-accent-second md:py-20 py-10 px-4 flex flex-col text-center">
        <h1>About Us</h1>
        <p className="text-accent-second">
          Welcome to our guesthouse. We offer a variety of services to make your
          stay comfortable.
        </p>
      </div>
    </div>
  );
}

export default About;
