import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BatchesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            Batches
          </h1>
          <p className="text-sm text-muted-foreground">
            Define subjects, fee rates, class schedules, and assigned teachers
          </p>
        </div>
        <Button size="sm">Create Batch</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Batches</CardTitle>
          <CardDescription>Batches and timetable schedules configured in Phase 2</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border p-8 text-center text-sm text-muted-foreground">
            No batches created yet. Phase 0 scaffold initialized.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
