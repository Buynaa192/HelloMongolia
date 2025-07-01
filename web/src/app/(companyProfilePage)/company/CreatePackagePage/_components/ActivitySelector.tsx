"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ActivityType } from "@/app/_providers/AuthProvider";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

type Props = {
  activityList: ActivityType[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
};

export function ActivitySelector({
  activityList,
  selectedIds,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  const toggleSelect = (id: string) => {
    const exists = selectedIds.includes(id);
    const newSelected = exists
      ? selectedIds.filter((i) => i !== id)
      : [...selectedIds, id];
    onChange(newSelected);
  };

  const removeSelected = (id: string) => {
    const newSelected = selectedIds.filter((i) => i !== id);
    onChange(newSelected);
  };

  const selectedActivities = activityList.filter((act) =>
    selectedIds.includes(act._id)
  );

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between">
            {selectedIds.length > 0
              ? `${selectedIds.length} activities selected`
              : "Select activities..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search activities..." />
            <CommandEmpty>No activity found.</CommandEmpty>
            <CommandGroup>
              {activityList.map((act) => (
                <CommandItem
                  key={act._id}
                  onSelect={() => toggleSelect(act._id)}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedIds.includes(act._id)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {act.emoji} {act.activityName}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedActivities.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedActivities.map((act) => (
            <span
              key={act._id}
              className="flex items-center gap-1 bg-gray-100 border rounded-full px-3 py-1 text-sm">
              {act.emoji} {act.activityName}
              <button
                type="button"
                onClick={() => removeSelected(act._id)}
                className="ml-1 hover:text-red-500">
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
