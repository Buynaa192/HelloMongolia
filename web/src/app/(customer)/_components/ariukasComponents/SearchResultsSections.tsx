import Link from "next/link";

interface SearchSectionProps<
  T extends { _id: string; [key: string]: React.ReactNode }
> {
  title: React.ReactNode;
  items?: T[];
  field: keyof T;
  emptyLabel?: string;
  backgroundImage?: string;
  urlPrefix: string;
}

export const SearchSection = <T extends { _id: string }>({
  title,
  items,
  field,
  emptyLabel,
  backgroundImage,
  urlPrefix,
}: SearchSectionProps<T>) => {
  return (
    <section
      className="w-full relative rounded-md h-[300px] overflow-hidden bg-opacity-10 bg-cover bg-center"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
      }}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      )}

      <div className="relative z-10 rounded-md overflow-hidden p-4 flex flex-col h-full">
        <Link href={urlPrefix}>
          <h3 className="font-bold text-lg mb-4 cursor-pointer hover:underline">
            {title}
          </h3>
        </Link>

        {items && items.length ? (
          <ul className="flex-1 overflow-y-auto max-h-[180px] divide-y divide-gray-600 rounded-md">
            {items.map((item) => (
              <li
                key={item._id}
                className="py-2 cursor-pointer transition-colors hover:bg-white/20"
              >
                <Link href={`${urlPrefix}/${item._id}`}>
                  <p className="hover:font-semibold">{String(item[field])}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-sm italic">
            No {emptyLabel ?? "results"} found.
          </p>
        )}
      </div>
    </section>
  );
};
