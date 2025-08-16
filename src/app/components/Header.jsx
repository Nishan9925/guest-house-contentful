"use client";
import { useEffect, useState } from "react";
import HeaderRepository from "../lib/Header";
import Image from "next/image";
import Navbar from "./Navbar";

function Header() {
  const [headerData, setHeaderData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await HeaderRepository.getInstance().getModel();
      setHeaderData(data);
    }
    fetchData();
  }, []);

  console.log("Header data:", headerData);
  const logo = headerData?.fields?.logo?.fields?.file?.url
    ? `https:${headerData.fields.logo.fields.file.url}`
    : "";

  if (!headerData) return <header>Loading...</header>;

  return (
    <header>
      <Image src={logo} alt="Logo" width={100} height={100} />
      <Navbar />
    </header>
  );
}

export default Header;
