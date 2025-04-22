import React, { useState } from "react";
import {
    Typography,
    Box,
    createTheme,
    ThemeProvider,
    TextField,
    FormControlLabel,
    Switch,
} from "@mui/material";
import "@fontsource/poppins";
import { useAnimation } from "framer-motion";
import SearchButton from "./searchButton.js";
import TrieAnimation from "./TrieAnimation.js";
import { ScrollingStack } from "./hashmapAnimation.js";
import { Navbar } from "./navBar.js";

const theme = createTheme({
    typography: {
        fontFamily: "Poppins, Roboto , sans-serif",
        h2: {
            fontWeight: 600,
        },
    },
});



function SearchPage() {
    const [titleInput, setTitleInput] = useState("");
    const [currentWord, setCurrentWord] = useState("");
    const [titleScore, setTitleScore] = useState({
        views: 0,
        likes: 0,
        comments: 0,
    });
    const [wordsScores, setWordScores] = useState([[]]);
    const [analyzing, setAnalyzing] = useState(false);
    const [trieStats, setTrieStats] = useState({
        views: 0,
        likes: 0,
        comments: 0,
    });

    const [hashMapTitle, setHashMapTitle] = useState("");

    const [dataDisplay, setDataDisplay] = useState("");
    const [trieTime, setTrieTime] = useState("");
    const [mapTime, setMapTime] = useState("");
    const [totalTrieTime, setTotalTrieTime] = useState(0);
    const [totalMapTime, setTotalMapTime] = useState(0);

    const trieControls = useAnimation();

    const [animationsOn, setAnimationsOn] = useState(true);

    const handleTitleChange = (e) => {
        setTitleInput(e.target.value);
    };

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
                        position: "relative",
                        justifyContent: "space-between",
                        margin: 0,
                        padding: 0,
                    }}
                >
                    {/* Center content */}
                    <Box
                        sx={{
                            width: "100%",
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
                            onChange={handleTitleChange}
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
                        <Box
                            sx={{
                                display: "flex",
                                height: { xs: "200px", md: "100px" },
                                width: "70%",
                                overflow: "hidden",
                                alignItems: {
                                    xs: "center",
                                    md: "space-between",
                                },
                                justifyContent: {
                                    xs: "space-between",
                                    md: "space-between",
                                },
                                flexDirection: { xs: "column", md: "row" },
                                marginBottom: { xs: "10px", md: "0px" },
                            }}
                        >
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
                                setHashMapTitle={setHashMapTitle}
                                setTitleScore={setTitleScore}
                                setWordScores={setWordScores}
                                wordScores={wordsScores}
                                totalTrieTime={totalTrieTime}
                                setTotalTrieTime={setTotalTrieTime}
                                totalMapTime={totalMapTime}
                                setTotalMapTime={setTotalMapTime}
                                animationsOn={animationsOn}
                            />
                            {/* Results Box */}
                            <Box
                                sx={{
                                    backgroundColor: "rgb(149, 24, 24)",
                                    color: "rgb(201, 196, 196)",
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "40px",
                                    width: "300px",
                                    overflow: "hidden",
                                    justifyContent: "space-around",
                                    borderRadius: "10px",
                                    padding: "10px",
                                    paddingTop: "5px",
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                }}
                            >
                                {!analyzing ? (
                                    <Typography>
                                        PROJECTED TITLE STATS:{" "}
                                        {titleScore.views.toFixed(0)} views,{" "}
                                        {titleScore.likes.toFixed(0)} likes,{" "}
                                        {titleScore.comments.toFixed(0)}{" "}
                                        comments
                                    </Typography>
                                ) : (
                                    <Typography>Loading</Typography>
                                )}
                            </Box>
                            <Box
                                gap={2}
                                sx={{
                                    backgroundColor: "rgb(64, 64, 64)",
                                    color: "rgb(201, 196, 196)",
                                    display: "flex",
                                    flexDirection: "row",
                                    height: "40px",
                                    minWidth: "150px",
                                    overflow: "hidden",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "10px",
                                    padding: "10px",
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Switch
                                            disabled={analyzing}
                                            checked={animationsOn}
                                            onChange={(e) =>
                                                setAnimationsOn(
                                                    e.target.checked
                                                )
                                            }
                                            sx={{
                                                "& .MuiSwitch-switchBase.Mui-checked":
                                                    {
                                                        color: "rgb(213, 39, 39)",
                                                    },
                                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                                    {
                                                        backgroundColor:
                                                            "rgb(177, 31, 31)",
                                                    },
                                            }}
                                        />
                                    }
                                    label="Animations"
                                    labelPlacement="start"
                                    sx={{ marginLeft: "5px" }}
                                />
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                height: { xs: "250px", md: "100px" },
                                width: "72%",
                                justifyContent: {
                                    xs: "space-between",
                                    md: "space-between",
                                },
                                alignItems: {
                                    xs: "center",
                                    md: "center",
                                },
                                padding: "10px",
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: "rgb(149, 24, 24)",
                                    color: "rgb(201, 196, 196)",
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "50px",
                                    width: "150px",
                                    overflow: "hidden",
                                    justifyContent: "space-around",
                                    borderRadius: "10px",
                                    marginBottom: "20px",
                                    padding: "10px",
                                }}
                            >
                                {!analyzing ? (
                                    <Typography>
                                        Hashmap Time: <br />
                                        {totalMapTime.toFixed(5)}ms
                                    </Typography>
                                ) : (
                                    <Typography>Loading</Typography>
                                )}
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: "rgb(64, 64, 64)",
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "50px",
                                    width: "200px",
                                    overflow: "auto",
                                    justifyContent: "space-around",
                                    borderRadius: "10px",
                                    marginBottom: "20px",
                                    padding: "10px",
                                    color: "rgb(201, 196, 196)",
                                    "&::-webkit-scrollbar": {
                                        display: "none", // Chrome, Safari
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: "rgb(149, 24, 24)",
                                        fontSize: "12px",
                                        borderRadius: "5px",
                                        paddingTop: "3px",
                                        paddingBottom: "3px",
                                    }}
                                >
                                    Words, Views, Likes, Comments
                                </Box>
                                <Typography sx={{ fontSize: "12px" }}>
                                    {wordsScores.map((arr, index) => {
                                        if (index != 0) {
                                            return (
                                                <>
                                                    "{arr[0]}",{" "}
                                                    {arr[1].toFixed(0)},{" "}
                                                    {arr[2].toFixed(0)},{" "}
                                                    {arr[3].toFixed(0)}
                                                    <br />
                                                </>
                                            );
                                        }
                                        return <></>;
                                    })}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: "rgb(149, 24, 24)",
                                    color: "rgb(201, 196, 196)",
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "50px",
                                    width: "150px",
                                    overflow: "hidden",
                                    justifyContent: "space-around",
                                    //alignItems: "center",
                                    borderRadius: "10px",
                                    marginBottom: "20px",
                                    padding: "10px",
                                }}
                            >
                                {!analyzing ? (
                                    <Typography>
                                        Trie Time: <br />
                                        {totalTrieTime.toFixed(5)}ms
                                    </Typography>
                                ) : (
                                    <Typography>Loading</Typography>
                                )}
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
                        width: "90%",
                        margin: "0 auto",
                        gap: "20px",
                        marginBottom: "20px",
                    }}
                >
                    {/* Hash Map Animation Box */}
                    <Box
                        sx={{
                            backgroundColor: "rgb(64, 64, 64)",
                            width: { xs: "90%", md: "600px" },
                            height: "350px",
                            borderRadius: "10px",
                            overflow: "hidden",
                        }}
                    >
                        {ScrollingStack(
                            [
                                hashMapTitle || "This is a video title",
                                trieStats.views,
                                trieStats.likes,
                                trieStats.comments,
                            ],
                            currentWord,
                            animationsOn
                        )}
                    </Box>

                    {/* Trie Animation Box */}
                    <Box
                        sx={{
                            backgroundColor: "rgb(64, 64, 64)",
                            width: { xs: "90%", md: "600px" },
                            height: "350px",
                            borderRadius: "10px",
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        <TrieAnimation
                            key={currentWord}
                            word={
                                currentWord == "" && !analyzing
                                    ? "not loaded"
                                    : currentWord
                            }
                            controls={trieControls}
                            isOn={animationsOn}
                        />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default SearchPage;
