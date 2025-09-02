import FacebookIconSVG from "../assets/icons/facebook-icon.svg";
import InstaIcon from "../assets/icons/instagram-icon.svg";
// Booking.com SVG component
import Link from "next/link";

export function FacebookIcon({ size = 26, href = "https://facebook.com" }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      style={{
        display: "inline-block",
        width: size,
        height: size,
        objectFit: "cover",
      }}
    >
      <FacebookIconSVG
        stroke="#0C3B7C"
        fill="#0C3B7C"
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
      aria-label="Instagram"
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

export function SeparatorBar() {
  return (
    <div className="bg-accent-first"
      style={{
        height: "24px",
        borderRadius: "2px",
        display: "block",
        padding: "0 .7px",
      }}
    ></div>
  );
}

export function BookingIcon({ size = 24, href = "https://www.booking.com/hotel/am/happy-house.en-gb.html" }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Booking"
      style={{ display: "inline-block", width: size, height: size }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        fillRule="evenodd" 
        strokeLinejoin="round" 
        strokeMiterlimit="1.414" 
        clipRule="evenodd" 
        viewBox="0 0 2600 2445"
        style={{ width: "100%", height: "100%" }}
      >
        <path fill="#0C3B7C" d="M2732.032 513.03c0-283.141-229.978-513.015-513.118-513.015H513.024C229.886.015-.092 229.889-.092 513.03v1645.965c0 283.066 229.978 513.016 513.118 513.016h1705.889c283.14 0 513.118-229.95 513.118-513.016z"></path>
        <path fill="#0c3b7c" d="M.001 1659.991h1364.531V2672.01H.002z"></path>
        <g fillRule="nonzero">
          <path fill="#fff" d="m1241.6 1768.638-220.052-.22v-263.12c0-56.22 21.808-85.48 69.917-92.165h150.136c107.068 0 176.328 67.507 176.328 176.766 0 112.219-67.507 178.63-176.328 178.739zm-220.052-709.694v-69.26c0-60.602 25.643-89.424 81.862-93.15h112.657c96.547 0 154.41 57.753 154.41 154.52 0 73.643-39.671 159.67-150.903 159.67h-198.026zm501.037 262.574-39.78-22.356 34.74-29.699c40.437-34.74 108.163-112.876 108.163-247.67 0-206.464-160.109-339.614-407.888-339.614H935.082v-.11h-32.219c-73.424 2.74-132.273 62.466-133.04 136.329v1171.499h453.586c275.396 0 453.148-149.917 453.148-382.135 0-125.04-57.424-231.889-153.972-286.244"></path>
          <path fill="#00bafc" d="M1794.688 1828.066c0-89.492 72.178-161.894 161.107-161.894 89.154 0 161.669 72.402 161.669 161.894 0 89.379-72.515 161.894-161.67 161.894-88.928 0-161.106-72.515-161.106-161.894"></path>
        </g>
      </svg>
    </Link>
  )
}
