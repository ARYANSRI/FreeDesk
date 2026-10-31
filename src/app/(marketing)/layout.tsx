export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-heading text-xl font-bold tracking-tight text-primary">
              FeeDesk
            </span>
          </div>
          <nav className="flex items-center space-x-4">
            <a
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
            >
              Get Started
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border bg-card py-6">
        <div className="container text-center text-sm text-muted-foreground">
          FeeDesk &copy; 2026. Practical fee collection and attendance for coaching centers.
        </div>
      </footer>
    </div>
  );
}
