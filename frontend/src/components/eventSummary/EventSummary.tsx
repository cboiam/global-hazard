import { useNavigate, useParams } from "react-router";
import { EventSummaryParams } from "../../types/params";
import { useQuery } from "@tanstack/react-query";
import { getEventSummaryQuery } from "../../queries/eventsQuery";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card } from "@mui/material";
import "../../styles/event-summary.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { divIcon } from "leaflet";
import { EventSummaryProps } from "../../types/props";
import { useEffect } from "react";

const EventSummary = ({ setIsLoading }: EventSummaryProps) => {
    const navigate = useNavigate();

    const params = useParams<EventSummaryParams>();
    const eventSummary = useQuery(getEventSummaryQuery(navigate, params.eventId));
    useEffect(() => {
        setIsLoading(eventSummary.isLoading);
    }, [eventSummary.isLoading])
    if (!eventSummary.data) return null;

    return (
        <><div className="eventSummaryMap">
            <MapContainer
                className="mapContainer"
                center={[eventSummary.data?.geometries[0].coordinates[1], eventSummary.data?.geometries[0].coordinates[0]]}
                minZoom={3}
                zoom={4}
                scrollWheelZoom={true}
                worldCopyJump
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    icon={divIcon({ html: `<div class="mapMarkerDot eventSummaryMarkerDot"></div>` })}
                    position={[eventSummary.data.geometries[0].coordinates[1], eventSummary.data.geometries[0].coordinates[0]]}
                >
                </Marker>
            </MapContainer>
        </div>
            <div className="eventSummaryContainer">
                <Card className="eventSummaryCard">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {eventSummary.data?.summary}
                    </ReactMarkdown>
                </Card>
            </div>
        </>
    );
};

export default EventSummary;