"use client";
import Image from "next/image";
import Navbar from "./Navbar";

function Header({data}) {
  // console.log("Header data:", data);


  const logo = data?.[0]?.fields?.logo?.fields;
  const imageUrl = logo?.file?.url ? `https:${logo.file.url}` : null;
  const title = data?.[0]?.fields?.logoAltText;
  const navigationLinks = data?.[0]?.fields?.navigationLinks || [];
  if (!data) return <header>Loading...</header>;

  return (
    <header className="bg-accent-first">
      <Image src={imageUrl} alt={title} width={50} height={50} />
      <Navbar data={navigationLinks} />
    </header>
  );
}

export default Header;
