import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Typography,
    Box,
    Paper,
    Avatar,
    createTheme,
    ThemeProvider,
    TextField,
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Stack,
    FormControlLabel,
    Switch,
} from "@mui/material";
import "@fontsource/poppins";
import HomeIcon from "@mui/material/Icon";
import { Link } from "react-router-dom";
import { color } from "framer-motion";

export const Navbar = () => {
    return (
        <AppBar position="sticky" sx={{ background: "rgba(0,0,0, .4)" }}>
            <Toolbar>
                {/* Icon on the left */}
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <HomeIcon />{" "}
                    {/* You can replace this with your desired icon */}
                </IconButton>

                {/* Navbar Title (optional) */}
                <Typography
                    variant="h6"
                    color="rgb(201, 196, 196)"
                    align="left"
                    sx={{
                        flexGrow: 1,
                        textShadow: "0px 2px 4px rgba(0,0,0, 0.7)",
                    }}
                >
                    YouTube Title Searcher
                </Typography>

                {/* Buttons */}
                <Button
                    color="inherit"
                    sx={{ color: "rgb(201, 196, 196)", fontSize: "19px" }}
                >
                    <Link
                        style={{
                            color: "rgb(201, 196, 196)",
                            textDecoration: "none",
                        }}
                        to={"/"}
                    >
                        Home
                    </Link>
                </Button>
                <Button
                    color="inherit"
                    sx={{ color: "rgb(201, 196, 196)", fontSize: "19px" }}
                >
                    <Link
                        style={{
                            color: "rgb(201, 196, 196)",
                            textDecoration: "none",
                        }}
                        to={"/about"}
                    >
                        About
                    </Link>
                </Button>
            </Toolbar>
        </AppBar>
    );
};
