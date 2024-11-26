# Scala feed generator for Bluesky

This repository is a customized fork of https://github.com/bluesky-social/feed-generator

Want to be up to date with Scala news on Bluesky? Just follow the feed at https://bsky.app/profile/michal.pawlik.dev/feed/scala-feed

# Implementation details

## Content collection

The [FirehoseSubscription.ts](src/FirehoseSubscription.ts) is a class that collects selected messages in the database. It also removes them from the feed if they are removed upstream.

## Content filtering

The `isAboutScala` function defined in [src/scala/index.ts](src/scala/index.ts) decides if content should be saved to database. 

## Feed generation algorithm

You can find the algorithm generating the feed in [src/algos/scala-feed.ts](src/algos/scala-feed.ts). It simply fetches all known records from database sorted by indexing time, there's no sophisticated logic involved.
