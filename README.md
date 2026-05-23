# TripCraft — AI Travel Intelligence

> Upload your travel documents. Get a complete itinerary in seconds.

TripCraft is a full-stack MERN + AI web application that extracts travel information from uploaded flight tickets, hotel bookings, and travel documents using Groq's vision AI, then automatically generates structured, shareable day-by-day itineraries.




 Live Demo

- **Frontend:** [Deployed on Vercel]
- **Backend:** [Deployed on Render]



Features

- **JWT Authentication** — Secure register and login
- **Document Upload** — Drag & drop PDF and image support via Cloudinary
- **AI Extraction** — Groq vision AI reads flight numbers, dates, airports, hotels from uploaded documents
- **Itinerary Generation** — LLaMA 3.3 70B builds structured day-by-day travel plans
- **History** — All itineraries saved to MongoDB, accessible anytime
- **Shareable Links** — Every itinerary gets a public share token, no login required to view
- **Premium UI** — Particle mesh background, glassmorphism cards, custom cursor, cinematic animations


Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + Vite | UI framework |
| React Router v6 | Client-side routing |
| Axios | HTTP requests |
| React Dropzone | Drag & drop file uploads |
| React Hot Toast | Notifications |
| Space Grotesk | Typography |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database and ODM |
| JWT + bcryptjs | Authentication |
| Multer + Cloudinary | File upload and storage |
| Groq SDK (via Axios) | AI document extraction and itinerary generation |
| UUID | Shareable link tokens |



## Project Structure

```
tripcraft/
├── client/                     # React frontend
│   └── src/
│       ├── api/                # Axios API calls
│       │   ├── axios.js        # Axios instance with JWT interceptor
│       │   ├── auth.js         # Auth endpoints
│       │   └── itinerary.js    # Itinerary endpoints
│       ├── components/         # Reusable components
│       │   ├── Navbar.jsx
│       │   ├── PageShell.jsx   # Particle canvas + cursor + orbs
│       │   ├── UploadZone.jsx
│       │   ├── ItineraryCard.jsx
│       │   └── LoadingSpinner.jsx
│       ├── context/
│       │   └── AuthContext.jsx # Global auth state
│       ├── pages/
│       │   ├── Landing.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Dashboard.jsx
│       │   ├── ItineraryDetail.jsx
│       │   └── SharedItinerary.jsx
│       └── utils/
│           └── cursor.js       # Cursor, particles, scroll reveal
│
└── server/                     # Express backend
    └── src/
        ├── config/
        │   ├── db.js           # MongoDB connection
        │   └── cloudinary.js   # Cloudinary setup
        ├── controllers/
        │   ├── authController.js
        │   ├── uploadController.js
        │   └── itineraryController.js
        ├── middleware/
        │   ├── auth.js         # JWT protect middleware
        │   └── upload.js       # Multer + Cloudinary
        ├── models/
        │   ├── User.js
        │   └── Itinerary.js
        ├── routes/
        │   ├── auth.js
        │   ├── upload.js
        │   └── itinerary.js
        └── services/
            ├── groqService.js        # Groq API calls
            └── extractionService.js  # Document parsing
```



## API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Upload
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/upload` | Upload documents + generate itinerary | Yes |

### Itineraries
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/itineraries` | Get all user itineraries | Yes |
| GET | `/api/itineraries/:id` | Get single itinerary | Yes |
| DELETE | `/api/itineraries/:id` | Delete itinerary | Yes |
| GET | `/api/itineraries/shared/:token` | Get shared itinerary | No |

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Groq API key — [console.groq.com](https://console.groq.com)
- Cloudinary account — [cloudinary.com](https://cloudinary.com)

### 1. Clone the repository

```bash
git clone https://github.com/Venu-Gopal04/tripcraft.git
cd tripcraft
```

### 2. Setup the backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/tripcraft
JWT_SECRET=your_jwt_secret_here
GROQ_API_KEY=your_groq_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
```

### 3. Setup the frontend

```bash
cd ../client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Environment Variables

### Server (`server/.env`)

| Variable | Description |
|---|---|
| `PORT` | Server port (default 5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `GROQ_API_KEY` | Groq API key for AI features |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `CLIENT_URL` | Frontend URL for CORS |

### Client (`client/.env`)
No environment variables required — API URL is configured in `src/api/axios.js`.

---

## AI Pipeline

```
User uploads document (PDF/image)
        ↓
Cloudinary stores file, returns URL
        ↓
Groq Vision (llama-4-scout-17b) reads document
        ↓
Extracts: origin, destination, dates, flight numbers,
          hotel names, check-in/out, booking references
        ↓
Groq LLaMA 3.3 70B generates structured itinerary
        ↓
Saved to MongoDB with share token
        ↓
Rendered as day-by-day plan with shareable link
```

---

## Deployment

### Backend — Render
1. Push code to GitHub
2. New Web Service on [render.com](https://render.com)
3. Build command: `npm install`
4. Start command: `node app.js`
5. Add all environment variables from `server/.env`

### Frontend — Vercel
1. New project on [vercel.com](https://vercel.com)
2. Root directory: `client`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable: `VITE_API_URL=https://your-render-url.onrender.com/api`

> After deploying, update `client/src/api/axios.js` baseURL to your Render URL.

---

## Screenshots

| Landing Page | Dashboard | Itinerary Detail |
|---|---|---|
| Cinematic hero with floating cards | Card grid with AI-generated trips | Day-by-day itinerary with share link |

---

## Author

**Ganji Venu Gopal**
- GitHub: [@Venu-Gopal04](https://github.com/Venu-Gopal04)
- Portfolio: [ganjivenugopal-portfolio.netlify.app](https://ganjivenugopal-portfolio.netlify.app)

---

## License

MIT License — free to use and modify.
