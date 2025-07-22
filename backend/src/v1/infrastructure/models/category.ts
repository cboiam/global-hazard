import { EONETCategory } from "../../categories/categories.types";

class Category {
    id: string;
    title: string;
    description: string;

    constructor(data: EONETCategory) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
    }
}

export { Category };