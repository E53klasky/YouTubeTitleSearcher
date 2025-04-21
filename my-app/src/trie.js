/**
 * Trie implementation
 * Author: Owen Szymanski
 * Description: Implementation of a Trie data structure
 */

import VideoStats from "./VideoStats";

export default class Trie {
    //define private attribute
    #root;

    constructor() {
        this.#root = new TrieNode();
        this.titleCount = 0;
    }

    //insert a title into the trie
    insert(title, data) {
        const words = title.trim().split(/\s+/);
        this.titleCount++;

        for (const word of words) {
            this.#insertWord(word, data);
        }
    }

    //insert a word into the trie
    #insertWord(word, data) {
        let curr = this.#root;
        for (const c of word) {
            if (!curr.children.has(c)) {
                curr.children.set(c, new TrieNode());
            }
            curr = curr.children.get(c);
        }

        curr.isWord = true;

        curr.data.push(data);

        return true;
    }

    /**
     * check if a word exists in the trie
     * @param {string} word
     * @returns {boolean}
     */
    search(word) {
        let curr = this.#root;
        for (const c of word) {
            if (!curr.children.has(c)) return false;
            curr = curr.children.get(c);
        }
        return curr.isWord;
    }

    getWordData(word) {
        let curr = this.#root;
        for (const c of word) {
            if (!curr.children.has(c)) return null;
            curr = curr.children.get(c);
        }
        return curr.getAverageData();
    }

    //returns a list of all words in the trie that contain the prefix
    prefix(word) {
        const outArr = [];
        let curr = this.#root;
        for (const c of word) {
            if (!curr.children.has(c)) return outArr;
            curr = curr.children.get(c);
        }

        //found end of prefix
        this.#prefixHelper(curr, word, outArr);

        return outArr;
    }

    #prefixHelper(currNode, currWord, outArr) {
        if (currNode.isWord) outArr.push(currWord);
        currNode.children.forEach((value, key) => {
            //value = the child node
            //key = the character
            this.#prefixHelper(value, currWord + key, outArr);
        });
    }
}

class TrieNode {
    constructor() {
        this.isWord = false;
        this.children = new Map();
        this.data = [];
    }

    getAverageData() {
        let totalLikes = 0;
        let totalComments = 0;
        let totalViews = 0;

        for (const stat of this.data) {
            totalLikes += stat.likes;
            totalComments += stat.comments;
            totalViews += stat.views;
        }

        return {
            avgStats: new VideoStats(
                "Average",
                totalLikes / this.data.length,
                totalComments / this.data.length,
                totalViews / this.data.length
            ),
            count: this.data.length,
        };
    }
}
