import { NavigateFunction } from "react-router";
import { Category } from "../types/category";
import { service } from "./axios";

const getCategories = async (navigate: NavigateFunction): Promise<Category[] | undefined> => {
    try {
        const { data } = await service.get<Category[]>("/categories");
        return data;
    } catch (error) {
        navigate("/error");
    }
};

const getCategoriesQuery = (navigate: NavigateFunction) => ({
    queryKey: ['categories'],
    queryFn: () => getCategories(navigate)
});

export { getCategoriesQuery };