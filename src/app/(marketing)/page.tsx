import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Collect fees on time. Stop chasing parents.
        </h1>
        <p className="text-lg text-muted-foreground">
          A calm, practical tool for coaching centers and tutors to track dues, send instant payment
          links, and record attendance in seconds.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild>
            <a href="/signup">Start Free Pilot</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/dashboard">View Demo Dashboard</a>
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-2xl">
        <Card className="border border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>October 2026 Overview</CardTitle>
                <CardDescription>Sunrise Coaching Center · 42 Active Students</CardDescription>
              </div>
              <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                Phase 0 Scaffold
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-4">
                <span className="text-xs font-medium text-muted-foreground">Collected</span>
                <p className="mt-1 font-heading text-2xl font-bold tabular-nums text-success">
                  ₹ 84,500
                </p>
                <span className="text-xs text-muted-foreground">42 students</span>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <span className="text-xs font-medium text-muted-foreground">Pending</span>
                <p className="mt-1 font-heading text-2xl font-bold tabular-nums text-accent">
                  ₹ 31,000
                </p>
                <span className="text-xs text-muted-foreground">18 students</span>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <span className="text-xs font-medium text-muted-foreground">Overdue</span>
                <p className="mt-1 font-heading text-2xl font-bold tabular-nums text-destructive">
                  ₹ 12,500
                </p>
                <span className="text-xs text-muted-foreground">6 students</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
