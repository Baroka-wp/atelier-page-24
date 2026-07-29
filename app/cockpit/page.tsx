import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COCKPIT_COOKIE, verifySessionToken } from "@/lib/cockpit/auth";
import { getDashboardData } from "@/lib/cockpit/db";

export const dynamic = "force-dynamic";

const money = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
const dateTime = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Porto-Novo",
});

function formatDate(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : dateTime.format(date);
}

export default async function CockpitPage() {
  const cookieStore = await cookies();
  if (!verifySessionToken(cookieStore.get(COCKPIT_COOKIE)?.value)) redirect("/cockpit/login");

  const data = getDashboardData();
  const progress = Math.min((data.collected / data.goal) * 100, 100);
  const paidUnits = Math.min(Math.floor(data.collected / 25000), 14);
  const activeOffers = data.offers.filter((offer) => offer.status === "Active");

  return (
    <main className="cockpit-shell">
      <header className="cockpit-header">
        <a className="cockpit-mark" href="/cockpit">
          <img src="/samurai-logo.png" alt="" width="44" height="44" />
          <span><strong>Africa Samurai</strong><small>Cockpit commercial</small></span>
        </a>
        <nav aria-label="Navigation du cockpit">
          <a href="#pipeline">Pipeline</a>
          <a href="#nouveau">Nouveau prospect</a>
          <a href="#passages">Passages</a>
          <form action="/api/cockpit/logout" method="post">
            <button type="submit">Fermer la session</button>
          </form>
        </nav>
      </header>

      <section className="goal-board" aria-labelledby="goal-title">
        <div className="goal-copy">
          <p className="cockpit-label">Objectif commercial actif</p>
          <h1 id="goal-title">
            <span>{money.format(data.collected)}</span>
            <small>sur {money.format(data.goal)} FCFA encaissés</small>
          </h1>
          <p>
            Reste à encaisser : <strong>{money.format(data.remaining)} FCFA</strong>.
            Le cockpit ne compte que les paiements confirmés.
          </p>
        </div>
        <div className="goal-meter" aria-label={`${Math.round(progress)} % de l’objectif atteint`}>
          <div className="goal-meter-head">
            <span>Progression réelle</span>
            <strong>{Math.round(progress)} %</strong>
          </div>
          <div className="goal-units" aria-hidden="true">
            {Array.from({ length: 14 }, (_, index) => (
              <span className={index < paidUnits ? "is-paid" : ""} key={index}>
                {(index + 1) * 25}
              </span>
            ))}
          </div>
          <small>Chaque repère représente 25 000 FCFA.</small>
        </div>
      </section>

      <section className="cockpit-kpis" aria-label="Indicateurs principaux">
        <article><span>Pipeline nominal</span><strong>{money.format(data.potential)}</strong><small>FCFA</small></article>
        <article><span>Opportunités</span><strong>{data.opportunityCount}</strong><small>enregistrées</small></article>
        <article><span>Prospects chauds</span><strong>{data.hotCount}</strong><small>à traiter en priorité</small></article>
        <article><span>Relances dues</span><strong>{data.dueCount}</strong><small>maintenant</small></article>
      </section>

      <section className="cash-cows">
        <div className="section-heading">
          <p className="cockpit-label">Concentration</p>
          <h2>Deux offres. Pas de dispersion.</h2>
        </div>
        <div className="offer-ledger">
          {activeOffers.map((offer) => (
            <article key={offer.id}>
              <div>
                <span>Priorité {offer.priority}</span>
                <h3>{offer.name}</h3>
                <a href={offer.page_url} target="_blank" rel="noreferrer">Voir la page de vente</a>
              </div>
              <dl>
                <div><dt>Prix</dt><dd>{money.format(offer.price)}</dd></div>
                <div><dt>Prospects</dt><dd>{offer.prospects}</dd></div>
                <div><dt>Chauds</dt><dd>{offer.hot || 0}</dd></div>
                <div><dt>Encaissé</dt><dd>{money.format(offer.collected)}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="pipeline-section" id="pipeline">
        <div className="section-heading section-heading-row">
          <div>
            <p className="cockpit-label">Base opérationnelle</p>
            <h2>Pipeline commercial</h2>
          </div>
          <span>{data.opportunityCount} opportunités</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Prospect</th>
                <th>Offre</th>
                <th>Étape</th>
                <th>Température</th>
                <th>Potentiel</th>
                <th>Prochaine action</th>
                <th>Relance</th>
              </tr>
            </thead>
            <tbody>
              {data.opportunities.map((item) => (
                <tr key={item.id}>
                  <td>
                    <a className="prospect-link" href={`/cockpit/prospects/${item.id}`}>
                      {item.name}
                    </a>
                    <small>{item.organisation || item.coordinate || item.channel}</small>
                  </td>
                  <td><span className={`offer-chip offer-${item.offer_slug}`}>{item.offer_name}</span></td>
                  <td>{item.stage}</td>
                  <td><span className={`temperature temp-${item.temperature.toLowerCase()}`}>{item.temperature}</span></td>
                  <td>{money.format(item.potential_amount)}</td>
                  <td>{item.next_action || "À définir"}</td>
                  <td>{formatDate(item.next_follow_up_at)}</td>
                </tr>
              ))}
              {data.opportunities.length === 0 && (
                <tr><td colSpan={7} className="empty-state">Ajoutez le premier prospect pour démarrer le pipeline.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="cockpit-workspace">
        <article className="cockpit-form-card" id="nouveau">
          <div className="section-heading">
            <p className="cockpit-label">Entrée rapide</p>
            <h2>Ajouter un prospect</h2>
          </div>
          <form action="/api/cockpit/prospects" method="post" className="cockpit-form">
            <div className="field-grid">
              <label>Prospect<input name="name" required placeholder="Nom ou organisation" /></label>
              <label>
                Offre
                <select name="offer_id" required defaultValue="">
                  <option value="" disabled>Choisir l’offre</option>
                  {activeOffers.map((offer) => <option key={offer.id} value={offer.id}>{offer.name}</option>)}
                </select>
              </label>
              <label>
                Canal
                <select name="channel" defaultValue="LinkedIn">
                  {["LinkedIn", "Instagram", "Facebook", "Email", "Réseau", "Site web"].map((channel) => <option key={channel}>{channel}</option>)}
                </select>
              </label>
              <label>Contact<input name="coordinate" placeholder="@profil ou email" /></label>
              <label>Profil public<input name="profile_url" type="url" placeholder="https://" /></label>
              <label>Secteur<input name="sector" placeholder="Conseil, RH, ingénierie…" /></label>
              <label>
                Température
                <select name="temperature" defaultValue="Froid">
                  <option>Froid</option><option>Tiède</option><option>Chaud</option>
                </select>
              </label>
              <label>Prochaine relance<input name="next_follow_up_at" type="datetime-local" /></label>
            </div>
            <label>Prochaine action<input name="next_action" placeholder="Attendre la réponse, proposer un diagnostic…" /></label>
            <label>Notes<textarea name="notes" rows={3} /></label>
            <button type="submit">Ajouter au pipeline</button>
          </form>
        </article>

        <article className="activity-card">
          <div className="section-heading">
            <p className="cockpit-label">Derniers signaux</p>
            <h2>Interactions</h2>
          </div>
          <ol className="activity-list">
            {data.interactions.map((item) => (
              <li key={item.id}>
                <span>{formatDate(item.occurred_at)}</span>
                <strong>{item.contact_name || "Système"} · {item.result}</strong>
                <p>{item.summary || `${item.type} via ${item.channel}`}</p>
              </li>
            ))}
            {data.interactions.length === 0 && <li className="empty-state">Aucune interaction enregistrée.</li>}
          </ol>
        </article>
      </section>

      <section className="passages-section" id="passages">
        <div className="section-heading">
          <p className="cockpit-label">Discipline commerciale</p>
          <h2>Deux passages par jour</h2>
        </div>
        <div className="passage-grid">
          <form action="/api/cockpit/passages" method="post" className="cockpit-form passage-form">
            <div className="field-grid">
              <label>Date<input name="occurred_on" type="date" defaultValue={new Date().toISOString().slice(0, 10)} required /></label>
              <label>Créneau<select name="slot"><option>Matin</option><option>Soir</option></select></label>
              <label>Campagne<select name="offer_id">{activeOffers.map((offer) => <option key={offer.id} value={offer.id}>{offer.name}</option>)}</select></label>
              <label>Canaux vérifiés<input name="channels" placeholder="LinkedIn, Facebook" /></label>
              <label>Nouveaux contacts<input name="new_contacts" type="number" min="0" defaultValue="0" /></label>
              <label>Réponses traitées<input name="responses" type="number" min="0" defaultValue="0" /></label>
              <label>Relances<input name="follow_ups" type="number" min="0" defaultValue="0" /></label>
              <label>Paiements confirmés<input name="confirmed_payments" type="number" min="0" defaultValue="0" /></label>
              <label>Montant encaissé<input name="collected_amount" type="number" min="0" defaultValue="0" /></label>
            </div>
            <label>Résultat<textarea name="result" rows={2} /></label>
            <label>Prochaine priorité<input name="next_priority" /></label>
            <button type="submit">Enregistrer le passage</button>
          </form>
          <div className="passage-history">
            {data.passages.map((passage) => (
              <article key={passage.id}>
                <div>
                  <span>{passage.occurred_on} · {passage.slot}</span>
                  <strong>{passage.offer_name || "Campagne"}</strong>
                </div>
                <dl>
                  <div><dt>Nouveaux</dt><dd>{passage.new_contacts}</dd></div>
                  <div><dt>Réponses</dt><dd>{passage.responses}</dd></div>
                  <div><dt>Encaissé</dt><dd>{money.format(passage.collected_amount)}</dd></div>
                </dl>
                {passage.result && <p>{passage.result}</p>}
              </article>
            ))}
            {data.passages.length === 0 && <p className="empty-state">Aucun passage enregistré.</p>}
          </div>
        </div>
      </section>
    </main>
  );
}
