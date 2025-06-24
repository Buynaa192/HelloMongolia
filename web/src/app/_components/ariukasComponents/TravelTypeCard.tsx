import Image from "next/image";
import Link from "next/link";

interface TravelTypeCardProps {
  title: string;
  imageSrc: string;
  buttonURL: string;
  isFocused?: boolean;
  type: string;
}

export const TravelTypeCard = ({
  title,
  imageSrc,
  type,
  isFocused = false,
}: TravelTypeCardProps) => {
  return (
    <div
      className={`transition-all duration-500 ease-in-out transform ${
        isFocused
          ? "scale-110 md:h-[600px] h-[400px] z-10 shadow-xl"
          : "scale-100 opacity-70 h-[350px] md:h-fit"
      }`}
    >
      <div className="w-full md:h-[500px] rounded-md flex items-center bg-white">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          priority
        />

        {isFocused ? (
          <div className="w-full h-full absolute inset-0 flex flex-col justify-between items-center p-15 rounded-md">
            <div
              className="absolute top-0 left-0 w-full h-80 pointer-events-none z-10"
              style={{
                background: "linear-gradient(to top, transparent, black)",
              }}
            />
            <p className="text-white md:text-4xl text-3xl font-bold text-center z-30">
              {title}
            </p>
            <Link
              href={`/travel-plans?tripType=${type}`}
              className=" w-30 h-7 flex items-center justify-center rounded-[8px] font-medium text-black bg-white hover:bg-black hover:text-white"
            >
              EXPLORE
            </Link>
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute inset-0 flex flex-col justify-between items-center p-4">
              <p className="text-white text-2xl font-semibold text-center">
                {title}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
