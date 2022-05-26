import React from "react";
import Image from "next/image"
import Link from "next/link"
import { AiOutlineShoppingCart } from "react-icons/ai";
const Navbar = () => {
  return (
    <div className="flex flex-col h-24 md:h-16 sticky bg-white top-0 left-0 z-10 md:items-center md:flex-row  gap-x-8 w-[100%]">
      <div>
        <Image src="/images/logo.webp" width={200} height={50} />
      </div>
      <nav>
        <ul className="flex  justify-center md:justify-start flex-row gap-x-4 font-bold">
          <Link href={"/"}><a><li className="hover:text-[#db2777]">Tshirts</li></a></Link>
          <Link href={"/"}><a><li className="hover:text-[#db2777]">Hoodies</li></a></Link>
          <Link href={"/"}><a><li className="hover:text-[#db2777]">Stickers</li></a></Link>
          <Link href={"/"}><a><li className="hover:text-[#db2777]">Mugs</li></a></Link>
        </ul>
      </nav>
      <div className="flex flex-row gap-x-4 absolute top-3 right-4">
        <button className="bg-[#db2777] font-bold text-white px-3 py-1 rounded-xl">Login</button>
      <AiOutlineShoppingCart className="text-3xl" />
      </div>
    </div>
  );
};

export default Navbar;
