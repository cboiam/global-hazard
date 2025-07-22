import { Route, Routes, useNavigate } from "react-router";
import Map from "./map/Map";
import Filters from "./filters/Filters";
import Charts from "./charts/Charts";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import { Box } from "@mui/material";
import Error from "./Error";
import { getCategoriesQuery } from "../queries/categoriesQuery";
import { getEventsQuery } from "../queries/eventsQuery";
import "../styles/layout.css";
import EventSummary from "./eventSummary/EventSummary";
import { MainProps } from "../types/props";
import { useEffect, useState } from "react";

const Main = ({ params }: MainProps) => {
    const navigate = useNavigate();

    const categories = useQuery(getCategoriesQuery(navigate));
    const events = useQuery(getEventsQuery(params, navigate));

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(categories.isLoading || events.isLoading)
    }, [categories.isLoading, events.isLoading]);

    return (
        <Box component="main" id="main">
            <Routes>
                <Route path="/charts/filters" element={
                    <Filters
                        categories={categories?.data}
                        params={params}
                    />}
                />
                <Route path="/charts" element={
                    <Charts
                        categories={categories?.data}
                        events={events?.data}
                        eventsLoaded={events?.isFetched}
                        params={params}
                    />}
                />
                <Route path="/filters" element={
                    <Filters
                        categories={categories?.data}
                        params={params}
                    />}
                />
                <Route path="/events/:eventId/summary" element={
                    <EventSummary setIsLoading={setIsLoading} />}
                />
                <Route path="/error" element={
                    <Error />}
                />
                <Route path="/" element={
                    <Map
                        categories={categories?.data}
                        events={events?.data}
                        params={params}
                    />}
                />
            </Routes>
            <Loading visible={isLoading} />
        </Box>
    );
};

export default Main;