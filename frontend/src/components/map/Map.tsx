import { useState } from "react";
import { MapProps } from "../../types/props";
import { useQuery } from "@tanstack/react-query";
import { getLayersQuery } from "../../queries/layersQuery";
import MapLayers from "./MapLayers";
import MapMarkers from "./MapMarkers";
import MapCategories from "./MapCategories";
import { MapContainer } from "react-leaflet";
import "../../styles/map.css";

const Map = ({ categories, events, params }: MapProps) => {
    const [expanded, setExpanded] = useState(false);

    const layers = useQuery(getLayersQuery(params, categories));

    return (
        <>
            <MapContainer
                className="mapContainer"
                center={[0, 0]}
                minZoom={3}
                zoom={3}
                scrollWheelZoom={true}
                worldCopyJump
            >
                <MapLayers layers={layers.data} />
                <MapMarkers events={events} categories={categories} />
            </MapContainer>
            <MapCategories params={params} categories={categories} expanded={expanded} onClick={setExpanded} />
        </>
    );
};

export default Map;