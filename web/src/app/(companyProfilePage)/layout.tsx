import { PropsWithChildren } from "react";
import { PackageProvider } from "./company/_components/PackageProvider";

export default function CustomerLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gray-50">
      <PackageProvider>
        <div>{children}</div>
      </PackageProvider>
    </div>
  );
}
