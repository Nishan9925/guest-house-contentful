import { useEffect, useState } from "react";
import NavBarRepository from "../lib/Navbar";
import Link from "next/link";

function Navbar({ data }) {
  // const [navbarData, setNavbarData] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await NavBarRepository.getInstance().getModels();
  //     setNavbarData(data);
  //   }
  //   fetchData();
  // }, []);
  // console.log("Navbar data:", data);
  if (!data) return <nav>Loading...</nav>;

  return (
    <nav>
      <ul>
        {data.map((item) => (
          <li key={item.sys.id}>
            <Link className="text-accent-second" href={item.fields.url}>{item.fields.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
