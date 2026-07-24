type Outcome = {
  number: string;
  title: string;
  text: string;
};

type Step = {
  label: string;
  title: string;
  text: string;
};

type OfferLandingProps = {
  theme: "spiritual" | "coding" | "automation" | "pmp" | "clarity";
  brand: string;
  kicker: string;
  title: string;
  accent: string;
  intro: string;
  price: string;
  unit?: string;
  delivery: string;
  cta: string;
  whatsappMessage: string;
  proof: string[];
  promiseLabel: string;
  promiseTitle: string;
  promiseText: string;
  outcomes: Outcome[];
  examplesLabel: string;
  examplesTitle: string;
  examples: string[];
  steps: Step[];
  included: string[];
  note?: string;
  visualSrc?: string;
  visualAlt?: string;
};

export default function OfferLanding({
  theme,
  brand,
  kicker,
  title,
  accent,
  intro,
  price,
  unit = "FCFA",
  delivery,
  cta,
  whatsappMessage,
  proof,
  promiseLabel,
  promiseTitle,
  promiseText,
  outcomes,
  examplesLabel,
  examplesTitle,
  examples,
  steps,
  included,
  note,
  visualSrc = "/samurai-logo.png",
  visualAlt,
}: OfferLandingProps) {
  const whatsappUrl = `https://wa.me/2290167153974?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main id="main-content" className={`campaign-page campaign-${theme}`}>
      <a className="skip-link" href="#proposition">
        Aller au contenu
      </a>
      <nav className="campaign-nav" aria-label={`Navigation ${brand}`}>
        <a
          className="campaign-brand"
          href="#top"
          aria-label={`${brand}, retour en haut`}
        >
          <img
            src="/samurai-logo.png"
            alt=""
            width="46"
            height="46"
            loading="lazy"
          />
          <span>
            <strong>{brand}</strong>
            <small>par Africa Samurai</small>
          </span>
        </a>
        <a className="campaign-nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
          {cta} <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <section className="campaign-hero" id="top">
        <div className="campaign-copy">
          <p className="campaign-kicker">{kicker}</p>
          <h1>
            {title}
            <span>{accent}</span>
          </h1>
          <p className="campaign-intro">{intro}</p>
          <a className="campaign-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
            {cta}
            <span aria-hidden="true">↗</span>
          </a>
          <div className="campaign-proof">
            {proof.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
        <div className="campaign-visual">
          <div className="campaign-halo" aria-hidden="true" />
          <figure>
            <img
              src={visualSrc}
              alt={visualAlt ?? `Robot samouraï Africa Samurai pour ${brand}`}
              width="1254"
              height="1254"
              fetchPriority="high"
            />
          </figure>
          <div className="campaign-price-badge">
            <strong>{price}</strong>
            <span>{unit}</span>
            <small>{delivery}</small>
          </div>
        </div>
      </section>

      <section className="campaign-statement" id="proposition">
        <p>{promiseLabel}</p>
        <h2>{promiseTitle}</h2>
        <div>
          <p>{promiseText}</p>
        </div>
      </section>

      <section className="campaign-outcomes">
        {outcomes.map((outcome) => (
          <article key={outcome.number}>
            <span>{outcome.number}</span>
            <h3>{outcome.title}</h3>
            <p>{outcome.text}</p>
          </article>
        ))}
      </section>

      <section className="campaign-examples">
        <div>
          <p className="campaign-kicker">{examplesLabel}</p>
          <h2>{examplesTitle}</h2>
        </div>
        <ul>
          {examples.map((example) => <li key={example}>{example}</li>)}
        </ul>
      </section>

      <section className="campaign-process">
        <div className="campaign-process-head">
          <p className="campaign-kicker">Déroulement</p>
          <h2>Un cadre court.<br />Un résultat précis.</h2>
        </div>
        <ol>
          {steps.map((step, index) => (
            <li key={step.title}>
              <span>0{index + 1}</span>
              <div>
                <small>{step.label}</small>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="campaign-close">
        <div className="campaign-close-copy">
          <p className="campaign-kicker">L’offre</p>
          <h2>{price} <small>{unit}</small></h2>
          <p>{delivery}</p>
        </div>
        <div className="campaign-close-card">
          <ul>
            {included.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <a className="campaign-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
            {cta}
            <span aria-hidden="true">↗</span>
          </a>
          {note && <p className="campaign-note">{note}</p>}
        </div>
      </section>

      <footer className="campaign-footer">
        <div className="campaign-brand">
          <img src="/samurai-logo.png" alt="" width="46" height="46" />
          <span>
            <strong>{brand}</strong>
            <small>par Africa Samurai</small>
          </span>
        </div>
        <span>Cotonou · Bénin</span>
        <span>+229 01 67 15 39 74</span>
        <a className="campaign-footer-link" href="#top">
          Retour en haut
        </a>
      </footer>
    </main>
  );
}
