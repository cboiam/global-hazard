import MoreIcon from "@mui/icons-material/MoreVert";
import PublicIcon from "@mui/icons-material/Public";
import { AppBar, Box, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Menu from "./Menu";

const Nav = () => {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const [menuVisible, setMenuVisible] = useState(false);
    const toggleMenu = () => setMenuVisible(!menuVisible);

    return (
        <Box>
            <AppBar id="nav" component="nav" position='relative'>
                <Toolbar>
                    <Typography
                        variant={sm ? "h4" : "h5"}
                        component={PublicIcon}
                        marginRight={sm ? "20px" : "10px"}
                    >
                    </Typography>
                    <Typography
                        variant={sm ? "h4" : "h5"}
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Global Hazards
                    </Typography>
                    {md ? null : (<IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        sx={{ mr: sm ? "-7px" : "0" }}
                        onClick={toggleMenu}
                    >
                        <MoreIcon />
                    </IconButton>)}
                </Toolbar>
            </AppBar>
            <Menu visible={menuVisible} />
        </Box>
    );
};

export default Nav;