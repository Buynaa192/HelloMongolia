"use client";

import Link from "next/link";

export const Header = () => {
  const headers = [
    { name: "Destinations", url: "/explore-destinations" },
    { name: "Travel Plans", url: "/travel-plans" },
    { name: "About", url: "/about-us" },
    { name: "Partners", url: "/companies/company" },
  ];

  return (
    <div className="max-w-[1440px] w-full flex justify-between absolute top-5 px-20 z-10">
      {headers.map(({ name, url }) => (
        <Link
          key={name}
          href={url}
          className="text-white text-m  cursor-pointer"
        >
          {name}
        </Link>
      ))}
    </div>
  );
};
