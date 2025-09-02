import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function Navbar({ data, isMobile, onLinkClick }) {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    // Update current hash from URL
    const updateHash = () => {
      setCurrentHash(window.location.hash);
    };

    // Set initial hash
    updateHash();

    // Scroll spy - update URL based on scroll position
    const handleScroll = () => {
      const sections = [
        { id: "#hero", element: document.querySelector("#hero") },
        { id: "#rooms", element: document.querySelector("#rooms") },
        { id: "#gallery", element: document.querySelector("#gallery") },
        { id: "#about", element: document.querySelector("#about") },
        { id: "#faq", element: document.querySelector("#faq") }
      ].filter(section => section.element);

      const scrollPosition = window.scrollY + 100;
      let newHash = "";

      // Find current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const rect = section.element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        
        if (scrollPosition >= elementTop) {
          // Map sections to navbar URLs
          if (section.id === "#hero") {
            newHash = "#hero";
          } else if (section.id === "#rooms") {
            newHash = "#rooms";
          } else if (section.id === "#gallery" || section.id === "#about" || section.id === "#faq") {
            newHash = "#about";
          }
          break;
        }
      }

      // If at top of page, show hero
      if (window.scrollY < 100) {
        newHash = "#hero";
      }

      // Update URL if different
      if (newHash && newHash !== window.location.hash) {
        window.history.replaceState(null, null, newHash);
        setCurrentHash(newHash);
      }
    };

    // Handle hash changes from URL
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentHash(hash);
      
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  if (!data || !Array.isArray(data)) return <nav>Loading...</nav>;

  // Filter out invalid navigation items
  const validNavItems = data.filter(item => 
    item && 
    item.fields && 
    item.fields.url && 
    item.fields.label &&
    item.sys &&
    item.sys.id
  );

  return (
    <nav>
      <ul className={`flex ${isMobile ? "flex-col" : "gap-4"}`}>
        {validNavItems.map((item) => {
          
          let href = item.fields.url;
          const label = item.fields.label;
          
          // Convert page URLs to hash links for single-page navigation
          if (href === "/rooms") href = "#rooms";
          if (href === "/" && label.toLowerCase().includes("home")) href = "#hero";
          
          // Check if this nav item should be active
          let isActive = false;
          
          if (href.startsWith("#")) {
            // Hash links - compare with current hash from URL
            isActive = currentHash === href;
          } else {
            // Regular links - compare with current pathname
            isActive = pathname === href;
          }

          return (
            <li key={item.sys.id}>
              <Link
                href={href}
                onClick={() => onLinkClick?.()}
                className={`
                          flex justify-end py-3 px-2 text-sm
                          ${
                            isActive
                              ? "border-b-2 text-[var(--color-primary)] font-semibold shadow-[inset_0_-2px_0_0_var(--color-primary)]"
                              : "text-[var(--color-primary)] font-normal"
                          }
                        `}
              >
                {item.fields.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
