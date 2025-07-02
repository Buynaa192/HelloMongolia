"use client";

import { Toaster } from "sonner";
import { AuthProvider } from "./_providers/AuthProvider";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hello Mongolia",
  description: "Explore the beauty of Mongolia with Hello Mongolia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen flex justify-center bg-black h-full">
        <AuthProvider>
          <div className="w-full">{children}</div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
