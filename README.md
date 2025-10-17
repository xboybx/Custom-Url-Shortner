# Custom URL Shortener (MERN Stack)

A full-stack web application to create, manage, and share custom short URLs with your own names. Built using MongoDB, Express.js, React, and Node.js.

*Live*:https://custom-url-shortner-client.onrender.com
---

## Features
- **Custom Short URLs:** Create short links with your own custom names.
- **Link Management:** View, edit, and delete your links.
- **Click Tracking:** Track how many times each short URL is used.
- **Availability Check:** Instantly check if a custom name is available.
- **Secure & Reliable:** All links are securely stored in MongoDB.
- **Modern UI:** Responsive React frontend styled with Tailwind CSS.

---

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Other:** Axios, React Router, React Hot Toast

---

## Project Structure
```
custom url shotner/
├── backend/      # Express + MongoDB REST API
│   ├── server.js
│   ├── src/
│   ├── package.json
│   └── .env
├── frontend/     # React client app
│   ├── src/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

---

## Backend API Endpoints
- `POST /urls` — Create a new short URL (with custom name)
- `GET /urls` — Get all URLs
- `GET /urls/:shortUrl` — Get original URL by short name (increments click count)
- `PUT /urls/:id` — Update a URL
- `DELETE /urls/:id` — Delete a URL
- `GET /urls/check/:customName` — Check if a custom name is available
- `GET /health` — Health check

---

## How to Run
### 1. Clone the repository
```bash
git clone <repo-url>
cd custom url shotner
```

### 2. Backend Setup
```bash
cd backend
npm install
# Create .env file with MongoDB URI and PORT
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Open in browser
Visit `http://localhost:5173` (default Vite port)

---

## Environment Variables
**Backend (.env):**
```
PORT=5000
MONGODB_URI=<your-mongodb-uri>
```
**Frontend (.env):**
```
VITE_API_URL=http://localhost:5000
```



---

## Author
Made by Jaswanth