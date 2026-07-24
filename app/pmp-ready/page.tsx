import type { Metadata } from "next";
import OfferLanding from "../components/OfferLanding";

export const metadata: Metadata = {
  title: "PMP Ready — Préparation intensive et personnalisée",
  description: "Deux séances individuelles et un plan d’étude personnalisé pour structurer votre préparation PMP.",
};

export default function PmpReadyPage() {
  return (
    <OfferLanding
      theme="pmp"
      brand="PMP Ready"
      kicker="Préparation intensive · Accompagnement individuel"
      title="Votre préparation PMP."
      accent="Structurée autour de vous."
      intro="Deux séances individuelles pour diagnostiquer votre niveau, construire un plan d’étude réaliste et vous entraîner à raisonner face aux questions de situation."
      price="75 000"
      delivery="2 séances en ligne et 14 jours de suivi"
      cta="Réserver ma préparation"
      whatsappMessage="Bonjour, je veux réserver la préparation intensive PMP Ready à 75 000 FCFA."
      proof={["Diagnostic individuel", "Plan personnalisé", "14 jours de suivi"]}
      promiseLabel="L’accompagnement"
      promiseTitle="Savoir quoi étudier, comment répondre et où concentrer l’effort."
      promiseText="PMP Ready ne remplace pas votre travail personnel. Il vous donne une structure, une méthode de lecture des situations et un rythme adapté à votre disponibilité."
      outcomes={[
        { number: "01", title: "Un diagnostic clair", text: "Nous identifions vos acquis, vos angles morts et la charge de travail réaliste." },
        { number: "02", title: "Un plan personnel", text: "Votre calendrier relie domaines, révisions, questions et points de contrôle." },
        { number: "03", title: "Une méthode de décision", text: "Vous apprenez à analyser les scénarios plutôt qu’à mémoriser des réponses isolées." },
      ]}
      examplesLabel="Travail couvert"
      examplesTitle="Une préparation orientée situations."
      examples={[
        "Diagnostic de positionnement",
        "Organisation du plan d’étude",
        "Lecture des questions situationnelles",
        "Approches prédictives, agiles et hybrides",
        "Analyse des erreurs et des hésitations",
        "Simulation et débrief personnalisé",
      ]}
      steps={[
        { label: "Séance 01", title: "Diagnostic et trajectoire", text: "Nous faisons le point sur l’expérience, le niveau et la disponibilité, puis bâtissons le plan." },
        { label: "Entre les séances", title: "Travail guidé", text: "Vous avancez avec des objectifs précis et partagez vos difficultés." },
        { label: "Séance 02", title: "Simulation et correction", text: "Nous travaillons les raisonnements, les erreurs récurrentes et la suite du plan." },
      ]}
      included={["2 séances individuelles en ligne", "Diagnostic de niveau", "Plan d’étude personnalisé", "Simulation de questions", "Débrief des erreurs", "Suivi WhatsApp pendant 14 jours"]}
      note="PMP Ready est une préparation indépendante. L’examen et la certification PMP® sont délivrés exclusivement par Project Management Institute (PMI). Africa Samurai ne délivre pas la certification PMP."
    />
  );
}
