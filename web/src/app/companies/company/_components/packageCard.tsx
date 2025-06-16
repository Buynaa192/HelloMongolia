import Image from "next/image";
import { PackageCardSkeleton } from "./packageSkeleton";
import { Button } from "@/components/ui/button";

type PackageCardProps = {
  loading: boolean;
  image: string;
  title: string;
  description: string;
  price: string;
  isCompanyLoggedIn: boolean;
  Update?: () => void;
  Delete?: () => void;
};

export const PackageCard = ({
  loading,
  image,
  title,
  description,
  price,
  isCompanyLoggedIn,
  Update,
  Delete,
}: PackageCardProps) => {
  if (loading) return <PackageCardSkeleton />;
  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative h-60 w-full">
        <Image
          src={image.startsWith("http") ? image : `/images/${image}`}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 ">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-base font-bold text-gray-800">{price}</p>

        {!isCompanyLoggedIn ? (
          <div className="w-full flex flex-row gap-3 ">
            <Button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mr-2">
              See Details
            </Button>
            <Button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Book
            </Button>
          </div>
        ) : (
          <div className="w-full flex flex-row gap-3 ">
            <Button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition mr-2">
              Update
            </Button>
            <Button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
