import "server-only";

import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import Database from "better-sqlite3";

export type DashboardData = ReturnType<typeof getDashboardData>;

const defaultPath = join(process.cwd(), ".data", "asc-cockpit.sqlite");
const databasePath = process.env.COCKPIT_DB_PATH || defaultPath;

declare global {
  var ascCockpitDb: Database.Database | undefined;
}

function getDatabase() {
  if (global.ascCockpitDb) return global.ascCockpitDb;

  mkdirSync(dirname(databasePath), { recursive: true });
  const db = new Database(databasePath);
  db.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;");
  initialise(db);
  global.ascCockpitDb = db;
  return db;
}

function initialise(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS offers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL UNIQUE,
      price INTEGER NOT NULL DEFAULT 0,
      currency TEXT NOT NULL DEFAULT 'FCFA',
      status TEXT NOT NULL DEFAULT 'En pause',
      priority INTEGER NOT NULL DEFAULT 9,
      target TEXT NOT NULL DEFAULT '',
      page_url TEXT NOT NULL DEFAULT '',
      notion_url TEXT UNIQUE,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      identity_key TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'Personne',
      organisation TEXT NOT NULL DEFAULT '',
      sector TEXT NOT NULL DEFAULT '',
      city TEXT NOT NULL DEFAULT '',
      country TEXT NOT NULL DEFAULT '',
      channel TEXT NOT NULL DEFAULT '',
      coordinate TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL DEFAULT '',
      profile_url TEXT NOT NULL DEFAULT '',
      eligibility TEXT NOT NULL DEFAULT 'Actif',
      notes TEXT NOT NULL DEFAULT '',
      notion_url TEXT UNIQUE,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS opportunities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contact_id INTEGER NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
      offer_id INTEGER NOT NULL REFERENCES offers(id),
      status TEXT NOT NULL DEFAULT 'Nouveau',
      stage TEXT NOT NULL DEFAULT 'À qualifier',
      temperature TEXT NOT NULL DEFAULT 'Froid',
      channel TEXT NOT NULL DEFAULT '',
      potential_amount INTEGER NOT NULL DEFAULT 0,
      paid_amount INTEGER NOT NULL DEFAULT 0,
      payment_confirmed INTEGER NOT NULL DEFAULT 0,
      payment_proof TEXT NOT NULL DEFAULT '',
      first_contact_at TEXT,
      last_interaction_at TEXT,
      next_follow_up_at TEXT,
      next_action TEXT NOT NULL DEFAULT '',
      page_sent TEXT NOT NULL DEFAULT '',
      notes TEXT NOT NULL DEFAULT '',
      notion_url TEXT UNIQUE,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(contact_id, offer_id)
    );

    CREATE TABLE IF NOT EXISTS interactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contact_id INTEGER REFERENCES contacts(id) ON DELETE SET NULL,
      opportunity_id INTEGER REFERENCES opportunities(id) ON DELETE SET NULL,
      offer_id INTEGER REFERENCES offers(id) ON DELETE SET NULL,
      type TEXT NOT NULL,
      channel TEXT NOT NULL DEFAULT '',
      direction TEXT NOT NULL DEFAULT 'Sortant',
      result TEXT NOT NULL DEFAULT 'Aucun signal',
      summary TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL DEFAULT '',
      page_sent TEXT NOT NULL DEFAULT '',
      next_action TEXT NOT NULL DEFAULT '',
      follow_up_at TEXT,
      executed_by TEXT NOT NULL DEFAULT 'Baroka',
      occurred_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      notion_url TEXT UNIQUE
    );

    CREATE TABLE IF NOT EXISTS passages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slot_key TEXT NOT NULL UNIQUE,
      offer_id INTEGER REFERENCES offers(id) ON DELETE SET NULL,
      slot TEXT NOT NULL,
      channels TEXT NOT NULL DEFAULT '',
      responses INTEGER NOT NULL DEFAULT 0,
      new_contacts INTEGER NOT NULL DEFAULT 0,
      follow_ups INTEGER NOT NULL DEFAULT 0,
      pages_sent INTEGER NOT NULL DEFAULT 0,
      confirmed_payments INTEGER NOT NULL DEFAULT 0,
      collected_amount INTEGER NOT NULL DEFAULT 0,
      result TEXT NOT NULL DEFAULT '',
      next_priority TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'Terminé',
      occurred_on TEXT NOT NULL,
      notion_url TEXT UNIQUE,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS journal (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      body TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT 'Système',
      occurred_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      notion_url TEXT UNIQUE
    );

    CREATE INDEX IF NOT EXISTS idx_opportunities_stage ON opportunities(stage);
    CREATE INDEX IF NOT EXISTS idx_opportunities_follow_up ON opportunities(next_follow_up_at);
    CREATE INDEX IF NOT EXISTS idx_interactions_occurred_at ON interactions(occurred_at DESC);
    CREATE INDEX IF NOT EXISTS idx_passages_occurred_on ON passages(occurred_on DESC);
  `);

  db.prepare(
    "INSERT OR IGNORE INTO settings (key, value) VALUES ('revenue_goal', '350000')"
  ).run();

  const seedOffer = db.prepare(`
    INSERT INTO offers (slug, name, price, status, priority, target, page_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(slug) DO UPDATE SET
      name = excluded.name,
      price = excluded.price,
      status = CASE WHEN offers.notion_url IS NULL THEN excluded.status ELSE offers.status END,
      priority = CASE WHEN offers.notion_url IS NULL THEN excluded.priority ELSE offers.priority END,
      target = CASE WHEN offers.target = '' THEN excluded.target ELSE offers.target END,
      page_url = CASE WHEN offers.page_url = '' THEN excluded.page_url ELSE offers.page_url END
  `);

  const offers = [
    ["ia-pour-tous", "IA pour tous", 25000, "Active", 1, "Professionnels non-tech, entrepreneurs, indépendants et petites équipes.", "https://page.laforge-hub.com/ia-pour-tous"],
    ["pmp-ready", "PMP Ready", 75000, "Active", 2, "Profils techniques et opérationnels évoluant vers le pilotage.", "https://page.laforge-hub.com/pmp-ready"],
    ["page-signature", "Page Signature", 175000, "En pause", 9, "", "https://page.laforge-hub.com"],
    ["coding-express", "Coding Express", 150000, "En pause", 10, "", "https://page.laforge-hub.com/coding-express"],
    ["automation-sprint", "Automation Sprint", 175000, "En pause", 11, "", "https://page.laforge-hub.com/automation-sprint"],
    ["kabbale-theurgie", "Kabbale & Théurgie", 15000, "En pause", 12, "", "https://page.laforge-hub.com/kabbale-theurgie"],
    ["un-petit-livre", "Un Petit Livre pour les Grands Esprits", 15000, "En pause", 13, "", "https://page.laforge-hub.com/un-petit-livre"],
    ["market-entry", "Diagnostic entrée de marché", 0, "En pause", 14, "", "https://www.africasamurai.com/market-entry.html"],
    ["bid-partner", "Partenaire candidature bailleur", 0, "En pause", 15, "", "https://www.africasamurai.com/bid-partner.html"],
    ["ensemble", "Ensemble — pilote restaurant", 125000, "En pause", 16, "", "https://ensemble.laforge-hub.com/"],
  ] as const;

  for (const offer of offers) seedOffer.run(...offer);
}

function rows<T>(statement: Database.Statement, ...params: (string | number | null)[]) {
  return statement.all(...params) as T[];
}

function runTransaction<T>(db: Database.Database, action: () => T) {
  db.exec("BEGIN IMMEDIATE");
  try {
    const result = action();
    db.exec("COMMIT");
    return result;
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

export function getDashboardData() {
  const db = getDatabase();
  const goal = Number(
    (db.prepare("SELECT value FROM settings WHERE key = 'revenue_goal'").get() as { value?: string } | undefined)?.value || 350000
  );
  const totals = db.prepare(`
    SELECT
      COALESCE(SUM(paid_amount), 0) AS collected,
      COALESCE(SUM(potential_amount), 0) AS potential,
      COUNT(*) AS opportunities,
      SUM(CASE WHEN temperature = 'Chaud' OR stage IN ('Intérêt', 'Diagnostic ou RDV', 'Proposition', 'Paiement annoncé') THEN 1 ELSE 0 END) AS hot,
      SUM(CASE WHEN next_follow_up_at IS NOT NULL AND datetime(next_follow_up_at) <= datetime('now') AND stage NOT IN ('Payé', 'Livré', 'Perdu') THEN 1 ELSE 0 END) AS due
    FROM opportunities
  `).get() as { collected: number; potential: number; opportunities: number; hot: number; due: number };

  const offers = rows<{
    id: number; slug: string; name: string; price: number; status: string; priority: number;
    page_url: string; prospects: number; collected: number; potential: number; hot: number;
  }>(db.prepare(`
    SELECT o.id, o.slug, o.name, o.price, o.status, o.priority, o.page_url,
      COUNT(p.id) AS prospects,
      COALESCE(SUM(p.paid_amount), 0) AS collected,
      COALESCE(SUM(p.potential_amount), 0) AS potential,
      SUM(CASE WHEN p.temperature = 'Chaud' OR p.stage IN ('Intérêt', 'Diagnostic ou RDV', 'Proposition', 'Paiement annoncé') THEN 1 ELSE 0 END) AS hot
    FROM offers o
    LEFT JOIN opportunities p ON p.offer_id = o.id
    GROUP BY o.id
    ORDER BY o.priority, o.name
  `));

  const opportunities = rows<{
    id: number; contact_id: number; name: string; organisation: string; coordinate: string;
    profile_url: string; offer_name: string; offer_slug: string; status: string; stage: string;
    temperature: string; channel: string; potential_amount: number; paid_amount: number;
    payment_confirmed: number; last_interaction_at: string | null; next_follow_up_at: string | null;
    next_action: string;
  }>(db.prepare(`
    SELECT p.id, p.contact_id, c.name, c.organisation, c.coordinate, c.profile_url,
      o.name AS offer_name, o.slug AS offer_slug, p.status, p.stage, p.temperature,
      p.channel, p.potential_amount, p.paid_amount, p.payment_confirmed,
      p.last_interaction_at, p.next_follow_up_at, p.next_action
    FROM opportunities p
    JOIN contacts c ON c.id = p.contact_id
    JOIN offers o ON o.id = p.offer_id
    ORDER BY
      CASE p.temperature WHEN 'Chaud' THEN 0 WHEN 'Tiède' THEN 1 ELSE 2 END,
      COALESCE(p.next_follow_up_at, '9999-12-31'),
      p.updated_at DESC
    LIMIT 200
  `));

  const interactions = rows<{
    id: number; contact_name: string | null; offer_name: string | null; type: string;
    channel: string; direction: string; result: string; summary: string; occurred_at: string;
  }>(db.prepare(`
    SELECT i.id, c.name AS contact_name, o.name AS offer_name, i.type, i.channel,
      i.direction, i.result, i.summary, i.occurred_at
    FROM interactions i
    LEFT JOIN contacts c ON c.id = i.contact_id
    LEFT JOIN offers o ON o.id = i.offer_id
    ORDER BY datetime(i.occurred_at) DESC
    LIMIT 12
  `));

  const passages = rows<{
    id: number; slot_key: string; offer_name: string | null; slot: string; channels: string;
    responses: number; new_contacts: number; follow_ups: number; confirmed_payments: number;
    collected_amount: number; result: string; occurred_on: string;
  }>(db.prepare(`
    SELECT p.*, o.name AS offer_name
    FROM passages p
    LEFT JOIN offers o ON o.id = p.offer_id
    ORDER BY date(p.occurred_on) DESC, p.slot DESC
    LIMIT 14
  `));

  return {
    goal,
    collected: Number(totals.collected || 0),
    remaining: Math.max(goal - Number(totals.collected || 0), 0),
    potential: Number(totals.potential || 0),
    opportunityCount: Number(totals.opportunities || 0),
    hotCount: Number(totals.hot || 0),
    dueCount: Number(totals.due || 0),
    offers,
    opportunities,
    interactions,
    passages,
  };
}

export function getOpportunity(id: number) {
  const db = getDatabase();
  const opportunity = db.prepare(`
    SELECT p.*, c.name, c.type AS contact_type, c.organisation, c.sector, c.city, c.country,
      c.coordinate, c.email, c.profile_url, c.eligibility, c.notes AS contact_notes,
      o.name AS offer_name, o.slug AS offer_slug, o.price AS offer_price, o.page_url
    FROM opportunities p
    JOIN contacts c ON c.id = p.contact_id
    JOIN offers o ON o.id = p.offer_id
    WHERE p.id = ?
  `).get(id) as Record<string, string | number | null> | undefined;
  if (!opportunity) return null;

  const interactions = rows<Record<string, string | number | null>>(
    db.prepare("SELECT * FROM interactions WHERE opportunity_id = ? ORDER BY datetime(occurred_at) DESC"),
    id
  );
  return { opportunity, interactions };
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function nullable(value: FormDataEntryValue | null) {
  const text = String(value || "").trim();
  return text || null;
}

export function addProspect(form: FormData) {
  const db = getDatabase();
  const name = String(form.get("name") || "").trim();
  const offerId = Number(form.get("offer_id"));
  const channel = String(form.get("channel") || "").trim();
  const coordinate = String(form.get("coordinate") || "").trim();
  const profileUrl = String(form.get("profile_url") || "").trim();
  if (!name || !offerId) throw new Error("Le prospect et l’offre sont obligatoires.");

  const identityKey = String(form.get("identity_key") || "").trim().toLowerCase() ||
    (coordinate || profileUrl || `${name}-${offerId}`).toLowerCase();
  const now = new Date().toISOString();

  runTransaction(db, () => {
    db.prepare(`
      INSERT INTO contacts (
        identity_key, name, type, organisation, sector, city, country, channel,
        coordinate, email, profile_url, eligibility, notes, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(identity_key) DO UPDATE SET
        name = excluded.name,
        organisation = excluded.organisation,
        sector = excluded.sector,
        channel = excluded.channel,
        coordinate = excluded.coordinate,
        email = excluded.email,
        profile_url = excluded.profile_url,
        updated_at = excluded.updated_at
    `).run(
      identityKey, name, String(form.get("type") || "Personne"),
      String(form.get("organisation") || ""), String(form.get("sector") || ""),
      String(form.get("city") || ""), String(form.get("country") || "Bénin"),
      channel, coordinate, String(form.get("email") || ""), profileUrl,
      "Actif", String(form.get("notes") || ""), now
    );

    const contact = db.prepare("SELECT id FROM contacts WHERE identity_key = ?").get(identityKey) as { id: number };
    const offer = db.prepare("SELECT price, page_url FROM offers WHERE id = ?").get(offerId) as { price: number; page_url: string };
    db.prepare(`
      INSERT INTO opportunities (
        contact_id, offer_id, status, stage, temperature, channel, potential_amount,
        first_contact_at, last_interaction_at, next_follow_up_at, next_action, page_sent, notes, updated_at
      ) VALUES (?, ?, 'Contacté', 'Contacté', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(contact_id, offer_id) DO UPDATE SET
        status = excluded.status,
        stage = excluded.stage,
        temperature = excluded.temperature,
        channel = excluded.channel,
        potential_amount = excluded.potential_amount,
        next_follow_up_at = excluded.next_follow_up_at,
        next_action = excluded.next_action,
        notes = excluded.notes,
        updated_at = excluded.updated_at
    `).run(
      contact.id, offerId, String(form.get("temperature") || "Froid"), channel,
      Number(form.get("potential_amount") || offer.price || 0), now, now,
      nullable(form.get("next_follow_up_at")), String(form.get("next_action") || ""),
      offer.page_url, String(form.get("notes") || ""), now
    );
  });
}

export function updateOpportunity(id: number, form: FormData) {
  const db = getDatabase();
  db.prepare(`
    UPDATE opportunities SET
      status = ?, stage = ?, temperature = ?, potential_amount = ?,
      next_follow_up_at = ?, next_action = ?, notes = ?, updated_at = ?
    WHERE id = ?
  `).run(
    String(form.get("status") || "Contacté"),
    String(form.get("stage") || "Contacté"),
    String(form.get("temperature") || "Froid"),
    Number(form.get("potential_amount") || 0),
    nullable(form.get("next_follow_up_at")),
    String(form.get("next_action") || ""),
    String(form.get("notes") || ""),
    new Date().toISOString(),
    id
  );
}

export function addInteraction(id: number, form: FormData) {
  const db = getDatabase();
  const opportunity = db.prepare("SELECT contact_id, offer_id FROM opportunities WHERE id = ?").get(id) as { contact_id: number; offer_id: number };
  const occurredAt = String(form.get("occurred_at") || new Date().toISOString());
  db.prepare(`
    INSERT INTO interactions (
      contact_id, opportunity_id, offer_id, type, channel, direction, result,
      summary, message, page_sent, next_action, follow_up_at, executed_by, occurred_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    opportunity.contact_id, id, opportunity.offer_id,
    String(form.get("type") || "Note"), String(form.get("channel") || ""),
    String(form.get("direction") || "Sortant"), String(form.get("result") || "Aucun signal"),
    String(form.get("summary") || ""), String(form.get("message") || ""),
    String(form.get("page_sent") || ""), String(form.get("next_action") || ""),
    nullable(form.get("follow_up_at")), String(form.get("executed_by") || "Baroka"), occurredAt
  );

  const stageByResult: Record<string, [string, string, string]> = {
    "Information": ["Répondu", "Réponse", "Tiède"],
    "Intérêt": ["Intéressé", "Intérêt", "Tiède"],
    "Chaud": ["Intéressé", "Diagnostic ou RDV", "Chaud"],
    "Refus": ["Perdu", "Perdu", "Froid"],
    "Paiement annoncé": ["Paiement annoncé", "Paiement annoncé", "Chaud"],
  };
  const next = stageByResult[String(form.get("result") || "")];
  if (next) {
    db.prepare(`
      UPDATE opportunities SET status = ?, stage = ?, temperature = ?,
        last_interaction_at = ?, next_follow_up_at = ?, next_action = ?, updated_at = ?
      WHERE id = ?
    `).run(
      next[0], next[1], next[2], occurredAt, nullable(form.get("follow_up_at")),
      String(form.get("next_action") || ""), new Date().toISOString(), id
    );
  } else {
    db.prepare(`
      UPDATE opportunities SET last_interaction_at = ?, next_follow_up_at = ?,
        next_action = ?, updated_at = ? WHERE id = ?
    `).run(
      occurredAt, nullable(form.get("follow_up_at")), String(form.get("next_action") || ""),
      new Date().toISOString(), id
    );
  }
}

export function confirmPayment(id: number, form: FormData) {
  const db = getDatabase();
  const amount = Number(form.get("amount") || 0);
  if (amount <= 0) throw new Error("Le montant encaissé doit être supérieur à zéro.");
  const proof = String(form.get("proof") || "").trim();
  const now = new Date().toISOString();
  const opportunity = db.prepare("SELECT contact_id, offer_id, channel FROM opportunities WHERE id = ?").get(id) as { contact_id: number; offer_id: number; channel: string };

  runTransaction(db, () => {
    db.prepare(`
      UPDATE opportunities SET paid_amount = paid_amount + ?, payment_confirmed = 1,
        payment_proof = ?, status = 'Gagné', stage = 'Payé', temperature = 'Chaud',
        last_interaction_at = ?, next_follow_up_at = NULL, next_action = 'Livrer la prestation',
        updated_at = ? WHERE id = ?
    `).run(amount, proof, now, now, id);
    db.prepare(`
      INSERT INTO interactions (
        contact_id, opportunity_id, offer_id, type, channel, direction, result,
        summary, message, executed_by, occurred_at
      ) VALUES (?, ?, ?, 'Paiement', ?, 'Entrant', 'Paiement confirmé', ?, ?, 'Baroka', ?)
    `).run(
      opportunity.contact_id, id, opportunity.offer_id, opportunity.channel,
      `Paiement confirmé : ${amount} FCFA`, proof, now
    );
  });
}

export function addPassage(form: FormData) {
  const db = getDatabase();
  const occurredOn = String(form.get("occurred_on") || new Date().toISOString().slice(0, 10));
  const slot = String(form.get("slot") || "Matin");
  const slotKey = `${occurredOn}-${slot.toLowerCase()}`;
  db.prepare(`
    INSERT INTO passages (
      slot_key, offer_id, slot, channels, responses, new_contacts, follow_ups,
      pages_sent, confirmed_payments, collected_amount, result, next_priority,
      status, occurred_on
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Terminé', ?)
    ON CONFLICT(slot_key) DO UPDATE SET
      offer_id = excluded.offer_id, channels = excluded.channels,
      responses = excluded.responses, new_contacts = excluded.new_contacts,
      follow_ups = excluded.follow_ups, pages_sent = excluded.pages_sent,
      confirmed_payments = excluded.confirmed_payments,
      collected_amount = excluded.collected_amount, result = excluded.result,
      next_priority = excluded.next_priority
  `).run(
    slotKey, Number(form.get("offer_id")) || null, slot, String(form.get("channels") || ""),
    Number(form.get("responses") || 0), Number(form.get("new_contacts") || 0),
    Number(form.get("follow_ups") || 0), Number(form.get("pages_sent") || 0),
    Number(form.get("confirmed_payments") || 0), Number(form.get("collected_amount") || 0),
    String(form.get("result") || ""), String(form.get("next_priority") || ""), occurredOn
  );
}

function parseRelation(value: unknown) {
  if (Array.isArray(value)) return String(value[0] || "");
  if (typeof value !== "string") return "";
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? String(parsed[0] || "") : value;
  } catch {
    return value;
  }
}

function bool(value: unknown) {
  return value === true || value === 1 || value === "__YES__";
}

export function importNotionData(payload: {
  offers?: Record<string, unknown>[];
  contacts?: Record<string, unknown>[];
  opportunities?: Record<string, unknown>[];
  interactions?: Record<string, unknown>[];
  passages?: Record<string, unknown>[];
  journal?: Record<string, unknown>[];
}) {
  const db = getDatabase();
  const imported = { offers: 0, contacts: 0, opportunities: 0, interactions: 0, passages: 0, journal: 0 };

  runTransaction(db, () => {
    for (const item of payload.offers || []) {
      const name = String(item.Offre || "").trim();
      if (!name) continue;
      db.prepare(`
        INSERT INTO offers (slug, name, price, currency, status, priority, target, page_url, notion_url, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(name) DO UPDATE SET
          price = excluded.price, currency = excluded.currency, status = excluded.status,
          priority = excluded.priority, target = excluded.target, page_url = excluded.page_url,
          notion_url = excluded.notion_url, updated_at = excluded.updated_at
      `).run(
        slugify(name), name, Number(item["Prix minimum"] || 0), String(item.Devise || "FCFA"),
        String(item.Statut || "En pause"), Number(item["Priorité"] || 9),
        String(item.Cible || ""), String(item["Page de vente"] || ""),
        String(item.url || ""), new Date().toISOString()
      );
      imported.offers++;
    }

    for (const item of payload.contacts || []) {
      const name = String(item.Contact || "").trim();
      const notionUrl = String(item.url || "");
      if (!name) continue;
      const identity = String(item["Clé unique"] || item.Email || item.Profil || item["Coordonnée principale"] || notionUrl || name).toLowerCase();
      db.prepare(`
        INSERT INTO contacts (
          identity_key, name, type, sector, city, country, channel, coordinate,
          email, profile_url, eligibility, notes, notion_url, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(identity_key) DO UPDATE SET
          name = excluded.name, type = excluded.type, sector = excluded.sector,
          city = excluded.city, country = excluded.country, channel = excluded.channel,
          coordinate = excluded.coordinate, email = excluded.email,
          profile_url = excluded.profile_url, eligibility = excluded.eligibility,
          notes = excluded.notes, notion_url = excluded.notion_url, updated_at = excluded.updated_at
      `).run(
        identity, name, String(item.Type || "Personne"), String(item.Secteur || ""),
        String(item.Ville || ""), String(item.Pays || ""), String(item["Canal source"] || ""),
        String(item["Coordonnée principale"] || ""), String(item.Email || ""),
        String(item.Profil || ""), String(item["Éligibilité"] || "Actif"),
        String(item.Notes || ""), notionUrl, new Date().toISOString()
      );
      imported.contacts++;
    }

    for (const item of payload.opportunities || []) {
      const name = String(item.Prospect || "").trim();
      const offerName = String(item.Offre || "").trim();
      if (!name || !offerName) continue;

      let contact = null as { id: number } | null;
      const contactNotionUrl = parseRelation(item["Contact lié"]);
      if (contactNotionUrl) {
        contact = db.prepare("SELECT id FROM contacts WHERE notion_url = ?").get(contactNotionUrl) as { id: number } | undefined || null;
      }
      if (!contact) {
        const identity = String(item.Contact || item.Profil || item.url || name).toLowerCase();
        db.prepare("INSERT OR IGNORE INTO contacts (identity_key, name, coordinate, profile_url, notion_url) VALUES (?, ?, ?, ?, ?)")
          .run(identity, name, String(item.Contact || ""), String(item.Profil || ""), "");
        contact = db.prepare("SELECT id FROM contacts WHERE identity_key = ?").get(identity) as { id: number };
      }

      let offer = db.prepare("SELECT id FROM offers WHERE name = ?").get(offerName) as { id: number } | undefined;
      if (!offer) {
        db.prepare("INSERT INTO offers (slug, name) VALUES (?, ?)").run(slugify(offerName), offerName);
        offer = db.prepare("SELECT id FROM offers WHERE name = ?").get(offerName) as { id: number };
      }

      db.prepare(`
        INSERT INTO opportunities (
          contact_id, offer_id, status, stage, temperature, channel, potential_amount,
          paid_amount, payment_confirmed, payment_proof, first_contact_at,
          last_interaction_at, next_follow_up_at, next_action, page_sent, notes,
          notion_url, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(contact_id, offer_id) DO UPDATE SET
          status = excluded.status, stage = excluded.stage, temperature = excluded.temperature,
          channel = excluded.channel, potential_amount = excluded.potential_amount,
          paid_amount = excluded.paid_amount, payment_confirmed = excluded.payment_confirmed,
          payment_proof = excluded.payment_proof, first_contact_at = excluded.first_contact_at,
          last_interaction_at = excluded.last_interaction_at,
          next_follow_up_at = excluded.next_follow_up_at, next_action = excluded.next_action,
          page_sent = excluded.page_sent, notes = excluded.notes,
          notion_url = excluded.notion_url, updated_at = excluded.updated_at
      `).run(
        contact.id, offer.id, String(item.Statut || "Nouveau"),
        String(item["Étape système"] || "À qualifier"), String(item["Température"] || "Froid"),
        String(item.Canal || ""), Number(item["Montant potentiel"] || 0),
        Number(item["Montant encaissé"] || 0), bool(item["Paiement confirmé"]) ? 1 : 0,
        String(item["Preuve de paiement"] || ""), item["date:Premier contact:start"] ? String(item["date:Premier contact:start"]) : null,
        item["date:Dernière interaction:start"] ? String(item["date:Dernière interaction:start"]) : null,
        item["date:Prochaine relance:start"] ? String(item["date:Prochaine relance:start"]) : null,
        String(item["Action suivante"] || ""), String(item["Page de vente"] || ""),
        String(item.Notes || ""), String(item.url || ""), new Date().toISOString()
      );
      imported.opportunities++;
    }

    for (const item of payload.interactions || []) {
      const notionUrl = String(item.url || "");
      if (!notionUrl) continue;
      const contactUrl = parseRelation(item.Contact);
      const opportunityUrl = parseRelation(item.Opportunité);
      const offerUrl = parseRelation(item.Offre);
      const contact = contactUrl ? db.prepare("SELECT id FROM contacts WHERE notion_url = ?").get(contactUrl) as { id: number } | undefined : undefined;
      const opportunity = opportunityUrl ? db.prepare("SELECT id FROM opportunities WHERE notion_url = ?").get(opportunityUrl) as { id: number } | undefined : undefined;
      const offer = offerUrl ? db.prepare("SELECT id FROM offers WHERE notion_url = ?").get(offerUrl) as { id: number } | undefined : undefined;
      db.prepare(`
        INSERT OR IGNORE INTO interactions (
          contact_id, opportunity_id, offer_id, type, channel, direction, result,
          summary, message, page_sent, next_action, follow_up_at, executed_by,
          occurred_at, notion_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        contact?.id || null, opportunity?.id || null, offer?.id || null,
        String(item.Type || "Note"), String(item.Canal || ""), String(item.Direction || "Interne"),
        String(item["Résultat"] || "Aucun signal"), String(item["Résumé"] || ""),
        String(item.Message || ""), String(item["Page envoyée"] || ""),
        String(item["Prochaine action"] || ""),
        item["date:Relance prévue:start"] ? String(item["date:Relance prévue:start"]) : null,
        String(item["Exécuté par"] || "Codex"),
        String(item["date:Date:start"] || item.createdTime || new Date().toISOString()), notionUrl
      );
      imported.interactions++;
    }

    for (const item of payload.passages || []) {
      const slotKey = String(item["Clé du passage"] || item.url || "");
      if (!slotKey) continue;
      const offerUrl = parseRelation(item.Campagne);
      const offer = offerUrl ? db.prepare("SELECT id FROM offers WHERE notion_url = ?").get(offerUrl) as { id: number } | undefined : undefined;
      db.prepare(`
        INSERT OR REPLACE INTO passages (
          slot_key, offer_id, slot, channels, responses, new_contacts, follow_ups,
          pages_sent, confirmed_payments, collected_amount, result, next_priority,
          status, occurred_on, notion_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        slotKey, offer?.id || null, String(item["Créneau"] || ""),
        String(item["Canaux vérifiés"] || ""), Number(item["Réponses traitées"] || 0),
        Number(item["Nouveaux contacts"] || 0), Number(item.Relances || 0),
        Number(item["Pages envoyées"] || 0), Number(item["Paiements confirmés"] || 0),
        Number(item["Montant encaissé"] || 0), String(item["Résultat"] || ""),
        String(item["Prochaine priorité"] || ""), String(item.Statut || "Terminé"),
        String(item["date:Date:start"] || new Date().toISOString().slice(0, 10)),
        String(item.url || "")
      );
      imported.passages++;
    }
  });
  return imported;
}
