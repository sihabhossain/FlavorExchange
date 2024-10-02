import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlavorExchange",
  description: "Created by Sihab Hossain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
