import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const fallbackSegments = [
  { filename: '1753880505000.ts', timestamp: 1753880505000, duration: 30 },
  { filename: '1753880535000.ts', timestamp: 1753880535000, duration: 25 },
  { filename: '1753880560000.ts', timestamp: 1753880560000, duration: 35 },
  { filename: '1753880595000.ts', timestamp: 1753880595000, duration: 30 }
];

let segments = [...fallbackSegments];

const PLAYLIST_URL = process.env.PLAYLIST_URL;

async function loadSegments() {
  if (!PLAYLIST_URL) return;
  try {
    const res = await fetch(PLAYLIST_URL);
    if (!res.ok) throw new Error(`Failed to fetch playlist: ${res.status}`);
    segments = await res.json();
  } catch (err) {
    console.error('Unable to fetch playlist, using fallback');
    segments = [...fallbackSegments];
  }
}

await loadSegments();

app.get('/segments', (req, res) => {
  res.json(segments);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server listening on ${PORT}`);
});
