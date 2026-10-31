import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Center Account</CardTitle>
          <CardDescription>Get started in 30 minutes. No credit card required.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="center-name">
              Coaching Center Name
            </label>
            <input
              id="center-name"
              type="text"
              placeholder="e.g. Apex Academy"
              className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground"
              disabled
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="email">
              Owner Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="owner@example.com"
              className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground"
              disabled
            />
          </div>
          <Button className="w-full" disabled>
            Create Center (Supabase Auth in Phase 1)
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Already registered?{" "}
            <a href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
