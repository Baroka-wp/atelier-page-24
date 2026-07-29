import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { COCKPIT_COOKIE, verifySessionToken } from "@/lib/cockpit/auth";

export const dynamic = "force-dynamic";

export default async function CockpitLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const cookieStore = await cookies();
  if (verifySessionToken(cookieStore.get(COCKPIT_COOKIE)?.value)) redirect("/cockpit");
  const { error } = await searchParams;

  return (
    <main className="cockpit-login">
      <section className="login-panel">
        <Link className="cockpit-mark" href="/" aria-label="Retour au site Africa Samurai">
          <img src="/samurai-logo.png" alt="" width="48" height="48" />
          <span><strong>Africa Samurai</strong><small>Cockpit commercial privé</small></span>
        </Link>
        <div className="login-copy">
          <p className="cockpit-label">Accès protégé</p>
          <h1>Un seul tableau.<br />Une seule vérité.</h1>
          <p>
            Pipeline, relances, passages et paiements sont centralisés dans la
            base privée Africa Samurai.
          </p>
        </div>
        <form action="/api/cockpit/session" method="post" className="login-form">
          <label>
            Mot de passe
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          {error === "invalid" && <p className="form-error">Mot de passe incorrect.</p>}
          {error === "blocked" && <p className="form-error">Trop de tentatives. Réessayez dans 15 minutes.</p>}
          <button type="submit">Ouvrir le cockpit</button>
        </form>
      </section>
      <aside className="login-aside" aria-label="Objectif commercial">
        <div>
          <span>Objectif</span>
          <strong>350 000</strong>
          <small>FCFA encaissés</small>
        </div>
        <p>IA pour tous · PMP Ready</p>
      </aside>
    </main>
  );
}
