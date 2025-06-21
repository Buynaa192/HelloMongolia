"use client";

import { useAuth } from "@/app/_providers/AuthProvider";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, MenuIcon } from "lucide-react";
import { useState } from "react";
import { Drawer } from "./HeaderMenuDrawer";

export const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { company } = useAuth();
  const headers = [
    { name: "Destinations", url: "/explore-destinations" },
    { name: "Travel Plans", url: "/travel-plans" },
    { name: "About", url: "/about-us" },
    { name: "Partners", url: "/companies/company" },
  ];

  return (
    <div className="max-w-[1440px] w-full flex justify-between absolute top-5 z-10 px-20 items-center lg:gap-60">
      <div className="w-full lg:flex hidden justify-between">
        {headers.map(({ name, url }) => (
          <Link
            key={name}
            href={url}
            className="text-white cursor-pointer text-sm"
          >
            {name}
          </Link>
        ))}
      </div>
      <div className="lg:hidden flex">
        <button onClick={() => setIsOpen(true)}>
          <MenuIcon className="text-white" />
        </button>
        <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
          <nav className="flex justify-between">
            {headers.map(({ name, url }) => (
              <div key={name} className="relative group">
                <a href={url} className="text-gray-900 hover:underline">
                  {name}
                </a>
              </div>
            ))}
          </nav>
        </Drawer>
      </div>

      {company ? (
        <div>
          <Popover>
            <PopoverTrigger className="rounded-full overflow-hidden w-10 h-10">
              <Image
                src={company.AvatarImage}
                alt="Company Avatar"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </PopoverTrigger>
            <PopoverContent className="flex items-center gap-2 text-sm cursor-pointer">
              <p>Log out</p>
              <LogOut size={16} />
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className="flex lg:flex gap-2 justify-end">
          <Button
            variant="ghost"
            className="text-white hover:bg-blue-500 "
            onClick={() => router.push("/login")}
          >
            Log in
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-white hover:text-black"
            onClick={() => router.push("/sign-up")}
          >
            Sign up
          </Button>
        </div>
      )}
    </div>
  );
};
