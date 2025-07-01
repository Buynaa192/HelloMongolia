"use client";

import { useAuth } from "@/app/_providers/AuthProvider";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LayoutDashboardIcon, LogOut, MenuIcon } from "lucide-react";
import { useState } from "react";
import { Drawer } from "./HeaderMenuDrawer";

const headers = [
  { name: "Home", url: "/" },
  { name: "Destinations", url: "/explore-destinations" },
  { name: "Travel Plans", url: "/travel-plans" },
  { name: "About", url: "/about-us" },
  { name: "Partners", url: "/companies" },
];

export const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { company, signOut } = useAuth();

  return (
    <div className="fixed flex items-center justify-center w-full px-20 py-2 text-lg z-15 lg:gap-60 bg-white/black backdrop-blur-lg">
      <div className="justify-between hidden gap-2 lg:flex">
        {headers.map(({ name, url }) => (
          <Link key={name} href={url} className="text-white">
            <Button
              variant={pathname === url ? "secondary" : "ghost"}
              className="font-medium cursor-pointer"
            >
              {name}
            </Button>
          </Link>
        ))}
      </div>

      <div className="flex lg:hidden">
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
        <div className="absolute h-10 right-4">
          <Popover>
            <PopoverTrigger className="relative w-10 h-10 overflow-hidden border rounded-full cursor-pointer">
              <Image
                src={company.AvatarImage}
                alt="Company Avatar"
                fill
                className="block object-cover"
              />
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="p-2 border-none shadow-2xl w-[240px]"
            >
              <div className="flex flex-col gap-2">
                <Link href={"/company"}>
                  <Button
                    className="justify-start w-full cursor-pointer"
                    size="lg"
                  >
                    <LayoutDashboardIcon size={16} />
                    <p>Dashboard</p>
                  </Button>
                </Link>

                <Button
                  onClick={signOut}
                  className="justify-start w-full cursor-pointer"
                >
                  <LogOut size={16} />
                  <p>Log out</p>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className="absolute flex justify-end gap-2 text-lg lg:flex right-4">
          <Link href="/login">
            <Button variant="ghost" className="text-white cursor-pointer">
              Log in
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="ghost" className="text-white cursor-pointer">
              Sign up
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
