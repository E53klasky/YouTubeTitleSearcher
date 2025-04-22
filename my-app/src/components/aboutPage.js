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
function AboutPage(){
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
                            <Typography variant="h1" color={whiteColor}>About Us</Typography>
                        </Box>
                        
                        {/* Discription of project */}
                        <Box>
                            <Typography sx = {{fontSize: "20px", marginBottom: "100px"}} color={whiteColor}>
                                Discription of Project

                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h2" color={whiteColor} sx = {{marginBottom: "50px"}}>
                                Team
                            </Typography>
                        </Box>
                        


                        {/* Start Discription of Person */}
                        <Box sx = {{
                            marginBottom: "100px",
                        }}>
                            <Typography variant="h3" color={whiteColor}>
                                Teammate 1
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
                                    sx={{ width: '150px', height: '150px', borderRadius: "200px"}}
                                ></Box>
                                {/* Links */}
                                <Box sx = {{display: "flex", flexDirection: "column", width: "300px", justifyContent: "center", gap: "10px"}}>
                                    <Link href="https://www.google.com" underline="always" sx = {{fontSize: "20px"}}>
                                        Click Here for Resume Link
                                    </Link>
                                    <Link href="https://www.maps.google.com" underline="always" sx = {{fontSize: "20px"}}>
                                        Click Here for LinkedIn Link
                                    </Link>
                                    <Typography sx = {{fontSize: "20px"}} color={whiteColor}>
                                        email@email.email <br/> 987-654-3210
                                    </Typography>
                                </Box>
                            </Box>
                            
                            <Typography sx = {{fontSize: "20px"}} color={whiteColor}>
                                Discription of Teammate
                            </Typography>
                        </Box>




                        {/* Start Discription of Person */}
                        <Box sx = {{
                            marginBottom: "100px",
                        }}>
                            <Typography variant="h3" color={whiteColor}>
                                Teammate 2
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
                                    sx={{ width: '150px', height: '150px', borderRadius: "200px"}}
                                ></Box>
                                {/* Links */}
                                <Box sx = {{display: "flex", flexDirection: "column", width: "300px", justifyContent: "center", gap: "10px"}}>
                                    <Link href="https://www.google.com" underline="always" sx = {{fontSize: "20px"}}>
                                        Click Here for Resume Link
                                    </Link>
                                    <Link href="https://www.maps.google.com" underline="always" sx = {{fontSize: "20px"}}>
                                        Click Here for LinkedIn Link
                                    </Link>
                                    <Typography sx = {{fontSize: "20px"}} color={whiteColor}>
                                        email@email.email <br/> 987-654-3210
                                    </Typography>
                                </Box>
                            </Box>
                            
                            <Typography sx = {{fontSize: "20px"}} color={whiteColor}>
                                Discription of Teammate
                            </Typography>
                        </Box>




                        {/* Start Discription of Person */}
                        <Box sx = {{
                            marginBottom: "100px",
                        }}>
                            <Typography variant="h3" color={whiteColor}>
                                Teammate 3
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
                                    sx={{ width: '150px', height: '150px', borderRadius: "200px"}}
                                ></Box>
                                {/* Links */}
                                <Box sx = {{display: "flex", flexDirection: "column", width: "300px", justifyContent: "center", gap: "10px"}}>
                                    <Link href="https://www.google.com" underline="always" sx = {{fontSize: "20px"}}>
                                        Click Here for Resume Link
                                    </Link>
                                    <Link href="https://www.maps.google.com" underline="always" sx = {{fontSize: "20px"}}>
                                        Click Here for LinkedIn Link
                                    </Link>
                                    <Typography sx = {{fontSize: "20px"}} color={whiteColor}>
                                        email@email.email <br/> 987-654-3210
                                    </Typography>
                                </Box>
                            </Box>
                            
                            <Typography sx = {{fontSize: "20px"}} color={whiteColor}>
                                Discription of Teammate
                            </Typography>
                        </Box>



                    </Box>
                    
                </Box>
            </ThemeProvider>
    );
}
export default AboutPage;