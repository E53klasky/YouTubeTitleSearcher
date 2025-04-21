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
import { motion, useAnimation } from "framer-motion";
import Divider, { dividerClasses } from "@mui/material/Divider";
import { getYoutubeData } from "./visualsData";
import highlightWord from "./visualsData";
import { input } from "framer-motion/client";
import TrieVisualization from "./TrieVisualization.js";
import SearchButton from "./searchButton.js";
// import {buildTrie} from './Trie.js';
import TreeContainer from "./TrieVisualization.js";
import TrieAnimation from "./TrieAnimation.js";

{
    /*Half chatgpted*/
}
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
                    href="https://www.google.com"
                    sx={{ color: "rgb(201, 196, 196)", fontSize: "19px" }}
                >
                    Home
                </Button>
                {/* <Button
                    color="inherit"
                    href="https://www.google.com/maps"
                    sx={{ color: "rgb(201, 196, 196)", fontSize: "19px" }}
                >
                    Search
                </Button> */}
                <Button
                    color="inherit"
                    href="https://www.google.com/drive"
                    sx={{ color: "rgb(201, 196, 196)", fontSize: "19px" }}
                >
                    About
                </Button>
            </Toolbar>
        </AppBar>
    );
};