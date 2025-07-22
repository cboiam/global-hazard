import { Request, Response } from "express";
import { LayersService } from "./layers.service";
import { Layer } from "../infrastructure/models/layer";
import { LayersRequest } from "./layers.types";

const service = new LayersService();

class LayerController {
    static getLayers = async (req: LayersRequest, res: Response<Layer[]>) => {
        const categories = req.query.categories?.split(",");
        if (!categories?.length)
            res.sendStatus(400);
        res.send(await service.getLayers(categories));
    }
}

export { LayerController };