// visualsData.js
import React from 'react';

// Function to shuffle an array
export function shuffleArray(arr) {
  if (!arr || !Array.isArray(arr)) return [];
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

// Function to highlight a word in a text
export function highlightWord(text, word) {
  if (!text || typeof text !== 'string' || !word) return text;
  
  const parts = text.split(word);
  if (parts.length === 1) return text; // Word not found
  
  return (
    <React.Fragment>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && <mark>{word}</mark>}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}

// Function to generate dummy YouTube data
export default function youtubeData() {
  // Create 100 sample YouTube video data entries
  return Array(100).fill().map((_, i) => [
    `Sample YouTube Video Title ${i}`, 
    Math.floor(Math.random() * 100000),  // views
    Math.floor(Math.random() * 10000),   // likes
    Math.floor(Math.random() * 1000)     // comments
  ]);
}