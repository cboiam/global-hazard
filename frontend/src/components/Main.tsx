import { Route, Routes, useLocation, useNavigate } from "react-router";
import Map from "./Map";
import Filters from "./Filters";
import Charts from "./Charts";
import { useQuery } from "@tanstack/react-query";
import { service } from "../axios";
import { Category } from "../types/category";
import qs from "qs";
import Loading from "./Loading";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Event } from "../types/event";
import { Layer } from "../types/layer";
import Error from "./Error";

const Main = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));

    const search = qs.parse(location.search.substring(1));
    const height = `calc(100vh - ${sm ? 64 : 56}px)`;

    const getCategories = async () => {
        try {
            const { data } = await service.get<Category[]>("/categories");
            return data;
        } catch (error) {
            navigate("/error");
        }
    };
    const categories = useQuery({ queryKey: ['categories'], queryFn: getCategories });

    const getEvents = async () => {
        try {
            const response = await service.get<Event[]>("/events", {
                params: {
                    ongoing: search.ongoing,
                    categories: search.categories,
                    days: search.days || 7,
                },
            });
            return response.data;
        } catch (error) {
            navigate("/error");
        }
    };
    const events = useQuery({ queryKey: ['events', search], queryFn: getEvents });

    const getLayers = async () => {
        try {
            let layerCategories = search.categories;
            if (!layerCategories) {
                layerCategories = categories?.data?.map(c => c.id)?.join(",")
            }
            const response = await service.get<Layer[]>("/layers", {
                params: { categories: layerCategories },
            });
            return response.data;
        } catch (error) { }
    };
    const layers = useQuery({ queryKey: ['layers', search.categories, categories.isFetched], queryFn: getLayers });

    return (
        <Box
            component="main"
            style={{
                height: height,
                maxHeight: height,
                overflowY: "auto"
            }}
        >
            <Routes>
                <Route path="/charts/filters" element={<Filters categories={categories?.data} />} />
                <Route path="/charts" element={<Charts categories={categories?.data} events={events?.data} eventsLoaded={events?.isFetched} />} />
                <Route path="/filters" element={<Filters categories={categories?.data} />} />
                <Route path="/error" element={<Error />} />
                <Route path="/" element={<Map categories={categories?.data} events={events?.data} layers={layers?.data} />} />
            </Routes>
            <Loading visible={categories.isLoading || events.isLoading || layers.isLoading} />
        </Box>
    );
};

export default Main;