import { data } from "framer-motion/client";
import VideoStats from "./VideoStats";

export class OptimizedYTVideoStatsHashmap {
    constructor(bucketSize = 131072) {
        // Optimal bucket size for load factor control 100,000
        this.buckets = new Array(bucketSize);
        this.bucketSize = bucketSize;
        this.size = 0;

        this.wordBuckets = new Array(bucketSize);
        this.wordBucketSize = bucketSize;
        this.wordSize = 0;
    }

    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    /**
     * Generates a hash value for a given key.
     * This function uses a variant of the djb2 hash algorithm with bitwise operations
     * and a fixed multiplier (16777619) to generate a hash value for the provided key.
     * The result is then adjusted to fit within the bounds of the bucket size.
     */
    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash << 5) - hash + key.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash * 16777619) % this.bucketSize;
    }

    hashWord(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash << 5) - hash + key.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash * 16777619) % this.wordBucketSize;
    }

    //Adds or updates an item in the hash map.

    setItem(videoId, videoStats) {
        if (!(videoStats instanceof VideoStats)) {
            throw new Error("Value must be an instance of VideoStats");
        }

        if (this.size / this.bucketSize > 0.7) {
            // 0.7 is the load factor
            this._resize(this.bucketSize * 2);
        }

        const index = this.hash(videoId);
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        for (let i = 0; i < this.buckets[index].length; i++) {
            if (this.buckets[index][i][0] === videoId) {
                this.buckets[index][i][1] = videoStats;
                return;
            }
        }

        this.buckets[index].push([videoId, videoStats]);
        this.size++;
    }

    insertTitle(title, videoStats) {
        if (!(videoStats instanceof VideoStats)) {
            throw new Error("Value must be an instance of VideoStats");
        }

        const words = title.trim().split(/\s+/);

        for (const word of words) {
            this.insertWord(word, videoStats);
        }
    }

    insertWord(word, videoStats) {
        if (!(videoStats instanceof VideoStats)) {
            throw new Error("Value must be an instance of VideoStats");
        }

        if (this.wordSize / this.wordBucketSize > 0.7) {
            // 0.7 is the load factor
            this._resizeWord(this.wordBucketSize * 2);
        }

        const index = this.hashWord(word);

        if (!this.wordBuckets[index]) {
            this.wordBuckets[index] = [];
        }

        this.wordBuckets[index].push([word, videoStats]);
        this.wordSize++;
    }

    /**
     * Resizes the hash map to a new bucket size.
     * This function creates a new array of buckets with the specified size and rehashes
     */
    _resize(newSize) {
        const oldBuckets = this.buckets;
        this.buckets = new Array(newSize);
        this.bucketSize = newSize;
        this.size = 0;

        // Rehash all existing items and insert them into the new bucket array
        for (let bucket of oldBuckets) {
            if (bucket) {
                for (let [word, videoStats] of bucket) {
                    this.insertWord(word, videoStats);
                }
            }
        }
    }

    _resizeWord(newSize) {
        const oldBuckets = this.wordBuckets;
        this.wordBuckets = new Array(newSize);
        this.wordBucketSize = newSize;
        this.wordSize = 0;

        // Rehash all existing items and insert them into the new bucket array
        for (let bucket of oldBuckets) {
            if (bucket) {
                for (let [word, videoStats] of bucket) {
                    this.insertWord(word, videoStats);
                }
            }
        }
    }

    getItem(videoId) {
        const index = this.hash(videoId);
        if (!this.buckets[index]) {
            return null;
        }

        for (let [storedVideoId, videoStats] of this.buckets[index]) {
            if (storedVideoId === videoId) {
                return videoStats;
            }
        }

        return null;
    }

    removeItem(videoId) {
        const index = this.hash(videoId);
        if (!this.buckets[index]) {
            return false;
        }

        for (let i = 0; i < this.buckets[index].length; i++) {
            if (this.buckets[index][i][0] === videoId) {
                this.buckets[index].splice(i, 1);
                this.size--;

                if (this.size > 0 && this.size / this.bucketSize < 0.2) {
                    this._resize(Math.max(this.bucketSize / 2, 32768));
                }

                return true;
            }
        }

        return false;
    }

    /**
     * Searches for all videos containing a specific word in their titles
     */
    searchByWord(word) {
        if (!word || typeof word !== "string") {
            return [];
        }

        const results = [];

        // Search through all buckets
        for (let bucket of this.buckets) {
            if (bucket) {
                for (let [videoId, videoStats] of bucket) {
                    // Check if the title contains the word (case insensitive)

                    const parts = videoStats.title.split(" ");
                    for (const part of parts) {
                        if (part === word) {
                            results.push([videoId, videoStats]);
                            break;
                        }
                    }
                }
            }
        }

        return results;
    }

    getWordStats(word) {
        const index = this.hashWord(word);

        if (!this.wordBuckets[index]) {
            return [];
        }

        return this.wordBuckets[index];
    }

    getAverageWordStats(word) {
        const dataPoints = this.getWordStats(word);

        if (dataPoints.length == 0) {
            return {
                avgStats: new VideoStats("Empty", 0, 0, 0),
                count: dataPoints.length,
            };
        }

        let totalLikes = 0;
        let totalComments = 0;
        let totalViews = 0;

        for (let [, videoStats] of dataPoints) {
            totalLikes += videoStats.likes;
            totalComments += videoStats.comments;
            totalViews += videoStats.views;
        }

        return {
            avgStats: new VideoStats(
                "Average",
                totalLikes / dataPoints.length,
                totalComments / dataPoints.length,
                totalViews / dataPoints.length
            ),
            count: dataPoints.length,
        };
    }

    /**
     * Calculates the average likes, comments, and views for videos containing a specific word
     */
    getAverageStatsForWord(word) {
        const videos = this.searchByWord(word);

        if (videos.length === 0) {
            return 0;
        }

        let totalLikes = 0;
        let totalComments = 0;
        let totalViews = 0;

        for (let [, videoStats] of videos) {
            totalLikes += videoStats.likes;
            totalComments += videoStats.comments;
            totalViews += videoStats.views;
        }

        // Calculate the overall average
        // const overallSum = totalLikes + totalComments + totalViews;
        // return Math.round(overallSum / 3);

        return {
            avgStats: new VideoStats(
                "Average",
                totalLikes / videos.length,
                totalComments / videos.length,
                totalViews / videos.length
            ),
            count: videos.length,
        };
    }

    /**
     * Gets all videos in the hashmap
     */
    getAllVideos() {
        const allVideos = [];

        for (let bucket of this.buckets) {
            if (bucket) {
                for (let video of bucket) {
                    allVideos.push(video);
                }
            }
        }

        return allVideos;
    }
}

// Export VideoStats for use in other files
export { VideoStats };
