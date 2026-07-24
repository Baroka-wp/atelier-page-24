import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const imageUrl = `${protocol}://${host}/og.png`;

  return {
    title: "Africa Samurai — Studio, Academy & Automatisation",
    description:
      "Pages premium, coding, automatisation, préparation PMP et guides originaux par Africa Samurai.",
    openGraph: {
      title: "Africa Samurai",
      description: "Apprendre. Construire. Automatiser.",
      type: "website",
      images: [{ url: imageUrl, width: 1254, height: 1254 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Africa Samurai",
      description: "Studio, Academy & Automatisation.",
      images: [imageUrl],
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
