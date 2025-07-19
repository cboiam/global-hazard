import express from "express";
import { CategoriesController } from "./categories.controller";

const router = express.Router();

router.get("/", CategoriesController.getCategories);

export { router as categoriesRouter };