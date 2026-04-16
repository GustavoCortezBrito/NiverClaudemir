import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aniversário do Claudemir",
  description: "Venha comemorar este dia especial!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
