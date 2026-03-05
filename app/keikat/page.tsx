import EventList from "@/components/EventList";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Keikat | Jolly Joker",
  description: "Jolly Jokerin tulevat keikat ja tapahtumat. Osta liput etukäteen!",
};

export default function KeikatPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen">
      <h1 className="text-4xl font-extrabold mb-2 text-center">
        <span className="text-primary">Tulevat</span>{" "}
        <span className="text-gold">keikat</span>
      </h1>
      <p className="text-gray-400 text-center mb-12">
        Katso mitä on luvassa ja nappaa liput ajoissa!
      </p>
      <EventList />
    </div>
  );
}
