import React from "react";

interface SectionTitleProps {
  title: string;
  count: number | undefined;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, count }) => {
  return (
    <div className="font-semibold text-lg flex flex-col items-center justify-center">
      <p className="flex flex-row text-center">
        <span>{title}</span>
      </p>

      {typeof count === "number" && (
        <span className="text-gray-500 text-sm">({count} results)</span>
      )}
    </div>
  );
};
