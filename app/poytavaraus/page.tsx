import BookingForm from "@/components/BookingForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pöytävaraus | Jolly Joker",
  description: "Varaa pöytä Jolly Jokerista. Yrjönkatu 10, 28100 Pori.",
};

export default function PoytavarausPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-4xl font-extrabold mb-2 text-center">
        <span className="text-gold">Pöytävaraus</span>
      </h1>
      <p className="text-gray-400 text-center mb-12">
        Täytä alla oleva lomake ja vahvistamme varauksesi sähköpostitse.
      </p>
      <BookingForm />
    </div>
  );
}
