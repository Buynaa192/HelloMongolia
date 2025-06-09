"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  const headers = [
    { name: "Destinations", url: "/explore-destinations" },
    { name: "Travel Plans", url: "/travel-plans" },
    { name: "About", url: "/about-us" },
    { name: "Partners", url: "/companies" },
  ];

  return (
    <div className="w-full flex gap-20 absolute top-5 px-10 z-10">
      {headers.map(({ name, url }) => (
        <Button
          key={name}
          variant={"ghost"}
          onClick={() => router.push(url)}
          className="text-m text-white"
        >
          {name}
        </Button>
      ))}
    </div>
  );
};
