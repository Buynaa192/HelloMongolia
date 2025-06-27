"use client";

import { ActivityType } from "@/app/_providers/AuthProvider";

type Props = {
  activities: ActivityType[];
  selectedActivityIds: string[];
  setSelectedActivityIds: React.Dispatch<React.SetStateAction<string[]>>;
};

export function ActivitiesSelector({
  activities,
  selectedActivityIds,
  setSelectedActivityIds,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {activities.map((act) => (
        <label
          key={act._id}
          className={`flex items-center gap-2 border p-2 rounded cursor-pointer transition ${
            selectedActivityIds.includes(act._id)
              ? "bg-blue-100 border-blue-500"
              : "border-gray-300"
          }`}>
          <input
            type="checkbox"
            checked={selectedActivityIds.includes(act._id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedActivityIds((prev) => [...prev, act._id]);
              } else {
                setSelectedActivityIds((prev) =>
                  prev.filter((id) => id !== act._id)
                );
              }
            }}
          />
          <span>
            {act.emoji} {act.activityName}
          </span>
        </label>
      ))}
    </div>
  );
}
