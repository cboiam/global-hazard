import { Request } from "express"

type LayersQueryParams = {
    categories: string;
};

interface LayersRequest extends Request<
    any,
    any,
    any,
    LayersQueryParams> { }

export { LayersRequest };