const express = require('express');
const cors = require('cors');
const path = require('path');

const heroesRoutes = require('./routes/heroes');

const app = express();
const PORT = 5000;

// Enable CORS for development (Vite frontend on port 5173)
app.use(cors());

// Parse JSON bodies (not used directly here but good to keep)
app.use(express.json());

// Serve static files (like videos/images)
app.use('/heroes_input', express.static(path.join(__dirname, 'public/heroes_input')));
app.use('/pending_heroes', express.static(path.join(__dirname, 'public/pending_heroes')));

// API routes
app.use('/api', heroesRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
