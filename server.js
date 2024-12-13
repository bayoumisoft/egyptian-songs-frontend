const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Sample songs data
let songs = [
    { id: 1, title: "El Helwa Di", singer: "Sayed Darwish", writer: "Badi' Khairi", year: 1920 },
];

// Routes
app.get('/songs', (req, res) => res.json(songs));

app.post('/songs', (req, res) => {
    const { title, singer, writer, year } = req.body;
    const newSong = { id: songs.length + 1, title, singer, writer, year };
    songs.push(newSong);
    res.json(newSong);
});

app.delete('/songs/:id', (req, res) => {
    songs = songs.filter(song => song.id !== parseInt(req.params.id));
    res.json({ message: 'Song deleted' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
