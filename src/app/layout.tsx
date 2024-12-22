import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./fonts";

export const metadata: Metadata = {
  title: "Smart Expense",
  description: "Make managing your expenses easier than ever!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`antialiased ${inter.className} bg-stone-50  `}>
        {children}
      </body>
    </html>
  );
}
