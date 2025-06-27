"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChooseRolePage } from "./_components/ChooseRolePage";
import SetUpCompanyProfilePage from "./_components/SetUpCompanyProfile";
import SetUpGuideProfilePage from "./_components/SetUpGuideProfile";
import SetUpCostumerProfilePage from "./_components/SetUpCostumerProfile";
import { GuideStatus } from "@/app/_providers/AuthProvider";

export type CompanySetUpDetails = {
  companyName: string;
  phoneNumber: string;
  since: number;
  websiteURL?: string;
  about: string;
};

export type GuideSetUpDetails = {
  name: string;
  status: GuideStatus;
  experienceYears?: number;
  spokenLanguages: string[];
};

export type CustomerSetUpDetails = {
  name: string;
  nationality: string;
};

export type CompanySignUp = {
  email: string;
  password: string;
  role: "company";
  userDetails: CompanySetUpDetails;
};
export type GuideSignUp = {
  email: string;
  password: string;
  role: "guide";
  userDetails: GuideSetUpDetails;
};
export type CustomerSignUp = {
  email: string;
  password: string;
  role: "customer";
  userDetails: CustomerSetUpDetails;
};

export type RoleType = "customer" | "company" | "guide" | "";

export type SignUpFormData = CustomerSignUp | CompanySignUp | GuideSignUp;

export default function SignUp() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<Partial<SignUpFormData>>({});
  const [chosenRole, setChosenRole] = useState<RoleType>("");

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black">
      <div className="bg-white text-black w-full max-w-md p-8 rounded-lg shadow-lg">
        {step === 1 && (
          <ChooseRolePage
            chosenRole={chosenRole}
            setChosenRole={setChosenRole}
            nextStep={() => setStep(2)}
            setFormData={setFormData}
          />
        )}

        {step === 2 && chosenRole === "customer" && (
          <SetUpCostumerProfilePage
            formData={formData as CustomerSignUp}
            setFormData={
              setFormData as React.Dispatch<
                React.SetStateAction<CustomerSignUp>
              >
            }
            goBack={() => setStep(1)}
            onComplete={() => {
              console.log("Complete data", {
                ...formData,
                role: chosenRole,
              });
              router.push("/");
            }}
          />
        )}

        {step === 2 && chosenRole === "guide" && (
          <SetUpGuideProfilePage
            formData={formData as GuideSignUp}
            setFormData={
              setFormData as React.Dispatch<React.SetStateAction<GuideSignUp>>
            }
            goBack={() => setStep(1)}
            onComplete={() => {
              console.log("Complete data", {
                ...formData,
                role: chosenRole,
              });
              router.push("/set-up-profile/guide");
            }}
          />
        )}

        {step === 2 && chosenRole === "company" && (
          <SetUpCompanyProfilePage
            formData={formData as CompanySignUp}
            setFormData={
              setFormData as React.Dispatch<React.SetStateAction<CompanySignUp>>
            }
            goBack={() => setStep(1)}
            onComplete={() => {
              console.log("Complete data", {
                ...formData,
                role: chosenRole,
              });
              router.push("/set-up-profile/company");
            }}
          />
        )}
      </div>
    </div>
  );
}
