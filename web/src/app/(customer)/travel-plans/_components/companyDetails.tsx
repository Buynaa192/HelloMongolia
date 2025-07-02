"user client";
import { PackageType } from "@/app/_providers/AuthProvider";

type CompanyDetailsProps = {
  packageDetail: PackageType;
};
export const CompanyDetails = ({ packageDetail }: CompanyDetailsProps) => {
  return (
    <div className="flex flex-col gap-6 flex-1 border border-white/40 bg-white/5 p-6 rounded-xl">
      <div className="flex flex-col w-full gap-4">
        <div className="text-2xl font-normal">Trip Overview:</div>

        <p className="text-lg flex-2 text-white/80 italic">
          {packageDetail.description}
        </p>
      </div>

      <div className="flex flex-col w-full gap-4">
        <div className="text-2xl font-normal">Company Overview:</div>

        <p className="text-lg flex-2 text-white/80 italic">
          {packageDetail.companyId.about}
        </p>
      </div>
    </div>
  );
};
