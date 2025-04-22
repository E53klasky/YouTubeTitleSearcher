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
    Link,
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
import { Navbar } from "./navBar.js";

const theme = createTheme({
    typography: {
        fontFamily: "Poppins, Roboto , sans-serif",
        h2: {
            fontWeight: 600,
        },
    },
});
// Name, Photo, links, bio,
function AboutPage() {
    const whiteColor = "rgb(201, 196, 196)";
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                    overflow: "hidden",
                    background:
                        "linear-gradient(160deg, rgb(126, 38, 38) 5%, rgb(29, 29, 29) 50%)",

                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                }}
            >
                <Navbar />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        //alignItems: "flex-start",
                        justifyContent: "left",
                        margin: "50px",
                    }}
                >
                    <Box>
                        <Typography variant="h1" color={whiteColor}>
                            About Us
                        </Typography>
                    </Box>

                    {/* Discription of project */}
                    <Box>
                        <Typography
                            sx={{
                                fontSize: "20px",
                                margin: "0 auto",
                                marginBottom: "100px",
                                width: "70%",
                            }}
                            color={whiteColor}
                        >
                            YouTube Title Analzyer uses
                            Material UI, React.js, and Framer Motion. Project Overview: We are
                            developing a frontend-only website that compares the
                            efficiency of two data structures: a Trie and a
                            HashMap. Our goal is to visualize and analyze their
                            performance in searching YouTube video titles.
                            <br />
                            <br />
                            Key Features Comparison of Data Structures: We
                            implement both a Trie and a HashMap to compare their
                            search performance. Real-Time Animation: When a user
                            searches for a YouTube video title, the website will
                            animate the search process for better visualization.
                            Title Optimization for YouTubers: We analyze YouTube
                            video titles based on metrics like comments, views,
                            and likes to help content creators optimize their
                            titles for better engagement. Data Source: We used over 100,000 random videos from
                            YouTube's API and found the video title, comments,
                            views, and likes for each video.
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="h2"
                            color={whiteColor}
                            sx={{ marginBottom: "50px" }}
                        >
                            Team
                        </Typography>
                    </Box>

                    {/* Start Discription of Person */}
                    <Box
                        sx={{
                            marginBottom: "100px",
                        }}
                    >
                        <Typography variant="h3" color={whiteColor}>
                            Sabal Schuster
                        </Typography>
                        {/* Teammate Contact */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "end",
                                justifyContent: "center",
                                margin: "50px",
                                marginTop: "10px",
                            }}
                        >
                            {/* Image of Teammate */}
                            <Box
                                component="img"
                                src="sabal.jpg"
                                alt="Image description"
                                sx={{
                                    width: "150px",
                                    height: "150px",
                                    borderRadius: "200px",
                                }}
                            ></Box>
                            {/* Links */}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "300px",
                                    justifyContent: "center",
                                    gap: "10px",
                                }}
                            >
                                <Link
                                    href="https://github.com/kingwhatthe"
                                    underline="always"
                                    sx={{ fontSize: "20px" }}
                                    target="_blank"
                                >
                                    Github
                                </Link>
                                <Link
                                    href="https://www.linkedin.com/in/sabalschuster/"
                                    underline="always"
                                    sx={{ fontSize: "20px" }}
                                    target="_blank"
                                >
                                    LinkedIn
                                </Link>
                                <Typography
                                    sx={{ fontSize: "20px" }}
                                    color={whiteColor}
                                >
                                    sabalschuster@ufl.edu <br /> 954-706-8015
                                </Typography>
                            </Box>
                        </Box>

                        <Typography
                            sx={{
                                fontSize: "20px",
                                margin: "0 auto",
                                marginBottom: "100px",
                                width: "70%",
                            }}
                            color={whiteColor}
                        >
                            Hi, I'm Sabal. I am a freshman at the University of
                            Florida studying computer science. I am interested
                            in front-end development and designed the animations
                            for this website! My favorite language is C++, but I
                            also know python, javascript, java, C#, React, and
                            Arduino. I also enjoy playing tennis, going on
                            nature walks, and spending time with my friends.
                            Please enjoy using this awesome website to clickbait
                            everyone to your YouTube video!
                        </Typography>
                    </Box>

                    {/* Start Discription of Person */}
                    <Box
                        sx={{
                            marginBottom: "100px",
                        }}
                    >
                        <Typography variant="h3" color={whiteColor}>
                            Owen Szymanski
                        </Typography>
                        {/* Teammate Contact */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "end",
                                justifyContent: "center",
                                margin: "50px",
                                marginTop: "10px",
                            }}
                        >
                            {/* Image of Teammate */}
                            <Box
                                component="img"
                                src="owen.jpg"
                                alt="Image description"
                                sx={{
                                    width: "150px",
                                    height: "150px",
                                    borderRadius: "200px",
                                }}
                            ></Box>
                            {/* Links */}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "300px",
                                    justifyContent: "center",
                                    gap: "10px",
                                }}
                            >
                                <Link
                                    href="https://ocscode.com/"
                                    underline="always"
                                    target="_blank"
                                    sx={{ fontSize: "20px" }}
                                >
                                    My Website
                                </Link>
                                <Link
                                    href="https://www.linkedin.com/in/oszymanski/"
                                    underline="always"
                                    target="_blank"
                                    sx={{ fontSize: "20px" }}
                                >
                                    Linkedin
                                </Link>
                                <Link
                                    href="https://ocscode.com/api/resume/"
                                    underline="always"
                                    target="_blank"
                                    sx={{ fontSize: "20px" }}
                                >
                                    Resume
                                </Link>

                                <Typography
                                    sx={{ fontSize: "20px" }}
                                    color={whiteColor}
                                >
                                    owenski08@gmail.com <br /> 407-383-8500
                                </Typography>
                            </Box>
                        </Box>
                        <Typography
                            sx={{
                                fontSize: "20px",
                                margin: "0 auto",
                                marginBottom: "100px",
                                width: "70%",
                            }}
                            color={whiteColor}
                        >
                            Hi, I'm Owen Szymanski, I am a first year Computer
                            Science major. For this project, I was resposible
                            for the implementation of the Trie data structure
                            and assisting Sabal with the frontend of the
                            website.
                        </Typography>
                    </Box>

                    {/* Start Discription of Person */}
                    <Box
                        sx={{
                            marginBottom: "100px",
                        }}
                    >
                        <Typography variant="h3" color={whiteColor}>
                            Ethan Klasky
                        </Typography>
                        {/* Teammate Contact */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "end",
                                justifyContent: "center",
                                margin: "50px",
                                marginTop: "10px",
                            }}
                        >
                            {/* Image of Teammate */}
                            <Box
                                component="img"
                                src="Ethan.jpg"
                                alt="Image description"
                                sx={{
                                    width: "150px",
                                    height: "150px",
                                    borderRadius: "200px",
                                }}
                            ></Box>
                            {/* Links */}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "300px",
                                    justifyContent: "center",
                                    gap: "10px",
                                }}
                            >
                                <Link
                                    href="https://github.com/E53klasky"
                                    underline="always"
                                    sx={{ fontSize: "20px" }}
                                >
                                    Click Here for Github
                                </Link>
                                <Link
                                    href="https://www.linkedin.com/in/ethan-klasky-092a052a5/"
                                    underline="always"
                                    sx={{ fontSize: "20px" }}
                                >
                                    Click Here for LinkedIn Link
                                </Link>
                                <Typography
                                    sx={{ fontSize: "20px" }}
                                    color={whiteColor}
                                >
                                    ekasky@ufl.edu <br /> 865-924-7447
                                </Typography>
                            </Box>
                        </Box>

                        <Typography
                            sx={{
                                fontSize: "20px",
                                margin: "0 auto",
                                marginBottom: "100px",
                                width: "70%",
                            }}
                            color={whiteColor}
                        >
                            Hello, I'm Ethan Klasky. I am a freshman at the
                            University of Florida studying computer science. I got the data and read it in and fixed up bugs. Addtionally I made the lanidng page, and made the hashmap for this project.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
export default AboutPage;
