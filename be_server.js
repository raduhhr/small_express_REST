const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

const DB = 'http://localhost:4000';

async function stergeTot() {
  try {
    const artisti = (await axios.get(`${DB}/artists?_limit=100`)).data;
    for (const a of artisti) {
      await axios.delete(`${DB}/artists/${a.id}`).catch(() => {});
    }
  } catch {}
  try {
    const piese = (await axios.get(`${DB}/tracks?_limit=100`)).data;
    for (const p of piese) {
      await axios.delete(`${DB}/tracks/${p.id}`).catch(() => {});
    }
  } catch {}
}

app.post('/send-data', async (req, res) => {
  const { artists, tracks } = req.body;
  if (!artists || !tracks) return res.status(400).send('Lipsesc datele');

  try {
    await stergeTot();
    for (const a of artists) {
      await axios.post(`${DB}/artists`, a);
    }
    for (const p of tracks) {
      await axios.post(`${DB}/tracks`, p);
    }
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send('Eroare server');
  }
});

app.get('/fetch-data', async (req, res) => {
  try {
    const artisti = (await axios.get(`${DB}/artists`)).data;
    const piese = (await axios.get(`${DB}/tracks?releaseDate_lte=2005`)).data;
    const combinate = piese.map(p => ({
      ...p,
      artist: artisti.find(a => a.id === p.artistId) || { name: 'Necunoscut', genre: 'Necunoscut' }
    }));
    res.json(combinate);
  } catch (e) {
    res.status(500).send('Eroare server');
  }
});

app.listen(5000, () => {
  console.log('Server Express ruleaza pe http://localhost:5000');
});
