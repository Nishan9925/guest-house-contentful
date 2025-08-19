import FacebookIconSVG from "../assets/icons/facebook-icon.svg";
import InstaIcon from "../assets/icons/instagram-icon.svg";
import Link from "next/link";

export function FacebookIcon({ size = 20, href = "https://facebook.com" }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        width: size,
        height: size,
        objectFit: "cover",
      }}
    >
      <FacebookIconSVG
        stroke="black"
        fill="black"
        strokeWidth="1"
        style={{ width: "100%", height: "100%" }}
        viewBox="0 0 50 50"
      />
    </Link>
  );
}

export function InstagramIcon({ size = 20, href = "https://instagram.com" }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "inline-block", width: size, height: size }}
    >
      <InstaIcon
        stroke="black"
        fill="black"
        strokeWidth="1"
        style={{ width: "100%", height: "100%" }}
        viewBox="0 0 50 50"
      />
    </Link>
  );
}

export function AccentBar() {
  return (
    <div
      style={{
        backgroundColor: "var(--accent-first)",
        // minWidth: "2px",
        height: "24px",
        borderRadius: "2px",
        display: "block",
        padding: "0 .7px",
      }}
    ></div>
  );
}
