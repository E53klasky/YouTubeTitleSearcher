import React, { useEffect, useMemo } from "react";
import {Box} from "@mui/material";
import "@fontsource/poppins";
import { motion, useAnimation } from "framer-motion";
import TrieVisualization from "./TrieVisualization.js";
import { buildTrie } from "./buildTrie";

const TrieAnimation = ({ word, controls, isOn }) => {
    const speed_factor = word.length / 4.0;
    const coords = useMemo(() => {
        const arr = [];
        for (let i = 1; i < word.length; i++) {
            arr.push(word.charCodeAt(i) <= word.charCodeAt(i - 1));
        }
        return arr;
    }, [word]);

    useEffect(() => {
        async function runSequence() {
            let height = -70;
            let right = -80;
            let first = true;
            for (let goRight of coords) {
                await controls.start({
                    x: right,
                    y: height,
                    transition: {
                        delay: first ? 0.75 : 0.1,
                        duration: 0.25 / speed_factor,
                        ease: "easeInOut",
                    },
                });
                height -= 80;
                right += goRight ? 80 : -80;
                if (first == true) {
                    first = false;
                }
            }
        }

        runSequence();
    }, [coords, controls, word]);


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

    if (word == "not loaded") {
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
    return (
        <>
            <motion.div
                animate={{
                    y: ["0px", `${(word.length * 0.25 + 0.72) * 300}px`],
                    scale: 3,
                }}
                transition={{
                    delay: 0.25,
                    duration: 0.25 / speed_factor,
                    repeat: 0,
                    ease: "easeIn",
                }}
                style={{ width: "100%" }}
            >
                <motion.div
                    animate={controls}
                    transition={{
                        delay: 3,
                        duration: 0.25 / speed_factor,
                        ease: "easeIn",
                    }}
                    style={{ width: "100%" }}
                >
                    <TrieVisualization node={buildTrie([word])} />
                </motion.div>
            </motion.div>
        </>
    );
};

export default TrieAnimation;
