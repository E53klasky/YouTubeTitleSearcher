import React, { useEffect, useState } from "react";
import { Box, Stack, } from "@mui/material";
import "@fontsource/poppins";
import { motion } from "framer-motion";
import Divider from "@mui/material/Divider";
import { getYoutubeData } from "./visualsData.js";

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
const highlightWordInTitle = (title, word) => {
    if (!word || !title) return title;
    const regex = new RegExp(`\\b(${escapeRegExp(word)})\\b`, "gi");
    const parts = title.split(regex).filter((part) => part !== "");

    return (
        <p style={{ margin: 0 }}>
            {parts.map((part, i) =>
                part === word ? (
                    <mark
                        key={i}
                        style={{
                            backgroundColor: "rgba(255, 255, 0, 0.5)",
                            color: "white",
                            padding: "0 2px",
                            borderRadius: "3px",
                            fontWeight: "bold",
                            textShadow: "1px 1px 1px rgba(0,0,0,0.5)",
                            fontSize: "1rem",
                        }}
                    >
                        {part}
                    </mark>
                ) : (
                    part
                )
            )}
        </p>
    );
};


// Update the ScrollingStack component
export function ScrollingStack(inputArr, word, isOn) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState(0);

    // Update the key whenever the word changes
    useEffect(() => {
        setKey((prev) => prev + 1);
    }, [word]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const youtubeData = await getYoutubeData();
                if (!youtubeData || youtubeData.length === 0) {
                    throw new Error("No data available");
                }

                // Process the real data, ensuring all entries are valid
                const processedData = youtubeData
                    .filter(
                        (row) => row && row[0] && typeof row[0] === "string"
                    )
                    .map((row) => [
                        row[0],
                        Number(row[1]) || 0,
                        Number(row[2]) || 0,
                        Number(row[3]) || 0,
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
                console.error("Error loading data:", error);
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (!isOn) {
        return (
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.5rem",
                }}
            >
                Animations are off
            </Box>
        );
    }
    if (loading) {
        return (
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.5rem",
                }}
            >
                Loading...
            </Box>
        );
    }

    if (inputArr[0] == "This is a video title") {
        return (
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.5rem",
                }}
            >
                Waiting for input...
            </Box>
        );
    }

    if (data.length === 0) {
        return (
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.5rem",
                }}
            >
                No data available
            </Box>
        );
    }

    // Process the data to highlight words
    const displayData = data.map((row, index) => {
        const title = index == 94 ? inputArr[0] : row[0];
        return [
            word ? highlightWordInTitle(title, word) : title,
            row[1],
            row[2],
            row[3],
        ];
    });

    return (
        <Box
            sx={{
                height: "100%",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "rgb(64, 64, 64)",
            }}
        >
            <motion.div
                key={key}
                animate={{ y: ["0%", "-2250%"] }}
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
    const myDivider = (
        <Divider
            orientation="vertical"
            sx={{ height: "60%", backgroundColor: "rgb(179, 32, 32)", mx: 1 }}
        />
    );

    return (
        <Box
            sx={{
                width: "90%",
                height: "75px",
                backgroundColor: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "white",
                fontSize: "1.2rem",
                borderRadius: 1,
                padding: "0 10px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                "& mark": {
                    backgroundColor: "rgba(255, 255, 0, 0.5)",
                    color: "white",
                    padding: "0 2px",
                    borderRadius: "3px",
                    fontWeight: "bold",
                    textShadow: "1px 1px 1px rgba(0,0,0,0.5)",
                },
            }}
        >
            <Box
                sx={{
                    overflow: "hidden",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                    textAlign: "center",
                    maxWidth: "40%",
                    width: "40%",
                    minWidth: "40%",
                    fontSize: "0.75rem",
                }}
            >
                {safeRow[0]}
            </Box>
            {myDivider}
            <Box
                sx={{
                    textAlign: "center",
                    maxWidth: "15%",
                    width: "15%",
                    minWidth: "15%",
                    fontSize: "0.75rem",
                }}
            >
                {typeof safeRow[1] === "number"
                    ? safeRow[1].toLocaleString()
                    : 0}
            </Box>
            {myDivider}
            <Box
                sx={{
                    textAlign: "center",
                    maxWidth: "15%",
                    width: "15%",
                    minWidth: "15%",
                    fontSize: "0.75rem",
                }}
            >
                {typeof safeRow[2] === "number"
                    ? safeRow[2].toLocaleString()
                    : 0}
            </Box>
            {myDivider}
            <Box
                sx={{
                    textAlign: "center",
                    maxWidth: "15%",
                    width: "15%",
                    minWidth: "15%",
                    fontSize: "0.75rem",
                }}
            >
                {typeof safeRow[3] === "number"
                    ? safeRow[3].toLocaleString()
                    : 0}
            </Box>
        </Box>
    );
});