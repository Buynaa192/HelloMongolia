"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "./_providers/AuthProvider";

export default function Home() {
  const { signOut, company } = useAuth();
  console.log(company);

  return (
    <div className="w-screen h-screen bg-white">
      Home Page
      <Button onClick={signOut}>signOut</Button>
    </div>
  );
}
