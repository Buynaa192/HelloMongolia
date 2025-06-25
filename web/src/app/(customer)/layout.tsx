"use client";

import { Suspense } from "react";
import { Header } from "./_components/ariukasComponents/Header";
import { Footer } from "./_components/ariukasComponents/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Suspense fallback={<div>Loading travel plans...</div>}>
        <div className="w-full flex flex-col items-center">
          <Header />
          <div className="w-full flex flex-col items-center mb-10">
            {" "}
            {children}
          </div>
          <Footer />
        </div>
      </Suspense>
    </div>
  );
}
