// VideoStats class to store video information
class VideoStats {
    constructor(title, likes, comments, views) {
        this.title = title;
        this.likes = likes;
        this.comments = comments;
        this.views = views;
    }
}

class OptimizedYTVideoStatsHashmap {
    constructor(bucketSize = 131072) { // Optimal bucket size for load factor control 100,000
        this.buckets = new Array(bucketSize);
        this.bucketSize = bucketSize;
        this.size = 0;
    }

    // Hash function to map video IDs to bucket indices
    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = ((hash << 5) - hash) + key.charCodeAt(i);
            hash |= 0; 
        }
        return Math.abs(hash * 16777619) % this.bucketSize;
    }

    // Insert or update a video entry in the hashmap
    setItem(videoId, videoStats) {
        if (!(videoStats instanceof VideoStats)) {
            throw new Error('Value must be an instance of VideoStats');
        }

        // Resize if load factor exceeds 0.7
        if (this.size / this.bucketSize > 0.7) {
            this._resize(this.bucketSize * 2);
        }

        const index = this.hash(videoId);
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        // Check if video ID already exists and update it
        for (let i = 0; i < this.buckets[index].length; i++) {
            if (this.buckets[index][i][0] === videoId) {
                this.buckets[index][i][1] = videoStats;
                return;
            }
        }

        // Add new video entry
        this.buckets[index].push([videoId, videoStats]);
        this.size++;
    }

    // Resize the hashmap when necessary
    _resize(newSize) {
        const oldBuckets = this.buckets;
        this.buckets = new Array(newSize);
        this.bucketSize = newSize;
        this.size = 0;

        for (let bucket of oldBuckets) {
            if (bucket) {
                for (let [videoId, videoStats] of bucket) {
                    this.setItem(videoId, videoStats);
                }
            }
        }
    }

    // Retrieve video stats by video ID
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

    // Remove a video entry by video ID
    removeItem(videoId) {
        const index = this.hash(videoId);
        if (!this.buckets[index]) {
            return false;
        }

        for (let i = 0; i < this.buckets[index].length; i++) {
            if (this.buckets[index][i][0] === videoId) {
                this.buckets[index].splice(i, 1);
                this.size--;
    
                // Shrink hashmap 
                if (this.size > 0 && this.size / this.bucketSize < 0.2) {
                    this._resize(Math.max(this.bucketSize / 2, 32768)); 
                }
                
                return true;
            }
        }
        
        return false;
    }
}

module.exports = { OptimizedYTVideoStatsHashmap, VideoStats };
