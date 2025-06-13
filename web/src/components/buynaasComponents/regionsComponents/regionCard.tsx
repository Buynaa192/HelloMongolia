"use client"
import Image from "next/image";
type itemType={
  item:{name: string;}
}
export const RegionCard = ({item}:itemType) => {
  return (
    <div className="w-full h-80 relative group overflow-hidden flex flex-col  rounded-lg border-1">  
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      <div className="w-full h-[calc(100%-35px)] relative rounded-lg flex items-center justify-center">
        <Image
          src="/images/gobi.jpg"
          alt="gobi"
          fill
          className="object-cover rounded-lg "
        />
        <span className="absolute  text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 text-lg">
        See more
      </span>
      </div>
      <p className="relative z-10 text-white  text-center">{item.name}</p>
    </div>
  );
};
