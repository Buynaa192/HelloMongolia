import { Toaster } from "sonner";
import { AuthProvider } from "./_providers/AuthProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen flex justify-center bg-black h-full">
        <AuthProvider>
          <div className="w-[1440px] h-full">{children}</div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
