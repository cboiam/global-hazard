import { Card, IconButton, Stack } from "@mui/material";
import { colors } from "../../utils/colors";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Category } from "../../types/category";
import { MapCategoriesProps } from "../../types/props";
import "../../styles/map.css";

const MapCategories = ({ categories, params, expanded, onClick }: MapCategoriesProps) => {
    const filteredCategories = categories?.filter(c => params.categories?.split(",")?.includes(c.id) || !params.categories)
        .map((c: Category, i: number) => (
            <Stack spacing={1} alignItems="center" direction="row" key={c.id}>
                <div className="mapCategoryDot" style={{backgroundColor: colors[i] }}></div>
                {expanded ? <div>{c.title}</div> : null}
            </Stack>
        )) || null;

    return (
        <Card className="mapCategoryCard" onClick={() => onClick(!expanded)}>
            <IconButton className="mapCategoryArrow">
                {expanded ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
            </IconButton>
            <Stack spacing={1} direction="column">
                {filteredCategories}
            </Stack>
        </Card>
    );
};

export default MapCategories;