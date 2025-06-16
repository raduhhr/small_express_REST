document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn1').addEventListener('click', trimiteTot);
  document.getElementById('btn3').addEventListener('click', afiseazaFiltrate);
  document.getElementById('addTrackBtn').addEventListener('click', adaugaInTabel);
});

function preiaArtistii() {
  const map = new Map();
  document.querySelectorAll('#initialData tbody tr').forEach(row => {
    const id = +row.dataset.artistId;
    if (!map.has(id)) {
      map.set(id, {
        id,
        name: row.cells[0].textContent.trim(),
        genre: row.cells[1].textContent.trim()
      });
    }
  });
  return Array.from(map.values());
}

function preiaPiesele() {
  return Array.from(document.querySelectorAll('#initialData tbody tr')).map(row => ({
    artistId: +row.dataset.artistId,
    name: row.cells[2].textContent.trim(),
    releaseDate: +row.cells[3].textContent.trim(),
    recordLabel: row.cells[4].textContent.trim()
  }));
}

async function trimiteTot() {
  const artisti = preiaArtistii();
  const piese = preiaPiesele();
  if (!artisti.length || !piese.length) {
    alert('Nu exista date de trimis!');
    return;
  }
  try {
    await axios.post('http://localhost:5000/send-data', { artists: artisti, tracks: piese });
    alert('Datele au fost trimise cu succes!');
  } catch (err) {
    alert('Eroare la trimiterea datelor!');
  }
}

function adaugaInTabel() {
  try {
    const artistId = +document.getElementById('artistDropdown').value;
    const nume = document.getElementById('trackName').value.trim();
    const an = +document.getElementById('releaseYear').value.trim();
    const label = document.getElementById('label').value.trim();
    if (!nume || !an || !label) throw new Error('Toate câmpurile sunt obligatorii!');
    if (isNaN(an) || an < 1900 || an > new Date().getFullYear()) throw new Error('An invalid!');
    const artisti = preiaArtistii();
    const artist = artisti.find(a => a.id === artistId);
    if (!artist) throw new Error('Artist invalid!');
    const tbody = document.querySelector('#initialData tbody');
    const row = tbody.insertRow();
    row.dataset.artistId = artistId;
    row.innerHTML = `
      <td>${artist.name}</td>
      <td>${artist.genre}</td>
      <td>${nume}</td>
      <td>${an}</td>
      <td>${label}</td>
    `;
    document.getElementById('trackName').value = '';
    document.getElementById('releaseYear').value = '';
    document.getElementById('label').value = '';
  } catch (err) {
    alert(err.message);
  }
}

async function afiseazaFiltrate() {
  try {
    const { data } = await axios.get('http://localhost:5000/fetch-data');
    const tbody = document.querySelector('#filteredData tbody');
    tbody.innerHTML = '';
    if (!data.length) {
      tbody.innerHTML = '<tr><td colspan="5">Nu exista piese lansate inainte de 2005.</td></tr>';
      return;
    }
    data.forEach(piesa => {
      const row = tbody.insertRow();
      row.innerHTML = `
        <td>${piesa.artist.name}</td>
        <td>${piesa.artist.genre}</td>
        <td>${piesa.name}</td>
        <td>${piesa.releaseDate}</td>
        <td>${piesa.recordLabel}</td>
      `;
    });
  } catch (e) {
    alert('Eroare la preluarea datelor filtrate.');
  }
}