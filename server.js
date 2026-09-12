import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';

const app = express();
const port = process.env.PORT || 3000;
const isProduction = process.argv.includes('--production');
const rootDirectory = path.dirname(fileURLToPath(import.meta.url));

app.get('/api/omdb', async (request, response) => {
  const { s: search, i: imdbId } = request.query;

  if (!search && !imdbId) {
    return response.status(400).json({ Response: 'False', Error: "Parameter 's' or 'i' is required." });
  }

  if (!process.env.OMDB_KEY) {
    return response.status(500).json({ Response: 'False', Error: 'OMDb API key is not configured.' });
  }

  const parameters = new URLSearchParams({ apikey: process.env.OMDB_KEY });
  if (imdbId) parameters.set('i', imdbId);
  if (search) parameters.set('s', search);

  try {
    const omdbResponse = await fetch(`https://www.omdbapi.com/?${parameters}`);
    const data = await omdbResponse.json();
    return response.status(omdbResponse.ok ? 200 : 502).json(data);
  } catch {
    return response.status(502).json({ Response: 'False', Error: 'Server failed to fetch movie data.' });
  }
});

if (isProduction) {
  const distributionDirectory = path.join(rootDirectory, 'dist');
  app.use(express.static(distributionDirectory));
  app.use((request, response) => response.sendFile(path.join(distributionDirectory, 'index.html')));
} else {
  const vite = await createViteServer({
    root: rootDirectory,
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(port, () => {
  console.log(`Movie Search App running at http://localhost:${port}`);
});