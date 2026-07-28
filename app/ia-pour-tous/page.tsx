import type { Metadata } from "next";

const whatsappMessage =
  "Bonjour, je souhaite réserver ___ place(s) pour la formation L’Intelligence artificielle pour tous à 25 000 FCFA par personne. Je préfère la formule : ";
const whatsappUrl = `https://wa.me/22955952589?text=${encodeURIComponent(whatsappMessage)}`;
const mapUrl = "https://maps.app.goo.gl/kmKEK85keNx4NAeD7?g_st=ic";

export const metadata: Metadata = {
  title: "L’Intelligence artificielle pour tous — Formation pratique à Abomey-Calavi",
  description:
    "9 heures de formation pratique pour commencer à utiliser l’IA sans jargon. Présentiel à Abomey-Calavi ou en ligne. 25 000 FCFA.",
  openGraph: {
    title: "L’Intelligence artificielle pour tous",
    description:
      "3 matinées pratiques pour commencer à utiliser l’IA dans son travail, ses études ou son activité.",
    type: "website",
    images: [{ url: "/og-ia-pour-tous.png", width: 1733, height: 909 }],
  },
};

export default function IaPourTousPage() {
  return (
    <main className="ai-page">
      <a className="skip-link" href="#programme">
        Aller au programme
      </a>

      <nav className="ai-nav" aria-label="Navigation de la formation">
        <a className="ai-brand" href="#top" aria-label="Retour en haut">
          <img src="/samurai-logo.png" alt="" width="42" height="42" />
          <span>
            <strong>Africa Samurai</strong>
            <small>Formation vacances</small>
          </span>
        </a>
        <a className="ai-nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
          Réserver une place
        </a>
      </nav>

      <section className="ai-hero" id="top">
        <div className="ai-hero-copy">
          <p className="ai-eyebrow">25 000 FCFA par place · 15 places maximum</p>
          <h1>
            L’IA devient utile
            <span>quand elle part de votre quotidien.</span>
          </h1>
          <p className="ai-lead">
            Trois matinées pour les professionnels, entrepreneurs et indépendants
            qui veulent rédiger, organiser et produire plus efficacement avec
            l’intelligence artificielle — sans jargon technique.
          </p>
          <div className="ai-actions">
            <a className="ai-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
              Réserver 1 ou plusieurs places <span aria-hidden="true">→</span>
            </a>
            <a className="ai-map-link" href={mapUrl} target="_blank" rel="noreferrer">
              Voir le lieu
            </a>
          </div>
          <div className="ai-proof" aria-label="Informations principales">
            <span>3 · 5 · 7 août 2026</span>
            <span>09 h — 12 h</span>
            <span>Aucun prérequis</span>
          </div>
        </div>

        <div className="ai-workbench" aria-label="Exemples d’usages abordés">
          <div className="ai-workbench-head">
            <span>Votre atelier</span>
            <small>09:00 — 12:00</small>
          </div>
          <div className="ai-prompt ai-prompt-one">
            <small>Vous demandez</small>
            <p>« Aide-moi à structurer cette idée clairement. »</p>
          </div>
          <div className="ai-response">
            <span aria-hidden="true">✦</span>
            <div>
              <small>L’IA répond. Vous gardez la décision.</small>
              <p>Une méthode, un plan et une première version à améliorer.</p>
            </div>
          </div>
          <div className="ai-prompt ai-prompt-two">
            <small>Puis vous pratiquez</small>
            <p>Contenu · document · organisation · automatisation simple</p>
          </div>
          <div className="ai-seat-note">
            <strong>15</strong>
            <span>places maximum<br />en présentiel</span>
          </div>
        </div>
      </section>

      <section className="ai-intro" id="programme">
        <p className="ai-eyebrow">Le principe</p>
        <h2>Pas un cours sur l’IA.<br />Un atelier avec l’IA.</h2>
        <p>
          Vous partez de tâches que vous connaissez déjà. Nous les transformons
          ensemble en instructions claires, en méthodes réutilisables et en
          résultats que vous savez vérifier.
        </p>
      </section>

      <section className="ai-outcomes">
        <article>
          <span>Écrire</span>
          <h3>Passer de l’idée au document</h3>
          <p>Messages, synthèses, présentations et contenus mieux structurés.</p>
        </article>
        <article>
          <span>Organiser</span>
          <h3>Clarifier son travail</h3>
          <p>Plans d’action, priorités, recherches et préparation de projets.</p>
        </article>
        <article>
          <span>Accélérer</span>
          <h3>Alléger le répétitif</h3>
          <p>Identifier ce qui peut être simplifié ou automatisé sans perdre le contrôle.</p>
        </article>
      </section>

      <section className="ai-seats" aria-labelledby="ai-seats-title">
        <div>
          <p className="ai-eyebrow">Inscription flexible</p>
          <h2 id="ai-seats-title">
            Venez seul.<br />Ou avancez en équipe.
          </h2>
          <p>
            Vous pouvez réserver une place pour vous-même ou inscrire plusieurs
            collaborateurs, associés ou membres de votre organisation. Chaque
            participant suit le parcours complet.
          </p>
        </div>
        <div className="ai-seat-options" aria-label="Exemples de réservation">
          <article>
            <span>01 personne</span>
            <strong>25 000</strong>
            <small>FCFA</small>
          </article>
          <article>
            <span>02 personnes</span>
            <strong>50 000</strong>
            <small>FCFA</small>
          </article>
          <article>
            <span>05 personnes</span>
            <strong>125 000</strong>
            <small>FCFA</small>
          </article>
          <p>Tarif fixe : 25 000 FCFA par participant.</p>
        </div>
      </section>

      <section className="ai-schedule">
        <div className="ai-schedule-copy">
          <p className="ai-eyebrow">Votre parcours</p>
          <h2>Trois matinées.<br />Une progression simple.</h2>
          <p>
            Chaque séance alterne démonstration, pratique guidée et application
            à vos propres besoins.
          </p>
        </div>
        <ol>
          <li>
            <time dateTime="2026-08-03">Lun. 03 août</time>
            <div>
              <h3>Bien demander</h3>
              <p>Comprendre l’outil, formuler une demande utile et contrôler la réponse.</p>
            </div>
            <span>09 h — 12 h</span>
          </li>
          <li>
            <time dateTime="2026-08-05">Mer. 05 août</time>
            <div>
              <h3>Créer et organiser</h3>
              <p>Appliquer l’IA aux contenus, documents, recherches et plans d’action.</p>
            </div>
            <span>09 h — 12 h</span>
          </li>
          <li>
            <time dateTime="2026-08-07">Ven. 07 août</time>
            <div>
              <h3>Gagner du temps</h3>
              <p>Construire une méthode personnelle et explorer les automatisations simples.</p>
            </div>
            <span>09 h — 12 h</span>
          </li>
        </ol>
      </section>

      <section className="ai-format">
        <article>
          <p className="ai-eyebrow">En présentiel</p>
          <h2>Abomey-Calavi</h2>
          <p>
            Zone de la Pharmacie Zoca, à proximité du Restaurant Caviar
            d’Abomey-Calavi.
          </p>
          <a href={mapUrl} target="_blank" rel="noreferrer">Ouvrir la localisation ↗</a>
        </article>
        <article>
          <p className="ai-eyebrow">À distance</p>
          <h2>En ligne</h2>
          <p>
            Le même parcours pratique, avec des créneaux fixés selon votre
            disponibilité après l’inscription.
          </p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">Choisir la formule en ligne ↗</a>
        </article>
      </section>

      <section className="ai-offer">
        <div>
          <p className="ai-eyebrow">Participation complète</p>
          <h2>25 000 <small>FCFA</small></h2>
          <p>Par participant · présentiel ou en ligne</p>
        </div>
        <div className="ai-offer-card">
          <ul>
            <li>9 heures de formation pratique</li>
            <li>Accessible sans compétence technique</li>
            <li>Exercices appliqués à votre quotidien</li>
            <li>15 places maximum en présentiel</li>
            <li>Inscription individuelle ou en groupe</li>
          </ul>
          <a className="ai-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
            Réserver 1 ou plusieurs places <span aria-hidden="true">→</span>
          </a>
          <p>
            Paiement MoMo : <strong>+229 01 67 15 39 74</strong><br />
            La place est confirmée après vérification du paiement.
          </p>
        </div>
      </section>

      <footer className="ai-footer">
        <div className="ai-brand">
          <img src="/samurai-logo.png" alt="" width="42" height="42" />
          <span><strong>Africa Samurai</strong><small>Rendre la technologie utile</small></span>
        </div>
        <span>WhatsApp : +229 55 95 25 89 / +229 66 33 72 19</span>
        <a href="#top">Retour en haut</a>
      </footer>
    </main>
  );
}
