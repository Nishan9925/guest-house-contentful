import Link from "next/link";
import { FacebookIcon, BookingIcon, SeparatorBar } from "./Icons";

function Footer({ data }) {
  // Extract navigation links from data
  const navigationLinks = data?.[0]?.fields?.navigationLinks || [];
  const logo = data?.[0]?.fields?.logo?.fields;
  const imageUrl = logo?.file?.url ? `https:${logo.file.url}` : null;
  const title = data?.[0]?.fields?.logoAltText || "Logo";

  // Filter out invalid navigation items
  const validNavItems = navigationLinks.filter(item => 
    item && 
    item.fields && 
    item.fields.url && 
    item.fields.label &&
    item.sys &&
    item.sys.id
  );

  return (
    <footer className="w-full bg-secondary py-8 px-4 border-t border-gray-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Side - Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start gap-4">
          {/* Logo */}
          {imageUrl && (
            <Link href="/" className="flex items-center gap-2">
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-12 h-12 object-contain"
              />
              <span className="text-xl font-semibold text-black">
                Arevik B&B
              </span>
            </Link>
          )}
          
          {/* Copyright */}
          <p className="text-sm text-gray-600 text-center md:text-left">
            Copyright © 2025 Arevik B&B. All rights reserved.
          </p>
        </div>

        {/* Right Side - Navigation and Social */}
        <div className="flex flex-col items-center md:items-end gap-4">
          
          {/* Navigation Links */}
          <nav>
            <ul className="flex flex-wrap justify-center md:justify-end gap-6">
              {validNavItems.map((item) => {
                let href = item.fields.url;
                const label = item.fields.label;
                
                // Convert page URLs to hash links for single-page navigation
                if (href === "/rooms") href = "#rooms";
                if (href === "/" && label.toLowerCase().includes("home")) href = "#hero";

                return (
                  <li key={item.sys.id}>
                    <Link
                      href={href}
                      className="text-black hover:text-accent-second transition-colors duration-200 text-sm font-medium uppercase tracking-wide"
                    >
                      {item.fields.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Social Media Icons */}
          <div className="flex items-center gap-3">
            <FacebookIcon size={20} />
            <SeparatorBar />
            <BookingIcon size={20} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
