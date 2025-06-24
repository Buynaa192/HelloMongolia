import { Toaster } from "sonner";
import { AuthProvider } from "./_providers/AuthProvider";
import "./globals.css";
<<<<<<< HEAD
import { Footer } from "./_components/ariukasComponents/Footer";

=======
import { Suspense } from "react";
>>>>>>> 4c61afa (package)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body className="w-screen flex justify-center bg-black h-full flex-col items-center">
        <AuthProvider>
          <div className="max-w-[1440px] w-full h-full mb-10">{children}</div>
          <Footer />
        </AuthProvider>
        <Toaster />
=======
      <body className="w-screen flex justify-center bg-black h-full">
        <Suspense fallback={<div>Loading travel plans...</div>}>
          <AuthProvider>
            <div className="max-w-[1440px] w-full h-full">{children}</div>
          </AuthProvider>
          <Toaster />
        </Suspense>
>>>>>>> 4c61afa (package)
      </body>
    </html>
  );
}
