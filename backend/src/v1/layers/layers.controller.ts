import { Request, Response } from "express";
import { LayersService } from "./layers.service";
import { Layer } from "../infrastructure/models/layer";
import { LayersRequest } from "./layers.type";

const service = new LayersService();

class LayerController {
    static getLayers = async (req: LayersRequest, res: Response<Layer[]>) => {
        res.send(await service.getLayers(req.query.categories?.split(",")));
    }
}

export { LayerController };