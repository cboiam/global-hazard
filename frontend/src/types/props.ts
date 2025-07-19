import { Category } from "./category";
import { Event } from "./event";
import { Layer } from "./layer";

export type MenuProps = {
    visible: boolean;
};

export type MapProps = {
    categories?: Category[];
    events?: Event[];
    layers?: Layer[];
};

export type ChartProps = {
    categories?: Category[];
    events?: Event[];
    eventsLoaded: boolean;
};

export type FilterProps = {
    categories?: Category[];
};

export type NumericValueProps = {
    label: string;
    value: number;
    total: number;
};

export type PieChartProps = {
    data: any;
};

export type LineChartProps = {
    data: any;
    xAxis: string[]
};