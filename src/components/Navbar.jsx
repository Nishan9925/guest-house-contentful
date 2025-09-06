import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function Navbar({ isMobile, onLinkClick }) {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");

  // Define navigation links
  const navLinks = [
    { label: "Home", href: "/#hero" },
    { label: "Rooms", href: "/#rooms" },
    { label: "About", href: "/#about" }
  ];

  useEffect(() => {
    // Update current hash from URL
    const updateHash = () => {
      setCurrentHash(window.location.hash);
    };

    // Set initial hash
    updateHash();

    // Only run scroll spy on home page
    if (pathname === "/") {
      // Scroll spy - update URL based on scroll position
      const handleScroll = () => {
        const sections = [
          { id: "#hero", element: document.querySelector("#hero") },
          { id: "#rooms", element: document.querySelector("#rooms") },
          { id: "#about", element: document.querySelector("#about") },
          { id: "#faq", element: document.querySelector("#faq") }
        ].filter(section => section.element);

        const scrollPosition = window.scrollY + 100;
        let newHash = "#hero"; // Default to hero

        // Find current section
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          const rect = section.element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          
          if (scrollPosition >= elementTop) {
            newHash = section.id;
            break;
          }
        }

        // Update URL if different
        if (newHash !== window.location.hash) {
          window.history.replaceState(null, null, newHash);
          setCurrentHash(newHash);
        }
      };

      // Handle hash changes from URL
      const handleHashChange = () => {
        const hash = window.location.hash || "#hero";
        setCurrentHash(hash);
        
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("hashchange", handleHashChange);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("hashchange", handleHashChange);
      };
    }
  }, [pathname]);

  // Function to check if a link is active
  const isActiveLink = (href) => {
    if (pathname === "/") {
      // On home page - check hash
      if (href === "/#hero") {
        return !currentHash || currentHash === "#hero";
      } else if (href === "/#rooms") {
        return currentHash === "#rooms";
      } else if (href === "/#about") {
        return currentHash === "#about";
      }
    } else if (pathname.startsWith("/rooms")) {
      // On any room page (including /rooms/[slug]) - Rooms link is active
      return href === "/#rooms";
    }
    return false;
  };

  return (
    <nav className="w-full">
      <ul className={`flex ${isMobile ? "flex-col space-y-2" : "space-x-6"}`}>
        {navLinks.map((link) => {
          const isActive = isActiveLink(link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(e) => {
                  // If we're not on home page and clicking a hash link, force navigation
                  if (pathname !== "/" && link.href.startsWith("/#")) {
                    e.preventDefault();
                    window.location.replace(link.href);
                    return;
                  }
                  onLinkClick?.();
                }}
                className={`
                          flex justify-end py-3 px-2 text-sm
                          ${
                            isActive
                              ? "border-b-2 text-[var(--color-primary)] font-semibold shadow-[inset_0_-2px_0_0_var(--color-primary)]"
                              : "text-[var(--color-primary)] font-normal"
                          }
                        `}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;