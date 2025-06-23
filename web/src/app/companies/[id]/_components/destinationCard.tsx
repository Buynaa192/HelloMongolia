import { MapPin } from "lucide-react";

type Activity = {
  _id: string;
  activityName: string;
  emoji: string;
};

type DestinationCardProps = {
  image: string;
  destinationName: string;
  region: string;
  activities: Activity[];
  description: string;
};

export const DestinationCard = ({
  image,
  destinationName,
  region,
  activities,
  description,
}: DestinationCardProps) => {
  return (
    <div className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition cursor-pointer">
      <img
        src={image}
        alt={destinationName}
        className="w-full h-52 object-cover"
      />
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{destinationName}</h2>
          <div className="flex items-center text-sm text-gray-500 gap-1">
            <MapPin className="w-4 h-4" />
            {region.replace("-", " ")}
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-2 mt-2">
          {activities.map((act) => (
            <span
              key={act._id}
              className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 flex items-center gap-1">
              <span>{act.emoji}</span> {act.activityName}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
