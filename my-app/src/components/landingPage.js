//Install Framer Motion for Animations: npm install framer-motion @mui/material @emotion/react @emotion/styled
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

const theme = createTheme({
    typography: {
        fontFamily: "Poppins, Roboto , sans-serif",
        h2: {
            fontWeight: 600,
        },
    },
});

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
                <Button
                    color="inherit"
                    href="https://www.google.com/maps"
                    sx={{ color: "rgb(201, 196, 196)", fontSize: "19px" }}
                >
                    Search
                </Button>
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


const highlightWordInTitle = (title, word) => {
    if (!word || !title) return title;
    const regex = new RegExp(`(${word})`, 'gi');
    const parts = title.split(regex);
    
    return (
        <p style={{ margin: 0 }}>
            {parts.map((part, i) => 
                part.toLowerCase() === word.toLowerCase() 
                    ? <mark 
                        key={i} 
                        style={{
                            backgroundColor: 'rgba(255, 255, 0, 0.5)',
                            color: 'white',
                            padding: '0 2px',
                            borderRadius: '3px',
                            fontWeight: 'bold',
                            textShadow: '1px 1px 1px rgba(0,0,0,0.5)' 
                        }}
                      >
                        {part}
                      </mark>
                    : part
            )}
        </p>
    );
};

// Update the ScrollingStack component
export function ScrollingStack(inputArr, word) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState(0);

    // Update the key whenever the word changes
    useEffect(() => {
        setKey(prev => prev + 1);
    }, [word]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const youtubeData = await getYoutubeData();
                if (!youtubeData || youtubeData.length === 0) {
                    throw new Error('No data available');
                }

                // Process the real data, ensuring all entries are valid
                const processedData = youtubeData
                    .filter(row => row && row[0] && typeof row[0] === 'string')
                    .map(row => [
                        row[0],
                        Number(row[1]) || 0,
                        Number(row[2]) || 0,
                        Number(row[3]) || 0
                    ]);

                // If we need more rows for the animation, repeat the real data
                let finalData = [];
                while (finalData.length < 100) {
                    finalData = [...finalData, ...processedData];
                }
                
                // Trim to exactly 100 items
                finalData = finalData.slice(0, 100);
                
                setData(finalData);
                setLoading(false);
            } catch (error) {
                console.error('Error loading data:', error);
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ 
                height: "100%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                color: "white",
                fontSize: "1.5rem"
            }}>
                Loading...
            </Box>
        );
    }

    if (data.length === 0) {
        return (
            <Box sx={{ 
                height: "100%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                color: "white",
                fontSize: "1.5rem"
            }}>
                No data available
            </Box>
        );
    }

    // Process the data to highlight words
    const displayData = data.map(row => {
        const title = row[0];
        return [
            word ? highlightWordInTitle(title, word) : title,
            row[1],
            row[2],
            row[3]
        ];
    });

    return (
        <Box
            sx={{
                height: "100%",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "black"
            }}
        >
            <motion.div
                key={key}
                animate={{ y: ["0%", "-1370%"] }}
                transition={{ duration: 2, repeat: 0, ease: "easeOut" }}
                style={{ width: "100%" }}
            >
                <Stack spacing={1} sx={{ width: "100%", padding: "10px" }}>
                    {displayData.map((row, index) => (
                        <DataRow 
                            key={index}
                            row={row}
                            index={index}
                            isHighlighted={false}
                        />
                    ))}
                </Stack>
            </motion.div>
        </Box>
    );
}

const DataRow = React.memo(({ row, index, isHighlighted }) => {
    const safeRow = Array.isArray(row) ? row : ["No data", 0, 0, 0];
    
    return (
        <Box
            sx={{
                width: "100%",
                height: 50,
                backgroundColor: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "white",
                fontSize: "1.2rem",
                borderRadius: 1,
                padding: "0 10px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: 'all 0.3s ease',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                },
                '& mark': {
                    backgroundColor: 'rgba(255, 255, 0, 0.5)', 
                    color: 'white',
                    padding: '0 2px',
                    borderRadius: '3px',
                    fontWeight: 'bold',
                    textShadow: '1px 1px 1px rgba(0,0,0,0.5)' 
                }
            }}
        >
            <Box sx={{ 
                flex: 3, 
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center'
            }}>
                {safeRow[0]}
            </Box>
            <Divider orientation="vertical" flexItem sx={{ backgroundColor: "red", mx: 1 }} />
            <Box sx={{ flex: 1, textAlign: 'center' }}>
                {typeof safeRow[1] === 'number' ? safeRow[1].toLocaleString() : 0}
            </Box>
            <Divider orientation="vertical" flexItem sx={{ backgroundColor: "red", mx: 1 }} />
            <Box sx={{ flex: 1, textAlign: 'center' }}>
                {typeof safeRow[2] === 'number' ? safeRow[2].toLocaleString() : 0}
            </Box>
            <Divider orientation="vertical" flexItem sx={{ backgroundColor: "red", mx: 1 }} />
            <Box sx={{ flex: 1, textAlign: 'center' }}>
                {typeof safeRow[3] === 'number' ? safeRow[3].toLocaleString() : 0}
            </Box>
        </Box>
    );
});

function LandingPage() {
    const [titleInput, setTitleInput] = useState("");
    const [currentWord, setCurrentWord] = useState("");
    const [analyzing, setAnalyzing] = useState(false);
    const [trieStats, setTrieStats] = useState({ views: 0, likes: 0, comments: 0 });

    const [dataDisplay, setDataDisplay] = useState("");
    const [trieTime, setTrieTime] = useState("");
    const [mapTime, setMapTime] = useState("");

    const trieControls = useAnimation();

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
                        width: "100%",
                        textAlign: "center",
                        pt: 15,
                        mb: 2,
                        zIndex: 10,
                        pb: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mt: -8,
                    }}
                >
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: "bold",
                            color: "rgb(201, 196, 196)",
                            textShadow: "0px 2px 4px rgb(0,0,0)",
                            //mb: 2
                        }}
                    >
                        Test Title Here!
                    </Typography>
                </Box>

                {/* Main content area */}
                <Box
                    sx={{
                        display: "flex",
                        //flexGrow: 1,
                        position: "relative",
                        //flexDirection: 'column',
                        justifyContent: "space-between",
                        //minHeight: 'calc(100vh - 230px)',
                        //top: '-120px'
                        margin: 0,
                        padding: 0,
                    }}
                >
                    {/* Center content */}
                    <Box
                        sx={{
                            width: "100%",
                            //flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 5,
                            flexDirection: "column",
                        }}
                    >
                        {/* Content goes here */}
                        <TextField
                            id="outlined-basic"
                            placeholder="Input title..."
                            variant="outlined"
                            fullWidth
                            value={titleInput}
                            onChange={(e) => {
                                setTitleInput(e.target.value);
                            }}
                            sx={{
                                backgroundColor: "black",
                                maxWidth: "60%",
                                boxShadow: "0px 0px 5px 1px rgb(29, 29, 29)",
                                input: {
                                    "&:-webkit-autofill": {
                                        boxShadow: "0 0 0 1000px black inset",
                                        WebkitTextFillColor:
                                            "rgb(201, 196, 196)",
                                    },
                                    borderRadius: "100px",
                                    height: "50px", // Adjust height here
                                    color: "rgb(201, 196, 196)",
                                    fontSize: "27px",
                                },

                                borderRadius: "100px",
                                "& .MuiInputBase-root": {
                                    height: "85px", // Adjust height here
                                },
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "50px",
                                    "&:hover fieldset": {
                                        borderColor: "rgb(29, 29, 29)",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "rgb(29, 29, 29)", // Focused state
                                    },
                                },
                            }}
                        />
                        <SearchButton
                            title={titleInput}
                            currentWord={currentWord}
                            setCurrentWord={setCurrentWord}
                            analyzing={analyzing}
                            setAnalyzing={setAnalyzing}
                            setDataDisplay={setDataDisplay}
                            setTrieTime={setTrieTime}
                            setMapTime={setMapTime}
                            setTrieStats={setTrieStats}
                        />
                        {/* Results Box */}
                        <Box
                            sx={{
                                backgroundColor: "gray",
                                display: "flex",
                                flexDirection: "column",
                                minHeight: "200px",
                                width: "85vw",
                                overflow: "hidden",
                                justifyContent: "space-around",
                                alignItems: "center",
                                borderRadius: "10px",
                                margin: "20px",
                                padding: "10px"
                            }}
                        >
                            <Box
                                sx={{
                                    background: "black",
                                    color: "white",
                                    width: "100%",
                                    minHeight: "50px",
                                    display: "flex",
                                    alignItems: "start",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "1.2rem",
                                        textAlign: "center",
                                    }}
                                >
                                    {dataDisplay}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    flexGrow: 1,
                                    width: "100%",
                                }}
                            >
                                <Box
                                    sx={{
                                        background: "black",
                                        color: "white",
                                        width: "100%",
                                        flexGrow: 1,
                                        marginTop: "10px",
                                        marginRight: "10px",
                                        padding: "0px 20px",
                                        display: "flex",
                                        alignItems: "start",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "1.2rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        {mapTime}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        background: "black",
                                        color: "white",
                                        width: "100%",
                                        flexGrow: 1,
                                        marginTop: "10px",
                                        marginLeft: "10px",
                                        padding: "0px 20px",
                                        display: "flex",
                                        alignItems: "start",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "1.2rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        {trieTime}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    {/*ANIMATION BOXES*/}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        padding: "20px",
                        gap: "20px"
                    }}
                >
                    {/* Hash Map Animation Box */}
                    <Box
                        sx={{
                            backgroundColor: "gray",
                            width: { xs: "90%", md: "600px" },
                            height: "400px",
                            borderRadius: "10px",
                            overflow: "hidden"
                        }}
                    >
                        {ScrollingStack(
                            [titleInput || "This is a video title", trieStats.views, trieStats.likes, trieStats.comments],
                            currentWord
                        )}
                    </Box>

                    {/* Trie Animation Box */}
                    <Box
                        sx={{
                            backgroundColor: "gray",
                            width: { xs: "90%", md: "600px" },
                            height: "400px",
                            borderRadius: "10px",
                            overflow: "hidden",
                            position: "relative"
                        }}
                    >
                        <TrieAnimation
                            key={currentWord}
                            word={currentWord}
                            controls={trieControls}
                        />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default LandingPage;
