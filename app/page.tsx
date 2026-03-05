import Hero from "@/components/Hero";
import EventList from "@/components/EventList";
import InstagramFeed from "@/components/InstagramFeed";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Seuraavat keikat */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-8 text-center">
          <span className="text-primary">Seuraavat</span>{" "}
          <span className="text-gold">keikat</span>
        </h2>
        <EventList limit={3} />
        <div className="text-center mt-8">
          <Link
            href="/keikat"
            className="text-violet hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider"
          >
            Näytä kaikki keikat &rarr;
          </Link>
        </div>
      </section>

      {/* Instagram */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-8 text-center">
          <span className="text-violet">Instagram</span>
        </h2>
        <InstagramFeed />
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-transparent via-violet/5 to-transparent">
        <h2 className="text-3xl font-extrabold mb-4">
          Varaa <span className="text-gold">pöytä</span>
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Varmista paikkasi illan parhaisiin bileisiin. Varaa pöytä helposti
          verkossa.
        </p>
        <Link
          href="/poytavaraus"
          className="btn-glow inline-block bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-sm uppercase tracking-wider transition-all"
        >
          Varaa nyt
        </Link>
      </section>
    </>
  );
}
