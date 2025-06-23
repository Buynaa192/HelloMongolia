"use client";

import { useRef } from "react";
import Image from "next/image";

interface HoverPanImageProps {
  src: string;
  alt?: string;
}

export const HoverPanImage = ({ src, alt = "Preview" }: HoverPanImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentX = x / bounds.width;

    const offsetX = (percentX - 0.5) * 30; // хөдөлгөөний хэмжээ -15px ~ +15px

    if (imageRef.current) {
      imageRef.current.style.transform = `translateX(${offsetX}px) scale(1.05)`;
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = "translateX(0px) scale(1)";
    }
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-200 ease-out will-change-transform"
      />
    </div>
  );
};
