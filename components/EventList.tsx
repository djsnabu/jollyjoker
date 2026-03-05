import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Event } from "@/data/events";
import EventCard from "./EventCard";

async function getEvents(): Promise<Event[]> {
  const { env } = await getCloudflareContext({ async: true });
  const result = await env.DB.prepare("SELECT * FROM events ORDER BY date ASC").all();
  return result.results as Event[];
}

export default async function EventList({ limit }: { limit?: number }) {
  const allEvents = await getEvents();
  const displayEvents = limit ? allEvents.slice(0, limit) : allEvents;

  return (
    <div className="space-y-4">
      {displayEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
