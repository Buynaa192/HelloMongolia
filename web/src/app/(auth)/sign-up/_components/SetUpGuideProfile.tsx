"use client";

import React from "react";
import { GuideSetUpDetails, GuideSignUp } from "../page";
import { Controller, useForm } from "react-hook-form";
import { api } from "@/axios";
import { toast } from "sonner";

interface SetUpGuideProfilePageProps {
  formData: GuideSignUp | null;
  setFormData: React.Dispatch<React.SetStateAction<GuideSignUp>>;
  goBack: () => void;
  onComplete: () => void;
}
export interface GuideFormInputs extends GuideSetUpDetails {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SetUpGuideProfilePage({
  formData,
  setFormData,
  goBack,
  onComplete,
}: SetUpGuideProfilePageProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<GuideFormInputs>({
    defaultValues: {
      email: formData?.email,
      password: "",
      confirmPassword: "",
      status: formData?.userDetails.status || "Open for new bookings!",
      experienceYears: formData?.userDetails.experienceYears || 0,
      spokenLanguages: formData?.userDetails.spokenLanguages || [],
    },
  });

  const password = watch("password");

  const onSubmit = async (data: GuideFormInputs) => {
    const { confirmPassword, email, password, ...userDetails } = data;

    const signUpData: GuideSignUp = {
      email,
      password,
      role: "guide",
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
      <h2 className="text-2xl mb-4">Set Up Guide Profile</h2>
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
      <label className="block">
        Status <span className="text-red-500">*</span>
        <select
          {...register("status", { required: "Status is required" })}
          className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
        >
          <option value="Open for new bookings!">Open for new bookings!</option>
          <option value="Booked and busy on the run!">
            Booked and busy on the run!
          </option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
      </label>
      <label className="block">
        Experience Years <span className="text-red-500">*</span>
        <input
          type="number"
          {...register("experienceYears", {
            required: "Experience is required",
            min: { value: 0, message: "Cannot be negative" },
          })}
          className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
          placeholder="Years of experience"
        />
        {errors.experienceYears && (
          <p className="text-red-500 text-sm">
            {errors.experienceYears.message}
          </p>
        )}
      </label>
      <label className="block">
        Spoken Languages <span className="text-red-500">*</span>
        <Controller
          name="spokenLanguages"
          control={control}
          rules={{ required: "At least one language is required" }}
          render={({ field }) => (
            <input
              type="text"
              placeholder="Comma separated (e.g. English, Spanish)"
              value={field.value.join(", ")}
              onChange={(e) =>
                field.onChange(
                  e.target.value
                    .split(",")
                    .map((lang) => lang.trim())
                    .filter((lang) => lang.length > 0)
                )
              }
              className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
            />
          )}
        />
        {errors.spokenLanguages && (
          <p className="text-red-500 text-sm">
            {errors.spokenLanguages.message}
          </p>
        )}
      </label>
      =
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
