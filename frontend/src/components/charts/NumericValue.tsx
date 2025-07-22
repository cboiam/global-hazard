import { Stack, Card, Box, Typography } from "@mui/material";
import { GaugeContainer, GaugeReferenceArc, GaugeValueArc } from "@mui/x-charts";
import { NumericValueProps } from "../../types/props";
import "../../styles/charts.css";

const NumericValue = ({ label, value, total }: NumericValueProps) => (
    <Stack direction="row" spacing={1} width="100%">
        <Card className="chartNumericValueCount">
            <Stack alignItems="center" alignContent="center">
                <Box alignContent="center" justifyItems="center" className="chartNumericValueCountLabel">
                    <Typography
                        color="primary"
                        variant="h5"
                        component="div"
                    >
                        {label}
                    </Typography>
                </Box>
                <Typography
                    color="primary"
                    variant="h5"
                    component="div"
                >
                    {value}
                </Typography>
            </Stack>
        </Card>
        <Card className="chartNumericValueGauge">
            <Stack alignContent="center" alignItems="center">
                {total ? (<GaugeContainer
                    width={80}
                    height={80}
                    valueMin={0}
                    valueMax={total}
                    value={value}
                    startAngle={-90}
                    endAngle={90} >
                    <GaugeValueArc />
                    <GaugeReferenceArc />
                </GaugeContainer>) : (
                    <GaugeContainer
                        width={80}
                        height={80}
                        startAngle={-90}
                        endAngle={90} >
                        <GaugeReferenceArc />
                    </GaugeContainer>
                )}
                <Typography
                    color="primary"
                    variant="h5"
                    component="div"
                >
                    {value ? (value / total * 100).toFixed(2) : 0}%
                </Typography>
            </Stack>
        </Card>
    </Stack>
);

export default NumericValue;