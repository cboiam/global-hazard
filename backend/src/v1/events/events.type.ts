import { Request } from "express"

type EventsQueryParams = {
    categories?: string
    days?: string
    ongoing?: string
}

interface EventsRequest extends Request<
    any,
    any,
    any,
    EventsQueryParams> { }

export { EventsRequest }