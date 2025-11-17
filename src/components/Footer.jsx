import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-black py-2 flex justify-center items-center text-white/60">
      <p>
        &copy; {new Date().getFullYear()} <Link href={"/"}>entrycodex.com</Link>
        . All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
