import type { Metadata } from "next";
import OfferLanding from "../components/OfferLanding";

export const metadata: Metadata = {
  title: "Boîte à outils Projet — Des méthodes concrètes pour mieux piloter",
  description:
    "Un accompagnement individuel et un ensemble d’outils pratiques pour cadrer, planifier, suivre et faire avancer un projet dans la tech, l’agriculture, le commerce ou les services.",
  alternates: {
    canonical: "/gestion-de-projet",
  },
};

export default function GestionDeProjetPage() {
  return (
    <OfferLanding
      theme="pmp"
      brand="Boîte à outils Projet"
      kicker="Professionnels · Entreprises · ONG · Programmes"
      title="Des outils concrets"
      accent="pour mieux piloter vos projets."
      intro="Un accompagnement individuel pour apprendre à cadrer, planifier, suivre et ajuster un projet réel. Vous construisez une boîte à outils réutilisable, adaptée à votre secteur et à votre niveau de responsabilité. La participation peut être financée directement par le professionnel, son entreprise, une ONG ou un programme."
      price="75 000"
      unit="FCFA / participant"
      delivery="2 séances en ligne, outils prêts à l’emploi et 14 jours de suivi"
      cta="Réserver mon diagnostic"
      whatsappMessage="Bonjour, je souhaite échanger sur la Boîte à outils Projet à 75 000 FCFA. Mon secteur et le projet que je souhaite mieux piloter sont : "
      proof={[
        "À partir d’un projet réel",
        "Finançable par votre organisation",
        "14 jours de mise en pratique",
      ]}
      promiseLabel="L’accompagnement"
      promiseTitle="Passer d’un projet flou à un pilotage lisible."
      promiseText="Nous partons de l’activité, du projet et des contraintes du participant pour sélectionner les outils réellement utiles. Une entreprise, une ONG ou un programme peut financer le parcours pour renforcer les compétences de ses gestionnaires de projet, coordinateurs ou responsables d’équipe. Les principes du PMP®, de l’agile et des approches hybrides servent de repères, mais le travail reste centré sur l’application : décider, coordonner et livrer."
      outcomes={[
        {
          number: "01",
          title: "Cadrer avant d’exécuter",
          text: "Clarifiez le besoin, le résultat attendu, le périmètre, les livrables, les responsabilités et les critères de réussite.",
        },
        {
          number: "02",
          title: "Organiser le travail",
          text: "Décomposez les activités, placez les jalons, rendez visibles les dépendances et attribuez les responsabilités.",
        },
        {
          number: "03",
          title: "Suivre et décider",
          text: "Pilotez risques, changements, actions, décisions et parties prenantes avec des supports simples et réguliers.",
        },
      ]}
      examplesLabel="La boîte à outils"
      examplesTitle="Les supports essentiels, configurés pour votre projet."
      examples={[
        "Fiche de cadrage du projet",
        "Carte des livrables et responsabilités",
        "Planning, jalons et dépendances",
        "Registre des risques et réponses",
        "Cartographie des parties prenantes",
        "Journal des actions et décisions",
      ]}
      steps={[
        {
          label: "Séance 01",
          title: "Diagnostic et configuration",
          text: "Nous analysons votre projet, identifions les points de fragilité et configurons les premiers outils autour de vos contraintes.",
        },
        {
          label: "Entre les séances",
          title: "Application accompagnée",
          text: "Vous utilisez la boîte à outils sur le terrain et documentez les décisions, blocages et ajustements nécessaires.",
        },
        {
          label: "Séance 02",
          title: "Revue et consolidation",
          text: "Nous examinons les résultats, corrigeons les outils et fixons une routine de pilotage que vous pourrez réutiliser.",
        },
      ]}
      included={[
        "2 séances individuelles en ligne",
        "Diagnostic sur un projet réel",
        "6 canevas de gestion de projet",
        "Cadrage avec le manager ou le responsable RH si l’organisation finance",
        "Plan de progression personnalisé",
        "Suivi pendant 14 jours",
      ]}
      note="Les outils mobilisent des pratiques issues de référentiels reconnus, notamment PMP®, agile et hybride. L’accompagnement développe des compétences pratiques de gestion de projet ; il ne constitue pas une préparation à l’examen PMP®. La certification PMP® est délivrée exclusivement par Project Management Institute (PMI)."
    />
  );
}
