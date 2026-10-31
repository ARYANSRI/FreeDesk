import Link from "next/link";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Students", href: "/students" },
  { label: "Batches", href: "/batches" },
  { label: "Invoices", href: "/invoices" },
  { label: "Attendance", href: "/attendance" },
  { label: "Settings", href: "/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="font-heading text-xl font-bold tracking-tight text-primary"
            >
              FeeDesk
            </Link>
            <nav className="hidden items-center space-x-1 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Sunrise Coaching Center (Admin)
            </span>
            <Link
              href="/login"
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
            >
              Sign Out
            </Link>
          </div>
        </div>
        {/* Mobile Navigation bar */}
        <div className="scrollbar-none flex space-x-2 overflow-x-auto border-t border-border px-4 py-2 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </header>
      <main className="container flex-1 py-6 md:py-8">{children}</main>
    </div>
  );
}
