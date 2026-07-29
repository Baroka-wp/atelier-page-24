import { createHmac, timingSafeEqual } from "node:crypto";

export const COCKPIT_COOKIE = "asc_cockpit_session";

const sessionDurationSeconds = 60 * 60 * 24 * 7;

function signingSecret() {
  const secret = process.env.COCKPIT_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV !== "production") return "asc-cockpit-local-development-secret";
  throw new Error("COCKPIT_SECRET is required in production.");
}

function signature(value: string) {
  return createHmac("sha256", signingSecret()).update(value).digest("base64url");
}

export function createSessionToken() {
  const expiresAt = Math.floor(Date.now() / 1000) + sessionDurationSeconds;
  const payload = `asc:${expiresAt}`;
  return `${payload}.${signature(payload)}`;
}

export function verifySessionToken(token?: string | null) {
  if (!token) return false;
  const lastDot = token.lastIndexOf(".");
  if (lastDot < 0) return false;

  const payload = token.slice(0, lastDot);
  const received = token.slice(lastDot + 1);
  const expected = signature(payload);

  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  if (
    receivedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(receivedBuffer, expectedBuffer)
  ) {
    return false;
  }

  const [scope, expiresAt] = payload.split(":");
  return scope === "asc" && Number(expiresAt) > Math.floor(Date.now() / 1000);
}

export function verifyPassword(value: string) {
  const expected = process.env.COCKPIT_PASSWORD;
  if (!expected) return process.env.NODE_ENV !== "production" && value === "cockpit-local";

  const receivedBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);
  return (
    receivedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(receivedBuffer, expectedBuffer)
  );
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    maxAge: sessionDurationSeconds,
    path: "/",
    sameSite: "strict" as const,
    secure:
      process.env.NODE_ENV === "production" &&
      process.env.COCKPIT_COOKIE_SECURE !== "false",
  };
}

export function cockpitUrl(request: Request, path: string) {
  return new URL(path, process.env.COCKPIT_BASE_URL || request.url);
}
