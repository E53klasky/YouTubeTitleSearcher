export function buildTrie(words) {
  const root = {
    char: '',
    isEnd: false,
    children: Object.create(null), 
  };

  for (const word of words) {
    let current = root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      if (!current.children[char]) {
        current.children[char] = {
          char,
          isEnd: false,
          children: Object.create(null),
        };
      }

      current = current.children[char];

      if (i === word.length - 1) {
        current.isEnd = true;
      }
    }
  }

  return root;
}
