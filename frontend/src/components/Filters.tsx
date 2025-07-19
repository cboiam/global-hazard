import { Alert, Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, MenuItem, Stack, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useLocation, useNavigate } from "react-router";
import qs from "qs";
import { useState } from "react";
import { FilterProps } from "../types/props";
import { AppQueryParams } from "../types/params";

const Filters = ({ categories }: FilterProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const search = qs.parse(location.search.substring(1));

    const [ongoing, setOngoing] = useState(search.ongoing === "1");
    const [days, setDays] = useState((search.days && +search.days) || 7);
    const [checkedCategories, setChecked] = useState((search.categories as string)?.split(",") || []);

    const handleChangeDays = (event: SelectChangeEvent<number>) => {
        setDays(event.target.value);
    };

    const handleChangeCategory = (category: string, checked: boolean) => {
        if (checked) {
            setChecked([...checkedCategories, category]);
            return;
        }
        setChecked(checkedCategories.filter(c => c !== category));
    }

    const handleChangeAllCategories = (checked: boolean) => {
        if (checked && categories) {
            setChecked(categories?.map(c => c.id));
            return;
        }
        setChecked([]);
    }

    const categoryCheckboxes = categories?.map(c => (
        <FormControlLabel
            control={<Checkbox
                checked={checkedCategories.includes(c.id)}
                onChange={(e, checked) => handleChangeCategory(c.id, checked)}
            />}
            label={c.title}
            value={c.id}
            key={c.id}
        />
    )) || [];

    const applyFilter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!categories) return;
        const sortedCategories = categories?.filter(c => checkedCategories.includes(c.id))
            .map(c => c.id)

        const params: AppQueryParams = { days };
        if (sortedCategories?.length) params.categories = sortedCategories.join(",");
        if (ongoing) params.ongoing = "1";

        navigate({
            pathname: location.pathname === "/filters" ? "/" : "/charts",
            search: qs.stringify(params)
        });
    }

    return (
        <form onSubmit={applyFilter}>
            <Stack spacing={1} margin={2} style={{ marginRight: 90 }}>
                <FormGroup>
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
                            onChange={handleChangeDays}
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
                                Loading to many events can lead to issues loading the map, filter specific categories for a smooth experience!
                            </Alert>
                        )}
                    </Stack>
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
                                onChange={(e, checked) => setOngoing(checked)}
                            />}
                            label="Yes"
                        />
                    </Stack>
                    <Divider />
                    <Stack spacing={1} margin={2}>
                        <Typography
                            color="primary"
                            variant="h5"
                            component="div"
                        >
                            Hazards
                        </Typography>
                        <FormControlLabel
                            control={<Checkbox
                                checked={checkedCategories.length === categoryCheckboxes?.length}
                                indeterminate={checkedCategories.length > 0 && checkedCategories.length < categoryCheckboxes?.length}
                                onChange={(e, checked) => handleChangeAllCategories(checked)}
                            />}
                            label="All"
                        />
                        {categoryCheckboxes}
                    </Stack>
                </FormGroup>
            </Stack>
            <Box sx={{ padding: "0 20px 30px" }}>
                <Button
                    type="submit"
                    variant="contained"
                    style={{ width: "100%" }}
                >
                    Apply
                </Button>
            </Box>
        </form>
    );
};

export default Filters;