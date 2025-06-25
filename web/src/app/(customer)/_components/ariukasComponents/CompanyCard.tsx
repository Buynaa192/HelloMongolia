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
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg flex  flex-col justify-between items-center">
      <div className="flex  gap-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden">
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
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{company.name}</h2>
          <p className="text-sm text-gray-300 mt-1">{company.about}</p>

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
            <span className="text-sm text-gray-400 ml-1">
              {company.Rating.toFixed(1)}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {company.availableDestinations?.map((d, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-white/20 rounded-full"
              >
                {d.destinationName}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Link href={`/companies/${company._id}`}>
        <Button className="w-fit bg-white/70 text-black hover:bg-white hover:text-green-800 hover:font-bold">
          View more details
        </Button>
      </Link>
    </div>
  );
};
