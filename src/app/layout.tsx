import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { AccountsProvider } from "@/contexts/accounts-context";
import { TransactionsProvider } from "@/contexts/transactions-context";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinanceHub - Gestor de Finanças Pessoais",
  description:
    "Gerencie suas finanças pessoais, acompanhe gastos, investimentos e muito mais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`font-sans antialiased`}>
        <AccountsProvider>
          <TransactionsProvider>{children}</TransactionsProvider>
        </AccountsProvider>
        <Analytics />
      </body>
    </html>
  );
}
