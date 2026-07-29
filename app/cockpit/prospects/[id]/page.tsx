import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { COCKPIT_COOKIE, verifySessionToken } from "@/lib/cockpit/auth";
import { getOpportunity } from "@/lib/cockpit/db";

export const dynamic = "force-dynamic";

const money = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

export default async function ProspectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  if (!verifySessionToken(cookieStore.get(COCKPIT_COOKIE)?.value)) redirect("/cockpit/login");
  const { id } = await params;
  const data = getOpportunity(Number(id));
  if (!data) notFound();

  const prospect = data.opportunity;
  const endpoint = `/api/cockpit/opportunities/${id}`;

  return (
    <main className="cockpit-shell prospect-shell">
      <header className="cockpit-header">
        <a className="cockpit-mark" href="/cockpit">
          <img src="/samurai-logo.png" alt="" width="44" height="44" />
          <span><strong>Africa Samurai</strong><small>Retour au cockpit</small></span>
        </a>
        <a className="back-link" href="/cockpit">Pipeline</a>
      </header>

      <section className="prospect-hero">
        <div>
          <p className="cockpit-label">{String(prospect.offer_name)}</p>
          <h1>{String(prospect.name)}</h1>
          <p>{String(prospect.organisation || prospect.sector || prospect.coordinate || "Prospect")}</p>
        </div>
        <dl>
          <div><dt>Étape</dt><dd>{String(prospect.stage)}</dd></div>
          <div><dt>Température</dt><dd>{String(prospect.temperature)}</dd></div>
          <div><dt>Potentiel</dt><dd>{money.format(Number(prospect.potential_amount || 0))} FCFA</dd></div>
          <div><dt>Encaissé</dt><dd>{money.format(Number(prospect.paid_amount || 0))} FCFA</dd></div>
        </dl>
      </section>

      <section className="prospect-layout">
        <div className="prospect-main">
          <article className="cockpit-form-card">
            <div className="section-heading"><p className="cockpit-label">Mise à jour</p><h2>État de l’opportunité</h2></div>
            <form action={endpoint} method="post" className="cockpit-form">
              <div className="field-grid">
                <label>Statut<select name="status" defaultValue={String(prospect.status)}>
                  {["Nouveau", "Contacté", "Vu", "Répondu", "Intéressé", "Négociation", "Paiement annoncé", "Gagné", "Perdu", "À relancer"].map((value) => <option key={value}>{value}</option>)}
                </select></label>
                <label>Étape<select name="stage" defaultValue={String(prospect.stage)}>
                  {["À qualifier", "Qualifié", "Contacté", "Réponse", "Intérêt", "Diagnostic ou RDV", "Proposition", "Paiement annoncé", "Payé", "Livré", "Perdu"].map((value) => <option key={value}>{value}</option>)}
                </select></label>
                <label>Température<select name="temperature" defaultValue={String(prospect.temperature)}>
                  <option>Froid</option><option>Tiède</option><option>Chaud</option>
                </select></label>
                <label>Montant potentiel<input name="potential_amount" type="number" min="0" defaultValue={Number(prospect.potential_amount || 0)} /></label>
                <label>Prochaine relance<input name="next_follow_up_at" type="datetime-local" defaultValue={String(prospect.next_follow_up_at || "").slice(0, 16)} /></label>
              </div>
              <label>Prochaine action<input name="next_action" defaultValue={String(prospect.next_action || "")} /></label>
              <label>Notes<textarea name="notes" rows={4} defaultValue={String(prospect.notes || "")} /></label>
              <button type="submit">Enregistrer les changements</button>
            </form>
          </article>

          <article className="cockpit-form-card">
            <div className="section-heading"><p className="cockpit-label">Journal append-only</p><h2>Ajouter une interaction</h2></div>
            <form action={`${endpoint}/interactions`} method="post" className="cockpit-form">
              <div className="field-grid">
                <label>Type<select name="type"><option>Premier contact</option><option>Relance</option><option>Réponse</option><option>Diagnostic ou RDV</option><option>Proposition</option><option>Paiement</option><option>Note</option></select></label>
                <label>Canal<select name="channel" defaultValue={String(prospect.channel || "LinkedIn")}>{["LinkedIn", "Instagram", "Facebook", "Email", "Réseau", "Site web"].map((value) => <option key={value}>{value}</option>)}</select></label>
                <label>Direction<select name="direction"><option>Sortant</option><option>Entrant</option><option>Interne</option></select></label>
                <label>Résultat<select name="result"><option>Aucun signal</option><option>Information</option><option>Intérêt</option><option>Chaud</option><option>Refus</option><option>Paiement annoncé</option></select></label>
                <label>Relance prévue<input name="follow_up_at" type="datetime-local" /></label>
              </div>
              <label>Résumé<input name="summary" required placeholder="Ce qui s’est réellement passé" /></label>
              <label>Message ou note<textarea name="message" rows={4} /></label>
              <label>Prochaine action<input name="next_action" /></label>
              <input name="page_sent" type="hidden" value={String(prospect.page_url || "")} />
              <button type="submit">Ajouter au journal</button>
            </form>
          </article>
        </div>

        <aside className="prospect-aside">
          <article className="payment-card">
            <p className="cockpit-label">Encaissement</p>
            <h2>Confirmer un paiement</h2>
            <p>Cette action alimente immédiatement l’objectif de 350 000 FCFA.</p>
            <form action={`${endpoint}/payment`} method="post" className="cockpit-form">
              <label>Montant encaissé<input name="amount" type="number" min="1" defaultValue={Number(prospect.offer_price || 0)} required /></label>
              <label>Référence ou preuve<input name="proof" placeholder="Référence MoMo ou URL" /></label>
              <button type="submit">Confirmer l’encaissement</button>
            </form>
          </article>

          <article className="contact-card">
            <p className="cockpit-label">Contact</p>
            <dl>
              <div><dt>Coordonnée</dt><dd>{String(prospect.coordinate || "—")}</dd></div>
              <div><dt>Email</dt><dd>{String(prospect.email || "—")}</dd></div>
              <div><dt>Ville</dt><dd>{String(prospect.city || "—")}</dd></div>
              <div><dt>Secteur</dt><dd>{String(prospect.sector || "—")}</dd></div>
            </dl>
            {prospect.profile_url && <a href={String(prospect.profile_url)} target="_blank" rel="noreferrer">Ouvrir le profil</a>}
          </article>
        </aside>
      </section>

      <section className="interaction-history">
        <div className="section-heading"><p className="cockpit-label">Historique</p><h2>Interactions enregistrées</h2></div>
        <ol className="activity-list">
          {data.interactions.map((item) => (
            <li key={String(item.id)}>
              <span>{String(item.occurred_at || "")}</span>
              <strong>{String(item.type)} · {String(item.result)}</strong>
              <p>{String(item.summary || item.message || "")}</p>
            </li>
          ))}
          {data.interactions.length === 0 && <li className="empty-state">Aucune interaction enregistrée.</li>}
        </ol>
      </section>
    </main>
  );
}
