import { cacheConstants } from "../infrastructure/constants";
import { Layer } from "../infrastructure/models/layer";
import { EONETService } from "../infrastructure/services/eonet";
import NodeCache from "node-cache";

class LayersService extends EONETService {
    cache: NodeCache;

    constructor() {
        super();
        this.cache = new NodeCache();
    }

    public getLayers = async (categories: string[]): Promise<Layer[]> => {
        let layers: Layer[] = this.cache.get(cacheConstants.keys.LAYERS);

        if (layers)
            return layers;

        const mappedLayerNames = [];
        const promises = categories.map(c => this.getLayer(c, mappedLayerNames));
        layers = (await Promise.all(promises)).flat();
        this.cache.set(cacheConstants.keys.LAYERS, layers, cacheConstants.ttl.ONEDAY);

        return layers;
    }

    private getLayer = async (category: string, mappedLayerNames: string[]): Promise<Layer[]> => {
        const response = await this.getService().get(`/layers/${category}`);
        if (response.status !== 200 || !response.data)
            return [];

        const layers = [];
        response.data.categories[0].layers.forEach(l => {
            if (mappedLayerNames.includes(l.name))
                return;
            mappedLayerNames.push(l.name);
            layers.push(new Layer(l, category));
        });
        return layers;
    }
}

export { LayersService };