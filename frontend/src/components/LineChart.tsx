import { Card, Typography } from "@mui/material";
import { LineChart as MuiLineChart } from "@mui/x-charts";
import { LineChartProps } from "../types/props";

const LineChart = ({ data, xAxis }: LineChartProps) => (
    <Card style={{ padding: 20 }}>
        <Typography
            color="primary"
            variant="h5"
            component="div"
            sx={{ margin: 0 }}
        >
            Events closed through time
        </Typography>
        <MuiLineChart
            // grid={{ horizontal: true, vertical: true }}
            height={300}
            series={Object.values(data).map((e: any) => ({ data: Object.values(e.days), label: e.label }))}
            xAxis={[{ scaleType: 'point', data: xAxis }]}
        />
    </Card>
);

export default LineChart;