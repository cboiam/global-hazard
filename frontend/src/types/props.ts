import { SelectChangeEvent } from "@mui/material";
import { Category } from "./category";
import { Event } from "./event";
import { Layer } from "./layer";
import { AppQueryParams } from "./params";
import { ClosedEventByDayAndCategory, EventCountByCategory } from "./types";

export type MenuProps = {
    visible: boolean;
    params: AppQueryParams;
};

export type NavProps = {
    params: AppQueryParams;
};

export type MainProps = {
    params: AppQueryParams;
};

export type ContentPageProps = {
    categories?: Category[];
    params: AppQueryParams;
};

export interface MapProps extends ContentPageProps {
    events?: Event[];
}

export type MapLayersProps = {
    layers?: Layer[];
};

export type MapMarkerProps = {
    events?: Event[];
    categories?: Category[];
};

export type MapCategoriesProps = {
    categories?: Category[];
    params: AppQueryParams;
    expanded: boolean;
    onClick: (expanded: boolean) => void;
};

export interface FilterProps extends ContentPageProps { }

export type DayFilterProps = {
    days: number;
    onChange: (event: SelectChangeEvent<number>) => void;
};

export type OngoingEventsFilterProps = {
    ongoing: boolean;
    onChange: (ongoing: boolean) => void;
};

export type CategoriesFilterProps = {
    categories?: Category[];
    checkedCategories: string[];
    onChange: (id: string, checked: boolean) => void;
    onAllChange: (checked: boolean) => void;
};

export interface ChartProps extends ContentPageProps {
    events?: Event[];
    eventsLoaded: boolean;
}

export type EventCountByCategoryChartProps = {
    data: Record<string, EventCountByCategory>;
};

export type EventsClosedThroughTimeChartProps = {
    data: Record<string, ClosedEventByDayAndCategory>;
    xAxis: string[]
};

export type NumericValueProps = {
    label: string;
    value: number;
    total: number;
};

export type EventSummaryProps = {
    setIsLoading: (isLoading: boolean) => void;
};