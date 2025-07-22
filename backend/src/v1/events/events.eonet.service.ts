import { EONETService } from "../infrastructure/services/eonet";
import { Event } from "../infrastructure/models/event";
import { EONETEvent, EONETEventsResponse } from "./events.types";

class EONETEventsService extends EONETService {
    constructor() {
        super();
    }

    public getEvents = async (categories?: string, days?: number, ongoing?: boolean): Promise<Event[]> => {
        const status = ongoing ? "open" : "all";

        const response = await this.getService().get<EONETEventsResponse>("/events", {
            params: {
                category: categories,
                days,
                status
            }
        });

        if (response.status !== 200 || !response.data)
            return [];

        try {
            return response.data.events.map(e => new Event(e));
        } catch (error: any) {
            if (error.message !== "Geometry not suported!")
                throw error;
        }
    }

    public getEvent = async (eventId: string): Promise<Event | undefined> => {
        const response = await this.getService().get<EONETEvent>(`/events/${eventId}`);

        if (response.status !== 200 || !response.data)
            return;

        try {
            return new Event(response.data);
        } catch (error: any) {
            if (error.message !== "Geometry not suported!")
                throw error;
        }
    }
}

export { EONETEventsService };