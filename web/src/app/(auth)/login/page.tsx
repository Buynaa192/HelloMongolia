"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import { useAuth } from "@/app/_providers/AuthProvider";
import Link from "next/link";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginInput) => {
    try {
      const company = await signIn(values.email, values.password);
      toast.success("Logged in successfully!");

      const hasProfile =
        !!company?.phoneNumber ||
        !!company?.AvatarImage?.trim() ||
        !!company?.background?.trim() ||
        !!company?.name?.trim();

      setTimeout(() => {
        router.push(hasProfile ? "/companies/company" : "/set-up-profile");
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Password or email wrong.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-150 p-6 border rounded-lg shadow bg-white flex flex-col gap-8">
        <div className="w-full flex justify-center">
          <Image
            width={200}
            height={200}
            src="https://res.cloudinary.com/df60cobe2/image/upload/v1750323871/Screenshot_2025-06-19_at_5.04.10_PM_xxqsgx.png"
            className="w-40"
            alt=""
          />
        </div>
        <h2 className="text-2xl font-semibold mb-6">Login</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <p>
                Dont have an account ?
                <Link
                  href={"/sign-up"}
                  className="text-blue-500 underline underline-offset-1"
                >
                  Sign up
                </Link>
              </p>
            </div>
            <Button
              type="submit"
              className="w-full bg-black text-white"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
