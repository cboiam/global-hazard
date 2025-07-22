import { Response } from "express";
import { EONETEventsService } from "./events.eonet.service";
import { EventsRequest, EventSummaryRequest } from "./events.types";
import { Event } from "../infrastructure/models/event";
import { OpenAIEventsService } from "./events.openai.service";

const eonetService = new EONETEventsService();
const openaiService = new OpenAIEventsService();

class EventsController {
    static getEvents = async (req: EventsRequest, res: Response<Event[]>) => {
        res.send(await eonetService.getEvents(req.query.categories,
            +req.query.days,
            req.query.ongoing === "1"
        ));
    }

    static getEventSummary = async (req: EventSummaryRequest, res: Response<Event>) => {
        const event = await eonetService.getEvent(req.params.eventId);
        if (!event)
            res.sendStatus(404);

        event.summary = await openaiService.getEventSummary(event);
        res.send(event);
    }
}

export { EventsController };