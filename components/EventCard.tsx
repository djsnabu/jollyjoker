import { Event } from "@/data/events";
import Image from "next/image";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("fi-FI", {
    weekday: "short",
    day: "numeric",
    month: "numeric",
  });
}

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="group bg-black/50 border border-violet/20 rounded-lg overflow-hidden hover:border-primary/50 transition-all hover:bg-black/70">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Event image (4:5 aspect ratio) */}
        {event.imageUrl && (
          <div className="flex-shrink-0 sm:w-[120px] aspect-[4/5] relative overflow-hidden">
            <Image
              src={event.imageUrl}
              alt={event.artist}
              fill
              className="object-cover"
              sizes="120px"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-grow p-6">
          {/* Date badge */}
          <div className="flex-shrink-0 bg-violet/10 border border-violet/30 rounded-lg px-4 py-2 text-center min-w-[80px]">
            <div className="text-xs text-violet uppercase font-semibold">
              {formatDate(event.date)}
            </div>
            <div className="text-sm text-gray-400">{event.time}</div>
          </div>

          {/* Info */}
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {event.artist}
            </h3>
            <p className="text-sm text-gray-400 mt-1">{event.description}</p>
          </div>

          {/* Ticket button */}
          {event.ticketUrl && (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 btn-glow bg-primary hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg text-xs uppercase tracking-wider transition-all"
            >
              Osta liput
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
