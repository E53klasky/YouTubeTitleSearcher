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
    setTrieStats
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
                        setTrieStats
                    )
                }
                color="error"
                disabled={analyzing}
                sx={{
                    backgroundColor: "rgb(149, 24, 24)",
                    color: "rgb(201, 196, 196)",
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
