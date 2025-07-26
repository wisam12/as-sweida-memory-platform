const express = require('express');
const fs = require('fs');
const path = require('path');
const upload = require('../middleware/upload');
const router = express.Router();

// post new hero
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

    const saveFiles = (files) => {
        if (!files) return;
        files.forEach(file => {
            const dest = path.join(heroDir, file.originalname);
            fs.renameSync(file.path, dest);
        });
    };

    saveFiles(req.files.images);
    saveFiles(req.files.videos);

    res.status(200).json({ message: 'Hero submitted successfully.' });
});


//  get qeue heros
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


// approve new hero
router.post('/approve', (req, res) => {
    const { folderName } = req.body;

    const sourcePath = path.join(__dirname, '..', 'public', 'pending_heroes', folderName);
    const destPath = path.join(__dirname, '..', 'public', 'heroes_input', folderName);

    try {
        const destinationDir = path.join(__dirname, '..', 'public', 'heroes_input');
        if (!fs.existsSync(destinationDir)) {
            fs.mkdirSync(destinationDir, { recursive: true });
        }

        fs.renameSync(sourcePath, destPath);

        res.status(200).send('Hero approved and moved successfully');
    } catch (error) {
        console.error('Error approving hero:', error);
        res.status(500).send('Failed to approve hero');
    }
});


// delete a hero
router.delete('/reject/:id', (req, res) => {
    const id = req.params.id;
    const targetPath = path.join(__dirname, '../public/pending_heroes', id);

    if (!fs.existsSync(targetPath)) {
        return res.status(404).json({ message: 'Hero not found' });
    }

    fs.rmSync(targetPath, { recursive: true, force: true });
    res.json({ message: 'Hero rejected' });
});

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
                if (ext === ".jpg" || ext === ".png" || ext === ".webp") {
                    hero.images.push(`/public/heroes_input/${folder}/${file}`);
                }
                if (ext === ".mp4") {
                    hero.videos.push(`/public/heroes_input/${folder}/${file}`);
                }
            });

            heroes.push(hero);
        }
    });

    res.json(heroes);
});




module.exports = router;
