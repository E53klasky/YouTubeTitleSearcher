
import React from "react";
import { Box, Paper } from "@mui/material";

const NODE_WIDTH = 40;
const NODE_HEIGHT = 40;
const HORIZONTAL_SPACING = 10;
const VERTICAL_SPACING = 40;

const LineBetweenPoints = ({ x1, y1, x2, y2, color = "black", width = 2 }) => {
    return (
        <Box
            position="absolute"
            top={0}
            left={-100}
            width="1000%"
            height="1000%"
            pointerEvents="none"
            sx={{ zIndex: 0 }}
        >
            <svg
                width="100%"
                height="100%"
                style={{ position: "absolute", top: 0, left: 0 }}
            >
                <line
                    x1={x1 + 100}
                    y1={y1}
                    x2={x2 + 100}
                    y2={y2}
                    stroke={color}
                    strokeWidth={width}
                    style={{ zIndex: 1 }}
                />
            </svg>
        </Box>
    );
};

const TrieVisualization = ({
    node,
    depth = 0,
    index = 0,
    totalSiblings = 1,
}) => {
    const childrenKeys = Object.keys(node.children || {});
    const childCount = childrenKeys.length;
    const left = childrenKeys.at(0) > node.char;

    return (
        <Box
            position="relative"
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ minWidth: NODE_WIDTH }}
        >
            <Box sx={{ position: "relative" }}>
                {/* Connectors to children */}
                {childCount == 1 && left && (
                    <LineBetweenPoints
                        x1={NODE_WIDTH / 2}
                        y1={NODE_HEIGHT - 5}
                        x2={NODE_WIDTH * 2.5}
                        y2={VERTICAL_SPACING * 2 + 5}
                        color="rgb(149, 24, 24)"
                        width={10}
                    />
                )}
                {childCount == 1 && !left && (
                    <LineBetweenPoints
                        x1={NODE_WIDTH / 2}
                        y1={NODE_HEIGHT - 5}
                        x2={-NODE_WIDTH * 1.5}
                        y2={VERTICAL_SPACING * 2 + 5}
                        color="rgb(149, 24, 24)"
                        width={10}
                    />
                )}
                {/* Node Circle */}
                <Paper
                    elevation={3}
                    sx={{
                        position: "relative",
                        width: NODE_WIDTH,
                        height: NODE_HEIGHT,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                        backgroundColor: "rgb(255, 7, 7)",
                        color: "white",
                        zIndex: 1,
                    }}
                >
                    {childrenKeys.at(0)}
                </Paper>
            </Box>

            {/* Render children horizontally */}
            <Box
                mt={`${VERTICAL_SPACING}px`}
                display="flex"
                justifyContent="center"
                marginLeft={left ? HORIZONTAL_SPACING : -HORIZONTAL_SPACING}
                marginRight={!left ? HORIZONTAL_SPACING : -HORIZONTAL_SPACING}
                gap={`${HORIZONTAL_SPACING}px`}
                sx={{ zIndex: 0 }}
            >
                {childrenKeys.map((key, i) => (
                    <TrieVisualization
                        key={key}
                        node={node.children[key]}
                        depth={depth + 1}
                        index={i}
                        totalSiblings={childCount}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default TrieVisualization;
