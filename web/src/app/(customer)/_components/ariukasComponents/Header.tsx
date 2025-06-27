"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LayoutDashboardIcon, LogOut, MenuIcon } from "lucide-react";
import { useContext, useState } from "react";
import { Drawer } from "./HeaderMenuDrawer";
import AuthContext from "@/app/_providers/AuthProvider";

export const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useContext(AuthContext);
  const headers = [
    { name: "Home", url: "/" },
    { name: "Destinations", url: "/explore-destinations" },
    { name: "Travel Plans", url: "/travel-plans" },
    { name: "About", url: "/about-us" },
    { name: "Partners", url: "/companies" },
  ];

  return (
    <div className="fixed w-full flex justify-between py-2 z-15 px-20 items-center lg:gap-60 bg-white/black backdrop-blur-lg text-lg">
      <div className="w-[80%] lg:flex hidden justify-between">
        {headers.map(({ name, url }) => (
          <Link
            key={name}
            href={url}
            className="text-white cursor-pointer text-m"
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

      {user ? (
        <div>
          <Popover>
            <PopoverTrigger className="rounded-full overflow-hidden w-10 h-10">
              <Image
                src={
                  user.companyDetails?.AvatarImage ||
                  user.customerDetails?.avatarImage ||
                  user.guideDetails?.avatarImage ||
                  ""
                }
                alt="Company Avatar"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </PopoverTrigger>
            <PopoverContent className="flex items-center gap-4  cursor-pointer">
              <Link href={"/company"}>
                <div className="flex items-center gap-2 hover:text-blue-600">
                  <LayoutDashboardIcon size={16} />
                  <p>Dashboard</p>
                </div>
              </Link>

              <div
                onClick={signOut}
                className="flex items-center gap-2 hover:text-red-600 cursor-pointer"
              >
                <p>Log out</p>
                <LogOut size={16} />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className="flex lg:flex gap-2 justify-end text-lg">
          <Button
            variant="ghost"
            className="text-white hover:bg-blue-500 hover:text-white text-lg"
            onClick={() => router.push("/login")}
          >
            Log in
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-white hover:text-black text-lg"
            onClick={() => router.push("/sign-up")}
          >
            Sign up
          </Button>
        </div>
      )}
    </div>
  );
};
