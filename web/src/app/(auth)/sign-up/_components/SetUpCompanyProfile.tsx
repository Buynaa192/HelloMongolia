"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { CompanySetUpDetails, CompanySignUp } from "../page";
import { api } from "@/axios";
import { toast } from "sonner";

interface SetUpCompanyProfilePageProps {
  formData: CompanySignUp | null;
  setFormData: React.Dispatch<React.SetStateAction<CompanySignUp>>;
  goBack: () => void;
  onComplete: () => void;
}

export interface CompanyFormInputs extends CompanySetUpDetails {
  email: string;
  password: string;
  phoneNumber: string;
  confirmPassword: string;
}

export default function SetUpCompanyProfilePage({
  formData,
  setFormData,
  goBack,
  onComplete,
}: SetUpCompanyProfilePageProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CompanyFormInputs>({
    defaultValues: {
      email: formData?.email,
      password: "",
      confirmPassword: "",
      phoneNumber: formData?.userDetails.phoneNumber || "",
      about: formData?.userDetails.about ? formData.userDetails.about : "",
      since: formData?.userDetails.since
        ? formData?.userDetails.since
        : new Date().getFullYear(),
      websiteURL: formData?.userDetails.websiteURL || "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: CompanyFormInputs) => {
    const { confirmPassword, email, password, ...userDetails } = data;

    const signUpData: CompanySignUp = {
      email,
      password,
      role: "company",
      userDetails,
    };

    try {
      const response = await api.post("/auth/signup", signUpData);

      toast.success("Signup successful!");
      console.log("Signup successful:", response.data);

      setFormData(signUpData);
      onComplete();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Signup failed";
      console.error("Signup error:", errorMessage);
      toast.error(`Signup failed: ${errorMessage}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-800 p-6 rounded-md w-full max-w-lg text-white space-y-4"
    >
      <h2 className="text-2xl mb-4">Set Up Company Profile</h2>

      <label className="block">
        Email <span className="text-red-500">*</span>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email format",
            },
          })}
          className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
          placeholder="Company email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </label>

      <label className="block">
        Password <span className="text-red-500">*</span>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
          placeholder="Create a password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </label>

      <label className="block">
        Confirm Password <span className="text-red-500">*</span>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </label>

      <label className="block">
        Company Name <span className="text-red-500">*</span>
        <input
          type="text"
          {...register("companyName", { required: "Company name is required" })}
          className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
          placeholder="Your company name"
        />
        {errors.companyName && (
          <p className="text-red-500 text-sm">{errors.companyName.message}</p>
        )}
      </label>

      <label className="block">
        About <span className="text-red-500">*</span>
        <textarea
          {...register("about", { required: "About section is required" })}
          className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
          placeholder="Brief description of your company"
          rows={3}
        />
        {errors.about && (
          <p className="text-red-500 text-sm">{errors.about.message}</p>
        )}
      </label>

      <label className="block">
        Founded Year <span className="text-red-500">*</span>
        <input
          type="number"
          {...register("since", {
            required: "Founded year is required",
            min: { value: 1800, message: "Year is too early" },
            max: {
              value: new Date().getFullYear(),
              message: "Year cannot be in the future",
            },
          })}
          className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
          placeholder="e.g., 2010"
        />
        {errors.since && (
          <p className="text-red-500 text-sm">{errors.since.message}</p>
        )}
      </label>

      <label className="block">
        Phone Number
        <input
          type="number"
          {...register("phoneNumber", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{8,}$/,
              message: "Enter a valid phone number",
            },
          })}
          className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
          placeholder="+976 77777777"
        />{" "}
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}
      </label>

      <label className="block">
        Website URL
        <input
          type="url"
          {...register("websiteURL")}
          className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
          placeholder="https://yourcompany.com"
        />
      </label>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={goBack}
          className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
        >
          Complete
        </button>
      </div>
    </form>
  );
}
