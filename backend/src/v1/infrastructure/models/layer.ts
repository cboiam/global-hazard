import { EONETLayer } from "../../layers/layers.types";

class Layer {
    name: string;
    parameters: any[];
    category: string;

    constructor(data: EONETLayer, category: string) {
        this.name = data.name;
        this.parameters = data.parameters;
        this.category = category;
    }
}

export { Layer };