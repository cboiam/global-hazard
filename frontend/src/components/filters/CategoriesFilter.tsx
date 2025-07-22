import { Stack, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { CategoriesFilterProps } from "../../types/props";

const CategoriesFilter = ({ categories, checkedCategories, onChange, onAllChange }: CategoriesFilterProps) => {
    const categoryCheckboxes = categories?.map(c => (
        <FormControlLabel
            control={<Checkbox
                checked={checkedCategories.includes(c.id)}
                onChange={(e, checked) => onChange(c.id, checked)}
            />}
            label={c.title}
            value={c.id}
            key={c.id}
        />
    )) || [];

    return (
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
                    onChange={(e, checked) => onAllChange(checked)}
                />}
                label="All"
            />
            {categoryCheckboxes}
        </Stack>
    );
};

export default CategoriesFilter;