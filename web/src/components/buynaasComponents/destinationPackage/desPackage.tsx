"use client";

import { FinalPackageCard } from "@/app/(customer)/_components/ariukasComponents/PackageCardForCompany";
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
        return <FinalPackageCard key={indx} pkg={item} />;
      })}
    </div>
  );
};
