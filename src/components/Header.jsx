"use client";
import Image from "next/image";
import Navbar from "./Navbar";
import Link from "next/link";

import { useState, useEffect } from "react";

import { BookingIcon, FacebookIcon, SeparatorBar } from "./Icons";

function Header({ data }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Block scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      // Disable scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scroll
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);
  
  const logo = data?.[0]?.fields?.logo?.fields;
  const imageUrl = logo?.file?.url ? `https:${logo.file.url}` : null;
  const title = data?.[0]?.fields?.logoAltText || "Logo";
  const phonenumber = data?.[0]?.fields?.phoneNumber;
  const email = data?.[0]?.fields?.emailAddress;
  const navigationLinks = data?.[0]?.fields?.navigationLinks || [];

  if (!data) return <header>Loading...</header>;;

  return (
    <header className="w-full flex flex-col items-center justify-center shadow-[0_8px_12px_-6px_rgba(0,0,0,0.6)] sticky top-0 z-50 ">
      {/* Pre-Header */}
      <div className="w-full flex px-4 py-1.5 gap-1 items-center bg-primary ">
        <a
          href={`tel:${phonenumber}`}
          className="text-xs sm:text-sm"
          style={{ color: "var(--black)" }}
        >
          {phonenumber}
        </a>
        <SeparatorBar />
        <a
          href={`mailto:${email}`}
          className="text-xs sm:text-sm text-black"
        >
          {email}
        </a>
        <SeparatorBar />
        <div className="flex flex-row items-center justify-between gap-2 px-1">
          <FacebookIcon />
          <BookingIcon />
        </div>
      </div>

      {/* Header */}
      <div
        // style={{ backgroundColor: "var(--accent-first)" }}
        className="w-[100%] mx-auto px-4 flex items-center justify-between p-2 bg-accent-first"
      >
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
          {/* Hamburger Button */}
          <button
            className="sm:hidden rounded-md focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6 color-accent-first"
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
        <div
          className="sm:hidden px-4 pb-4 z-100 absolute w-full top-23 bg-accent-first shadow-[inset_0_0_10px_rgba(0,0,0,1)]"
          style={{
            // backgroundColor: "var(--accent-first)",
            // boxShadow: "inset rgba(0,0,0,1)",
          }}
        >
          <Navbar
            data={navigationLinks}
            isMobile={true}
            onLinkClick={() => setMenuOpen(false)}
          />
        </div>
      )}
    </header>
  );
}

export default Header;
