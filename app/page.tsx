const whatsappUrl =
  "https://wa.me/2290167153974?text=Bonjour%2C%20je%20veux%20r%C3%A9server%20une%20Page%20Signature%20%C3%A0%20175%20000%20FCFA.";

const services = [
  {
    number: "01",
    title: "Une page qui donne envie",
    text: "Une direction artistique sobre, une promesse claire et un parcours pensé pour transformer l’attention en conversation.",
  },
  {
    number: "02",
    title: "Tout fonctionne sur mobile",
    text: "Votre page s’adapte aux téléphones, se charge vite et guide naturellement vers WhatsApp.",
  },
  {
    number: "03",
    title: "Livrée en 24 heures",
    text: "Vous envoyez vos éléments aujourd’hui. Une première version complète vous est présentée sous 24 heures.",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="Navigation principale">
        <a className="brand" href="#top" aria-label="Atelier Page 24, accueil">
          Atelier Page <span>24</span>
        </a>
        <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
          Réserver une place
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="light light-one" />
        <div className="light light-two" />
        <div className="hero-copy">
          <p className="eyebrow">Création web express · Offre fondatrice</p>
          <h1>
            Votre activité mérite
            <br />
            une présence qui <em>respire.</em>
          </h1>
          <p className="hero-text">
            Une page de vente premium, pensée et livrée en 24 heures.
            Deux places seulement aujourd’hui.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
              Commander — 175 000 FCFA
              <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#offre">
              Découvrir l’offre
            </a>
          </div>
        </div>
        <div className="hero-card" aria-label="Aperçu de l’offre">
          <div className="card-top">
            <span>Page Signature</span>
            <span>24 h</span>
          </div>
          <div className="card-scene">
            <div className="scene-copy">
              <span>Votre promesse</span>
              <strong>Claire, calme,<br />mémorable.</strong>
            </div>
            <div className="halo" />
          </div>
          <div className="card-bottom">
            <span>Design</span>
            <span>Texte</span>
            <span>Mobile</span>
            <span>WhatsApp</span>
          </div>
        </div>
        <div className="scroll-note">Défiler pour découvrir</div>
      </section>

      <section className="manifesto">
        <p className="eyebrow">Notre conviction</p>
        <p className="manifesto-text">
          Le meilleur site n’impressionne pas par la technologie.
          <span> Il met votre client à l’aise, puis lui donne une raison simple d’agir.</span>
        </p>
      </section>

      <section className="offer" id="offre">
        <div className="section-head">
          <div>
            <p className="eyebrow">La Page Signature</p>
            <h2>L’essentiel, parfaitement exécuté.</h2>
          </div>
          <p>
            Pour consultants, commerces, événements, produits et services qui
            ont besoin d’être présentés avec justesse — maintenant.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <span className="service-number">{service.number}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="process">
        <div className="process-copy">
          <p className="eyebrow">Simple par nature</p>
          <h2>Trois moments.<br />Aucune friction.</h2>
        </div>
        <ol className="timeline">
          <li>
            <span>Ce matin</span>
            <div>
              <strong>Vous réservez</strong>
              <p>Paiement MoMo de 175 000 FCFA et envoi de votre brief.</p>
            </div>
          </li>
          <li>
            <span>Dans la journée</span>
            <div>
              <strong>Nous créons</strong>
              <p>Positionnement, texte, design et intégration en un seul mouvement.</p>
            </div>
          </li>
          <li>
            <span>Sous 24 h</span>
            <div>
              <strong>Vous recevez</strong>
              <p>Votre page complète, prête à être partagée avec vos clients.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="price-section">
        <div className="price-card">
          <p className="eyebrow">Offre fondatrice · 2 places</p>
          <div className="price-row">
            <div>
              <span className="price">175 000</span>
              <span className="currency">FCFA</span>
            </div>
            <p>Paiement unique · Livraison sous 24 h</p>
          </div>
          <ul>
            <li>Direction artistique personnalisée</li>
            <li>Rédaction et structuration du message</li>
            <li>Page responsive et performante</li>
            <li>Bouton de conversion WhatsApp</li>
            <li>Une série d’ajustements incluse</li>
          </ul>
          <a className="primary-button wide" href={whatsappUrl} target="_blank" rel="noreferrer">
            Réserver ma Page Signature
            <span aria-hidden="true">↗</span>
          </a>
          <p className="payment-note">
            La réservation est confirmée après réception du paiement MoMo.
          </p>
        </div>
      </section>

      <section className="faq">
        <div>
          <p className="eyebrow">Questions essentielles</p>
          <h2>Avant de commencer.</h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>Que dois-je fournir ?</summary>
            <p>
              Votre logo si vous en avez un, quelques images, vos coordonnées et
              surtout une conversation de 20 minutes sur votre activité.
            </p>
          </details>
          <details>
            <summary>Le délai de 24 h est-il réel ?</summary>
            <p>
              Oui, à compter de la réception du paiement et de tous les éléments
              nécessaires. Les retards de transmission décalent la livraison.
            </p>
          </details>
          <details>
            <summary>Que comprend la livraison ?</summary>
            <p>
              Une page web complète, son design, ses textes, son adaptation
              mobile et son bouton WhatsApp. Les besoins complexes sont chiffrés séparément.
            </p>
          </details>
        </div>
      </section>

      <footer>
        <div>
          <p className="footer-call">Votre place est encore libre.</p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            Parlons-en sur WhatsApp ↗
          </a>
        </div>
        <div className="footer-bottom">
          <span>Atelier Page 24</span>
          <span>Cotonou · Bénin</span>
          <span>+229 01 67 15 39 74</span>
        </div>
      </footer>
    </main>
  );
}
