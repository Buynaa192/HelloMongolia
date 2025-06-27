"use client";

import { RoleType, SignUpFormData } from "../page";

type ChooseRolePageProps = {
  chosenRole: RoleType;
  setChosenRole: (role: RoleType) => void;
  setFormData: React.Dispatch<React.SetStateAction<Partial<SignUpFormData>>>;
  nextStep: () => void;
};

export const ChooseRolePage = ({
  chosenRole,
  setChosenRole,
  setFormData,
  nextStep,
}: ChooseRolePageProps) => {
  const roles: RoleType[] = ["company", "customer", "guide"];

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="text-xl font-semibold mb-4">
        Please choose your role for a sign up!
      </h2>
      {roles.map((role) => (
        <button
          key={role}
          onClick={() => {
            setChosenRole(role);

            setFormData(
              (prev) =>
                ({
                  ...(prev || {}),
                  role,
                  userDetails: {},
                } as SignUpFormData)
            );
            nextStep();
          }}
          className={`w-full py-2 rounded-lg border ${
            chosenRole === role ? "bg-black text-white" : "bg-white text-black"
          } hover:bg-black hover:text-white transition`}
        >
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>
      ))}
    </div>
  );
};
