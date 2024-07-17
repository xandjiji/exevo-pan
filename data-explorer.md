# What is `data-explorer`?

This is a simple starter file for anyone who wants to explore our data from the
Char Bazaar. It contains a few examples of how to use some of our app primitives
to work with our data. Feel free to use and modify them however you want 😄

The file can be found at: `exevo-pan/apps/bazaar-scraper/src/dataExplorer.ts`

## Auction History

This is the auction history database our website queries from. It contains only
the subset of data that is used in our app.

This database is a simple `JSONL` file. We use this format because it allows us
to toss our database around and use it anywhere since it is just a file. Being
human-readable is also nice for sharing and compatibility. If you search through
this repository, you'll find out many benefits we enjoy from it (like here at
`data-explorer` 😎).

You can use `exploreAuctionHistory()` as a starting example.

## Raw Data

We also try to preserve every completed auction's raw HTML data (read
[here](https://www.exevopan.com/blog/about-our-data#How-accurate-is-our-data) to
find out why). With this data you can scrap almost everything from every past
auction without even doing HTTP requests to the official Tibia.com. For
practical reasons, _paginated data from the item summary_ are not available in
this dataset.

You can use `exploreRaw()` as a starting example.

# Why?

Hopefuly this can be useful for anyone that is interested in data analysis, data
preservation or even trying to discover unknown secrets in the game 👀. I bet
you nerds will have a lot of fun with it.

Feel free to do whatever you want with this code and data. No permissions or
credits are required.

# How?

First, download the datasets that you want to explore:

- Raw data
  [27gb](https://drive.google.com/file/d/1jP4HuTnmh5lSL-ao0wfdbEur6CAQEeWX/view?usp=sharing)
- Auction history database
  [213mb](https://drive.google.com/file/d/1jP4HuTnmh5lSL-ao0wfdbEur6CAQEeWX/view?usp=sharing)
- Server data [30kb](https://exevopan-static.netlify.app/ServerData.json)

Extract the `rawData.tar.gz` to the especified directory (make you adjust your
file paths):

```bash
tar -xzvf rawData.tar.gz -C ~/exevo-pan/apps/bazaar-scraper/Output/
```

Extract the `HistoryAuctions.tar.gz` to the especified directory (make you
adjust your file paths):

```bash
tar -xzvf HistoryAuctions.tar.gz -C ~/exevo-pan/apps/bazaar-scraper/Output/
```

Move the `ServerData.json` to `~/exevo-pan/apps/bazaar-scraper/Output/`

---

Install all the dependencies:

```bash
yarn
```

Finally, have fun working at
`exevo-pan/apps/bazaar-scraper/src/dataExplorer.ts`. You can run your code with:

```bash
yarn explore
```

## Future improvements

- Reading all raw HTML auctions takes a lot of time. To run this task faster we
  can distribute this work across several workers and then merge the result
- Windows support (I have no idea if this works on anything that's not Linux
  lol)
