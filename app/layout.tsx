import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agentia - Solutions IA Intelligentes",
  description: "Solutions d'Intelligence Artificielle pour l'Entreprise de Demain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans smooth-scroll">
        {children}
      </body>
    </html>
  );
}