import { Card, Typography } from "@mui/material";
import { LineChart as MuiLineChart } from "@mui/x-charts";
import { EventsClosedThroughTimeChartProps } from "../../types/props";
import "../../styles/charts.css";

const EventsClosedThroughTimeChart = ({ data, xAxis }: EventsClosedThroughTimeChartProps) => (
    <Card className="chartEventsClosedThroughTimeChartContainer">
        <Typography
            color="primary"
            variant="h5"
            component="div"
        >
            Events closed through time
        </Typography>
        <MuiLineChart
            height={300}
            series={Object.values(data).map(e => ({
                data: Object.values(e.days),
                label: e.label
            }))}
            xAxis={[{ scaleType: 'point', data: xAxis }]}
        />
    </Card>
);

export default EventsClosedThroughTimeChart;