import Image from "next/image";
import { VideoType } from "./Videos";

interface MovieFrameProps {
  video: VideoType;
  videoClick: () => void;
  coverImage: string;
}

export const MovieFrame = ({
  video,
  videoClick,
  coverImage,
}: MovieFrameProps) => {
  return (
    <div className="w-[250px] h-[150px]  border-2 border-black flex flex-col justify-between ">
      <div className="flex justify-between px-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="w-3 h-1 bg-black" />
        ))}
      </div>

      <div
        onClick={videoClick}
        className="h-full cursor-pointer overflow-hidden hover:shadow-xl transition relative"
      >
        <div className="w-full absolute top-0 flex items-start justify-center text-center bg-black z-10">
          <span className="text-md font-semibold text-white ">
            {video.title}
          </span>
        </div>
        <Image
          src={coverImage}
          fill
          alt={video.title}
          className="object-cover"
        />
      </div>

      <div className="flex justify-between px-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="w-3 h-1 bg-black" />
        ))}
      </div>
    </div>
  );
};
