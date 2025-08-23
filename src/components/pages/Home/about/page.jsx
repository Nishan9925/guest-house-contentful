import Gallery from "@/components/shared/Gallery";

function About() {
    return (
        <div id="about">
            <h1>About Us</h1>
            <p>Welcome to our guesthouse. We offer a variety of services to make your stay comfortable.</p>
            <Gallery
                data={galleryData}
            />
        </div>
    );
}

export default About;
