"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Trophy, Flame, Save } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const { profile, setProfile } = useStore();
  const [name, setName] = useState(profile.name);
  const [interest, setInterest] = useState<"Tech" | "Economy" | "Both">(profile.interest);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setProfile({ name, interest });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="flex-1 space-y-6 px-4 md:px-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-heading">Your Profile</h2>
          <p className="text-muted-foreground mt-1">Manage your identity and learning preferences.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-1 border-primary/20 bg-primary/5">
          <CardHeader className="text-center pb-2">
            <div className="h-24 w-24 mx-auto bg-primary rounded-full flex items-center justify-center text-primary-foreground mb-4">
              <User className="h-10 w-10" />
            </div>
            <CardTitle className="text-2xl">{profile.name}</CardTitle>
            <CardDescription className="text-primary font-medium">{profile.level}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
              <div className="flex items-center gap-3">
                <Trophy className="h-5 w-5 text-amber-500" />
                <span className="font-medium">Total XP</span>
              </div>
              <Badge variant="secondary">{profile.xp} XP</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
              <div className="flex items-center gap-3">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="font-medium">Streak</span>
              </div>
              <Badge variant="secondary">3 Days</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your personal information and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter your name" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="interest">Main Interest</Label>
              <Select value={interest} onValueChange={(value: any) => setInterest(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your main interest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Economy">Economy & Finance</SelectItem>
                  <SelectItem value="Tech">Technology</SelectItem>
                  <SelectItem value="Both">Both</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-2">
                This helps us personalize your news feed and learning path.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end border-t pt-6">
            <Button onClick={handleSave} className="gap-2" disabled={isSaved}>
              {isSaved ? <Save className="h-4 w-4" /> : null}
              {isSaved ? "Saved Successfully!" : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
