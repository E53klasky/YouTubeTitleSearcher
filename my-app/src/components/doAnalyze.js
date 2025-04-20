import Trie from "../trie";
import { OptimizedYTVideoStatsHashmap } from "../hashmap";
import getYoutubeData from "./visualsData";
import VideoStats from "../VideoStats";

let dataArr = null;
let trie = new Trie();
let hashmap = new OptimizedYTVideoStatsHashmap();

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

const createDataStructures = async () => {
    try {
        if (!dataArr) {
            dataArr = await getYoutubeData();
            console.log("Loaded data:", dataArr.slice(0, 2));
        }

        trie = new Trie();
        hashmap = new OptimizedYTVideoStatsHashmap();

        if (!Array.isArray(dataArr) || dataArr.length === 0) {
            throw new Error("No data available to process");
        }

        for (const entry of dataArr) {
            if (!entry || !entry[0]) {
                console.log("Skipping invalid entry:", entry);
                continue;
            }

            try {
                const title = entry[0].toString().trim();
                const views = parseInt(entry[1]) || 0;
                const likes = parseInt(entry[2]) || 0;
                const comments = parseInt(entry[3]) || 0;

                const data = new VideoStats(title, likes, comments, views);
                trie.insert(title, data);
                hashmap.insertTitle(title, data);
                hashmap.setItem(title, data);
            } catch (err) {
                console.error("Error processing entry:", entry, err);
            }
        }
    } catch (error) {
        console.error("Error in createDataStructures:", error);
        throw error;
    }
};

createDataStructures().catch((error) => {
    console.error("Error initializing data structures:", error);
});

let currentController = null;

export async function doAnalyze(
    title,
    setCurrentWord,
    setAnalyzing,
    setDataDisplay,
    setTrieTime,
    setMapTime,
    setTrieStats,
    setHashMapTitle
) {
    if (currentController) {
        currentController.abort();
    }

    currentController = new AbortController();
    const signal = currentController.signal;

    setAnalyzing(true);
    setHashMapTitle(title);

    console.log(trie.titleCount);

    try {
        if (!dataArr) {
            await createDataStructures();
        }

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
            const hashmapStats = hashmap.getAverageWordStats(word);
            const mapEnd = performance.now();

            if (trieStats && hashmapStats) {
                setTrieStats({
                    views: trieStats.avgStats.views || 0,
                    likes: trieStats.avgStats.likes || 0,
                    comments: trieStats.avgStats.comments || 0,
                });

                const trieCountDisplay =
                    trieStats.count == 1
                        ? `There was ${trieStats.count} title that contained "${word}"`
                        : `There were ${trieStats.count} titles that contained "${word}"`;

                const mapCountDisplay =
                    trieStats.count == 1
                        ? `There was ${hashmapStats.count} title that contained "${word}"`
                        : `There were ${hashmapStats.count} titles that contained "${word}"`;

                setDataDisplay(
                    `
                    According to the HashMap, it has an average views of ${hashmapStats.avgStats.views.toFixed(
                        2
                    )}, an average likes of ${hashmapStats.avgStats.likes.toFixed(
                        2
                    )}, and an average comments of ${hashmapStats.avgStats.comments.toFixed(
                        2
                    )}. ${mapCountDisplay}


                    
                    According to the trie, it has an average views of ${trieStats.avgStats.views.toFixed(
                        2
                    )}, an average likes of ${trieStats.avgStats.likes.toFixed(
                        2
                    )}, and an average comments of ${trieStats.avgStats.comments.toFixed(
                        2
                    )}. ${trieCountDisplay}`
                );
                setTrieTime(
                    `The Trie produced the results in ${(
                        trieEnd - trieStart
                    ).toFixed(4)}ms for the word "${word}"`
                );
                setMapTime(
                    `The Hash Map produced the results in ${(
                        mapEnd - mapStart
                    ).toFixed(4)}ms for the word "${word}"`
                );
            } else {
                setTrieStats({ views: 0, likes: 0, comments: 0 });
                setDataDisplay(`No data found for the word "${word}"`);
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
    } catch (error) {
        console.error("Error in doAnalyze:", error);
        setDataDisplay("An error occurred while analyzing the title");
        setTrieTime("");
        setMapTime("");
        setTrieStats({ views: 0, likes: 0, comments: 0 });
    } finally {
        setAnalyzing(false);
        setHashMapTitle("");
    }
}
