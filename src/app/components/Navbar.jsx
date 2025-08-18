import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function Navbar({ data, isMobile }) {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      data.forEach((item) => {
        const href = item.fields.url;
        if (!href.startsWith("#")) return;
        const section = document.querySelector(href);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveHash(href);
          }
        }
      });
    };

    handleScroll(); // initial check
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data]);

  if (!data) return <nav>Loading...</nav>;

  return (
    <nav>
      <ul className={`flex ${isMobile ? "flex-col" : "gap-4"}`}>
        {data.map((item) => {
          const href = item.fields.url;
          const isActive =
            pathname === href || (href.startsWith("#") && activeHash === href);

          return (
            <li key={item.sys.id}>
              <Link
                href={href}
                className={`
                  flex justify-end py-4 px-3 text-sm 
                  ${isActive ? "border-b-2" : ""},
                   ${
                     isActive
                       ? "text-blue-500 shadow-[inset_0_-2px_0_0_var(--accent-second)]"
                       : ""
                   }
                `}
                style={{
                  color: isActive ? "var(--accent-second)" : "var(--primary)",
                  fontWeight: isActive ? "600" : "400",
                }}
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
