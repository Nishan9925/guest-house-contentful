import Link from "next/link";

function Navbar({ data, isMobile }) {
  if (!data) return <nav>Loading...</nav>;

  return (
    <nav>
      <ul className={`flex ${isMobile ? "flex-col" : "gap-4"}`}>
        {data.map((item) => (
          <li key={item.sys.id}>
            <Link
              className="flex justify-end py-4"
              style={{ color: "var(--primary)" }}
              href={item.fields.url}
            >
              {item.fields.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
