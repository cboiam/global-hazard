export type EventCountByCategory = {
    id: string;
    label: string;
    value: number
};

export type ClosedEventByDayAndCategory = {
    id: string;
    label: string;
    days: Record<string, number>;
};