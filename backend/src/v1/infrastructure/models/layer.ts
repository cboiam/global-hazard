class Layer {
    name: string;
    serviceUrl: string;
    serviceTypeId: string;
    parameters: any[];
    category: string;

    constructor(data: any, category: string) {
        this.name = data.name;
        this.serviceUrl = data.serviceUrl;
        this.serviceTypeId = data.serviceTypeId;
        this.parameters = data.parameters;
        this.category = category;
    }
}

export { Layer };