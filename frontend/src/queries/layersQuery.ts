import { Category } from "../types/category";
import { service } from "./axios";
import { AppQueryParams } from "../types/params";
import { Layer } from "../types/layer";

const getLayers = async (params: AppQueryParams, categories?: Category[]): Promise<Layer[]> => {
    try {
        let layerCategories = params.categories;
        if (!layerCategories) {
            if (!categories?.length) {
                return [];
            }
            layerCategories = categories?.map(c => c.id)?.join(",")
        }
        const response = await service.get<Layer[]>("/layers", {
            params: { categories: layerCategories },
        });
        return response.data;
    } catch (error) {
        return [];
    }
};

const getLayersQuery = (params: AppQueryParams, categories?: Category[]) => ({
    queryKey: ['layers', params, categories],
    queryFn: () => getLayers(params, categories)
});

export { getLayersQuery };