// "use client";
// import Image from "next/image";
// import Navbar from "./Navbar";
// import Link from "next/link";

// function Header({ data }) {
//   // console.log("Header data:", data);

//   const logo = data?.[0]?.fields?.logo?.fields;
//   const imageUrl = logo?.file?.url ? `https:${logo.file.url}` : null;
//   const title = data?.[0]?.fields?.logoAltText;
//   const navigationLinks = data?.[0]?.fields?.navigationLinks || [];
//   if (!data) return <header>Loading...</header>;

//   return (
//     <header className="flex w-[80%] items-center justify-between">
//       <Link href="/">
//         <Image src={imageUrl} alt={title} width={50} height={50} />
//       </Link>
//       <Navbar data={navigationLinks} />
//     </header>
//   );
// }

// export default Header;

"use client";
import Image from "next/image";
import Navbar from "./Navbar";
import Link from "next/link";

import { useState } from "react";

import FacebookIcon, { InstagramIcon } from "./Icons";

function Header({ data }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const logo = data?.[0]?.fields?.logo?.fields;
  const imageUrl = logo?.file?.url ? `https:${logo.file.url}` : null;
  const title = data?.[0]?.fields?.logoAltText || "Logo";
  const navigationLinks = data?.[0]?.fields?.navigationLinks || [];

  if (!data) return <header>Loading...</header>;

  return (
    <header
      style={{ backgroundColor: "var(--accent-first)" }}
      className="w-full flex-row items-center justify-center shadow-[inset_0px_-14px_16px_rgba(0,0,0,0.3)]"
    >
      <div className="w-[100%] sm:w-[90%] max-w-7xl mx-auto px-4 flex items-center justify-between p-2">
        {/* Logo */}
        <Link href="/">
          <Image src={imageUrl} alt={title} width={40} height={40} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:block">
          <Navbar data={navigationLinks} />
        </div>

        {/* Mobile Desktop Social Media */}
        <div className="flex flex-row items-end justify-between gap-4">
          <div className="flex flex-row items-center justify-between gap-2">
            <FacebookIcon />
            <InstagramIcon />
          </div>

          {/* Hamburger Button */}
          <button
            className="sm:hidden rounded-md focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6 text-accent-first"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 z-1 absolute w-full" style={{ backgroundColor: "var(--accent-first)", boxShadow: "inset rgba(0,0,0,1)" }}>
          <Navbar data={navigationLinks} isMobile={true} />
        </div>
      )}
    </header>
  );
}

export default Header;
