import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
          Center Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Configure center profile, billing day, grace period, and payment gateway keys
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Center Profile</CardTitle>
            <CardDescription>
              Basic center information shown to parents on receipts and payment links
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Center Name</label>
              <input
                type="text"
                defaultValue="Sunrise Coaching Center"
                className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground"
                disabled
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Contact Phone</label>
              <input
                type="text"
                defaultValue="+91 98765 43210"
                className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground"
                disabled
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing & Razorpay Settings</CardTitle>
            <CardDescription>
              Monthly billing cycle configuration and payment credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">
                Billing Day (Day of Month)
              </label>
              <input
                type="number"
                defaultValue={1}
                className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground"
                disabled
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">
                Grace Period (Days)
              </label>
              <input
                type="number"
                defaultValue={7}
                className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground"
                disabled
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
