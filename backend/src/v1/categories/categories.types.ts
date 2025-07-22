export type EONETCategoriesResponse = {
    title: string;
    description: string;
    link: string;
    categories: EONETCategory[];
};

export type EONETCategory = {
    id: string;
    title: string;
    link: string;
    description: string;
    layers: string;
};