# small_express_REST

A mini full-stack experiment combining a **plain HTML/JS frontend**, an **Express backend**, and a **JSON Server** mock database.  
The app demonstrates basic **frontend–backend interaction**, data posting, and filtering.

---

## Overview

- **Frontend (`index.html` + `fe_script.js`)**
  - Hardcoded initial data: electronic music artists & tracks.
  - Add new tracks to the table via a small form.
  - Buttons to:
    - Send all table data to the backend.
    - Fetch tracks (filtered by year ≤ 2005) from the backend/DB.

- **Backend (`be_server.js`)**
  - Built with Express.
  - Routes:
    - `POST /send-data` → clears DB then inserts artists + tracks.
    - `GET /fetch-data` → joins artists + tracks, filtering only tracks released ≤ 2005.
  - Talks to JSON Server (mock DB) via Axios.

- **Database (`db.json` + JSON Server)**
  - Two collections: `artists` and `tracks`.
  - Seeded with the same initial data from the frontend.

**Result:**  
You can open `index.html`, send its data into JSON Server through the Express backend, and then fetch a joined, filtered view of tracks older than 2005.

---

## How It Works

```
Frontend (index.html + fe_script.js)
 ├─ Show initial table (artists + tracks)
 ├─ Add new rows manually
 ├─ POST all data → Express backend (/send-data)
 └─ GET filtered tracks (≤2005) → show in a second table

Backend (be_server.js)
 ├─ POST /send-data: 
 │    • Wipe DB (artists + tracks)
 │    • Insert fresh data
 └─ GET /fetch-data:
      • Fetch all artists
      • Fetch tracks where releaseDate ≤ 2005
      • Join by artistId → return combined objects

Database (db.json via json-server)
 ├─ Collection: artists
 └─ Collection: tracks
```

---

## Repo Layout

```
small_express_REST/
├── be_server.js       # Express backend
├── fe_script.js       # Frontend JS logic (send/fetch/add)
├── index.html         # Frontend UI
├── db.json            # JSON Server mock DB
├── package.json       # Dependencies
├── package-lock.json
└── README.md
```

---

## Installation

### Prerequisites
- Node.js v18+ recommended
- Chrome/Firefox for opening `index.html`

### Install dependencies
```bash
npm install
```

(Explicit versions are in `package.json`: Express 5.1, Axios 1.9, CORS 2.8.5, JSON Server 0.17)

---

## Usage

Start servers (each in its own terminal):

1. **JSON Server (port 4000):**
   ```bash
   npx json-server --watch db.json --port 4000
   ```

2. **Express backend (port 5000):**
   ```bash
   node be_server.js
   ```

3. **Frontend:**
   - Open `index.html` in your browser.
   - Use the form/buttons:
     - *“Trimite tabelul initial la json-server”* → send data.
     - *“GET din json-server”* → fetch & display tracks released before 2005.

---

## Example Flow

1. Page loads → initial hardcoded table with Drexcya, Aphex Twin, Helena Hauff, DJ Rolando, Jeff Mills.
2. Click *Trimite tabelul* → data sent to Express → DB populated.
3. Click *GET* → backend filters tracks (`releaseDate ≤ 2005`) → joined with artists → displayed in second table.

---

## Ports Used

- JSON Server: **http://localhost:4000**
- Express backend: **http://localhost:5000**

---

## Why it Exists

Just a practice project — simple but functional.  
Shows how a plain HTML frontend can interact with a Node.js backend and a mock DB.  

---

## License

MIT
