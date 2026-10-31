import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            Attendance
          </h1>
          <p className="text-sm text-muted-foreground">
            Quick daily attendance sheets per batch and attendance history
          </p>
        </div>
        <Button size="sm">Mark Attendance</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Sheet</CardTitle>
          <CardDescription>Daily batch attendance marking scheduled for Phase 5</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border p-8 text-center text-sm text-muted-foreground">
            Attendance tracking sheet initialized for Phase 0.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
