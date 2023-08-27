import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "./dojo-logo.png";
const Navbar = () => {
  return (
    <nav>
      <Image
        src={Logo}
        alt="my logo"
        width={70}
        quality={100}
        placeholder="blur"
      />
      <h1>Lands App</h1>
      <Link href="/"> Home</Link>
      <Link href="/lands"> Lands</Link>
    </nav>
  );
};

export default Navbar;
