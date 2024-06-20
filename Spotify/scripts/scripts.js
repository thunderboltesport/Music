const songs = [
    { title: "Gangsta Paradise", src: "assets/music/song1.mp3" },
    { title: "Muskane Jhooti hai", src: "assets/music/song2.mp3" },
    { title: "Har fun maula", src: "assets/music/song3.mp3" },
    { title: "Ik Bagal Chand Hoga(Gangs Of Wasseypur)", src: "assets/music/song4.mp3" },
    { title: "Tumhe Jo Maine Dekha", src: "assets/music/Tumhe Jo Maine Dekha.mp3" },
    { title: "Aankhon Meri Teri", src: "assets/music/Aankhon mein teri.mp3" },
];

let currentIndex = 0;
let currentAudio = null;
const songsList = document.getElementById('songs-list');
const searchInput = document.getElementById('search');

// Function to display songs based on filter
function displaySongs(filter = "") {
    songsList.innerHTML = ""; // Clear previous content

    // Filter songs based on search input
    const filteredSongs = songs.filter(song => song.title.toLowerCase().includes(filter.toLowerCase()));

    // If no songs match the filter
    if (filteredSongs.length === 0) {
        songsList.innerHTML = '<p>No songs found.</p>';
        return;
    }

    // Display each filtered song
    filteredSongs.forEach((song, index) => {
        const songDiv = document.createElement('div');
        songDiv.className = 'song';
        songDiv.innerHTML = `
            <p>${song.title}</p>
            <audio src="${song.src}" data-index="${index}"></audio>
            <div class="song-controls">
                <button class="play" data-index="${index}">Play</button>
                <button class="pause" data-index="${index}">Pause</button>
            </div>
        `;
        songsList.appendChild(songDiv);
    });

    // Add event listeners for play and pause buttons
    document.querySelectorAll('.play').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = parseInt(event.target.getAttribute('data-index'));
            playSong(index);
        });
    });

    document.querySelectorAll('.pause').forEach(button => {
        button.addEventListener('click', (event) => {
            if (currentAudio) {
                currentAudio.pause();
            }
        });
    });

    // Add event listeners to stop other songs when one is played
    document.querySelectorAll('audio').forEach(audio => {
        audio.addEventListener('play', (event) => {
            if (currentAudio && currentAudio !== event.target) {
                currentAudio.pause();
            }
            currentAudio = event.target;
            currentIndex = parseInt(event.target.getAttribute('data-index'));
        });
    });
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    displaySongs(e.target.value);
});

// Next song
document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % songs.length;
    playCurrentSong();
});

// Previous song
document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    playCurrentSong();
});

// Shuffle song
document.getElementById('shuffle').addEventListener('click', () => {
    currentIndex = Math.floor(Math.random() * songs.length);
    playCurrentSong();
});

// Pause song
document.getElementById('pause').addEventListener('click', () => {
    if (currentAudio) {
        currentAudio.pause();
    }
});

// Resume song
document.getElementById('resume').addEventListener('click', () => {
    if (currentAudio) {
        currentAudio.play();
    }
});

// Play the current song
function playCurrentSong() {
    document.querySelectorAll('audio').forEach((audio, index) => {
        if (index === currentIndex) {
            audio.currentTime = 0; // Reset the audio to start from the beginning
            audio.play();
            currentAudio = audio;
        } else {
            audio.pause();
        }
    });
}

// Play specific song
function playSong(index) {
    currentIndex = index;
    playCurrentSong();
}

// Initial display of all songs
displaySongs();
