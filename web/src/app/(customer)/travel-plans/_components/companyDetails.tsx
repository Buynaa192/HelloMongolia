"user client";
import { PackageType } from "@/app/_providers/AuthProvider";

type CompanyDetailsProps = {
  packageDetail: PackageType;
};
export const CompanyDetails = ({ packageDetail }: CompanyDetailsProps) => {
  return (
    <div className="flex flex-col flex-1 border-[#ababab] border-[1px] p-3 rounded-xl">
      <div className="flex flex-col w-full ">
        <div
          className="text-[30px] font-bold  pl-5"
          style={{ fontFamily: "Dancing Script" }}
        >
          Trip Overview:
        </div>

        <div className="w-full flex gap-4 justify-center">
          <p className="p-2 text-[20px] flex-2 text-[#ababab]">
            {packageDetail.description}
            {packageDetail.companyId.about}
          </p>
        </div>
      </div>
    </div>
  );
};
