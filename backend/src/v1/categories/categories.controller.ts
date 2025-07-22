import { Request, Response } from "express";
import { CategoriesService } from "./categories.service";
import { Category } from "../infrastructure/models/category";

const service = new CategoriesService();

class CategoriesController {
    static getCategories = async (req: Request, res: Response<Category[]>) => {
        res.send(await service.getCategories());
    };
}

export { CategoriesController };