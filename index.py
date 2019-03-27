from __future__ import print_function

import os

import tweepy
import datetime

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
    lang="en",
    until=today
)

for tweet in cursor.items():
    # tweepy.models.Status
    data = tweet._json
    print(data)
    exit()
