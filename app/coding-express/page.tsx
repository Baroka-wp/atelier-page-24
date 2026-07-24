import type { Metadata } from "next";
import OfferLanding from "../components/OfferLanding";

export const metadata: Metadata = {
  title: "Coding Express — Votre outil métier en 72 heures",
  description: "Un mini-outil web utile, ciblé et mis en ligne en 72 heures par Africa Samurai.",
};

export default function CodingExpressPage() {
  return (
    <OfferLanding
      theme="coding"
      brand="Coding Express"
      kicker="Développement ciblé · Livraison en 72 h"
      title="Un outil métier utile."
      accent="Sans projet interminable."
      intro="Nous transformons un besoin précis en mini-outil web fonctionnel : calculer, collecter, présenter, suivre ou orienter — sur mobile comme sur ordinateur."
      price="150 000"
      delivery="Un mini-outil ciblé, mis en ligne en 72 heures"
      cta="Lancer mon outil"
      whatsappMessage="Bonjour, je veux discuter du service Coding Express à 150 000 FCFA."
      proof={["Cadrage de 30 min", "Version mobile", "Mise en ligne incluse"]}
      promiseLabel="Le principe"
      promiseTitle="Un seul problème. Un seul outil. Une livraison rapide."
      promiseText="Coding Express évite les cahiers des charges trop lourds. Nous choisissons une fonction à forte valeur, nous la construisons proprement et nous la mettons entre vos mains."
      outcomes={[
        { number: "01", title: "Fonctionnel", text: "L’outil accomplit une tâche concrète et testable, sans fonctionnalités décoratives." },
        { number: "02", title: "Accessible", text: "L’interface est claire, rapide et pensée d’abord pour les usages mobiles." },
        { number: "03", title: "Livré", text: "Vous recevez une URL utilisable, une passation et une série d’ajustements." },
      ]}
      examplesLabel="Exemples de livrables"
      examplesTitle="Des outils courts qui font gagner du temps."
      examples={[
        "Calculateur de devis ou de budget",
        "Formulaire de qualification intelligent",
        "Catalogue filtrable avec commande WhatsApp",
        "Tableau de suivi léger",
        "Générateur de document simple",
        "Espace de ressources ou mini-portail client",
      ]}
      steps={[
        { label: "30 minutes", title: "Cadrage", text: "Nous définissons le problème, l’utilisateur et le résultat attendu." },
        { label: "48 heures", title: "Construction", text: "Nous développons la fonction centrale et la testons sur mobile." },
        { label: "Sous 72 heures", title: "Mise en ligne", text: "Vous validez, nous publions et nous vous montrons comment l’utiliser." },
      ]}
      included={["Cadrage fonctionnel", "Design de l’interface", "Développement du mini-outil", "Version mobile", "Mise en ligne", "Une série d’ajustements"]}
      note="Le périmètre couvre un mini-outil et une fonction centrale. Les plateformes complexes font l’objet d’un devis distinct."
    />
  );
}
