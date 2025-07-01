import { CompanyType } from "@/app/_providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CompanyCardProps = {
  company: CompanyType;
};

export const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <div className="flex flex-col items-center justify-between gap-6 p-6 shadow-lg bg-white/10 backdrop-blur-md rounded-2xl">
      <div className="flex flex-col w-full gap-4">
        <div className="flex items-center gap-6">
          <div className="relative w-20 h-20 overflow-hidden rounded-full">
            <Image
              src={
                company.AvatarImage ||
                "https://res.cloudinary.com/df60cobe2/image/upload/v1750327943/nteLogo_jthqil.png"
              }
              alt={company.name}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold">{company.name}</h2>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(company.Rating)
                      ? "text-yellow-400"
                      : "text-gray-500"
                  }`}
                  fill={
                    i < Math.round(company.Rating)
                      ? "currentColor"
                      : "transparent"
                  }
                />
              ))}
              <span className="ml-1 text-sm text-gray-400">
                {company.Rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full">
          <p className="mt-1 text-sm text-gray-300">{company.about}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            {company.availableDestinations?.map((d, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-white/20"
              >
                {d.destinationName}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Link href={`/companies/${company._id}`} className="w-fit">
        <Button
          size="lg"
          className="text-black cursor-pointer w-fit bg-white/70 hover:bg-white hover:text-green-800 hover:font-bold"
        >
          View more details
        </Button>
      </Link>
    </div>
  );
};
