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
const dayLabel = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  timeZone: "Africa/Porto-Novo",
});

function formatDate(value?: string | null) {
  if (!value) return "À planifier";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : dateTime.format(date);
}

function percent(value: number, total: number) {
  if (!total) return 0;
  return Math.min(Math.round((value / total) * 100), 100);
}

export default async function CockpitPage() {
  const cookieStore = await cookies();
  if (!verifySessionToken(cookieStore.get(COCKPIT_COOKIE)?.value)) redirect("/cockpit/login");

  const data = getDashboardData();
  const now = new Date();
  const deadline = new Date("2026-09-01T00:00:00+01:00");
  const daysRemaining = Math.max(Math.ceil((deadline.getTime() - now.getTime()) / 86_400_000), 0);
  const progress = percent(data.collected, data.goal);
  const activeOffers = data.offers.filter((offer) => offer.status === "Active");
  const priorityProspects = data.opportunities
    .filter((item) => {
      const due = item.next_follow_up_at && new Date(item.next_follow_up_at) <= now;
      return due || item.temperature === "Chaud" || ["Intérêt", "Diagnostic ou RDV", "Proposition", "Paiement annoncé"].includes(item.stage);
    })
    .slice(0, 6);

  const stages = data.opportunities.reduce<Record<string, number>>((acc, item) => {
    acc[item.stage] = (acc[item.stage] || 0) + 1;
    return acc;
  }, {});
  const stageOrder = ["Contacté", "Réponse", "Intérêt", "Diagnostic ou RDV", "Proposition", "Paiement annoncé", "Payé"];
  const stageRows = stageOrder
    .map((stage) => ({ stage, count: stages[stage] || 0 }))
    .filter((item) => item.count > 0);

  const channels = data.opportunities.reduce<Record<string, number>>((acc, item) => {
    acc[item.channel || "Autre"] = (acc[item.channel || "Autre"] || 0) + 1;
    return acc;
  }, {});
  const channelRows = Object.entries(channels)
    .map(([channel, count]) => ({ channel, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  const maxChannel = Math.max(...channelRows.map((item) => item.count), 1);

  return (
    <main className="cockpit-shell dashboard-shell">
      <header className="dashboard-topbar">
        <a className="cockpit-mark" href="/cockpit" aria-label="Accueil du cockpit">
          <img src="/samurai-logo.png" alt="Africa Samurai" width="42" height="42" />
          <span><strong>Africa Samurai</strong><small>Centre de pilotage privé</small></span>
        </a>
        <nav aria-label="Navigation du cockpit">
          <a className="is-active" href="#vue-ensemble">Vue d’ensemble</a>
          <a href="#pipeline">Pipeline</a>
          <a href="#activite">Activité</a>
        </nav>
        <div className="dashboard-session">
          <span>{dayLabel.format(now)}</span>
          <form action="/api/cockpit/logout" method="post">
            <button type="submit">Quitter</button>
          </form>
        </div>
      </header>

      <div className="dashboard-main">
        <section className="dashboard-intro" id="vue-ensemble">
          <div>
            <p className="cockpit-label">Mission commerciale · jusqu’au 31 août</p>
            <h1>Piloter l’encaissement.<br /><span>Sans perdre le signal.</span></h1>
          </div>
          <p>
            Une lecture directe de ce qui est encaissé, de ce qui peut convertir
            et de la prochaine action à exécuter.
          </p>
        </section>

        <section className="dashboard-overview" aria-label="Vue synthétique de l’objectif">
          <article className="target-panel">
            <div className="target-panel-head">
              <div>
                <span className="panel-kicker">Objectif principal</span>
                <strong>{money.format(data.goal)} <small>FCFA</small></strong>
              </div>
              <span className="deadline-chip">{daysRemaining} jours restants</span>
            </div>

            <div className="target-progress" aria-label={`${progress} % de l’objectif atteint`}>
              <div style={{ width: `${Math.max(progress, 1)}%` }} />
            </div>

            <div className="target-numbers">
              <div>
                <span>Encaissé confirmé</span>
                <strong>{money.format(data.collected)}</strong>
              </div>
              <div>
                <span>Reste à encaisser</span>
                <strong>{money.format(data.remaining)}</strong>
              </div>
              <div>
                <span>Progression</span>
                <strong>{progress} %</strong>
              </div>
            </div>

            <div className="target-foot">
              <p>Seuls les paiements accompagnés d’une preuve alimentent ce compteur.</p>
              <span>Mis à jour en temps réel</span>
            </div>
          </article>

          <aside className="priority-panel" aria-labelledby="priority-title">
            <div className="panel-heading">
              <div>
                <span className="panel-kicker">À traiter maintenant</span>
                <h2 id="priority-title">File prioritaire</h2>
              </div>
              <span className="priority-count">{data.dueCount}</span>
            </div>
            <ol className="priority-list">
              {priorityProspects.map((item) => (
                <li key={item.id}>
                  <a href={`/cockpit/prospects/${item.id}`}>
                    <span className={`signal-dot signal-${item.temperature.toLowerCase()}`} aria-hidden="true" />
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.offer_name} · {item.next_action || "Action à définir"}</small>
                    </span>
                    <time>{formatDate(item.next_follow_up_at)}</time>
                  </a>
                </li>
              ))}
              {priorityProspects.length === 0 && (
                <li className="priority-empty">Aucune urgence. Préparez le prochain passage.</li>
              )}
            </ol>
            <a className="panel-link" href="#pipeline">Voir tout le pipeline <span aria-hidden="true">↗</span></a>
          </aside>
        </section>

        <section className="metric-strip" aria-label="Indicateurs principaux">
          <article>
            <span>Pipeline nominal</span>
            <strong>{money.format(data.potential)}</strong>
            <small>FCFA identifiés</small>
          </article>
          <article>
            <span>Opportunités</span>
            <strong>{data.opportunityCount}</strong>
            <small>dans la base active</small>
          </article>
          <article>
            <span>Signaux chauds</span>
            <strong>{data.hotCount}</strong>
            <small>à convertir en priorité</small>
          </article>
          <article>
            <span>Relances dues</span>
            <strong>{data.dueCount}</strong>
            <small>actions en attente</small>
          </article>
        </section>

        <section className="insight-grid" aria-label="Performance commerciale">
          <article className="performance-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-kicker">Vaches à lait</span>
                <h2>Performance par offre</h2>
              </div>
              <span>{activeOffers.length} offres actives</span>
            </div>
            <div className="offer-performance">
              {activeOffers.map((offer) => {
                const offerProgress = percent(offer.collected, data.goal);
                return (
                  <article key={offer.id}>
                    <div className="offer-title">
                      <span className={`offer-index offer-index-${offer.slug}`}>{String(offer.priority).padStart(2, "0")}</span>
                      <div>
                        <h3>{offer.name}</h3>
                        <a href={offer.page_url} target="_blank" rel="noreferrer">Page de vente ↗</a>
                      </div>
                    </div>
                    <div className="offer-bar" aria-label={`${offerProgress} % de l’objectif global encaissé par cette offre`}>
                      <span style={{ width: `${offerProgress}%` }} />
                    </div>
                    <dl>
                      <div><dt>Prospects</dt><dd>{offer.prospects}</dd></div>
                      <div><dt>Chauds</dt><dd>{offer.hot || 0}</dd></div>
                      <div><dt>Potentiel</dt><dd>{money.format(offer.potential)}</dd></div>
                      <div><dt>Encaissé</dt><dd>{money.format(offer.collected)}</dd></div>
                    </dl>
                  </article>
                );
              })}
            </div>
          </article>

          <article className="channel-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-kicker">Acquisition</span>
                <h2>Répartition par canal</h2>
              </div>
            </div>
            <div className="channel-chart">
              {channelRows.map((item) => (
                <div key={item.channel}>
                  <span>{item.channel}</span>
                  <div><i style={{ width: `${(item.count / maxChannel) * 100}%` }} /></div>
                  <strong>{item.count}</strong>
                </div>
              ))}
            </div>
            <div className="stage-summary">
              <span className="panel-kicker">Étapes du pipeline</span>
              <ul>
                {stageRows.map((item) => (
                  <li key={item.stage}><span>{item.stage}</span><strong>{item.count}</strong></li>
                ))}
              </ul>
            </div>
          </article>
        </section>

        <section className="pipeline-panel" id="pipeline">
          <div className="panel-heading pipeline-heading">
            <div>
              <span className="panel-kicker">Base opérationnelle</span>
              <h2>Pipeline commercial</h2>
            </div>
            <div className="pipeline-actions">
              <span>{data.opportunityCount} opportunités</span>
              <a href="#nouveau">Ajouter un prospect</a>
            </div>
          </div>
          <div className="table-wrap dashboard-table">
            <table>
              <thead>
                <tr>
                  <th>Prospect</th>
                  <th>Offre</th>
                  <th>Étape</th>
                  <th>Signal</th>
                  <th>Potentiel</th>
                  <th>Prochaine action</th>
                  <th>Échéance</th>
                </tr>
              </thead>
              <tbody>
                {data.opportunities.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <a className="prospect-link" href={`/cockpit/prospects/${item.id}`}>{item.name}</a>
                      <small>{item.organisation || item.coordinate || item.channel}</small>
                    </td>
                    <td><span className={`offer-chip offer-${item.offer_slug}`}>{item.offer_name}</span></td>
                    <td>{item.stage}</td>
                    <td><span className={`temperature temp-${item.temperature.toLowerCase()}`}>{item.temperature}</span></td>
                    <td className="money-cell">{money.format(item.potential_amount)}</td>
                    <td className="action-cell">{item.next_action || "À définir"}</td>
                    <td><time>{formatDate(item.next_follow_up_at)}</time></td>
                  </tr>
                ))}
                {data.opportunities.length === 0 && (
                  <tr><td colSpan={7} className="empty-state">Ajoutez le premier prospect pour démarrer le pipeline.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="activity-grid" id="activite">
          <article className="activity-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-kicker">Journal commercial</span>
                <h2>Derniers signaux</h2>
              </div>
            </div>
            <ol className="dashboard-activity-list">
              {data.interactions.map((item) => (
                <li key={item.id}>
                  <span className="activity-marker" aria-hidden="true" />
                  <div>
                    <strong>{item.contact_name || "Système"}</strong>
                    <p>{item.summary || `${item.type} via ${item.channel}`}</p>
                    <small>{item.offer_name} · {item.result}</small>
                  </div>
                  <time>{formatDate(item.occurred_at)}</time>
                </li>
              ))}
              {data.interactions.length === 0 && <li className="empty-state">Aucune interaction enregistrée.</li>}
            </ol>
          </article>

          <aside className="quick-actions" id="nouveau">
            <details>
              <summary>
                <span><small>Entrée rapide</small><strong>Ajouter un prospect</strong></span>
                <i aria-hidden="true">+</i>
              </summary>
              <form action="/api/cockpit/prospects" method="post" className="cockpit-form compact-form">
                <div className="field-grid">
                  <label>Prospect<input name="name" required placeholder="Nom ou organisation" /></label>
                  <label>Offre<select name="offer_id" required defaultValue=""><option value="" disabled>Choisir</option>{activeOffers.map((offer) => <option key={offer.id} value={offer.id}>{offer.name}</option>)}</select></label>
                  <label>Canal<select name="channel" defaultValue="LinkedIn">{["LinkedIn", "Instagram", "Facebook", "Email", "Réseau", "Site web"].map((channel) => <option key={channel}>{channel}</option>)}</select></label>
                  <label>Contact<input name="coordinate" placeholder="@profil ou email" /></label>
                  <label>Profil public<input name="profile_url" type="url" placeholder="https://" /></label>
                  <label>Secteur<input name="sector" placeholder="RH, conseil, ingénierie…" /></label>
                  <label>Température<select name="temperature" defaultValue="Froid"><option>Froid</option><option>Tiède</option><option>Chaud</option></select></label>
                  <label>Prochaine relance<input name="next_follow_up_at" type="datetime-local" /></label>
                </div>
                <label>Prochaine action<input name="next_action" placeholder="Attendre la réponse…" /></label>
                <label>Notes<textarea name="notes" rows={3} /></label>
                <button type="submit">Ajouter au pipeline</button>
              </form>
            </details>

            <details id="passages">
              <summary>
                <span><small>Discipline</small><strong>Enregistrer un passage</strong></span>
                <i aria-hidden="true">+</i>
              </summary>
              <form action="/api/cockpit/passages" method="post" className="cockpit-form compact-form">
                <div className="field-grid">
                  <label>Date<input name="occurred_on" type="date" defaultValue={now.toISOString().slice(0, 10)} required /></label>
                  <label>Créneau<select name="slot"><option>Matin</option><option>Soir</option></select></label>
                  <label>Campagne<select name="offer_id">{activeOffers.map((offer) => <option key={offer.id} value={offer.id}>{offer.name}</option>)}</select></label>
                  <label>Canaux<input name="channels" placeholder="LinkedIn, Facebook" /></label>
                  <label>Nouveaux contacts<input name="new_contacts" type="number" min="0" defaultValue="0" /></label>
                  <label>Réponses<input name="responses" type="number" min="0" defaultValue="0" /></label>
                  <label>Relances<input name="follow_ups" type="number" min="0" defaultValue="0" /></label>
                  <label>Montant encaissé<input name="collected_amount" type="number" min="0" defaultValue="0" /></label>
                </div>
                <input name="confirmed_payments" type="hidden" value="0" />
                <label>Résultat<textarea name="result" rows={2} /></label>
                <label>Prochaine priorité<input name="next_priority" /></label>
                <button type="submit">Enregistrer le passage</button>
              </form>
            </details>

            <div className="passage-brief">
              <div className="panel-heading">
                <div>
                  <span className="panel-kicker">Passages récents</span>
                  <h2>Cadence</h2>
                </div>
              </div>
              {data.passages.slice(0, 4).map((passage) => (
                <article key={passage.id}>
                  <div>
                    <strong>{passage.occurred_on} · {passage.slot}</strong>
                    <span>{passage.offer_name || "Campagne"}</span>
                  </div>
                  <dl>
                    <div><dt>Nouveaux</dt><dd>{passage.new_contacts}</dd></div>
                    <div><dt>Réponses</dt><dd>{passage.responses}</dd></div>
                    <div><dt>Encaissé</dt><dd>{money.format(passage.collected_amount)}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
