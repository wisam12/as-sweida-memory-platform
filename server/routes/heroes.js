const express = require('express');
const fs = require('fs');
const path = require('path');
const upload = require('../middleware/upload');
const router = express.Router();

// Submit a new hero story
router.post('/submit-hero', upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'videos', maxCount: 10 }
]), (req, res) => {
    const { name, story } = req.body;
    const timestamp = Date.now();
    const folderName = `${name.replace(/\s+/g, '_')}_${timestamp}`;
    const heroDir = path.join(__dirname, '../public/pending_heroes', folderName);

    fs.mkdirSync(heroDir, { recursive: true });

    const meta = {
        name,
        story,
        submittedAt: new Date().toISOString()
    };
    fs.writeFileSync(path.join(heroDir, 'meta.json'), JSON.stringify(meta, null, 2));

    const saveFiles = (files, type) => {
        if (!files) return;
        files.forEach(file => {
            const ext = path.extname(file.originalname);
            const uniqueName = `${Date.now()}-${type}${ext}`;
            const dest = path.join(heroDir, uniqueName);
            fs.renameSync(file.path, dest);
        });
    };

    saveFiles(req.files.images, 'image');
    saveFiles(req.files.videos, 'video');

    res.status(200).json({ message: 'Hero submitted successfully.' });
});

// Get all pending heroes for admin review
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

// Approve hero (move folder to heroes_input)
router.post('/approve', (req, res) => {
    const { folderName } = req.body;
    const sourcePath = path.join(__dirname, '..', 'public', 'pending_heroes', folderName);
    const destPath = path.join(__dirname, '..', 'public', 'heroes_input', folderName);

    try {
        if (!fs.existsSync(destPath)) {
            fs.mkdirSync(path.dirname(destPath), { recursive: true });
        }

        fs.renameSync(sourcePath, destPath);

        res.status(200).send('Hero approved and moved successfully');
    } catch (error) {
        console.error('Error approving hero:', error);
        res.status(500).send('Failed to approve hero');
    }
});

// Reject hero (delete folder)
router.delete('/reject/:id', (req, res) => {
    const id = req.params.id;
    const targetPath = path.join(__dirname, '../public/pending_heroes', id);

    if (!fs.existsSync(targetPath)) {
        return res.status(404).json({ message: 'Hero not found' });
    }

    fs.rmSync(targetPath, { recursive: true, force: true });
    res.json({ message: 'Hero rejected' });
});

// Load all approved heroes
router.get('/heroes', (req, res) => {
    const dirPath = path.join(__dirname, '../public/heroes_input');
    const heroes = [];

    fs.readdirSync(dirPath).forEach(folder => {
        const metaPath = path.join(dirPath, folder, 'meta.json');
        if (fs.existsSync(metaPath)) {
            const meta = JSON.parse(fs.readFileSync(metaPath));
            const hero = {
                id: folder,
                ...meta,
                images: [],
                videos: []
            };

            const files = fs.readdirSync(path.join(dirPath, folder));
            files.forEach(file => {
                const ext = path.extname(file).toLowerCase();
                const url = `/heroes_input/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
                if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
                    hero.images.push(url);
                }
                if (ext === ".mp4") {
                    hero.videos.push(url);
                }
            });

            heroes.push(hero);
        }
    });

    res.json(heroes);
});

module.exports = router;
