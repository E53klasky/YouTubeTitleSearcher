import random
import time
import os 
import csv 
import concurrent.futures
import threading # for threads 
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError # for error handling


API_KEYS = [] # add them here 

# look at read me link for numbers
OUTPUT_FILE = 'youtube_video_data4.csv'  # change this each time!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
PROGRESS_FILE = 'data_collection_progress4.json' # change this each time!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
TARGET_COUNT = 100000 
BATCH_SIZE = 50  
MAX_RETRIES = 3
RETRY_DELAY = 5
WORKERS = min(len(API_KEYS), 20) 
SEARCH_TERMS_FILE = 'search_terms.txt'


collected_videos = set()
csv_lock = threading.Lock()
video_count_lock = threading.Lock()

# the funciotn checks if a file exists, and if not, writes a list of predefined search terms and random combinations of these terms to the file.
def ensure_search_terms():
    if not os.path.exists(SEARCH_TERMS_FILE):
        words = [
    "Python", "JavaScript", "C++", "AI", "machine learning", "deep learning", 
    "data science", "big data", "cloud computing", "cybersecurity", 
    "artificial intelligence", "virtual reality", "blockchain", "IoT", 
    "startup", "entrepreneurship", "business", "finance", "marketing", 
    "investment", "technology", "gaming", "NFT", "metaverse", 
    "healthcare", "mental health", "fitness", "nutrition", "wellness", 
    "sustainability", "environment", "climate change", "green energy", 
    "politics", "global news", "current events", "travel", "photography", 
    "science", "astronomy", "physics", "biology", "space exploration", 
    "movies", "tv shows", "book recommendations", "comedy", "music", 
    "podcasts", "sports", "fitness", "soccer", "basketball", "baseball", 
    "football", "hiking", "adventure", "culture", "history", "language"
]
        
        with open(SEARCH_TERMS_FILE, 'w') as f:
            for word in words:
                f.write(f"{word}\n")
            
            for i in range(200):
                word1 = random.choice(words)
                word2 = random.choice(words)
                if word1 != word2:
                    f.write(f"{word1} {word2}\n")

def get_random_search_term():
    ensure_search_terms()
    with open(SEARCH_TERMS_FILE, 'r') as f:
        terms = f.readlines()
    return random.choice(terms).strip()


def get_youtube_service(api_key): 
    return build('youtube', 'v3', developerKey=api_key)

# load existing data
def load_existing_data():
    if os.path.exists(OUTPUT_FILE):
        try:
            with open(OUTPUT_FILE, 'r', encoding='utf-8', errors='ignore') as csvfile:
                reader = csv.reader(csvfile)
                next(reader, None)  
                for row in reader:
                    if row and len(row) > 0:  
                        video_id = row[0] if len(row) >= 1 else None
                        if video_id:
                            collected_videos.add(video_id)
            
            print(f"Loaded {len(collected_videos)} videos from existing data.")
        except Exception as e:
            print(f"Error loading existing data: {e}")
    
    if not os.path.exists(OUTPUT_FILE):
        with open(OUTPUT_FILE, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(['Video ID', 'Title', 'Views', 'Likes', 'Comments'])
    
    return len(collected_videos)

# wrighting csv file
def save_to_csv(video_data):
    with csv_lock:
        with open(OUTPUT_FILE, 'a', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            for video in video_data:
                writer.writerow([
                    video['id'],
                    video['title'],
                    video['views'],
                    video['likes'],
                    video['comments']
                ])

# calling the api
def get_video_details(youtube, video_ids):
    results = []
    
    if not video_ids:
        return results
    
    for attempt in range(MAX_RETRIES):
        try:
            response = youtube.videos().list(
                part="snippet,statistics",
                id=",".join(video_ids)
            ).execute()
            
            for item in response.get('items', []):
                video_id = item['id']
                title = item['snippet']['title']
                statistics = item['statistics']
                
                views = statistics.get('viewCount', '0')
                likes = statistics.get('likeCount', '0')
                comments = statistics.get('commentCount', '0')
                
                results.append({
                    'id': video_id,
                    'title': title,
                    'views': views,
                    'likes': likes,
                    'comments': comments
                })
            
            break  
            # If a quota or rate limit error is encountered (HTTP 403 or 429, or 'quota' in the error message),
            # the script implements an exponential backoff strategy. This means it waits for an increasing amount of time
            # before retrying the request. The wait time is calculated as RETRY_DELAY multiplied by 2 raised to the power of the attempt number.
            # This prevents overwhelming the API with retries during periods of high load.
            # If the maximum number of retries (MAX_RETRIES) is reached, the batch of video IDs is skipped.
        except HttpError as e:
            error_msg = str(e)
            print(f"HTTP Error: {error_msg}")
            if "quota" in error_msg.lower() or e.resp.status in [403, 429]: 
                if attempt < MAX_RETRIES - 1:
                    wait_time = RETRY_DELAY * (2 ** attempt)  
                    print(f"Rate/quota limit hit. Waiting {wait_time} seconds...")
                    time.sleep(wait_time)
                else:
                    print("Maximum retries reached. Skipping batch.")
            else:
                if attempt < MAX_RETRIES - 1:
                    time.sleep(RETRY_DELAY)
                else:
                    print(f"Error retrieving video details: {error_msg}")
                    break
        except Exception as e:
            print(f"Unexpected error: {e}")
            if attempt < MAX_RETRIES - 1:
                time.sleep(RETRY_DELAY)
            else:
                print("Maximum retries reached. Skipping batch.")
    
    return results

#The function continuously searches for YouTube videos using a provided API key, collects video details, and saves them to a CSV file 
# until a target count is reached or an error occurs. 
def worker_task(api_key, worker_id):
    print(f"Worker {worker_id} started with API key ending in ...{api_key[-4:]}")
    youtube = get_youtube_service(api_key)
    videos_collected = 0
    
    while True:
        with video_count_lock:
            current_count = len(collected_videos)
            if current_count >= TARGET_COUNT:
                print(f"Worker {worker_id}: Target reached. Shutting down.")
                break
        
        search_term = get_random_search_term()
        print(f"Worker {worker_id}: Searching for '{search_term}'")
        
        try:
            search_response = youtube.search().list(
                q=search_term,
                part="id",
                maxResults=BATCH_SIZE,
                type="video"
            ).execute()
            
            video_ids = [item['id']['videoId'] for item in search_response.get('items', [])
                        if item['id']['kind'] == 'youtube#video']
            
            with video_count_lock:
                new_video_ids = [vid for vid in video_ids if vid not in collected_videos]
                for vid in new_video_ids:
                    collected_videos.add(vid)
            
            if new_video_ids:
                video_details = get_video_details(youtube, new_video_ids)
                
                if video_details:
                    save_to_csv(video_details)
                    
                    videos_collected += len(video_details)
                    with video_count_lock:
                        current_count = len(collected_videos)
                        print(f"Worker {worker_id}: Progress {current_count}/{TARGET_COUNT} " +
                              f"(worker collected {videos_collected} videos)")
            
            time.sleep(random.uniform(0.5, 1.5))
            
        except HttpError as e:
            error_msg = str(e)
            print(f"Worker {worker_id}: HTTP Error during search: {error_msg}")
            if "quota" in error_msg.lower() or e.resp.status in [403, 429]:
                print(f"Worker {worker_id}: API key quota may be exhausted. Sleeping...")
                time.sleep(60)  
            else:
                print(f"Worker {worker_id}: Search error: {error_msg}")
                time.sleep(5)
        except Exception as e:
            print(f"Worker {worker_id}: Unexpected error during search: {e}")
            time.sleep(5)
    
    print(f"Worker {worker_id}: Finished after collecting {videos_collected} videos")
    return videos_collected

# display stats
def display_stats(start_time):
    current_count = len(collected_videos)
    elapsed = time.time() - start_time
    if elapsed > 0:
        rate = current_count / (elapsed / 60)  
        eta_minutes = (TARGET_COUNT - current_count) / rate if rate > 0 else float('inf')
        
        print(f"\n--- STATS UPDATE ---")
        print(f"Videos collected: {current_count}/{TARGET_COUNT} ({(current_count/TARGET_COUNT*100):.1f}%)")
        print(f"Time elapsed: {elapsed/60:.1f} minutes")
        print(f"Collection rate: {rate:.1f} videos/minute")
        print(f"Estimated time remaining: {eta_minutes:.1f} minutes")
        print(f"--------------------\n")
    else:
        print("Collection just started. Statistics will be available soon.")


def main():
    print(f"Starting collection with {WORKERS} parallel workers")
    start_time = time.time()

    initial_count = load_existing_data()
    print(f"Starting with {initial_count} existing videos")

    api_keys_for_workers = []
    for i in range(WORKERS):
        api_keys_for_workers.append(API_KEYS[i % len(API_KEYS)])
    
    try:
        with concurrent.futures.ThreadPoolExecutor(max_workers=WORKERS) as executor:
            futures = []
            for i in range(WORKERS):
                futures.append(executor.submit(worker_task, api_keys_for_workers[i], i+1))
            
            while not all(future.done() for future in futures):
                display_stats(start_time)
                time.sleep(30)
            
            total_collected = 0
            for future in futures:
                try:
                    worker_count = future.result()
                    total_collected += worker_count
                except Exception as e:
                    print(f"Worker error: {e}")
            
            print(f"All workers finished. Collected approximately {total_collected} new videos.")
    
    except KeyboardInterrupt:
        print("\nCollection interrupted.")
    except Exception as e:
        print(f"Error in main process: {e}")
    
    final_count = len(collected_videos)
    elapsed = time.time() - start_time
    print(f"\nCollection complete. Total videos in database: {final_count}")
    print(f"New videos collected in this run: {final_count - initial_count}")
    print(f"Total time: {elapsed/60:.1f} minutes")
    if elapsed > 0:
        print(f"Average rate: {(final_count - initial_count)/(elapsed/60):.1f} videos per minute")

if __name__ == "__main__":
    main()