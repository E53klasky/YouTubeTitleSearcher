import React, { useEffect } from "react";
import { OptimizedYTVideoStatsHashmap } from "./hashmap";
import VideoStats from "./VideoStats";

const HashMapTestCases = () => {
    const hashmap = new OptimizedYTVideoStatsHashmap();

    // Helper function to prettify video stats for console output
    const formatVideoStats = (videoId, stats) => {
        if (!stats) return "null";
        return `${videoId}: {
    title: "${stats.title}",
    likes: ${stats.likes},
    comments: ${stats.comments},
    views: ${stats.views}
}`;
    };

    // Helper function to format search results
    const formatSearchResults = (results) => {
        if (results.length === 0) return "No matches found";

        return results
            .map(([videoId, stats]) => formatVideoStats(videoId, stats))
            .join("\n");
    };

    const insertionTests = () => {
        console.log("--- Insertion Tests ---");

        // Create video stats with regular English titles
        const video1 = new VideoStats(
            "First Video About Cool Monster",
            1000,
            50,
            10000
        );
        const video2 = new VideoStats("Second Video", 2000, 100, 20000);

        // Create video stats with international characters and emojis
        const video3 = new VideoStats(
            "✅ [258/2022]😎 O QUE DIZ O CANAL POTÊNCIA DE 10",
            258,
            1,
            1
        );
        const video4 = new VideoStats(
            "ドラクエ10 オフライン #71 潮風のディーバ",
            33,
            0,
            0
        );
        const video5 = new VideoStats("The monster is cool", 100, 1000, 10000);

        // Insert videos
        hashmap.setItem("video1", video1);
        hashmap.setItem("video2", video2);
        hashmap.setItem("video3", video3);
        hashmap.setItem("video4", video4);
        hashmap.setItem("video5", video5);

        // Retrieve inserted videos
        console.log(
            "Retrieved English video:\n" +
                formatVideoStats("video1", hashmap.getItem("video1"))
        );
        console.log(
            "Retrieved Portuguese/Emoji video:\n" +
                formatVideoStats("video3", hashmap.getItem("video3"))
        );
        console.log(
            "Retrieved Japanese video:\n" +
                formatVideoStats("video4", hashmap.getItem("video4"))
        );
    };

    // Word search tests
    const wordSearchTests = () => {
        console.log("\n--- Word Search Tests ---");

        // Search for English words
        console.log(
            "Videos containing 'Video':\n" +
                formatSearchResults(hashmap.searchByWord("Video"))
        );
        console.log(
            "\nVideos containing 'cool':\n" +
                formatSearchResults(hashmap.searchByWord("cool"))
        );

        // Search for international characters
        console.log(
            "\nVideos containing 'QUE':\n" +
                formatSearchResults(hashmap.searchByWord("QUE"))
        );
        console.log(
            "\nVideos containing 'オフライン':\n" +
                formatSearchResults(hashmap.searchByWord("オフライン"))
        );

        // Search for emoji
        console.log(
            "\nVideos containing '😎':\n" +
                formatSearchResults(hashmap.searchByWord("😎"))
        );
    };

    // Average stats tests
    const averageStatsTests = () => {
        console.log("\n--- Average Stats Tests ---");

        // Test average stats for various words
        console.log(
            "Average stats for 'Video': " +
                hashmap.getAverageStatsForWord("Video")
        );
        console.log(
            "Average stats for 'monster': " +
                hashmap.getAverageStatsForWord("monster")
        );
        console.log(
            "Average stats for 'cool': " +
                hashmap.getAverageStatsForWord("cool")
        );
        console.log(
            "Average stats for 'CANAL': " +
                hashmap.getAverageStatsForWord("CANAL")
        );
        console.log(
            "Average stats for 'nonexistent': " +
                hashmap.getAverageStatsForWord("nonexistent")
        );

        const coolVideos = hashmap.searchByWord("cool");
        let totalLikes = 0,
            totalComments = 0,
            totalViews = 0;

        console.log("\nDetailed calculation for 'cool':");
        for (let [, stats] of coolVideos) {
            // Changed '_' to ',' to properly indicate unused variable
            console.log(
                `Video: Likes=${stats.likes}, Comments=${stats.comments}, Views=${stats.views}`
            );
            totalLikes += stats.likes;
            totalComments += stats.comments;
            totalViews += stats.views;
        }

        console.log(
            `Total: Likes=${totalLikes}, Comments=${totalComments}, Views=${totalViews}`
        );
        console.log(
            `Average calculation: (${totalLikes} + ${totalComments} + ${totalViews}) / 3 = ${Math.round(
                (totalLikes + totalComments + totalViews) / 3
            )}`
        );
    };

    const runAllTests = () => {
        console.log("=== Enhanced Hashmap Data Structure Test Cases ===");
        insertionTests();
        wordSearchTests();
        averageStatsTests();
    };

    return { runAllTests };
};

const HashMapTesting = () => {
    useEffect(() => {
        const hashmapTests = HashMapTestCases();
        hashmapTests.runAllTests();
    }, []);

    return <div></div>;
};

export default HashMapTesting;
