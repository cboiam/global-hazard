import { EONETService } from "../infrastructure/services/eonet";
import { Event } from "../infrastructure/models/event";

class EventsService extends EONETService {
    constructor() {
        super();
    }

    public getEvents = async (categories?: string, days?: number, ongoing?: boolean): Promise<Event[]> => {
        const status = ongoing ? "open" : "all";

        const response = await this.getService().get("/events", {
            params: {
                category: categories,
                days,
                status
            }
        });

        if (response.status !== 200 || !response.data)
            return [];

        return response.data.events.map(e => {
            try {
                return new Event(e);
            } catch (error: any) {
                if (error.message !== "Geometry not suported!")
                    throw error;
            }
        });
    }
}

export { EventsService };