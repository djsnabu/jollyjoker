import fs from "fs";
import path from "path";
import { Event } from "@/data/events";
import EventCard from "./EventCard";

function getEvents(): Event[] {
  const filePath = path.join(process.cwd(), "data", "events.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export default function EventList({ limit }: { limit?: number }) {
  const allEvents = getEvents();
  // Sort by date ascending
  allEvents.sort((a, b) => a.date.localeCompare(b.date));
  const displayEvents = limit ? allEvents.slice(0, limit) : allEvents;

  return (
    <div className="space-y-4">
      {displayEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
