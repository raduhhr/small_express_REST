# Electronic Music Mini App – FE + BE

A small project I put together to experiment with basic frontend-backend interaction. The app lets you manage a list of electronic music artists and tracks, with some simple data filtering.

The frontend uses plain HTML and JavaScript (with Axios for AJAX calls), and the backend is built with Express. JSON Server acts as a mock database.

---

## What it does

- The HTML file contains hardcoded data (artists + tracks).
- You can:
  - Send that data to a mock database.
  - Add new tracks to the initial table.
  - Fetch and display only tracks released before 2005, joined with the artist info.

---

## Stack

- Frontend: HTML + JS (with Axios)
- Backend: Node.js + Express
- DB: JSON Server

---

## How to run

Tested on Linux Mint, but should work the same on Windows/macOS.

### 1. Unzip the project into a folder

### 2. Open a terminal in that folder

### 3. Install dependencies:

```bash
npm install express@5.1.0 axios@1.9.0 cors@2.8.5 json-server@0.17.0
```

### 4. Start the servers (in separate terminals):

- JSON Server:
  ```bash
  npx json-server --watch db.json --port 4000
  ```

- Express backend:
  ```bash
  node be_server.js
  ```

### 5. Open `index.html` in Chrome

No build tools, no framework – just open the file.

---

## How it works

- Initial data is embedded in the HTML.
- Clicking the “Trimite tabelul” button sends the data to the backend, which pushes it to the mock database.
- You can add new tracks manually to the table.
- The “GET” button fetches tracks released before 2005 and shows them in a separate table, along with their artist info.

---

## Ports used

- JSON Server: http://localhost:4000
- Express backend: http://localhost:5000

---

## Why I kept it

It’s nothing fancy, but it works, and I spent a few hours on it. Figured I’d keep it public – no private data, just localhost stuff. If someone really wants to hack it, they’d have to hack my machine first.
