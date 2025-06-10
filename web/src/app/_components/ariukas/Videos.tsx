"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { MovieFrame } from "./MovieFrame";

export type VideoType = { title: string; src: string };

const videos = [
  {
    title: "Mongolian Steppe Beauty",
    src: "https://www.youtube.com/embed/312DccW3JTY?si=kLpCMyIZteVnYF8m",
  },
  {
    title: "Nomadic Traditions",
    src: "https://www.youtube.com/embed/GDR1v1lUbeE",
  },
  {
    title: "Gobi Desert Views",
    src: "https://www.youtube.com/embed/CIDRgubE5Zg",
  },
  {
    title: "Naadam Festival Highlights",
    src: "https://www.youtube.com/embed/g2dtCGb-xU4",
  },
  {
    title: "Eagle Hunting Culture",
    src: "https://www.youtube.com/embed/B7nCww8F9RA",
  },
  { title: "Yurt Building", src: "https://www.youtube.com/embed/LKzToINrXMM" },
  {
    title: "Mongolian Throat Singing",
    src: "https://www.youtube.com/embed/RPz5y6KOnMg",
  },
  {
    title: "Lake Khövsgöl Nature",
    src: "https://www.youtube.com/embed/kVkgGyEjOQM",
  },
  {
    title: "Horseback Nomads",
    src: "https://www.youtube.com/embed/bq8rF4m3qpY",
  },
  {
    title: "Mongolian Morning Rituals",
    src: "https://www.youtube.com/embed/0scX1nHbVj8",
  },
];

export default function VideoGallery() {
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  return (
    <div className="absolute w-full bottom-6 px-6 overflow-hidden overflow-x-scroll py-6 z-20">
      <div className="flex gap-10">
        {videos.map((video, index) => (
          <Dialog key={index}>
            <DialogTrigger>
              <MovieFrame
                video={video}
                coverImage={"/images/ariukasImages/HorsesInGobi.jpg"}
                videoClick={() => setCurrentVideo(video.src)}
              />
            </DialogTrigger>
            <DialogContent className="max-w-8xl w-full p-0 border-0">
              <div className="hidden">
                <DialogTitle></DialogTitle>
              </div>
              <div className="w-full aspect-video">
                <iframe
                  className="w-full h-full"
                  src={currentVideo ?? ""}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
