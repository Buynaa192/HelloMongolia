"use client";

import React, { useRef, useState, useEffect } from "react";

export const ScrollTypes = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [centerIndex, setCenterIndex] = useState(0);

  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
  ];

  const onScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;

    const itemElements = Array.from(container.children) as HTMLElement[];
    let closestIndex = 0;
    let closestDistance = Infinity;

    itemElements.forEach((item, idx) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(containerCenter - itemCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = idx;
      }
    });

    setCenterIndex(closestIndex);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex overflow-x-auto snap-x snap-mandatory p-5 border border-gray-300 gap-5 scroll-smooth"
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`
            min-w-[150px] h-[150px] flex-shrink-0 rounded-lg flex items-center justify-center snap-center
            transition-transform duration-300
            ${
              idx === centerIndex
                ? "bg-blue-600 text-white scale-110"
                : "bg-gray-300 text-gray-600 scale-100"
            }
          `}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
