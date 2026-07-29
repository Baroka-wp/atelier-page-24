import type { Metadata } from "next";
import "./cockpit.css";

export const metadata: Metadata = {
  title: "Cockpit commercial — Africa Samurai",
  description: "Pilotage privé de l’objectif commercial Africa Samurai.",
  robots: { index: false, follow: false, nocache: true },
};

export default function CockpitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
