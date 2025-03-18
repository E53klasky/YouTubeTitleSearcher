class ytVideoStatsHashmap {
    // i will change the size later 
    constructor(bucketSize = 262144) { //2^18
        this.buckets = new Array(bucketSize);
        this.bucketSize = bucketSize; 
    }

    hash(key) {
        let hashValue = 0;
        for (let i = 0; i < key.length; i++) {
            hashValue += key.charCodeAt(i) * i;
        }
        return hashValue % this.buckets.length; 
    }

    setItem(key, value) {
        const index = this.hash(key);
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }
        
        for (let i = 0; i < this.buckets[index].length; i++) {
            if (this.buckets[index][i][0] === key) {
                this.buckets[index][i][1] = value;
                return;
            }
        }
        
        this.buckets[index].push([key, value]);
    }

    getItem(key) {
        const index = this.hash(key);
        if (!this.buckets[index]) {
            return null;
            // throw new Error('Key not found'); not sure
        }

        for (let pair of this.buckets[index]) {
            if (pair[0] === key) {
                return pair[1];
            }
        }
        
        return null;
        // throw new Error('Key not found'); not sure
    }

    removeItem(key) {
        const index = this.hash(key);
        if (!this.buckets[index]) {
            return false; 
        // throw new Error('Key not found'); not sure
        }

        for (let i = 0; i < this.buckets[index].length; i++) {
            if (this.buckets[index][i][0] === key) {
                this.buckets[index].splice(i, 1);
                return true;
            }
        }
        
        return false; 
        // throw new Error('Key not found'); not sure
    }
    
    forEach(callback) {
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                for (let pair of this.buckets[i]) {
                    callback(pair[1], pair[0]);
                }
            }
        }
    }
}


class VideoStats {
    constructor(title, likes, comments, views) {
        this.title = title;
        this.likes = likes;
        this.comments = comments;
        this.views = views;
    }
}
// testing it waiting to for real test 
const ytVideoStats = new ytVideoStatsHashmap();

ytVideoStats.setItem('video1', new VideoStats('Cool Video 1', 100, 20, 1000));
ytVideoStats.setItem('video2', new VideoStats('Awesome Video 2', 200, 40, 2000));
ytVideoStats.setItem('video3', new VideoStats('Amazing Video 3', 300, 60, 3000));


console.log("Video 1 stats:", ytVideoStats.getItem('video1'));


ytVideoStats.setItem('video1', new VideoStats('Updated Video 1', 150, 25, 1500));
console.log("Updated video 1 stats:", ytVideoStats.getItem('video1'));


console.log("Removing video2:", ytVideoStats.removeItem('video2'));
console.log("Trying to get removed video:", ytVideoStats.getItem('video2'));


console.log("All videos:");
ytVideoStats.forEach((value, key) => {
    console.log(`${key}: ${value.title} - ${value.likes} likes, ${value.comments} comments, ${value.views} views`);
});