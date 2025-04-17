

export function buildTrie(words) {
    const root = {
      char: "",
      isEnd: false,
      children: {},
    };
  
    for (const word of words) {
      let current = root;
  
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
  
        if (!current.children[char]) {
          current.children[char] = {
            char: char,
            isEnd: false,
            children: {},
          };
        }
  
        current = current.children[char];
  
        // Mark end of word
        if (i === word.length - 1) {
          current.isEnd = true;
        }
      }
    }
  
    return root;
  }