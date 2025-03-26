import React, { useEffect } from "react";
import { OptimizedYTVideoStatsHashmap, VideoStats } from "./hashmap";

const HashMapTestCases = () => {
    const hashmap = new OptimizedYTVideoStatsHashmap();

    const insertionTests = () => {
        console.log("--- Insertion Tests ---");
        
        // Create video stats
        const video1 = new VideoStats("First Video", 1000, 50, 10000);
        const video2 = new VideoStats("Second Video", 2000, 100, 20000);
        
        // Insert videos
        console.log("Inserting first video:", hashmap.setItem("video1", video1));
        console.log("Inserting second video:", hashmap.setItem("video2", video2));
        
        // Retrieve inserted videos
        console.log("Retrieved first video:", hashmap.getItem("video1"));
        console.log("Retrieved second video:", hashmap.getItem("video2"));
    };

    // Update Test Cases
    const updateTests = () => {
        console.log("--- Update Tests ---");
        
        const updatedVideo = new VideoStats("Updated Video", 5000, 200, 50000);
        console.log("Updating video1:", hashmap.setItem("video1", updatedVideo));
        console.log("Retrieved updated video:", hashmap.getItem("video1"));
    };

    // Removal Test Cases
    const removalTests = () => {
        console.log("--- Removal Tests ---");
        
        console.log("Removing video2:", hashmap.removeItem("video2"));
        console.log("Trying to retrieve removed video:", hashmap.getItem("video2"));
    };

    // Comprehensive Test Runner
    const runAllTests = () => {
        console.log("=== Hashmap Data Structure Test Cases ===");
        insertionTests();
        updateTests();
        removalTests();
    };

    return { runAllTests };
};

const HashMapTesting = () => {
    useEffect(() => {
        const hashmapTests = HashMapTestCases();
        hashmapTests.runAllTests();
    }, []);

    return <div>Hashmap Testing (Check Console)</div>;
};

export default HashMapTesting;