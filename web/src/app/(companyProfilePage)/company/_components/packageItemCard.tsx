import { ActivityType } from "@/app/_providers/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";
type PackageItemCardProps = {
  title: string;
  image: string;
  description: string;
  activity: ActivityType[];
  packageId: string;
  packageItemId: string;
  setSelectedItemId: (value: string) => void;
};

export const PackageItemCard = ({
  title,
  image,
  description,
  activity,
  packageItemId,
  setSelectedItemId,
}: PackageItemCardProps) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    setSelectedItemId(packageItemId);
    setIsAdded(true);
  };
  const handleRemove = () => setIsAdded(false);

  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader className="p-0">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>

      <CardContent className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{description}</p>

        <div>
          <h4 className="font-medium text-gray-800 mb-2">Activities:</h4>
          <div className="flex flex-wrap gap-2">
            {activity.map((act) => (
              <span
                key={act._id}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {act.emoji} {act.activityName}
              </span>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <Button
          onClick={isAdded ? handleRemove : handleAdd}
          variant={isAdded ? "outline" : "default"}
          className={
            isAdded
              ? "text-red-600 border-red-600 hover:bg-red-50"
              : "bg-green-600 hover:bg-green-700"
          }>
          {isAdded ? "Remove" : "Add to Package"}
        </Button>
      </CardFooter>
    </Card>
  );
};
