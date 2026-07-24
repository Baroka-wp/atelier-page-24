const whatsappFor = (message: string) =>
  `https://wa.me/2290167153974?text=${encodeURIComponent(message)}`;

const whatsappUrl = whatsappFor(
  "Bonjour, je veux réserver une Page Signature à 175 000 FCFA.",
);

const services = [
  {
    number: "01",
    title: "Un message qui devient évident",
    text: "Nous clarifions votre promesse, écrivons le parcours et donnons à votre client une raison simple de vous contacter.",
  },
  {
    number: "02",
    title: "Un design qui inspire confiance",
    text: "Une direction artistique premium, pensée pour votre activité et parfaitement lisible sur mobile.",
  },
  {
    number: "03",
    title: "Une page prête en 24 heures",
    text: "Vous transmettez vos éléments aujourd’hui. Nous livrons une première version complète sous 24 heures.",
  },
];

const included = [
  "Positionnement et structure",
  "Rédaction de la page",
  "Direction artistique personnalisée",
  "Version mobile performante",
  "Conversion directe vers WhatsApp",
  "Une série d’ajustements",
];

export default function Home() {
  return (
    <main id="main-content">
      <a className="skip-link" href="#offre">
        Aller au contenu
      </a>
      <nav className="nav" aria-label="Navigation principale">
        <a className="brand" href="#top" aria-label="Atelier Page 24, accueil">
          <img src="/samurai-logo.png" alt="" width="48" height="48" />
          <span className="brand-copy">
            <strong>Atelier Page 24</strong>
            <small>par Africa Samurai</small>
          </span>
        </a>
        <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
          Réserver
          <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">Page de vente premium · livrée en 24 h</p>
          <h1>
            Votre offre,
            <br />
            <span>comprise</span>
            <br />
            en quelques secondes.
          </h1>
          <p className="hero-text">
            Nous clarifions votre promesse, écrivons le parcours et mettons en
            ligne une page qui conduit directement à la conversation.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
              Commander — 175 000 FCFA
              <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#offre">
              Voir ce qui est inclus
            </a>
          </div>
          <div className="hero-proof" aria-label="Points clés de l’offre">
            <span>Stratégie incluse</span>
            <span>Textes inclus</span>
            <span>Mobile inclus</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />
          <figure className="mascot-card">
            <div className="mascot-frame">
              <img
                src="/samurai-logo.png"
                alt="Robot samouraï africain, emblème de l’Atelier Page 24"
                width="1254"
                height="1254"
                fetchPriority="high"
              />
            </div>
            <figcaption>
              <span>Votre présence digitale</span>
              <strong>Simple. Forte. Mémorable.</strong>
            </figcaption>
          </figure>
          <div className="visual-badge">
            <span>02</span>
            places aujourd’hui
          </div>
        </div>
      </section>

      <section className="signature-strip" aria-label="Promesse de service">
        <span>Positionnement</span>
        <i aria-hidden="true" />
        <span>Rédaction</span>
        <i aria-hidden="true" />
        <span>Design</span>
        <i aria-hidden="true" />
        <span>Mise en ligne</span>
      </section>

      <section className="manifesto">
        <div>
          <p className="eyebrow light-eyebrow">Notre principe</p>
          <p className="manifesto-text">
            Le meilleur site ne demande pas d’effort.
            <span> Il rassure, il raconte, puis il invite à agir.</span>
          </p>
        </div>
        <div className="manifesto-metrics">
          <article>
            <strong>24 h</strong>
            <span>pour votre première version</span>
          </article>
          <article>
            <strong>1 page</strong>
            <span>centrée sur une seule action</span>
          </article>
          <article>
            <strong>0 friction</strong>
            <span>de la découverte à WhatsApp</span>
          </article>
        </div>
      </section>

      <section className="offer" id="offre">
        <div className="section-head">
          <div>
            <p className="eyebrow">La Page Signature</p>
            <h2>L’essentiel,<br />sans le bruit.</h2>
          </div>
          <p>
            Pour consultants, commerces, événements, produits et services qui
            ont besoin d’une présence précise, élégante et immédiatement utile.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-top">
                <span className="service-number">{service.number}</span>
                <span className="service-mark" aria-hidden="true">✦</span>
              </div>
              <div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="process">
        <div className="process-intro">
          <p className="eyebrow">Un parcours fluide</p>
          <h2>Trois moments.<br />Une page prête.</h2>
          <p>
            Un processus concentré qui protège votre temps et maintient la
            qualité du premier échange jusqu’à la mise en ligne.
          </p>
        </div>
        <ol className="timeline">
          <li>
            <span>01</span>
            <div>
              <small>Ce matin</small>
              <strong>Vous réservez</strong>
              <p>Paiement MoMo et conversation de cadrage de 20 minutes.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <small>Dans la journée</small>
              <strong>Nous créons</strong>
              <p>Positionnement, texte, direction artistique et intégration.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <small>Sous 24 heures</small>
              <strong>Vous recevez</strong>
              <p>Une page complète, mobile et prête à accueillir vos clients.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="price-section">
        <div className="price-story">
          <p className="eyebrow light-eyebrow">Offre fondatrice</p>
          <h2>Deux places.<br />Aujourd’hui.</h2>
          <p>
            Un format volontairement limité pour rester rapide, précis et
            entièrement concentré sur votre activité.
          </p>
          <div className="gold-seal" aria-hidden="true">
            <span>24</span>
            <small>heures</small>
          </div>
        </div>

        <div className="price-card">
          <div className="price-heading">
            <div>
              <span className="price">175 000</span>
              <span className="currency">FCFA</span>
            </div>
            <p>Paiement unique</p>
          </div>
          <ul>
            {included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a className="primary-button wide" href={whatsappUrl} target="_blank" rel="noreferrer">
            Réserver ma Page Signature
            <span aria-hidden="true">↗</span>
          </a>
          <p className="payment-note">
            Réservation confirmée après réception du paiement MoMo.
          </p>
        </div>
      </section>

      <section className="faq">
        <div>
          <p className="eyebrow">Questions essentielles</p>
          <h2>Avant de<br />commencer.</h2>
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
              nécessaires. Un retard de transmission décale la livraison.
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
        <div className="footer-main">
          <div className="footer-brand">
            <img
              src="/samurai-logo.png"
              alt=""
              width="64"
              height="64"
              loading="lazy"
            />
            <span>Atelier Page 24</span>
          </div>
          <p className="footer-call">Votre nouvelle page<br />commence ici.</p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            Parlons-en sur WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="footer-bottom">
          <span>Africa Samurai</span>
          <span>Cotonou · Bénin</span>
          <span>+229 01 67 15 39 74</span>
        </div>
      </footer>
    </main>
  );
}
