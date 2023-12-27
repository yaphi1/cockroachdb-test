## About

This app is an editable watch list of movies and shows.
It uses next.js and cockroachdb.

## Usage Instructions

Run the dev server:

```bash
pnpm dev
```

Open localhost in the browser:
[http://localhost:3000](http://localhost:3000)

This won't work without first setting up a table in cockroachdb.
Then you can set up the process.env variables by creating a `.env.local` file in the `/app` directory and adding the variables there.
