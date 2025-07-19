import express from "express";
import { categoriesRouter } from "./categories/categories.router";
import { eventsRouter } from "./events/events.router";
import { layersRouter } from "./layers/layers.router";

const router = express.Router();

router.use("/categories", categoriesRouter);
router.use("/layers", layersRouter);
router.use("/events", eventsRouter);

export { router as v1 };