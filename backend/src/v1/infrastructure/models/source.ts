class Source {
    id: string;
    url: string;

    constructor(data: any) {
        this.id = data.id;
        this.url = data.url;
    }
}

export { Source };