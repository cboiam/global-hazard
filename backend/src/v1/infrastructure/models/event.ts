import { EONETEvent } from "../../events/events.types";
import { Geometry } from "./geometry";
import { Source } from "./source";

class Event {
    id: string;
    title: string;
    description: string;
    opened: string;
    closed: string;
    categories: string[];
    geometries: Geometry[];
    sources: Source[];
    summary?: string;

    constructor(data: EONETEvent) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.closed = data.closed;

        this.categories = data.categories.map(c => c.id);
        this.sources = data.sources.map(s => new Source(s));
        this.geometries = data.geometry.map(g => new Geometry(g))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        this.opened = this.geometries[0].date;
    }
}

export { Event };