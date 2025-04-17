// hooks/useYoutubeData.js
import { useState, useEffect } from 'react';

export function useYoutubeData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/youtube_video_data.csv')
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = parseCSV(csvText);
        console.log("Parsed CSV data:", parsed); // <--- Add this
        setData(parsed);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  return { data, loading, error };
}

function parseCSV(csvText) {
  const rows = csvText.split(/\r?\n/).filter(row => row.trim() !== '');
  if (rows.length === 0) return [];

  const headers = rows[0].split(',');
  return rows.slice(1).map((row) => {
    const regex = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
    const values = [];
    let match;
    while ((match = regex.exec(row)) !== null) {
      let val = match[1];
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      }
      values.push(val);
    }

    const item = {};
    headers.forEach((header, i) => {
      let num = parseInt(values[i]?.replace(/,/g, ''), 10);
      item[header] = isNaN(num) ? values[i] : num;
    });

    return item;
  });
}
