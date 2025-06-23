import { Toaster } from "sonner";
import { AuthProvider } from "./_providers/AuthProvider";
import "./globals.css";
import { Footer } from "./_components/ariukasComponents/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen flex justify-center bg-black h-full flex-col items-center">
        <AuthProvider>
          <div className="max-w-[1440px] w-full h-full mb-10">{children}</div>
          <Footer />
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
