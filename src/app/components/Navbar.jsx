import { useEffect, useState } from "react";
import NavBarRepository from "../lib/Navbar";
import Link from "next/link";

function Navbar() {
  const [navbarData, setNavbarData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await NavBarRepository.getInstance().getModels();
      setNavbarData(data);
    }
    fetchData();
  }, []);

  if (!navbarData) return <nav>Loading...</nav>;

  return (
    <nav>
      <ul>
        {navbarData.map((item) => (
          <li key={item.sys.id}>
            <Link href={item.fields.url}>{item.fields.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
