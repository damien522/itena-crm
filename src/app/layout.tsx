import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LayoutProvider } from "@/context/LayoutContext";
import { ClientLayoutWrapper } from "@/components/layout/ClientLayoutWrapper";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Itena Clinical CRM",
  description: "Plateforme CRM Propriétaire",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="h-full font-sans bg-[#f8fafc] text-[#1A1A2E]">
        <LayoutProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </LayoutProvider>
      </body>
    </html>
  );
}
