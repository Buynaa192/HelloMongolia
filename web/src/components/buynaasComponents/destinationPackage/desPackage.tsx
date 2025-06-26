"use client";

import { PackageType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
type idType = {
  id: string;
};
export const DesdinationPackage = ({ id }: idType) => {
  const [packages, setPackages] = useState<PackageType[]>([]);

  useEffect(() => {
    const GetPackage = async () => {
      const res = await api.get(`package/destination/${id}`);
      setPackages(res.data.packages);
    };
    GetPackage();
  }, []);

  return (
    <div className="w-full grid grid-cols-5  gap-4 p-4 text-white">
      {packages.map((item, indx) => {
        return (
          <Link className=" rounded-lg" key={indx} href={`/travel-plans/${item._id}`}>
            <div className="w-full h-full rounded-lg ">
              <Image className="w-full h-[calc(100%-50px)] rounded-lg" alt={item.coverPhoto} src={item.coverPhoto} width={500} height={100}></Image>
              <p>{item.title}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
