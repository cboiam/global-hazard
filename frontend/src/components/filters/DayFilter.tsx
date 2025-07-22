import { Stack, Typography, Select, MenuItem, Alert } from "@mui/material";
import { DayFilterProps } from "../../types/props";

const DayFilter = ({ days, onChange }: DayFilterProps) =>
(
    <Stack spacing={1} margin={2}>
        <Typography
            color="primary"
            variant="h5"
            component="div"
        >
            Days
        </Typography>
        <Select
            value={days}
            onChange={onChange}
        >
            <MenuItem value={7}>Last 7 days</MenuItem>
            <MenuItem value={15}>Last 15 days</MenuItem>
            <MenuItem value={30}>Last 30 days</MenuItem>
            <MenuItem value={60}>Last 60 days</MenuItem>
            <MenuItem value={90}>Last 90 days</MenuItem>
        </Select>
        {days < 60 ? null : (
            <Alert
                variant="outlined"
                severity="warning"
            >
                Loading too many events can lead to issues loading the map, filter specific categories for a smooth experience!
            </Alert>
        )}
    </Stack>
);

export default DayFilter;