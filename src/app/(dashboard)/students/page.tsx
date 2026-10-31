import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            Students
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage student roster, parent contact details, and batch enrollments
          </p>
        </div>
        <Button size="sm">Add Student</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enrolled Students</CardTitle>
          <CardDescription>Core student data will be connected in Phase 2</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border p-8 text-center text-sm text-muted-foreground">
            No students loaded yet. Phase 0 scaffold initialized.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
