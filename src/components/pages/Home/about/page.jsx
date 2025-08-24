import Gallery from "@/components/shared/Gallery";

function About({ galleryData }) {
    return (
        <div id="about" className="flex flex-col justify-center items-center">
            <h1>About Us</h1>
            <p className="text-accent-second">Welcome to our guesthouse. We offer a variety of services to make your stay comfortable.</p>
            <Gallery
                data={galleryData}
            />
        </div>
    );
}

export default About;
