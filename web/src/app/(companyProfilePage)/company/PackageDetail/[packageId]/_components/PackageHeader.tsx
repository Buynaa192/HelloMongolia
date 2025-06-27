"use client";

type Props = {
  title: string;
  description: string;
};

export function PackageHeader({ title, description }: Props) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl text-gray-300 font-bold">{title}</h1>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
