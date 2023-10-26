import { UserProvider } from "@/app/contexts/userContext";
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Lagalt - The Collaboration Platform",
  description:
    "The Ultimate Platform for creative minds to connect and cooperate.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </UserProvider>
  );
}
