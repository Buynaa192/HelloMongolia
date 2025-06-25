"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const BackToHomePathButtons = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="px-4 py-4 flex gap-1 text-sm items-centers text-white">
      <Link href="/" className="hover:underline ">
        Home
      </Link>

      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;

        return (
          <div
            key={index}
            className="flex items-center gap-1 capitalize text-white"
          >
            <span>{">"}</span>
            {isLast ? (
              <span className="text-white">{segment}</span>
            ) : (
              <Link
                href={href}
                className=" capitalize hover:text-underline text-white"
              >
                {segment}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};
