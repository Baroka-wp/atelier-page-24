import type { Metadata } from "next";
import "./project-room.css";

const applicationUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSeezDNzcxVJRwdiBdC5GOi_EPZVtPEIPBH_B4UN9VHHQpMNVw/viewform?usp=header";

export const metadata: Metadata = {
  title: "PROJECT ROOM — Apportez un projet. Repartez avec un plan.",
  description:
    "Un atelier présentiel à Abomey-Calavi pour clarifier, structurer et remettre en mouvement un projet réel. Participation découverte : 5 000 FCFA.",
  alternates: { canonical: "/project-room" },
};

const mapItems = [
  ["01", "Intention", "Le résultat concret que votre projet doit produire."],
  ["02", "Livrables", "Ce qui doit réellement exister à la fin."],
  ["03", "Mouvement", "Les jalons, responsabilités et dépendances."],
  ["04", "Vigilance", "Les risques, parties prenantes et décisions."],
  ["05", "Action", "Les prochaines étapes à lancer dans les 7 jours."],
];

export default function ProjectRoomPage() {
  return (
    <main className="project-room">
      <nav className="room-nav" aria-label="Navigation principale">
        <a className="room-brand" href="/" aria-label="Africa Samurai — accueil">
          <img src="/samurai-logo.png" alt="Africa Samurai" width="46" height="46" />
          <span>
            <strong>AFRICA SAMURAI</strong>
            <small>PROJECT ROOM / SESSION 01</small>
          </span>
        </a>
        <a className="room-nav-link" href={applicationUrl} target="_blank" rel="noreferrer">
          Candidater
        </a>
      </nav>

      <header className="room-hero">
        <div className="room-index" aria-hidden="true">PR / 01</div>
        <div className="room-hero-copy">
          <p className="room-kicker">Atelier présentiel · 15 places</p>
          <h1>PROJECT<br />ROOM</h1>
          <p className="room-lead">Apportez un projet.<br />Repartez avec un plan.</p>
          <div className="room-meta" aria-label="Informations de l’événement">
            <div><span>Date</span><strong>Samedi 22 août 2026</strong></div>
            <div><span>Heure</span><strong>09 h — 12 h 30</strong></div>
            <div><span>Lieu</span><strong>Siège ASC · Abomey-Calavi</strong></div>
          </div>
          <div className="room-hero-actions">
            <a className="room-button" href={applicationUrl} target="_blank" rel="noreferrer">
              Présenter mon projet <span aria-hidden="true">↗</span>
            </a>
            <p><strong>5 000 FCFA</strong><span>participation découverte</span></p>
          </div>
        </div>

        <div className="room-board" aria-label="Le mur de travail PROJECT ROOM">
          <div className="room-board-head"><span>PROJECT WALL</span><span>22.08.26</span></div>
          <article className="room-note room-note-main">
            <span>QUESTION DE DÉPART</span>
            <p>Qu’est-ce qui empêche votre projet d’avancer aujourd’hui&nbsp;?</p>
          </article>
          <article className="room-note room-note-small room-note-one">
            <span># LEARN</span><p>Voir le projet autrement.</p>
          </article>
          <article className="room-note room-note-small room-note-two">
            <span># MAKE</span><p>Construire avec des outils simples.</p>
          </article>
          <article className="room-note room-note-small room-note-three">
            <span># SHARE</span><p>Tester la clarté du plan.</p>
          </article>
          <div className="room-thread thread-a" aria-hidden="true" />
          <div className="room-thread thread-b" aria-hidden="true" />
          <div className="room-pin pin-a" aria-hidden="true" />
          <div className="room-pin pin-b" aria-hidden="true" />
        </div>
      </header>

      <section className="room-manifesto">
        <p className="room-section-number">01 / L’IDÉE</p>
        <div>
          <h2>Ce n’est pas une conférence.<br />C’est une pièce de travail.</h2>
          <p>Vous venez avec un projet réel : activité, produit, programme, initiative associative ou mission interne. En petit groupe, vous le regardez de loin, le décomposez, puis le reconstruisez sous la forme d’un plan lisible.</p>
        </div>
      </section>

      <section className="room-sequence" aria-labelledby="sequence-title">
        <div className="room-section-heading">
          <p className="room-section-number">02 / LE RYTHME</p>
          <h2 id="sequence-title">Learn. Make. Share.</h2>
        </div>
        <div className="room-sequence-grid">
          <article><span>45 min</span><h3>Learn</h3><p>Lire le cycle d’un projet, repérer les angles morts et choisir les outils utiles.</p></article>
          <article><span>90 min</span><h3>Make</h3><p>Construire votre carte projet, vos priorités et votre première séquence d’action.</p></article>
          <article><span>45 min</span><h3>Share</h3><p>Présenter le plan à un regard extérieur, recevoir des questions et le simplifier.</p></article>
        </div>
      </section>

      <section className="room-squint">
        <div className="room-squint-word">SQUINT</div>
        <div className="room-squint-copy">
          <p className="room-section-number">03 / PRENDRE DU RECUL</p>
          <h2>Quand on plisse les yeux,<br />l’essentiel apparaît.</h2>
          <p>Nous éloignons les détails qui occupent tout l’espace pour faire ressortir le but, le chemin critique, les décisions et la prochaine action.</p>
        </div>
      </section>

      <section className="room-map" aria-labelledby="map-title">
        <div className="room-map-intro">
          <p className="room-section-number">04 / CE QUE VOUS EMPORTEZ</p>
          <h2 id="map-title">Une carte projet sur une page.</h2>
          <p>Pas un classeur de théorie. Un support que vous pourrez montrer à votre équipe et utiliser dès la semaine suivante.</p>
        </div>
        <div className="room-map-list">
          {mapItems.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="room-fit">
        <div>
          <p className="room-section-number">05 / POUR QUI</p>
          <h2>Un projet suffit.<br />Le secteur importe peu.</h2>
        </div>
        <div className="room-fit-grid">
          <p>Entrepreneurs et indépendants</p>
          <p>Coordinateurs et équipes ONG</p>
          <p>Développeurs et ingénieurs</p>
          <p>Professionnels de l’agriculture</p>
          <p>Commerce, services et création</p>
          <p>Responsables de programmes</p>
        </div>
      </section>

      <section className="room-application" id="candidature">
        <div className="room-ticket">
          <span>PASS / PROJECT ROOM 01</span>
          <strong>5 000</strong>
          <small>FCFA · 15 PLACES</small>
        </div>
        <div className="room-application-copy">
          <p className="room-section-number">CANDIDATURE</p>
          <h2>La place est validée<br />en deux temps.</h2>
          <ol>
            <li><span>1</span><p><strong>Présentez votre projet.</strong> Le formulaire prend environ quatre minutes.</p></li>
            <li><span>2</span><p><strong>Recevez la confirmation.</strong> Après validation, nous transmettons les instructions de paiement.</p></li>
          </ol>
          <a className="room-button room-button-light" href={applicationUrl} target="_blank" rel="noreferrer">
            Ouvrir la candidature <span aria-hidden="true">↗</span>
          </a>
          <p className="room-fineprint">La candidature est gratuite. La participation est de 5 000 FCFA. Une place est confirmée uniquement après validation du projet et vérification du paiement. Après l’atelier, toute proposition complémentaire nécessite un besoin exprimé et votre accord.</p>
        </div>
      </section>

      <footer className="room-footer">
        <a className="room-brand" href="/">
          <img src="/samurai-logo.png" alt="" width="40" height="40" />
          <span><strong>AFRICA SAMURAI</strong><small>Learn · Make · Share</small></span>
        </a>
        <p>Abomey-Calavi · Bénin</p>
      </footer>
    </main>
  );
}
