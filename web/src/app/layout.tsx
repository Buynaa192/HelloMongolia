import { Toaster } from "sonner";
import { AuthProvider } from "./_providers/AuthProvider";
import "./globals.css";
import { Suspense } from "react";
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
            <div className="max-w-[1440px] w-full h-full">{children}</div>
          </AuthProvider>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
