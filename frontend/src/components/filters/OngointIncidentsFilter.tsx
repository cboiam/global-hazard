import { Stack, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { OngoingEventsFilterProps } from "../../types/props";

const OngoingIncidentsFilter = ({ ongoing, onChange }: OngoingEventsFilterProps) => (
    <Stack spacing={1} margin={2}>
        <Typography
            color="primary"
            variant="h5"
            component="div"
        >
            Ongoing incidents
        </Typography>
        <FormControlLabel
            control={<Checkbox
                checked={ongoing}
                onChange={(e, checked) => onChange(checked)}
            />}
            label="Yes"
        />
    </Stack>
);

export default OngoingIncidentsFilter;