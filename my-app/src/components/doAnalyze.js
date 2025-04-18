import Trie from "../trie";
import { OptimizedYTVideoStatsHashmap } from "../hashmap";
import youtubeData from "./visualsData";
import VideoStats from "../VideoStats";

const dataArr = youtubeData();
const trie = new Trie();
const hashmap = new OptimizedYTVideoStatsHashmap();

const SECONDS_PER_CHAR = 2;

function cancelableDelay(ms, signal) {
    return new Promise((resolve, reject) => {
        const id = setTimeout(() => resolve(), ms);

        signal.addEventListener("abort", () => {
            clearTimeout(id);
            reject(new DOMException("Aborted", "AbortError"));
        });
    });
}

const createDataStructures = () => {
    for (const entry of dataArr) {
        const title = entry[0];
        const data = new VideoStats(title, entry[2], entry[3], entry[1]);
        trie.insert(title, data);
        hashmap.setItem(title, data);
    }
};

createDataStructures();

let currentController = null;

export async function doAnalyze(
    title,
    setCurrentWord,
    setAnalyzing,
    setDataDisplay,
    setTrieTime,
    setMapTime
) {
    if (currentController) {
        currentController.abort();
    }

    currentController = new AbortController();
    const signal = currentController.signal;

    setAnalyzing(true);

    console.log(`Analyzing ${title}`);

    const words = title.trim().split(/\s+/);

    for (const word of words) {
        setCurrentWord("");
        await cancelableDelay(100, signal);
        setCurrentWord(word);

        const trieStart = performance.now();
        const trieStats = trie.getWordData(word); 
        const trieEnd = performance.now();

        const mapStart = performance.now();
        const hashmapStats = hashmap.getAverageStatsForWord(word); 
        const mapEnd = performance.now();

        if (trieStats && hashmapStats) {
            setDataDisplay(
                `The word "${word}" has a score of ${hashmapStats}. It has an average views of ${trieStats.views}, an average likes of ${trieStats.likes}, and an average comments of ${trieStats.comments}`
            );
            setTrieTime(
                `The Trie produced the results in ${
                    trieEnd - trieStart
                }ms for the word "${word}"`
            );
            setMapTime(
                `The Hash Map produced the results in ${
                    mapEnd - mapStart
                }ms for the word "${word}"`
            );
        } else {
            setDataDisplay(
                `No data found for the word "${word}"`
            );
            setTrieTime(
                `The Trie search took ${
                    trieEnd - trieStart
                }ms for the word "${word}" but found no results`
            );
            setMapTime(
                `The Hash Map search took ${
                    mapEnd - mapStart
                }ms for the word "${word}" but found no results`
            );
        }

        try {
            await cancelableDelay(
                3000 + SECONDS_PER_CHAR * 1000 * word.length,
                signal
            );
        } catch (err) {
            if (err.name === "AbortError") {
                console.log("Previous analysis aborted");
                setAnalyzing(false);
                return;
            } else {
                throw err;
            }
        }
    }

    setAnalyzing(false);
}