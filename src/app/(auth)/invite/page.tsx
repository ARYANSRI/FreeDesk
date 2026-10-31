import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StaffInvitePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Accept Staff Invitation</CardTitle>
          <CardDescription>
            Join your coaching center team to manage batches and attendance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Staff invitation tokens are verified securely in Phase 1.
          </p>
          <Button className="w-full" variant="outline" asChild>
            <a href="/login">Return to Login</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
