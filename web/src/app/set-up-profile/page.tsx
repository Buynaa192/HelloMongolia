"use client";

import { useState, useEffect } from "react";
import { CompanyType, useAuth } from "@/app/_providers/AuthProvider";
import { useRouter } from "next/navigation";
import { api } from "@/axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const setupSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "Phone number must contain digits only")
    .min(8, "Must be at least 8 digits"),
  name: z.string().min(1, "Company name required"),
  since: z.coerce
    .number()
    .min(1900)
    .max(new Date().getFullYear(), "Cannot be in the future"),
  websiteURL: z.string().url("Invalid URL").optional().or(z.literal("")),
  about: z.string().optional(),
  AvatarImageFile: z.any(),
  backgroundImageFile: z.any(),
});

type SetupFormInput = z.infer<typeof setupSchema>;

async function uploadImage(file: File) {
  const CLOUD_NAME = "df60cobe2";
  const UPLOAD_PRESET = "HelloMongolia";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url;
}

export default function SetupProfile() {
  const { company, setCompany } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Start empty, update after company loads
  const [AvatarPreview, setAvatarPreview] = useState("");
  const [bgPreview, setBgPreview] = useState("");

  useEffect(() => {
    if (company) {
      setAvatarPreview(company.AvatarImage || "");
      setBgPreview(company.background || "");
    }
  }, [company]);

  const form = useForm<SetupFormInput>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      phoneNumber: company?.phoneNumber?.toString() || "",
      name: company?.name || "",
      since: company?.since || new Date().getFullYear(),
      websiteURL: company?.websiteURL || "",
      about: company?.about || "",
    },
  });

  const onSubmit = async (values: SetupFormInput) => {
    setLoading(true);
    try {
      let AvatarUrl = company?.AvatarImage || "";
      let bgUrl = company?.background || "";

      if (values.AvatarImageFile && values.AvatarImageFile[0]) {
        AvatarUrl = await uploadImage(values.AvatarImageFile[0]);
      }

      if (values.backgroundImageFile && values.backgroundImageFile[0]) {
        bgUrl = await uploadImage(values.backgroundImageFile[0]);
      }

      const update = {
        phoneNumber: Number(values.phoneNumber),
        name: values.name,
        since: values.since,
        websiteURL: values.websiteURL,
        about: values.about,
        AvatarImage: AvatarUrl,
        background: bgUrl,
      };

      await api.put(`/company/${company?._id}`, update);

      if (!company?._id || !company.email) {
        throw new Error("Invalid company object");
      }

      setCompany({
        ...company,
        ...update,
        _id: company._id,
        email: company.email,
        packages: company.packages,
        availableDestinations: company.availableDestinations,
        reviews: company.reviews,
        Rating: company.Rating,
      } as CompanyType);

      router.push("/companies/company");
    } catch {
      alert("Update failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!company) return <div>Loading company...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Set Up Your Company Profile
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Phone Number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Company Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="since"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Since</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="websiteURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://example.mn" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={3}
                    placeholder="About your company"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="AvatarImageFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar Image</FormLabel>
                <FormControl>
                  <div className="relative w-24 h-24">
                    <label className="cursor-pointer block w-full h-full rounded-full overflow-hidden border border-black bg-gray-200 hover:opacity-75 transition-opacity duration-200">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files && files[0]) {
                            setAvatarPreview(URL.createObjectURL(files[0]));
                            field.onChange(files);
                          }
                        }}
                      />
                      {AvatarPreview ? (
                        <img
                          src={AvatarPreview}
                          alt="Avatar Preview"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-500">
                          No Avatar
                        </div>
                      )}
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="backgroundImageFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <div className="relative w-full h-40 rounded overflow-hidden">
                    <label className="block cursor-pointer w-full h-full bg-gray-200 border border-black hover:opacity-75 transition-opacity duration-200">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setBgPreview(URL.createObjectURL(file));
                            field.onChange(e.target.files);
                          }
                        }}
                      />
                      {bgPreview && (
                        <img
                          src={bgPreview}
                          alt="Background Preview"
                          className="object-cover w-full h-full"
                        />
                      )}
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
