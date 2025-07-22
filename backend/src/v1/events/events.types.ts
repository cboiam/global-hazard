import { Request } from "express"

type EventsQueryParams = {
    categories?: string
    days?: string
    ongoing?: string
}

export interface EventsRequest extends Request<
    any,
    any,
    any,
    EventsQueryParams> { }

type EventSummaryParams = {
    eventId: string;
};

export interface EventSummaryRequest extends Request<
    EventSummaryParams,
    any,
    any,
    any> { }

export type EONETEventsResponse = {
    title: string;
    description: string;
    link: string;
    events: EONETEvent[];
};

export type EONETEvent = {
    id: string;
    title: string;
    description: string;
    closed: string;
    categories: EONETEventCategory[];
    sources: EONETEventSource[];
    geometry: EONETEventGeometry[];
};

export type EONETEventCategory = {
    id: string;
    title: string;
};

export type EONETEventSource = {
    id: string;
    url: string;
};

export type EONETEventGeometry = {
    magnitudeValue: number;
    magnitudeUnit: string;
    date: string;
    type: string;
    coordinates: any;
};