import { Star } from "lucide-react";
import { PackageCardSkeleton } from "./packageSkeleton";
import { Button } from "@/components/ui/button";
import { PackageType } from "@/app/_providers/AuthProvider";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { UpdatePackageForm } from "./updatePackageForm";
import { DeletePackage } from "./deletePackage";
type PackageCardProps = {
  loading: boolean;
  isCompanyLoggedIn: boolean;
  packages: PackageType;
  image: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  rating: number;
};
export const PackageCard = ({
  loading,
  isCompanyLoggedIn,
  packages,
  image,
  title,
  description,
  price,
  duration,
  rating,
}: PackageCardProps) => {
  const companyId = "684b7452cf844286f738f2db";
  if (loading) return <PackageCardSkeleton />;
  const ratingStar = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={18}
        className={
          i <= rating - 1 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }
      />
    ));
  };

  return (
    <div className="w-full flex items-stretch justify-center">
      <div className="flex w-[90%] min-h-[420px] rounded-2xl shadow-xl hover:shadow-2xl flex-col hover:w-[92%] duration-200 bg-white">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-[250px] rounded-t-2xl object-cover"
          />
        ) : (
          <div className="w-full h-[250px] rounded-t-2xl bg-gray-200 flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
        <div className="flex flex-col justify-between flex-1 p-4 gap-2">
          <h2 className="text-[20px] font-bold line-clamp-2">{title}</h2>
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>

          <div className="flex justify-between items-center text-[12px] font-medium mt-auto pt-2">
            <div className="flex items-center gap-4">
              <span>
                {duration} {Number(duration) == 1 ? "day" : "days"}{" "}
              </span>
              <div className="flex items-center gap-1">
                {ratingStar(rating)}
              </div>
            </div>
            <div className="text-[20px] font-bold text-green-500">${price}</div>
          </div>

          <div className="flex gap-4 mt-4 ">
            {!isCompanyLoggedIn ? (
              <>
                <Button className="bg-blue-600 text-white hover:bg-blue-700 transition">
                  See Details
                </Button>
                <Button className="bg-green-600 text-white hover:bg-green-700 transition">
                  Book
                </Button>
              </>
            ) : (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-yellow-500 text-white hover:bg-yellow-600 transition">
                      Update
                    </Button>
                  </DialogTrigger>
                  <UpdatePackageForm packageData={packages} />
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-red-600 text-white hover:bg-red-700 transition">
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DeletePackage title={title} packageId={packages._id} />
                </Dialog>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
