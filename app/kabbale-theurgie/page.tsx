import type { Metadata } from "next";
import OfferLanding from "../components/OfferLanding";

export const metadata: Metadata = {
  title: "Kabbale & Théurgie — L’atelier de la présence",
  description: "Un guide original de 16 pages et un parcours contemplatif de 7 jours par Africa Samurai.",
};

export default function KabbaleTheurgiePage() {
  return (
    <OfferLanding
      theme="spiritual"
      brand="Kabbale & Théurgie"
      kicker="Guide original · Collection Voies intérieures"
      title="Étudier l’invisible."
      accent="Rester ancré dans le réel."
      intro="Une introduction sobre aux symboles de la Kabbale et à l’idée de théurgie, suivie d’un parcours contemplatif de sept jours — sans promesse magique ni raccourci."
      price="15 000"
      delivery="PDF livré après confirmation du paiement"
      cta="Recevoir le guide"
      whatsappMessage="Bonjour, je veux recevoir le guide PDF « Kabbale & Théurgie - L’atelier de la présence » à 15 000 FCFA."
      proof={["16 pages", "7 jours de pratique", "Édition originale"]}
      promiseLabel="La proposition"
      promiseTitle="La présence avant le pouvoir."
      promiseText="Ce guide distingue les traditions, clarifie les symboles et transforme l’étude en gestes concrets : attention, discernement, limites et responsabilité."
      outcomes={[
        { number: "01", title: "Des repères fiables", text: "Comprendre la différence entre Kabbale juive, Kabbale chrétienne et Qabale hermétique." },
        { number: "02", title: "Une lecture vivante", text: "Approcher l’Arbre de Vie comme une carte de tensions et de qualités, pas comme un objet magique." },
        { number: "03", title: "Une pratique ancrée", text: "Sept exercices d’écriture et d’attention qui se terminent toujours par une action vérifiable." },
      ]}
      examplesLabel="À l’intérieur"
      examplesTitle="Un atelier à lire et à pratiquer."
      examples={[
        "Kabbale : recevoir, interpréter, transmettre",
        "L’Arbre de Vie comme carte de lecture",
        "Théurgie : agir sur soi avant d’agir sur le monde",
        "Sept jours : intention, structure, limite, harmonie, langage et incarnation",
        "Sept signaux de discernement pour rester libre",
        "Une page de journal de synthèse",
      ]}
      steps={[
        { label: "Aujourd’hui", title: "Vous commandez", text: "Vous confirmez votre demande sur WhatsApp et effectuez le paiement MoMo." },
        { label: "Après confirmation", title: "Vous recevez", text: "Le PDF haute qualité vous est transmis directement sur WhatsApp." },
        { label: "À votre rythme", title: "Vous pratiquez", text: "Une lecture par jour, un carnet et vingt minutes de calme suffisent." },
      ]}
      included={["PDF haute qualité de 16 pages", "Parcours contemplatif de 7 jours", "Page de journal à compléter", "Bibliographie de départ", "Usage personnel"]}
      note="Contenu éducatif et contemplatif. Aucun résultat surnaturel, médical, financier ou relationnel n’est promis."
    />
  );
}
