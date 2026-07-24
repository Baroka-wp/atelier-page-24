import type { Metadata } from "next";
import OfferLanding from "../components/OfferLanding";

export const metadata: Metadata = {
  title: "Un Petit Livre pour les Grands Esprits — Irotori Baroka",
  description:
    "Un livre pratique de 15 pages pour clarifier ses objectifs, agir avec constance et ajuster sa trajectoire.",
};

export default function UnPetitLivrePage() {
  return (
    <OfferLanding
      theme="clarity"
      brand="Un Petit Livre"
      kicker="Développement personnel · Édition originale"
      title="Moins de confusion."
      accent="Plus d’action juste."
      intro="Un guide court et direct pour clarifier ce que vous voulez, construire un plan réaliste et avancer avec constance — sans attendre les conditions parfaites."
      price="15 000"
      delivery="PDF livré après confirmation du paiement"
      cta="Recevoir le livre"
      whatsappMessage="Bonjour, je veux recevoir « Un Petit Livre pour les Grands Esprits » de Irotori Baroka à 15 000 FCFA."
      proof={["15 pages", "15 chapitres courts", "Écrit par Irotori Baroka"]}
      promiseLabel="La méthode"
      promiseTitle="Clarifier. Planifier. Ajuster."
      promiseText="Une méthode simple pour distinguer ce qui dépend de vous, choisir une direction concrète et progresser sans vous épuiser à vouloir tout contrôler."
      outcomes={[
        {
          number: "01",
          title: "Retrouver de la clarté",
          text: "Évaluer les cinq sphères de votre vie et identifier le point qui mérite votre attention maintenant.",
        },
        {
          number: "02",
          title: "Passer à l’action",
          text: "Transformer une ambition floue en objectifs réalistes et en gestes que vous pouvez accomplir dès aujourd’hui.",
        },
        {
          number: "03",
          title: "Rester constant",
          text: "Observer vos résultats, ajuster votre trajectoire et continuer sans dramatiser les écarts ou les échecs.",
        },
      ]}
      examplesLabel="Dans le livre"
      examplesTitle="Quinze chapitres. Zéro remplissage."
      examples={[
        "Ce qui vous bloque réellement",
        "Le système Clarifier–Planifier–Ajuster",
        "Responsabilité et sphère d’influence",
        "Les cinq cercles de la vie",
        "L’effet levier et le réalisme",
        "La constance, le repos et les célébrations",
        "Surmonter les échecs sans perdre sa direction",
      ]}
      steps={[
        {
          label: "Aujourd’hui",
          title: "Vous commandez",
          text: "Vous confirmez votre demande sur WhatsApp et effectuez le paiement MoMo.",
        },
        {
          label: "Après confirmation",
          title: "Vous recevez",
          text: "Le PDF vous est transmis directement sur WhatsApp.",
        },
        {
          label: "En une séance",
          title: "Vous commencez",
          text: "Lisez avec un stylo, répondez aux questions et choisissez votre première action.",
        },
      ]}
      included={[
        "Livre numérique PDF de 15 pages",
        "Méthode Clarifier–Planifier–Ajuster",
        "Questions d’auto-évaluation",
        "Exercices de clarification des objectifs",
        "Usage personnel",
      ]}
      note="Ouvrage de développement personnel. Il ne remplace pas un avis médical, psychologique, juridique ou financier."
      visualSrc="/un-petit-livre-cover.png"
      visualAlt="Couverture de Un Petit Livre pour les Grands Esprits par Irotori Baroka"
    />
  );
}
