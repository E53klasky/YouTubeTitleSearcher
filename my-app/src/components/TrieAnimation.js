import React, { useEffect, useMemo } from "react";
import "@fontsource/poppins";
import { motion, useAnimation } from "framer-motion";
import TrieVisualization from "./TrieVisualization.js";
import { buildTrie } from "./buildTrie";

const TrieAnimation = ({ word, controls }) => {
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
                        delay: first ? 3 : 1,
                        duration: 0.5,
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

    return (
        <>
            <motion.div
                animate={{
                    y: ["0px", `${(word.length * 0.25 + 0.78) * 300}px`],
                    scale: 3,
                }} 
                transition={{
                    delay: 1,
                    duration: 1,
                    repeat: 0,
                    ease: "easeIn",
                }}
                style={{ width: "100%" }}
            >
                <motion.div
                    animate={controls}
                    transition={{ delay: 5, duration: 1, ease: "easeIn" }}
                    style={{ width: "100%" }}
                >
                    <TrieVisualization node={buildTrie([word])} />
                </motion.div>
            </motion.div>
        </>
    );
};

export default TrieAnimation;
