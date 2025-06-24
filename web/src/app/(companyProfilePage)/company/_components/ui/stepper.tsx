import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type StepperProps = {
  steps: string[];
  currentStep: number;
};

export const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow p-4">
      {steps.map((step, index) => {
        const isCompleted = index + 1 < currentStep;
        const isActive = index + 1 === currentStep;

        return (
          <div key={index} className="flex items-center w-full">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "h-8 w-8 rounded-full border-2 flex items-center justify-center text-sm font-bold",
                  {
                    "bg-green-600 text-white border-green-600": isCompleted,
                    "text-green-600 border-green-600": isActive,
                    "text-gray-400 border-gray-300": !isCompleted && !isActive,
                  }
                )}>
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span
                className={cn("mt-1 text-xs", {
                  "text-green-600 font-semibold": isActive || isCompleted,
                  "text-gray-400": !isCompleted && !isActive,
                })}>
                {step}
              </span>
            </div>
            {index !== steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
