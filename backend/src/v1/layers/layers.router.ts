import express from "express";
import { LayerController } from "./layers.controller";

const router = express.Router();

router.get("/", LayerController.getLayers);

export { router as layersRouter };