import { Box, Button, FormGroup, Stack } from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import { useLocation, useNavigate } from "react-router";
import qs from "qs";
import { useState } from "react";
import { FilterProps } from "../../types/props";
import { AppQueryParams } from "../../types/params";
import DayFilter from "./DayFilter";
import OngoingIncidentsFilter from "./OngointIncidentsFilter";
import CategoriesFilter from "./CategoriesFilter";
import "../../styles/filters.css";

const Filters = ({ categories, params }: FilterProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [ongoing, setOngoing] = useState(params.ongoing === "1");
    const [days, setDays] = useState((params.days && +params.days) || 7);
    const [checkedCategories, setChecked] = useState((params.categories as string)?.split(",") || []);

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
            setChecked(categories.map(c => c.id));
            return;
        }
        setChecked([]);
    }

    const applyFilter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!categories) return;
        const sortedCategories = categories.filter(c => checkedCategories.includes(c.id))
            .map(c => c.id)

        const params: AppQueryParams = { days };
        if (sortedCategories?.length) params.categories = sortedCategories.join(",");
        if (ongoing) params.ongoing = "1";

        navigate({
            pathname: location.pathname === "/filters" ? "/" : "/charts",
            search: qs.stringify(params)
        });
    };

    return (
        <form onSubmit={applyFilter}>
            <Stack spacing={1} margin={2} className="filterContainer">
                <FormGroup>
                    <DayFilter
                        days={days}
                        onChange={handleChangeDays}
                    />
                    <OngoingIncidentsFilter
                        ongoing={ongoing}
                        onChange={setOngoing}
                    />
                    <CategoriesFilter
                        categories={categories}
                        checkedCategories={checkedCategories}
                        onChange={handleChangeCategory}
                        onAllChange={handleChangeAllCategories}
                    />
                </FormGroup>
            </Stack>
            <Box className="filterSubmit">
                <Button
                    type="submit"
                    variant="contained"
                    className="filterSubmitButton"
                >
                    Apply
                </Button>
            </Box>
        </form>
    );
};

export default Filters;