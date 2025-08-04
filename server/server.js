require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// יבוא ראוטים
const heroesRoutes = require('./routes/heroes');

const app = express();
const PORT = process.env.PORT || 5000;

// === Middleware ===
app.use(cors());
app.use(express.json());

// === קבצים סטטיים ===
app.use('/heroes_input', express.static(path.join(__dirname, 'public', 'heroes_input')));
app.use('/pending_heroes', express.static(path.join(__dirname, 'public', 'pending_heroes')));
app.use('/tmp', express.static(path.join(__dirname, 'public', 'tmp')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// === API Routes ===
app.use('/api', heroesRoutes);

// === הפניית בקשות React ל-client/dist ===
// שורת הקסם – נגיש את קבצי React המובנים מהשרת
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// לכל בקשה אחרת (כולל /) – החזר את index.html של React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

// === הפעלת השרת ===
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
