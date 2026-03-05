"use client";

import { useState, FormEvent } from "react";

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Build mailto link as placeholder
    const subject = encodeURIComponent(
      `Pöytävaraus: ${formData.name} - ${formData.date}`
    );
    const body = encodeURIComponent(
      `Nimi: ${formData.name}\nSähköposti: ${formData.email}\nPuhelin: ${formData.phone}\nPäivämäärä: ${formData.date}\nHenkilömäärä: ${formData.guests}\nViesti: ${formData.message}`
    );
    window.location.href = `mailto:eve@jollyjoker.fi?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🃏</div>
        <h3 className="text-2xl font-bold text-gold mb-2">Kiitos varauksestasi!</h3>
        <p className="text-gray-400">
          Sähköpostiohjelma avautui varauksen tiedoilla. Lähetä viesti niin vahvistamme
          varauksesi.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-violet hover:text-primary transition-colors text-sm underline"
        >
          Tee uusi varaus
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-1">
          Nimi *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-black/50 border border-violet/30 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-1">
            Sähköposti *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-black/50 border border-violet/30 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-1">
            Puhelin
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-black/50 border border-violet/30 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-semibold text-gray-300 mb-1">
            Päivämäärä *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="w-full bg-black/50 border border-violet/30 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label htmlFor="guests" className="block text-sm font-semibold text-gray-300 mb-1">
            Henkilömäärä *
          </label>
          <select
            id="guests"
            name="guests"
            required
            value={formData.guests}
            onChange={handleChange}
            className="w-full bg-black/50 border border-violet/30 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
          >
            <option value="">Valitse</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "henkilö" : "henkilöä"}
              </option>
            ))}
            <option value="10+">Yli 10</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-1">
          Viesti / toiveet
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-black/50 border border-violet/30 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
          placeholder="Esim. syntymäpäiväjuhlat, erikoistoiveet..."
        />
      </div>

      <button
        type="submit"
        className="w-full btn-glow bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-sm uppercase tracking-wider transition-all"
      >
        Lähetä varaus
      </button>
    </form>
  );
}
