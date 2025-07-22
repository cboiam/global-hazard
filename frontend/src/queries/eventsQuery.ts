import { NavigateFunction } from "react-router";
import { service } from "./axios";
import { Event } from "../types/event";
import { AppQueryParams } from "../types/params";

const getEvents = async (params: AppQueryParams, navigate: NavigateFunction): Promise<Event[] | undefined> => {
    try {
        const response = await service.get<Event[]>("/events", {
            params: {
                ongoing: params.ongoing,
                categories: params.categories,
                days: params.days || 7,
            },
        });
        return response.data;
    } catch (error) {
        navigate("/error");
    }
};

const getEventsQuery = (params: AppQueryParams, navigate: NavigateFunction) => ({
    queryKey: ['events', params],
    queryFn: () => getEvents(params, navigate)
});

const getEventSummary = async (navigate: NavigateFunction, eventId?: string): Promise<Event | undefined> => {
    try {
        const response = await service.get<Event>(`/events/${eventId}/summary`);
        return response.data;
    } catch (error) {
        navigate("/error");
    }
};

const getEventSummaryQuery = (navigate: NavigateFunction, eventId?: string) => ({
    queryKey: ['events', eventId],
    queryFn: () => getEventSummary(navigate, eventId)
});

export { getEventsQuery, getEventSummaryQuery };