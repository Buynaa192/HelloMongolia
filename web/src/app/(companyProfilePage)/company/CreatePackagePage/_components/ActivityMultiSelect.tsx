import { ActivityType } from "@/app/_providers/AuthProvider";
import { FormLabel } from "@/components/ui/form";

type Props = {
  selected: string[];
  setSelected: (ids: string[]) => void;
  activities: ActivityType[];
};

export const ActivityMultiSelect = ({
  selected,
  setSelected,
  activities,
}: Props) => {
  return (
    <div className="space-y-2">
      <FormLabel>Activities</FormLabel>
      <div className="flex flex-wrap gap-3">
        {activities.map((act) => (
          <label
            key={act._id}
            className={`flex items-center gap-2 border px-3 py-2 rounded-lg cursor-pointer ${
              selected.includes(act._id)
                ? "bg-blue-100 border-blue-500"
                : "border-gray-300"
            }`}>
            <input
              type="checkbox"
              className="hidden"
              checked={selected.includes(act._id)}
              onChange={(e) => {
                const newVal = e.target.checked
                  ? [...selected, act._id]
                  : selected.filter((id) => id !== act._id);
                setSelected(newVal);
              }}
            />
            <span>{act.emoji}</span>
            <span className="text-sm">{act.activityName}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
