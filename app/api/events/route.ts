import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "jollyjoker2026";
const DATA_FILE = path.join(process.cwd(), "data", "events.json");

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  if (!auth) return false;
  const token = auth.replace("Bearer ", "");
  return token === ADMIN_PASSWORD;
}

function readEvents() {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

function writeEvents(events: unknown[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(events, null, 2), "utf-8");
}

// GET - public, no auth needed
export async function GET() {
  const events = readEvents();
  return NextResponse.json(events);
}

// POST - add event
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const events = readEvents();
  const newEvent = {
    id: Date.now().toString(),
    date: body.date,
    time: body.time || "22:00",
    artist: body.artist,
    description: body.description || "",
    ticketUrl: body.ticketUrl || "",
    imageUrl: body.imageUrl || "",
  };
  events.push(newEvent);
  writeEvents(events);
  return NextResponse.json(newEvent, { status: 201 });
}

// PUT - update event
export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const events = readEvents();
  const index = events.findIndex((e: { id: string }) => e.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  events[index] = { ...events[index], ...body };
  writeEvents(events);
  return NextResponse.json(events[index]);
}

// DELETE - remove event
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  let events = readEvents();
  events = events.filter((e: { id: string }) => e.id !== id);
  writeEvents(events);
  return NextResponse.json({ ok: true });
}
