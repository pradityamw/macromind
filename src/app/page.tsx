import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";
import { login, signup } from "./auth-actions";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      <div className="z-10 w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <BrainCircuit className="h-8 w-8 text-primary" />
          <span className="font-bold font-heading text-2xl">MacroMind</span>
        </div>
        
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold font-heading">Login / Register</CardTitle>
            <CardDescription>
              Enter your email and password to access your personal workspace or create a new account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              
              {resolvedSearchParams?.message && (
                <p className="text-sm text-destructive text-center bg-destructive/10 p-2 rounded-md">
                  {resolvedSearchParams.message}
                </p>
              )}

              <div className="flex w-full gap-4 pt-2">
                <Button type="submit" className="flex-1" formAction={login}>
                  Sign In
                </Button>
                <Button type="submit" variant="outline" className="flex-1" formAction={signup}>
                  Sign Up
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
