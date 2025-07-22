export type Event = {
    id: string;
    title: string;
    description: string;
    opened: string;
    closed: string;
    categories: string[];
    geometries: Geometry[];
    sources: Source[];
    summary?: string;
};

export type Geometry = {
    magnitude: number;
    unit: string;
    date: string;
    type: "Point";
    coordinates: number[];
};

export type Source = {
    id: string;
    url: string;
};