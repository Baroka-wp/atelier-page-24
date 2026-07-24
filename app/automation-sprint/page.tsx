import type { Metadata } from "next";
import OfferLanding from "../components/OfferLanding";

export const metadata: Metadata = {
  title: "Automation Sprint — Une tâche répétitive en moins",
  description: "Un flux métier automatisé en 48 à 72 heures par Africa Samurai.",
};

export default function AutomationSprintPage() {
  return (
    <OfferLanding
      theme="automation"
      brand="Automation Sprint"
      kicker="Automatisation métier · 1 flux précis"
      title="Une tâche répétitive en moins."
      accent="Du temps utile en plus."
      intro="Nous choisissons un flux manuel qui vous coûte du temps, puis nous le transformons en système fiable : déclenchement, traitement, notification et suivi."
      price="175 000"
      delivery="Un flux automatisé et transmis en 48 à 72 heures"
      cta="Automatiser mon flux"
      whatsappMessage="Bonjour, je veux réserver un Automation Sprint à 175 000 FCFA."
      proof={["Audit rapide", "1 flux automatisé", "Passation incluse"]}
      promiseLabel="Le résultat"
      promiseTitle="Moins de copier-coller. Moins d’oubli. Plus de continuité."
      promiseText="Le sprint se concentre sur un seul processus mesurable. Vous voyez ce qui entre, ce qui se passe et ce qui doit encore être traité."
      outcomes={[
        { number: "01", title: "Un flux cartographié", text: "Déclencheur, données, règles, responsables et exceptions sont rendus explicites." },
        { number: "02", title: "Une automatisation testée", text: "Le scénario est construit puis vérifié sur des cas réels avant livraison." },
        { number: "03", title: "Une équipe autonome", text: "Vous recevez une passation simple pour surveiller et utiliser le flux." },
      ]}
      examplesLabel="Flux candidats"
      examplesTitle="Commencer là où le temps se perd."
      examples={[
        "Prospect entrant vers tableau de suivi et notification",
        "Relance automatique après un formulaire",
        "Génération et classement de documents",
        "Rapport périodique depuis plusieurs sources",
        "Synchronisation entre deux outils",
        "Alerte d’échéance ou de paiement",
      ]}
      steps={[
        { label: "30 minutes", title: "Audit du flux", text: "Nous observons le processus actuel et choisissons le meilleur point d’automatisation." },
        { label: "48 heures", title: "Construction", text: "Nous assemblons les étapes, les règles, les messages et les contrôles." },
        { label: "Sous 72 heures", title: "Test et passation", text: "Nous testons ensemble puis vous remettons le flux et ses consignes." },
      ]}
      included={["Audit d’un processus", "Cartographie du flux", "Construction d’un scénario", "Tests de fonctionnement", "Documentation courte", "Passation à l’équipe"]}
      note="Les abonnements éventuels aux outils tiers restent à la charge du client et sont validés avant toute mise en œuvre."
    />
  );
}
