"user client";
import { PackageType } from "@/app/_providers/AuthProvider";
type ImageSlideHeadProps = {
  packageDetail: PackageType;
};
export const ImageSlideHead = ({ packageDetail }: ImageSlideHeadProps) => {
  if (!packageDetail) return null;
  return (
    <div className="w-full h-180 relative overflow-hidden ">
      {packageDetail.packageItem.length < 5 ? (
        <img
          src={packageDetail.coverPhoto}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className={`w-[500%] h-full flex absolute ${
            packageDetail.packageItem.length >= 5 ? "animate-wiggle" : ""
          } `}
        >
          {packageDetail.packageItem.slice(0, 5).map((it, index) => {
            return (
              <div key={index} className="w-[20%]">
                <img
                  src={it.image}
                  key={index}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src =
                      "https://res.cloudinary.com/df60cobe2/image/upload/v1750318124/NoImagePack_tyhsjd.png";
                  }}
                  className="w-full h-full object-cover  "
                />
              </div>
            );
          })}
        </div>
      )}
      <div className=" w-full h-full  absolute inset-0 flex  packageDetails-end justify-between bg-linear-to-tr from-black to-100% ">
        <div className="w-[60%] h-fit flex flex-col  p-10 ">
          <div className="text-white text-[50px] font-bold  w-full">
            <div>{packageDetail.title}</div>
          </div>
          <div
            className="text-[24px] text-white w-full font-semibold "
            style={{ fontFamily: "Orbitron" }}
          >
            {packageDetail.duration.includes("days")
              ? packageDetail.duration
              : `${packageDetail.duration} days `}
          </div>
          <div className="text-[20px] font-semibold">
            {packageDetail.description}
          </div>
        </div>
      </div>
    </div>
  );
};
