# Optimized YouTube Data API Fetcher

Quota Management: The script gracefully handles quota exhaustion. When all API keys reach their limits, it stops execution.

Project Rotation: when quats are all used up, the script requires manual change to create a new Google Cloud project and generate fresh API keys. This is the primary bottleneck.

Thread Safety: Measures are implemented to ensure thread safety during data collection because parallelism is the best thing!!!!!!!!!!!

Search Term Generation: Search terms are generated and used to find a wide variety of videos.

Note: The multithreading implementation is somewhat overkill due to the rapid quota consumption of the YouTube Data API.

Dependencies:

`google-api-python-client`: Install using `pip install google-api-python-client`.

Setup:

1. Google Cloud Project: Create a Google Cloud project at Google Cloud Console https://console.cloud.google.com/
2. Enable YouTube Data API v3: Enable the YouTube Data API v3 for your project.
3. Generate API Keys: Generate multiple API keys within your project's credentials.
4. Add API Keys to Script: Replace the placeholder API keys in the `again.py` script with your generated keys.
5. Understanding Quota: Refer to the official YouTube Data API documentation to understand quota costs and limitations:
   Getting Started https://developers.google.com/youtube/v3/getting-started
   Determine Quota Cost https://developers.google.com/youtube/v3/determine_quota_cost

Running the Script:

1.  Navigate to the directory containing the `again.py` file.
2.  Execute the script using `python3 again.py`.

Useful Resources:

API Rate Limit Strategies:
3 Simple Ways to Bypass API Rate Limits https://dev.to/lordghostx/3-simple-ways-to-bypass-api-rate-limits-3de0
Understanding API Rate Limits https://testfully.io/blog/api-rate-limit/
