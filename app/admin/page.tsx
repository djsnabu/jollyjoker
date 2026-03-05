"use client";

import { useState, useEffect, FormEvent, useRef } from "react";

interface Event {
  id: string;
  date: string;
  time: string;
  artist: string;
  description: string;
  ticketUrl?: string;
  imageUrl?: string;
}

const emptyEvent = { date: "", time: "22:00", artist: "", description: "", ticketUrl: "", imageUrl: "" };

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState(emptyEvent);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef("");

  function getHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${passwordRef.current}`,
    };
  }

  async function loadEvents() {
    try {
      const res = await fetch("/api/events?t=" + Date.now(), {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        setMessage("Keikkojen lataus: HTTP " + res.status);
        return;
      }
      const text = await res.text();
      if (!text) {
        setMessage("Keikkojen lataus: tyhjä vastaus");
        return;
      }
      const data = JSON.parse(text);
      setEvents(data);
    } catch (err) {
      setMessage("Keikkojen lataus epäonnistui: " + String(err));
    }
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        passwordRef.current = password;
        setAuthed(true);
      } else {
        setMessage("Väärä salasana!");
      }
    } catch (err) {
      setMessage("Yhteysvirhe: " + String(err));
    }
  }

  useEffect(() => {
    if (authed) loadEvents();
  }, [authed]);

  async function handleImageUpload(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${passwordRef.current}` },
        body: formData,
      });
      if (res.ok) {
        const { url } = await res.json();
        setForm((prev) => ({ ...prev, imageUrl: url }));
        setMessage("Kuva ladattu!");
      } else {
        setMessage("Kuvan lataus epäonnistui!");
      }
    } catch {
      setMessage("Kuvan lataus epäonnistui!");
    }
    setUploading(false);
    setTimeout(() => setMessage(""), 3000);
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    const h = getHeaders();
    const payload = editing ? { ...form, id: editing.id } : form;
    const method = editing ? "PUT" : "POST";
    try {
      const res = await fetch("/api/events", {
        method,
        headers: h,
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      if (!res.ok) {
        setMessage(`Virhe ${res.status}: ${text}`);
        setTimeout(() => setMessage(""), 5000);
        return;
      }
      setMessage(editing ? "Keikka päivitetty!" : "Keikka lisätty!");
      setForm(emptyEvent);
      setEditing(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await loadEvents();
    } catch (err) {
      setMessage("Yhteysvirhe: " + String(err));
    }
    setTimeout(() => setMessage(""), 3000);
  }

  async function handleDelete(id: string) {
    if (!confirm("Poistetaanko keikka?")) return;
    await fetch(`/api/events?id=${id}`, { method: "DELETE", headers: getHeaders() });
    setMessage("Keikka poistettu!");
    loadEvents();
    setTimeout(() => setMessage(""), 3000);
  }

  function startEdit(event: Event) {
    setEditing(event);
    setForm({
      date: event.date,
      time: event.time,
      artist: event.artist,
      description: event.description,
      ticketUrl: event.ticketUrl || "",
      imageUrl: event.imageUrl || "",
    });
  }

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 pt-20">
        <form onSubmit={handleLogin} autoComplete="off" className="bg-black/50 border border-violet/30 rounded-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-extrabold mb-6 text-center">
            <span className="text-primary">Admin</span>
          </h1>
          <input
            type="password"
            placeholder="Salasana"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/50 border border-violet/30 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors mb-4"
          />
          <button
            type="submit"
            className="w-full bg-primary hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all"
          >
            Kirjaudu
          </button>
          {message && <p className="text-red-400 text-sm mt-3 text-center">{message}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8">
        <span className="text-primary">Keikkojen</span>{" "}
        <span className="text-gold">hallinta</span>
      </h1>

      {message && (
        <div className="bg-green-900/30 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg mb-6 text-sm">
          {message}
        </div>
      )}

      {/* Add/Edit form */}
      <form onSubmit={handleSave} autoComplete="off" className="bg-black/50 border border-violet/20 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 text-violet">
          {editing ? "Muokkaa keikkaa" : "Lisää uusi keikka"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Artisti *</label>
            <input
              type="text"
              required
              value={form.artist}
              onChange={(e) => setForm({ ...form, artist: e.target.value })}
              className="w-full bg-black/50 border border-violet/30 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Päivämäärä *</label>
            <input
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full bg-black/50 border border-violet/30 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Kellonaika</label>
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full bg-black/50 border border-violet/30 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Lippu-linkki (biletti.fi)</label>
            <input
              type="url"
              value={form.ticketUrl}
              onChange={(e) => setForm({ ...form, ticketUrl: e.target.value })}
              placeholder="https://www.biletti.fi/..."
              className="w-full bg-black/50 border border-violet/30 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Image upload */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">
            Keikkakuva (suositus: 1080x1350px, 4:5 — sama kuin Instagram)
          </label>
          <div className="flex items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
              className="w-full bg-black/50 border border-violet/30 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-violet/20 file:text-violet hover:file:bg-violet/30"
            />
            {uploading && <span className="text-sm text-gold animate-pulse">Ladataan...</span>}
          </div>
          {form.imageUrl && (
            <div className="mt-3 flex items-center gap-3">
              <div className="w-16 aspect-[4/5] relative rounded overflow-hidden border border-violet/30">
                <img src={form.imageUrl} alt="Esikatselu" className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <span className="text-xs text-gray-500">{form.imageUrl}</span>
              </div>
              <button
                type="button"
                onClick={() => setForm({ ...form, imageUrl: "" })}
                className="text-red-400 text-xs hover:text-red-300"
              >
                Poista kuva
              </button>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Kuvaus</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={2}
            className="w-full bg-black/50 border border-violet/30 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-primary hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg text-sm transition-all"
          >
            {editing ? "Tallenna" : "Lisää keikka"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => { setEditing(null); setForm(emptyEvent); if (fileInputRef.current) fileInputRef.current.value = ""; }}
              className="border border-gray-600 text-gray-400 hover:text-foreground py-2 px-6 rounded-lg text-sm transition-all"
            >
              Peruuta
            </button>
          )}
        </div>
      </form>

      {/* Event list */}
      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-black/50 border border-violet/20 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3"
          >
            {event.imageUrl && (
              <div className="w-12 aspect-[4/5] relative rounded overflow-hidden flex-shrink-0">
                <img src={event.imageUrl} alt={event.artist} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-grow">
              <div className="font-bold">{event.artist}</div>
              <div className="text-sm text-gray-400">
                {event.date} klo {event.time} — {event.description}
              </div>
              {event.ticketUrl && (
                <div className="text-xs text-violet mt-1">{event.ticketUrl}</div>
              )}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => startEdit(event)}
                className="bg-violet/20 hover:bg-violet/30 text-violet px-4 py-1.5 rounded text-sm transition-all"
              >
                Muokkaa
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="bg-red-900/20 hover:bg-red-900/40 text-red-400 px-4 py-1.5 rounded text-sm transition-all"
              >
                Poista
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
