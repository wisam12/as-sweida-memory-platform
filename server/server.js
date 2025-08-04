require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// יבוא ראוטים
const heroesRoutes = require('./routes/heroes');

const app = express();
const PORT = process.env.PORT || 5000;

// === Middleware ===

// מאפשר בקשות CORS (למשל מה-Frontend על פורט 5173)
app.use(cors());

// מאפשר קריאת JSON בבקשות POST
app.use(express.json());

// קבצים סטטיים
app.use('/heroes_input', express.static(path.join(__dirname, 'public', 'heroes_input')));
app.use('/pending_heroes', express.static(path.join(__dirname, 'public', 'pending_heroes')));
app.use('/tmp', express.static(path.join(__dirname, 'public', 'tmp'))); // אם יש שימוש בתיקייה זמנית
app.use('/public', express.static(path.join(__dirname, 'public'))); // אופציונלי אם תרצה

// === ראוטים של API ===
app.use('/api', heroesRoutes);

// === הפעלת השרת ===
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
