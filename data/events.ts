export interface Event {
  id: string;
  date: string;
  time: string;
  artist: string;
  description: string;
  ticketUrl?: string;
  imageUrl?: string;
}

import eventsData from "./events.json";

export const events: Event[] = eventsData;
