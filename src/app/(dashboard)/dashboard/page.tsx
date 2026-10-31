import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            October 2026
          </h1>
          <p className="text-sm text-muted-foreground">Monthly billing cycle (due 8 Oct 2026)</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Send All Reminders
          </Button>
          <Button size="sm">Generate Invoices</Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Collected this month</CardDescription>
            <CardTitle className="font-heading text-2xl font-bold tabular-nums text-success">
              ₹ 84,500
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">42 students settled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending dues</CardDescription>
            <CardTitle className="font-heading text-2xl font-bold tabular-nums text-accent">
              ₹ 31,000
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">18 students remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Overdue</CardDescription>
            <CardTitle className="font-heading text-2xl font-bold tabular-nums text-destructive">
              ₹ 12,500
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">6 students past grace period</p>
          </CardContent>
        </Card>
      </div>

      {/* Due Soon / Overdue List */}
      <Card>
        <CardHeader>
          <CardTitle>Overdue and Due Soon</CardTitle>
          <CardDescription>Priority fee follow-ups for this billing cycle</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            <div className="flex flex-col justify-between gap-2 py-3 sm:flex-row sm:items-center">
              <div>
                <p className="font-medium text-foreground">Aarav Sharma</p>
                <p className="text-xs text-muted-foreground">Class 10 Maths · 5 days late</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium tabular-nums text-destructive">₹ 2,000</span>
                <Button size="sm" variant="outline">
                  Remind
                </Button>
                <Button size="sm">Record</Button>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-2 py-3 sm:flex-row sm:items-center">
              <div>
                <p className="font-medium text-foreground">Riya Verma</p>
                <p className="text-xs text-muted-foreground">Class 9 Science · Due in 2 days</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium tabular-nums text-foreground">₹ 1,800</span>
                <Button size="sm" variant="outline">
                  Remind
                </Button>
                <Button size="sm">Record</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
