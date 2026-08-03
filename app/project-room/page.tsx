import type { Metadata } from "next";
import "./project-room.css";

const applicationUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSeezDNzcxVJRwdiBdC5GOi_EPZVtPEIPBH_B4UN9VHHQpMNVw/viewform?usp=header";

export const metadata: Metadata = {
  title: "PROJECT ROOM — Un projet réel. Une matinée.",
  description:
    "Une session pratique de gestion de projet avec l’IA, le samedi 22 août 2026 à Abomey-Calavi.",
  alternates: { canonical: "/project-room" },
  openGraph: {
    title: "PROJECT ROOM — Gestion de projet + IA",
    description: "Un projet réel. Une matinée. Cinq sorties concrètes.",
    images: [{ url: "/project-room-social-v7.png", width: 1731, height: 909 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PROJECT ROOM — Gestion de projet + IA",
    description: "Un projet réel. Une matinée. Cinq sorties concrètes.",
    images: ["/project-room-social-v7.png"],
  },
};

const takeaways = ["Cadrage", "Plan", "Risques", "Suivi", "Usages IA"];

export default function ProjectRoomPage() {
  return (
    <main className="project-room">
      <a className="pr-skip" href="#contenu">Aller au contenu</a>

      <nav className="pr-nav" aria-label="Navigation principale">
        <a href="/" aria-label="Retour à l’accueil">PR · 22.08.26</a>
        <a href={applicationUrl} target="_blank" rel="noreferrer">S’inscrire ↗</a>
      </nav>

      <header className="pr-hero" id="contenu">
        <div className="pr-crosshair" aria-hidden="true"><span /></div>

        <div className="pr-title-rail">
          <h1>PROJECT ROOM</h1>
        </div>

        <figure className="pr-face">
          <img
            src="/project-room-face-v6.png"
            alt="Portrait cubiste d’une personne qui réfléchit à son projet"
            width="490"
            height="1040"
          />
        </figure>

        <section className="pr-ticket" aria-label="Informations de la session">
          <p className="pr-mantra">Apprendre · Construire · Partager</p>
          <p className="pr-day">Samedi</p>
          <time dateTime="2026-08-22">22 août 2026</time>
          <p className="pr-time">09 h — 12 h 30</p>
          <div className="pr-rule" />
          <p className="pr-place">Abomey-Calavi</p>
          <div className="pr-ticket-bottom">
            <span>15 places</span>
            <strong>5 000 FCFA</strong>
          </div>
          <a className="pr-button" href={applicationUrl} target="_blank" rel="noreferrer">
            Présenter mon projet <span aria-hidden="true">↗</span>
          </a>
        </section>
      </header>

      <section className="pr-outcomes" aria-labelledby="outcomes-title">
        <figure className="pr-hands">
          <img
            src="/project-room-hands-v6.png"
            alt="Deux mains cubistes ouvertes, symbole de construction et de partage"
            width="440"
            height="820"
          />
        </figure>

        <div className="pr-outcomes-copy">
          <p className="pr-eyebrow">Un projet réel · une session</p>
          <h2 id="outcomes-title">Vous repartez<br />avec l’essentiel.</h2>
          <ul>
            {takeaways.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="pr-ai-note">
            L’IA reste un copilote. Aucune donnée confidentielle dans un outil public.
          </p>
          <a className="pr-button pr-button-light" href={applicationUrl} target="_blank" rel="noreferrer">
            Réserver ma place <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer className="pr-footer">
        <span>PROJECT ROOM</span>
        <span>Abomey-Calavi · Bénin</span>
      </footer>
    </main>
  );
}
