"use client";
import Link from "next/link";
import { RegionCard } from "./regionCard";
const regions = [
  {
    name: "Southern Mongolia",
    image:
      "https://res.cloudinary.com/df60cobe2/image/upload/v1750344877/d26e9btyskc1skftxadp.jpg",
  },
  {
    name: "Northern Mongolia",
    image:
      "https://res.cloudinary.com/df60cobe2/image/upload/v1750344655/lhlxnmm5j8zmfrfmolkz.jpg",
  },
  {
    name: "Eastern Mongolia",
    image:
      "https://res.cloudinary.com/df60cobe2/image/upload/v1750344336/image_1920_rsbpbh.jpg",
  },
  {
    name: "Western Mongolia",
    image:
      "https://res.cloudinary.com/df60cobe2/image/upload/v1750344552/gftoyhpqzhc1kitmwezb.jpg",
  },
];
const slugify = (text: string) => text.replace(/\s+/g, "-");

export const Regions = () => {
  return (
    <div className="flex flex-col gap-3 p-5">
      <p className="font-bold text-3xl ml-5">Travel regions</p>
      <div className="w-full grid grid-cols-4 gap-4">
        {regions.map((item, i) => (
          <Link href={`/explore-destinations/${slugify(item.name)}`} key={i}>
            <RegionCard item={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};
