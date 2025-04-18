import Papa from 'papaparse';

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
}

export function highlightWord(arr, word) {
    const parts = arr[0].split(" ");
    let before = [];
    let after = [];
    for (let i = 0; i < parts.length; i++) {
        if (parts[i] == word) {
            parts[i] = "";
            for (let j = 0; j < i; j++) {
                before[j] = parts[j];
                parts[j] = "";
            }
            break;
        }
    }
    for (let i = before.length; i < parts.length; i++) {
        after[i] = parts[i];
    }
    return [
        <p key="0">
            {before.join(" ")} <mark>{word}</mark> {after.join(" ")}{" "}
        </p>,
    ];
}

export async function getYoutubeData() {
    try {
        const response = await fetch('/youtube_video_data.csv');
        const csvText = await response.text();
        
        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                delimiter: ',',
                complete: (results) => {
                    if (!results.data || results.data.length === 0) {
                        reject(new Error('CSV parsing returned no data'));
                        return;
                    }

                    const data = results.data
                        .filter(row => {
                            return row.Title && 
                                   !isNaN(parseInt(row.Views)) && 
                                   !isNaN(parseInt(row.Likes)) && 
                                   !isNaN(parseInt(row.Comments));
                        })
                        .map(row => {
                            const title = row.Title.trim();
                            const views = parseInt(row.Views) || 0;
                            const likes = parseInt(row.Likes) || 0;
                            const comments = parseInt(row.Comments) || 0;
                            
                            return [
                                title,
                                views,
                                likes,
                                comments
                            ];
                        });
                    
                    if (data.length === 0) {
                        reject(new Error('No valid data found in CSV'));
                        return;
                    }
                    
                    // Shuffle the data to get different entries each time
                    shuffleArray(data);
                    resolve(data);
                },
                error: (error) => {
                    console.error('Error parsing CSV:', error);
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error('Error reading CSV file:', error);
        throw error;
    }
}

export default getYoutubeData;
