"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "./_providers/AuthProvider";

export default function Home() {
  const { signOut } = useAuth();
  return (
    <div className="w-screen h-screen bg-white">
      Home Page
      <Button onClick={signOut}>signOut</Button>
    </div>
  );
}
