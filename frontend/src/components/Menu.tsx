import { Stack, Button, useMediaQuery, useTheme } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import MapIcon from "@mui/icons-material/Map";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useLocation, useNavigate } from "react-router";
import { MenuProps } from "../types/props";

const buttonStyle = { borderRadius: "50%", height: 60, width: 60 };

const Menu = ({ visible }: MenuProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const filters = location.pathname.startsWith("/charts") ? "/charts/filters" : "/filters";

    const goTo = (path: string) => {
        navigate({
            pathname: path,
            search: location.search
        });
    };

    if (!md && !visible)
        return null;

    return (
        <Stack direction="column" spacing={1} margin={1} position='fixed' right={0} zIndex={2}>
            <Button
                variant="contained"
                size="large"
                color="primary"
                style={buttonStyle}
                onClick={() => goTo(filters)}
            >
                <FilterListIcon />
            </Button>
            <Button
                variant="contained"
                size="large"
                color="primary"
                style={buttonStyle}
                onClick={() => goTo("/")}
            >
                <MapIcon />
            </Button>
            <Button
                variant="contained"
                size="large"
                color="primary"
                style={buttonStyle}
                onClick={() => goTo("/charts")}
            >
                <ShowChartIcon />
            </Button>
        </Stack>
    );
};

export default Menu;