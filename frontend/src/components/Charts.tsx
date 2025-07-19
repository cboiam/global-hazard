import qs from "qs";
import { useLocation } from "react-router";
import { ChartProps } from "../types/props";
import { Alert, Grid } from "@mui/material";
import NumericValue from "./NumericValue";
import moment from "moment";
import PieChart from "./PieChart";
import LineChart from "./LineChart";

const Charts = ({ categories, events, eventsLoaded }: ChartProps) => {
    const location = useLocation();
    const search = qs.parse(location.search.substring(1));

    const mappedCategories: any = {};
    categories?.forEach(c => {
        mappedCategories[c.id] = c;
    });

    const mappedDays: any = {};
    const days = (search.days && +search.days) || 7;
    for (let index = days; index >= 0; index--) {
        const date = moment().subtract(index, "days");
        mappedDays[date.format('L')] = 0;
    }

    let openEvents = 0;
    let closedEvents = 0;
    const totalEvents = events?.length ?? 1;
    const eventCountByCategory: any = {};
    const closedEventByDayAndCategory: any = {};
    events?.forEach(e => {
        if (!e.closed)
            openEvents++;
        else
            closedEvents++;

        const formattedClosedDate = e.closed && moment(e.closed).format('L');
        e.categories.forEach(c => {
            if (eventCountByCategory[c]) {
                eventCountByCategory[c].value++;
            }
            else {
                eventCountByCategory[c] = {
                    id: c,
                    label: mappedCategories[c].title,
                    value: 1
                };
            }

            if (!e.closed) return;
            if (closedEventByDayAndCategory[c]) {
                closedEventByDayAndCategory[c].days[formattedClosedDate]++;
            }
            else {
                closedEventByDayAndCategory[c] = {
                    id: c,
                    label: mappedCategories[c].title,
                    days: { ...mappedDays }
                };
            }
        });
    });

    return (
        <Grid container columnSpacing={1} rowSpacing={1} padding="20px">
            {!events?.length && eventsLoaded ? (<Grid size={12}>
                <Alert
                    variant="outlined"
                    severity="warning"
                >
                    There are no incidents so far, try changing the filters!
                </Alert>
            </Grid>) : null}
            <Grid size={{ xs: 12, md: 4 }}>
                <Grid container columnSpacing={1} rowSpacing={1}>
                    <Grid size={12}>
                        <NumericValue label="Open" value={openEvents} total={totalEvents} />
                    </Grid>
                    <Grid size={12}>
                        <NumericValue label="Closed" value={closedEvents} total={totalEvents} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
                <PieChart data={eventCountByCategory} />
            </Grid>
            <Grid size={12}>
                <LineChart data={closedEventByDayAndCategory} xAxis={Object.keys(mappedDays)} />
            </Grid>
        </Grid>
    );
};

export default Charts;