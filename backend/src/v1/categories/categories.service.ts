import { cacheConstants } from "../infrastructure/constants";
import { Category } from "../infrastructure/models/category";
import { EONETService } from "../infrastructure/services/eonet";
import NodeCache from "node-cache";
import { EONETCategoriesResponse } from "./categories.types";

class CategoriesService extends EONETService {
    cache: NodeCache;

    constructor() {
        super();
        this.cache = new NodeCache();
    }

    public getCategories = async (): Promise<Category[]> => {
        let categories: Category[] = this.cache.get(cacheConstants.keys.CATEGORIES);

        if (categories)
            return categories;

        const response = await this.getService().get<EONETCategoriesResponse>("/categories");
        if (response.status !== 200 || !response.data)
            return [];

        categories = response.data.categories.map(c => new Category(c));
        this.cache.set(cacheConstants.keys.CATEGORIES, categories, cacheConstants.ttl.ONEDAY);

        return categories;
    }
}

export { CategoriesService };