import { PropsWithChildren } from "react";
import { CoverSection } from "./company/_components/coverSection";
import { PackageProvider } from "./company/_components/PackageProvider";

export default function CustomerLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CoverSection />
      <main className="px-4 md:px-12 lg:px-20 py-8">
        <PackageProvider>
          <div className="bg-white rounded-xl shadow-md p-6 md:p-10">
            {children}
          </div>
        </PackageProvider>
      </main>
    </div>
  );
}
