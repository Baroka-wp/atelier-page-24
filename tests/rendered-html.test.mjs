import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Page Signature landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Atelier Page 24/);
  assert.match(html, /Votre offre,/);
  assert.match(html, /comprise/);
  assert.match(html, /175 000/);
  assert.match(html, /href="#offre"/);
  assert.match(html, /samurai-logo\.png/);
});

test("server-renders every campaign as a separate offer", async () => {
  const campaigns = [
    ["/coding-express", /Coding Express/],
    ["/automation-sprint", /Automation Sprint/],
    ["/pmp-ready", /Boîte à outils Projet/],
    ["/gestion-de-projet", /Boîte à outils Projet/],
    ["/kabbale-theurgie", /Kabbale/],
    ["/un-petit-livre", /Un Petit Livre/],
    ["/project-room", /PROJECT ROOM/],
  ];

  for (const [pathname, marker] of campaigns) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, marker, pathname);
    if (pathname === "/project-room") {
      assert.match(html, /5 000/);
      assert.match(html, /Présenter mon projet/);
    } else {
      assert.match(html, /href="#proposition"/, pathname);
      assert.match(html, /Retour en haut/, pathname);
    }
  }
});
