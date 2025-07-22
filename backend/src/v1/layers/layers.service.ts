import { cacheConstants } from "../infrastructure/constants";
import { Layer } from "../infrastructure/models/layer";
import { EONETService } from "../infrastructure/services/eonet";
import NodeCache from "node-cache";
import { EONETLayersResponse } from "./layers.types";

class LayersService extends EONETService {
    cache: NodeCache;

    constructor() {
        super();
        this.cache = new NodeCache();
    }

    public getLayers = async (categories: string[]): Promise<Layer[]> => {
        const mappedLayers: Record<string, Layer> = {};
        const promises = categories.map(c => this.getLayer(c, mappedLayers));
        await Promise.all(promises);

        return Object.values(mappedLayers);
    }

    private getLayer = async (category: string, mappedLayers: Record<string, Layer>): Promise<void> => {
        const key = `${cacheConstants.keys.LAYERS}-${category}`;
        let data: EONETLayersResponse = this.cache.get(key);

        if (!data) {
            const response = await this.getService().get<EONETLayersResponse>(`/layers/${category}`);
            if (response.status !== 200 || !response.data)
                return;
            data = response.data;
            this.cache.set(key, data, cacheConstants.ttl.ONEDAY);
        }

        data.categories[0].layers.forEach(l => {
            if (mappedLayers[l.name])
                return;
            mappedLayers[l.name] = new Layer(l, category);
        });
    }
}

export { LayersService };