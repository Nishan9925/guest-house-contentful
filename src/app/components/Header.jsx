"use client";
import { useEffect, useState } from "react";
import HeaderRepository from "../lib/Header";

function Header() {
  const [headerData, setHeaderData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await HeaderRepository.getInstance().getModel();
      setHeaderData(data);
    }
    fetchData();
  }, []);

  if (!headerData) return <header>Loading...</header>;

  return (
    <header>
      <h1>{headerData.menuItems.title}</h1>
      <nav>
        <ul>
          {headerData.map((item) => (
            <li key={item.id}>
              <a href={item.url}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
