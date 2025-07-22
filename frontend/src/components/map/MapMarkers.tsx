import { Button, Stack } from "@mui/material";
import { Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import { colors } from "../../utils/colors";
import { MapMarkerProps } from "../../types/props";
import { Event } from "../../types/event";
import "../../styles/map.css";
import { Link } from "react-router";

const MapMarkers = ({ events, categories }: MapMarkerProps) => {
    const mapSources = (e: Event) => {
        const sources = [];
        for (let i = 0; i < e.sources.length; i++) {
            sources.push((
                <a key={`${e.id}-${e.sources[i].id}`} target="_blank" rel="noreferrer" href={e.sources[i].url}>
                    {e.sources[i].id}
                </a>
            ));
            if (i < e.sources.length - 1) {
                sources.push(<span>, </span>);
            }
        }
        return sources;
    };

    const markers = events?.map(e =>
        <Marker
            key={e.id}
            icon={divIcon({ html: `<div class="mapMarkerDot" style="background-color:${colors[categories?.findIndex(c => e.categories[0] === c.id) || 0]}"></div>` })}
            position={[e.geometries[0].coordinates[1], e.geometries[0].coordinates[0]]}
        >
            <Popup>
                <Stack>
                    <div><b>{e.title}</b></div>
                    <div>{e.geometries[0].magnitude}{e.geometries[0].unit}</div>
                    <div>
                        {new Date(e.opened).toDateString()}
                        {e.closed ? " - " + new Date(e.closed).toDateString() : null}
                    </div>
                    <div>
                        Sources: {mapSources(e)}
                    </div>
                    <Link to={`/events/${e.id}/summary`} className="mapMarkerLink">
                        <Button variant="contained" className="mapMarkerButton">
                            Show summary
                        </Button>
                    </Link>
                </Stack>
            </Popup>
        </Marker>
    ) || null;

    return (
        <>
            {markers}
        </>
    );
};

export default MapMarkers;