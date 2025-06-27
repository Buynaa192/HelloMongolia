"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  CustomerSetUpDetails,
  CustomerSignUp,
  GuideSetUpDetails,
} from "../page";
import { api } from "@/axios";
import { toast } from "sonner";

interface SetUpCostumerProfilePageProps {
  formData: CustomerSignUp | null;
  setFormData: React.Dispatch<React.SetStateAction<CustomerSignUp>>;
  goBack: () => void;
  onComplete: () => void;
}

export interface CustomerFormInputs extends CustomerSetUpDetails {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SetUpCostumerProfilePage({
  formData,
  setFormData,
  goBack,
  onComplete,
}: SetUpCostumerProfilePageProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<CustomerFormInputs>({
    defaultValues: {
      email: formData?.email || "",
      password: "",
      confirmPassword: "",
      name: formData?.userDetails.name || "",
      nationality: formData?.userDetails.nationality || "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: CustomerFormInputs) => {
    const { confirmPassword, email, password, ...userDetails } = data;

    const signUpData: CustomerSignUp = {
      email,
      password,
      role: "customer",
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
      <h2 className="text-2xl mb-4">Set Up Customer Profile</h2>

      <label className="block">
        Email <span className="text-red-500">*</span>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email address",
            },
          })}
          className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
          placeholder="Email Address"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </label>

      {/* Password */}
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

      {/* Confirm Password */}
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

      {/* Name */}
      <label className="block">
        Name <span className="text-red-500">*</span>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
          placeholder="Full Name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </label>

      {/* Nationality */}
      <label className="block">
        Nationality <span className="text-red-500">*</span>
        <input
          type="text"
          {...register("nationality", {
            required: "Nationality is required",
          })}
          className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
          placeholder="Your Nationality"
        />
        {errors.nationality && (
          <p className="text-red-500 text-sm">{errors.nationality.message}</p>
        )}
      </label>

      {/* Navigation Buttons */}
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
