import { EONETEventSource } from "../../events/events.types";

class Source {
    id: string;
    url: string;

    constructor(data: EONETEventSource) {
        this.id = data.id;
        this.url = data.url;
    }
}

export { Source };