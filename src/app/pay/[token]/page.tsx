import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ParentPayPage({ params }: { params: { token: string } }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm border border-border shadow-none">
        <CardHeader className="pb-4 text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
            FD
          </div>
          <CardTitle className="text-xl">Sunrise Coaching Center</CardTitle>
          <CardDescription>Fee Payment for October 2026</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2 rounded-lg bg-muted/60 p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Student</span>
              <span className="font-medium text-foreground">Aarav Sharma</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Batch</span>
              <span className="font-medium text-foreground">Class 10 Maths</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Due Date</span>
              <span className="font-medium text-foreground">8 Oct 2026</span>
            </div>
          </div>

          <div className="space-y-1 text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Amount Due
            </p>
            <p className="font-heading text-3xl font-bold tabular-nums text-foreground">₹ 2,000</p>
          </div>

          <Button className="w-full text-base" size="lg" disabled>
            Pay ₹2,000
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            UPI · Cards · Netbanking · Secured by Razorpay
          </p>
        </CardContent>
      </Card>
      <div className="mt-4 text-center text-xs text-muted-foreground">
        Secure token: <code className="font-mono">{params.token}</code>
      </div>
    </div>
  );
}
