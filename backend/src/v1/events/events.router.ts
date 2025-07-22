import express from "express";
import { EventsController } from "./events.controller";

const router = express.Router();

router.get("/", EventsController.getEvents);
router.get("/:eventId/summary", EventsController.getEventSummary);

export { router as eventsRouter };