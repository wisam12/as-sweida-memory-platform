const express = require('express');
const cors = require('cors');
const path = require('path');
const heroRoutes = require('./routes/heroes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api', heroRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
