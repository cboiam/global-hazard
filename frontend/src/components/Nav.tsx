import MoreIcon from "@mui/icons-material/MoreVert";
import PublicIcon from "@mui/icons-material/Public";
import { AppBar, Box, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Menu from "./Menu";
import { Link } from "react-router";
import "../styles/layout.css";
import { NavProps } from "../types/props";

const Nav = ({ params }: NavProps) => {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const [menuVisible, setMenuVisible] = useState(false);
    const toggleMenu = () => setMenuVisible(!menuVisible);

    return (
        <Box>
            <AppBar id="nav" component="nav" position='relative'>
                <Toolbar>
                    <Link to="/" className="navLink" >
                        <Typography
                            variant={sm ? "h4" : "h5"}
                            component={PublicIcon}
                            className="navLogo"
                        >
                        </Typography>
                        <Typography
                            variant={sm ? "h4" : "h5"}
                            component={"div"}
                        >
                            Global Hazards
                        </Typography>
                    </Link>
                    {md ? null : (<IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        className="navMenu"
                        onClick={toggleMenu}
                    >
                        <MoreIcon />
                    </IconButton>)}
                </Toolbar>
            </AppBar>
            <Menu visible={menuVisible} params={params} />
        </Box>
    );
};

export default Nav;