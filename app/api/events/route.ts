import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

function checkAuth(req: NextRequest, password: string): boolean {
  const auth = req.headers.get("authorization");
  if (!auth) return false;
  return auth.replace("Bearer ", "") === password;
}

export async function GET() {
  const { env } = await getCloudflareContext({ async: true });
  const db = env.DB;
  const result = await db.prepare("SELECT * FROM events ORDER BY date ASC").all();
  return NextResponse.json(result.results);
}

export async function POST(req: NextRequest) {
  const { env } = await getCloudflareContext({ async: true });
  if (!checkAuth(req, env.ADMIN_PASSWORD)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const id = Date.now().toString();
  await env.DB.prepare(
    "INSERT INTO events (id, date, time, artist, description, ticketUrl, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)"
  )
    .bind(id, body.date, body.time || "22:00", body.artist, body.description || "", body.ticketUrl || "", body.imageUrl || "")
    .run();
  return NextResponse.json({ id, ...body }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { env } = await getCloudflareContext({ async: true });
  if (!checkAuth(req, env.ADMIN_PASSWORD)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  await env.DB.prepare(
    "UPDATE events SET date=?, time=?, artist=?, description=?, ticketUrl=?, imageUrl=? WHERE id=?"
  )
    .bind(body.date, body.time, body.artist, body.description || "", body.ticketUrl || "", body.imageUrl || "", body.id)
    .run();
  return NextResponse.json(body);
}

export async function DELETE(req: NextRequest) {
  const { env } = await getCloudflareContext({ async: true });
  if (!checkAuth(req, env.ADMIN_PASSWORD)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await env.DB.prepare("DELETE FROM events WHERE id=?").bind(id).run();
  return NextResponse.json({ ok: true });
}
