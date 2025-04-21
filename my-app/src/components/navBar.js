import React, { useEffect, useMemo, useRef, useState } from "react";
import { Typography, AppBar, Toolbar, Button, IconButton } from "@mui/material";
import "@fontsource/poppins";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";

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
                    component={Link}
                    to="/landing"
                >
                    <Link to={"/"} style={{ color: "rgb(175, 24, 24)" }}>
                        <YouTubeIcon sx={{ fontSize: "40px" }} />
                    </Link>
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
                    component={Link}
                    to="/"
                >
                    Home
                </Button>
                <Button
                    color="inherit"
                    sx={{ color: "rgb(201, 196, 196)", fontSize: "19px" }}
                    component={Link}
                    to="/search"
                >
                    Search
                </Button>
                <Button
                    color="inherit"
                    sx={{ color: "rgb(201, 196, 196)", fontSize: "19px" }}
                    component={Link}
                    to="/about"
                >
                    About
                </Button>
            </Toolbar>
        </AppBar>
    );
};
