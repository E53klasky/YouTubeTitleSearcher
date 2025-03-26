import React, { useEffect } from "react";
import Trie from "./trie";

const trieTestCases1 = () => {
    const trie = new Trie();
    console.log(trie.insert("flower"));
    console.log(trie.insert("watch"));
    console.log(trie.prefix("flo"));
    console.log(trie.insert("float"));
    console.log(trie.prefix("fl"));
    console.log(trie.search("wat"));
    console.log(trie.search("watch"));
};

const TrieTesting = () => {
    useEffect(() => {
        trieTestCases1();
    }, []);

    return <></>;
};

export default TrieTesting;
