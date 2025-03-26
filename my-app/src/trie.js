/**
 * Trie implementation
 * Author: Owen Szymanski
 * Description: Implementation of a Trie data structure
 */

export default class Trie {
    //define private attribute
    #root;

    constructor() {
        this.#root = new TrieNode();
    }

    //insert a word into the trie
    insert(word) {
        let curr = this.#root;
        for (const c of word) {
            if (!curr.children.has(c)) {
                curr.children.set(c, new TrieNode());
            }
            curr = curr.children.get(c);
        }

        if (curr.isWord) return false;

        curr.isWord = true;
        return true;
    }

    //check if a word exists in the trie
    search(word) {
        let curr = this.#root;
        for (const c of word) {
            if (!curr.children.has(c)) return false;
            curr = curr.children.get(c);
        }
        return curr.isWord;
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
    }
}
