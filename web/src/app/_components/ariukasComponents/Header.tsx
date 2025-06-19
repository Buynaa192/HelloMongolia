"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Header = () => {
  const headers = [
    { name: "Destinations", url: "/explore-destinations" },
    { name: "Travel Plans", url: "/travel-plans" },
    { name: "About", url: "/about-us" },
    { name: "Partners", url: "/companies/company" },
  ];

  return (
    <div className="max-w-[1440px] w-full flex justify-between absolute top-5 px-20 z-10 items-center">
      {headers.map(({ name, url }) => (
        <Link
          key={name}
          href={url}
          className="text-white text-m  cursor-pointer"
        >
          {name}
        </Link>
      ))}
      <div className="flex gap-2">
        <Button className=" bg-white text-black hover:text-white hover:bg-blue-500">
          Log in
        </Button>
        <Button variant="ghost" className="text-white hover:bg-white">
          Sign up
        </Button>
      </div>
    </div>
  );
};
