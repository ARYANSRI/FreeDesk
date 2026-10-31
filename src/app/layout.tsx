import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FeeDesk - Fee Collection & Attendance for Coaching Centers",
  description: "Collect fees on time. Stop chasing parents.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
