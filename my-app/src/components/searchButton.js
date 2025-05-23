import React from "react";
import { Box, Button, Paper } from "@mui/material";
import { doAnalyze } from "./doAnalyze";

const SearchButton = ({
    title,
    currentWord,
    setCurrentWord,
    analyzing,
    setAnalyzing,
    setDataDisplay,
    setTrieTime,
    setMapTime,
    setTrieStats,
    setHashMapTitle,
    setTitleScore,
    setWordScores,
    totalTrieTime,
    setTotalTrieTime,
    totalMapTime,
    setTotalMapTime,
    animationsOn,
}) => {
    return (
        <Box mt={2}>
            <Button
                variant="contained"
                onClick={() =>
                    doAnalyze(
                        title,
                        setCurrentWord,
                        setAnalyzing,
                        setDataDisplay,
                        setTrieTime,
                        setMapTime,
                        setTrieStats,
                        setHashMapTitle,
                        setTitleScore,

                        setWordScores,
                        totalTrieTime,
                        setTotalTrieTime,
                        totalMapTime,
                        setTotalMapTime,
                        animationsOn
                    )
                }
                //color="error"
                disableElevation
                disabled={analyzing}
                sx={{
                    //backgroundColor: "rgb(149, 24, 24)",
                    background:
                        "linear-gradient(160deg, rgb(215, 126, 126) 5%, rgb(149, 24, 24) 50%)",
                    width: "200px",
                    height: "50px",
                    borderRadius: "100px",
                    fontSize: "20px",
                    // fontWeight: "bold",
                }}
            >
                Analyze Title
            </Button>
        </Box>
    );
};

export default SearchButton;
