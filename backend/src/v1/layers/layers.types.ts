import { Request } from "express"

type LayersQueryParams = {
    categories: string;
};

export interface LayersRequest extends Request<
    any,
    any,
    any,
    LayersQueryParams> { }

export type EONETLayersResponse = {
    title: string;
    description: string;
    link: string;
    categories: EONETLayerCategory[];
};

export type EONETLayerCategory = {
    id: number;
    title: string;
    layers: EONETLayer[];
};

export type EONETLayer = {
    name: string;
    serviceUrl: string;
    serviceTypeId: string;
    parameters: any[];
};