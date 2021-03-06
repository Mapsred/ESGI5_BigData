from __future__ import print_function

import os
import json

import tweepy
import datetime

import requests

WORDS = ['#WarcraftQA']

CONSUMER_KEY = os.getenv('CONSUMER_KEY')
CONSUMER_SECRET = os.getenv('CONSUMER_SECRET')
ACCESS_TOKEN = os.getenv('ACCESS_TOKEN')
ACCESS_TOKEN_SECRET = os.getenv('ACCESS_TOKEN_SECRET')

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
print("Tracking: " + str(WORDS))
api = tweepy.API(auth)

today = datetime.datetime.today().strftime("%Y-%m-%d")

cursor = tweepy.Cursor(
    api.search,
    q=WORDS,
    result_type='recent',
    monitor_rate_limit=True,
    wait_on_rate_limit=True,
    wait_on_rate_limit_notify=True,
    lang="en",
    until=today,
    include_entities=True,
    tweet_mode='extended'
)

bulk = ""
total = 0

for tweet in cursor.items():
    # tweepy.models.Status
    data = tweet._json
    data = data["retweeted_status"] if "retweeted_status" in data else data
    dataline = {
        'text': data['full_text'],
        'entities': data['entities'],
        'user': data['user']
    }

    bulk += json.dumps({'index': {'_id': data['id']}})
    bulk += "\n"
    bulk += json.dumps(dataline)
    bulk += "\n"
    total += 1

print(f"Total : {total} tweets")

requests.delete("http://elasticsearch:9200/tweets")

response = requests.post("http://elasticsearch:9200/tweets/_doc/_bulk", data=bulk, headers={
    'Content-Type': 'application/json',
})

# Enable fielddata: true on the text field to enable usage of aggregate query
requests.put("http://elasticsearch:9200/tweets/_mapping/_doc", json={
    "properties": {
        "text": {
            "type": "text",
            "fielddata": True
        },
        "user.location": {
            "type": "text",
            "fielddata": True
        }
    }
})

# print(response.status_code)
# print(json.loads(response.text))
