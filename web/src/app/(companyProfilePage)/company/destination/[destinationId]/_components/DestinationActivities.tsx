"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ActivityType } from "@/app/_providers/AuthProvider";

type Props = {
  activities: ActivityType[];
  selected: string[];
  toggle: (id: string) => void;
  editable?: boolean;
};

export function DestinationActivities({
  activities,
  selected,
  toggle,
  editable = false,
}: Props) {
  if (editable) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {activities.map((act) => (
          <label key={act._id} className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={selected.includes(act._id)}
              onCheckedChange={() => toggle(act._id)}
            />
            {act.emoji} {act.activityName}
          </label>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {activities
        .filter((act) => selected.includes(act._id))
        .map((act) => (
          <span
            key={act._id}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {act.emoji} {act.activityName}
          </span>
        ))}
    </div>
  );
}
