import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            Invoices
          </h1>
          <p className="text-sm text-muted-foreground">
            Track monthly invoices, payment link tokens, and manual settlement records
          </p>
        </div>
        <Button size="sm">Generate Invoices</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Ledger</CardTitle>
          <CardDescription>
            Invoice generation and manual payment recording scheduled for Phase 3
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border p-8 text-center text-sm text-muted-foreground">
            No invoices generated yet. Phase 0 scaffold initialized.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
