import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in to FeeDesk</CardTitle>
          <CardDescription>
            Enter your email to access your coaching center dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="owner@coaching.com"
              className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground"
              disabled
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground"
              disabled
            />
          </div>
          <Button className="w-full" disabled>
            Sign In (Supabase Auth in Phase 1)
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
