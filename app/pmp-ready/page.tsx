import type { Metadata } from "next";
import OfferLanding from "../components/OfferLanding";

export const metadata: Metadata = {
  title: "PMP Ready — Structurer son passage de la technique au pilotage",
  description: "Un diagnostic, deux séances individuelles et 14 jours de suivi pour structurer une préparation PMP adaptée à votre parcours.",
};

export default function PmpReadyPage() {
  return (
    <OfferLanding
      theme="pmp"
      brand="PMP Ready"
      kicker="Développeurs · Ingénieurs · Chefs de projet"
      title="Passez de l’exécution"
      accent="au pilotage."
      intro="Un accompagnement individuel pour les profils techniques et opérationnels qui veulent consolider leurs compétences transversales, structurer leur préparation PMP et mieux piloter priorités, risques, délais et parties prenantes à l’ère de l’IA."
      price="75 000"
      delivery="2 séances en ligne et 14 jours de suivi"
      cta="Réserver mon diagnostic"
      whatsappMessage="Bonjour, je souhaite réserver mon diagnostic PMP Ready à 75 000 FCFA. Mon profil actuel est : "
      proof={["Profils techniques bienvenus", "Plan personnel", "14 jours de suivi"]}
      promiseLabel="L’accompagnement"
      promiseTitle="Relier votre expérience technique aux compétences de pilotage."
      promiseText="PMP Ready vous aide à transformer votre expérience en trajectoire de préparation cohérente. Vous repartez avec un diagnostic, un plan réaliste et une méthode de lecture des situations adaptée à votre disponibilité."
      outcomes={[
        { number: "01", title: "Positionner votre profil", text: "Nous relions votre expérience réelle aux compétences attendues en gestion de projet." },
        { number: "02", title: "Construire un plan viable", text: "Votre calendrier relie domaines, révisions, mises en situation et points de contrôle." },
        { number: "03", title: "Développer le raisonnement", text: "Vous apprenez à arbitrer dans des contextes prédictifs, agiles, hybrides et augmentés par l’IA." },
      ]}
      examplesLabel="Travail couvert"
      examplesTitle="De la maîtrise technique à la vision d’ensemble."
      examples={[
        "Priorités, délais et dépendances",
        "Risques et qualité de décision",
        "Parties prenantes et communication",
        "Approches prédictives, agiles et hybrides",
        "Équipes humaines et outils d’IA",
        "Questions situationnelles et débrief",
      ]}
      steps={[
        { label: "Séance 01", title: "Diagnostic et trajectoire", text: "Nous faisons le point sur votre expérience, vos objectifs et votre disponibilité, puis bâtissons le plan." },
        { label: "Entre les séances", title: "Mise en pratique guidée", text: "Vous avancez avec des objectifs précis et documentez vos difficultés." },
        { label: "Séance 02", title: "Simulation et ajustement", text: "Nous travaillons vos raisonnements, les erreurs récurrentes et la suite du parcours." },
      ]}
      included={["2 séances individuelles en ligne", "Diagnostic de niveau", "Plan d’étude personnalisé", "Simulation de questions", "Débrief des erreurs", "Suivi WhatsApp pendant 14 jours"]}
      note="PMP Ready est une préparation indépendante. L’examen et la certification PMP® sont délivrés exclusivement par Project Management Institute (PMI). Africa Samurai ne délivre pas la certification PMP."
    />
  );
}
