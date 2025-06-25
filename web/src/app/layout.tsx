"use client";

import { Toaster } from "sonner";
import { AuthProvider } from "./_providers/AuthProvider";
import "./globals.css";
import { Suspense } from "react";
import { Header } from "./_components/ariukasComponents/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen flex justify-center bg-black h-full">
        <Suspense fallback={<div>Loading travel plans...</div>}>
          <AuthProvider>
            <div className="w-full flex flex-col items-center">
              <Header />
              {children}
            </div>
          </AuthProvider>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
