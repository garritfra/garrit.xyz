---
title: "Sentiment analysis using ML models"
date: "2024-08-31"
tags: "note, tech, ai"
---

I just rewrote parts of my [Positive Hacker News RSS Feed](https://github.com/garritfra/positive_hackernews) project to use an ML model to filter out any negative news from the Hacker News timeline. This method is far more reliable than the previous method of using a [rule-based sentiment analyzer](https://www.nltk.org/api/nltk.sentiment.vader.html) through NLTK.

I'm using the model [cardiffnlp/twitter-roberta-base-sentiment-latest](https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment-latest?text=Messer-Angreiferin+verletzt+f%C3%BCnf+Menschen+in+einem+Bus), which was trained on a huge amount of tweets. It's really tiny (~500 MB) and easily runs inside the existing GitHub Actions workflows. You can try out the model yourself on the HuggingFace model card.

<img width="522" alt="grafik" src="https://github.com/user-attachments/assets/06f42df6-624a-4108-ada8-d0d37a53e693">

If you want to subscribe to more positive tech news, simply replace your Hacker News feed of your RSS reader with this one (or add it if you haven't already):
https://garritfra.github.io/positive_hackernews/feed.xml
