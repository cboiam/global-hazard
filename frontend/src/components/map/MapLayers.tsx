import { LayersControl, TileLayer, WMSTileLayer } from "react-leaflet";
import { MapLayersProps } from "../../types/props";

const MapLayers = ({ layers }: MapLayersProps) => {
    const mapLayers = layers?.map(l => (
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
    ));

    return (
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
            {mapLayers ? mapLayers : null}
        </LayersControl>
    );
};

export default MapLayers;