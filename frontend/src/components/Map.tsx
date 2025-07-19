import qs from "qs";
import { useLocation } from "react-router";
import { LayersControl, MapContainer, Marker, Popup, TileLayer, WMSTileLayer } from "react-leaflet";
import { Card, IconButton, Stack } from "@mui/material";
import { colors } from "../utils/colors";
import { divIcon } from "leaflet";
import { Category } from "../types/category";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from "react";
import { MapProps } from "../types/props";

const Map = ({ categories, events, layers }: MapProps) => {
    const location = useLocation();
    const search = qs.parse(location.search.substring(1));
    const [expanded, setExpanded] = useState(false);

    const markers = events?.map(e => (
        <Marker
            key={e.id}
            icon={divIcon({ html: `<div style="height: 100%;width: 100%;border-radius: 50%;background-color:${colors[categories?.findIndex(c => e.categories[0] === c.id) || 0]}"></div>` })}
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
                    <div>Source: <a target="_blank" rel="noreferrer" href={e.sources[0].url}>
                        {e.sources[0].id}
                    </a></div>
                </Stack>
            </Popup>
        </Marker>
    ));

    const filteredCategories = categories?.filter(c => (search.categories as string[])?.includes(c.id) || !search.categories)
        .map((c: Category, i: number) => (
            <Stack spacing={1} alignItems="center" direction="row" key={c.id}>
                <div style={{ height: 21, width: 21, borderRadius: 8, backgroundColor: colors[i] }}></div>
                {expanded ? <div>{c.title}</div> : null}
            </Stack>
        ));

    return (
        <>
            <MapContainer
                style={{ height: "inherit", zIndex: 0 }}
                center={[0, 0]}
                minZoom={3}
                zoom={3}
                scrollWheelZoom={true}
                worldCopyJump
            >
                <LayersControl position="bottomleft">
                    <LayersControl.BaseLayer checked name="Open Street">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="MODIS_Terra_CorrectedReflectance_Bands721">
                        <WMSTileLayer
                            url="https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi"
                            layers="MODIS_Terra_CorrectedReflectance_Bands721"
                            format="image/png"
                            transparent={true}
                            version="1.3.0"
                            styles=""
                            attribution="NASA GIBS"
                        />
                    </LayersControl.BaseLayer>
                    {layers ? layers?.map(l => (
                        <LayersControl.Overlay name={l.name} key={l.name}>
                            <WMSTileLayer
                                url="https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi"
                                layers={l.name}
                                format="image/png"
                                transparent={true}
                                version="1.3.0"
                                styles=""
                                attribution="NASA GIBS"
                            />
                        </LayersControl.Overlay>
                    )) : null}
                </LayersControl>
                {markers ? markers : null}
            </MapContainer>

            <Card style={{ position: "fixed", bottom: 30, right: 5, padding: 20, paddingTop: 50 }} onClick={() => setExpanded(!expanded)}>
                <IconButton style={{ position: "absolute", top: 5, left: 10, width: 40 }}>
                    {expanded ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
                </IconButton>
                <Stack spacing={1} direction="column">
                    {filteredCategories ? filteredCategories : null}
                </Stack>
            </Card>
        </>
    );
};

export default Map;