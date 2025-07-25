import { Card, Typography, useMediaQuery, useTheme } from "@mui/material";
import { PieChart as MuiPieChart } from "@mui/x-charts";
import { EventCountByCategoryChartProps } from "../../types/props";
import "../../styles/charts.css";

const EventCountByCategoryChart = ({ data }: EventCountByCategoryChartProps) => {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));

    let innerRadius = 15;
    let outerRadius = 45;
    if (sm) {
        innerRadius = 20;
        outerRadius = 70;
    }
    else if (md) {
        innerRadius = 30;
        outerRadius = 100;
    }

    return (
        <Card className="chartEventCountByCategoryContainer">
            <Typography
                color="primary"
                variant="h5"
                component="div"
            >
                Event count by category
            </Typography>
            <MuiPieChart
                series={[
                    {
                        data: Object.keys(data).map((i: string) => ({ ...data[i] })),
                        innerRadius: innerRadius,
                        outerRadius: outerRadius,
                        paddingAngle: 2,
                        cornerRadius: 5,
                        startAngle: 0,
                        endAngle: 360,
                        sortingValues: "desc",
                    }
                ]}
            />
        </Card>
    );
};

export default EventCountByCategoryChart;