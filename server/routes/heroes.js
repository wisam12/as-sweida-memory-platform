const express = require('express');
const fs = require('fs');
const path = require('path');
const upload = require('../middleware/upload');
const router = express.Router();

// Submit new hero (POST)
router.post('/submit-hero', upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'videos', maxCount: 10 },
    { name: 'profileImage', maxCount: 1 }
]), (req, res) => {
    const { name, story } = req.body;
    const timestamp = Date.now();
    const folderName = `${name.replace(/\s+/g, '_')}_${timestamp}`;
    const heroDir = path.join(__dirname, '../public/pending_heroes', folderName);

    // Make sure target directory exists
    fs.mkdirSync(heroDir, { recursive: true });

    const meta = {
        name,
        story,
        submittedAt: new Date().toISOString(),
        images: [],
        videos: []
    };

    // Save profile image
    if (req.files.profileImage && req.files.profileImage.length > 0) {
        const file = req.files.profileImage[0];
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-profile${ext}`;
        const dest = path.join(heroDir, uniqueName);
        fs.renameSync(file.path, dest);
        meta.profileImage = `/heroes_input/${folderName}/${uniqueName}`;
    }

    // Save other files
    const saveFiles = (files, type) => {
        if (!files) return;
        files.forEach(file => {
            const ext = path.extname(file.originalname);
            const uniqueName = `${Date.now()}-${type}${ext}`;
            const dest = path.join(heroDir, uniqueName);
            fs.renameSync(file.path, dest);

            const pathForClient = `/heroes_input/${folderName}/${uniqueName}`;
            if (type === 'image') meta.images.push(pathForClient);
            if (type === 'video') meta.videos.push(pathForClient);
        });
    };

    saveFiles(req.files.images, 'image');
    saveFiles(req.files.videos, 'video');

    // Write metadata file
    fs.writeFileSync(path.join(heroDir, 'meta.json'), JSON.stringify(meta, null, 2));

    res.status(200).json({ message: 'Hero submitted successfully.' });
});


// Get pending heroes
router.get('/pending-heroes', (req, res) => {
    const dirPath = path.join(__dirname, '../public/pending_heroes');
    const heroes = [];

    fs.readdirSync(dirPath).forEach(folder => {
        const metaPath = path.join(dirPath, folder, 'meta.json');
        if (fs.existsSync(metaPath)) {
            const meta = JSON.parse(fs.readFileSync(metaPath));
            heroes.push({ id: folder, ...meta });
        }
    });

    res.json(heroes);
});


// Approve hero (move from pending_heroes to heroes_input)
router.post('/approve', (req, res) => {
    const { folderName } = req.body;
    const source = path.join(__dirname, '../public/pending_heroes', folderName);
    const dest = path.join(__dirname, '../public/heroes_input', folderName);

    try {
        fs.renameSync(source, dest);
        res.status(200).send('Hero approved and moved successfully');
    } catch (err) {
        console.error('Error moving hero folder:', err);
        res.status(500).send('Failed to approve hero');
    }
});

// Reject (delete) hero
router.delete('/reject/:id', (req, res) => {
    const id = req.params.id;
    const targetPath = path.join(__dirname, '../public/pending_heroes', id);

    if (!fs.existsSync(targetPath)) {
        return res.status(404).json({ message: 'Hero not found' });
    }

    fs.rmSync(targetPath, { recursive: true, force: true });
    res.json({ message: 'Hero rejected' });
});

// Get all approved heroes
router.get('/heroes', (req, res) => {
    const dirPath = path.join(__dirname, '../public/heroes_input');
    const heroes = [];

    fs.readdirSync(dirPath).forEach(folder => {
        const metaPath = path.join(dirPath, folder, 'meta.json');
        if (fs.existsSync(metaPath)) {
            const meta = JSON.parse(fs.readFileSync(metaPath));
            heroes.push({ id: folder, ...meta });
        }
    });

    res.json(heroes);
});

module.exports = router;
