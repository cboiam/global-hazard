import { Response } from "express";
import { EventsService } from "./events.service";
import { EventsRequest } from "./events.type";
import { Event } from "../infrastructure/models/event";

const service = new EventsService();

class EventsController {
    static getEvents = async (req: EventsRequest, res: Response<Event[]>) => {
        res.send(await service.getEvents(req.query.categories,
            +req.query.days,
            req.query.ongoing === "1"
        ));
    }
}

export { EventsController };