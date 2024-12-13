const API_URL = "http://localhost:5000/songs"; // Replace with your backend's deployed URL

const songForm = document.getElementById("song-form");
const songsContainer = document.getElementById("songs-container");

// Fetch and display songs
async function fetchSongs() {
    try {
        const response = await fetch(API_URL);
        const songs = await response.json();
        songsContainer.innerHTML = songs
            .map(
                (song) => `
            <div class="song-item">
                <div>
                    <strong>${song.title}</strong> by ${song.singer}<br>
                    <small>Writer: ${song.writer} | Year: ${song.year}</small>
                </div>
                <button onclick="deleteSong(${song.id})">Delete</button>
            </div>
        `
            )
            .join("");
    } catch (error) {
        console.error("Error fetching songs:", error);
    }
}

// Add a new song
songForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const singer = document.getElementById("singer").value;
    const writer = document.getElementById("writer").value;
    const year = document.getElementById("year").value;

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, singer, writer, year }),
        });

        songForm.reset();
        fetchSongs();
    } catch (error) {
        console.error("Error adding song:", error);
    }
});

// Delete a song
async function deleteSong(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchSongs();
    } catch (error) {
        console.error("Error deleting song:", error);
    }
}

// Initial fetch
fetchSongs();
