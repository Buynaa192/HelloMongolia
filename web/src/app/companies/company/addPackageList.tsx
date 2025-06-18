import { PackageItemType, PackageType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { useEffect, useState } from "react";
import { PackageItemCard } from "./_components/packageItemCard";

export const PackageItemList = ({ packageId }: { packageId: string }) => {
  const [items, setItems] = useState<PackageItemType[]>([]);

  useEffect(() => {
    const packageItems = async () => {
      const res = await api.get(`/packageItem`);
      setItems(res.data.packageItem);
    };

    packageItems();
  }, [packageId]);

  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      {items.map((item) => (
        <PackageItemCard
          key={item._id}
          order={item.order}
          title={item.title}
          image={item.image}
          description={item.description}
          activity={item.activity}
          packageId={packageId}
          packageItemId={item._id}
        />
      ))}
    </div>
  );
};
