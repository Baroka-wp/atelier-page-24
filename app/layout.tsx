import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "./studio.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const publicOrigin =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://page.laforge-hub.com";
  const imageUrl = `${publicOrigin}/og-studio.png`;

  return {
    metadataBase: new URL(publicOrigin),
    title: "Atelier Page 24 — Une page premium en 24 heures",
    description:
      "Une page de vente premium, conçue, écrite et mise en ligne en 24 heures. Offre fondatrice à Cotonou.",
    openGraph: {
      title: "Atelier Page 24",
      description: "Une page premium, prête à vendre, en 24 heures.",
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Atelier Page 24",
      description: "Une page premium, prête à vendre, en 24 heures.",
      images: [imageUrl],
    },
    icons: {
      icon: "/samurai-logo.png",
      apple: "/samurai-logo.png",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={montserrat.variable}>{children}</body>
    </html>
  );
}
