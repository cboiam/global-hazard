import express from "express";
import { EventsController } from "./events.controller";

const router = express.Router();

router.get("/", EventsController.getEvents);

export { router as eventsRouter };