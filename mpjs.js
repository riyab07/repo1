// Extract URL parameters for username
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
if (username) {
  document.getElementById('greeting').textContent = `Welcome, ${username}, to Your Personalized Music Player!`;
}

// Handle file selection and playlist
const fileInput = document.getElementById('file-input');
const audioPlayer = document.getElementById('audio-player');
const playlist = document.getElementById('playlist');
const playBtn = document.getElementById('play-btn');
const resumeBtn = document.getElementById('resume-btn');
const stopBtn = document.getElementById('stop-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');

let songIndex = 0; // Track current song index
let files = []; // Store selected files

fileInput.addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
  files = Array.from(event.target.files); // Store files
  songIndex = 0; // Reset index
  playlist.innerHTML = ''; // Clear previous playlist

  files.forEach((file, index) => {
    const songName = file.name;
    const songButton = document.createElement('button');
    songButton.textContent = songName;
    songButton.classList.add('playlist-btn');

    // Add event listener to play the selected song
    songButton.addEventListener('click', () => {
      songIndex = index;
      playSong(file);
    });
    playlist.appendChild(songButton);
  });
}

function playSong(file) {
  const objectURL = URL.createObjectURL(file); // Create a URL for the selected file
  audioPlayer.src = objectURL; // Set the audio player source to the selected file
  audioPlayer.play(); // Play the selected song
}

function playCurrentSong() {
  if (files.length > 0) {
    playSong(files[songIndex]);
  }
}

function stopSong() {
  audioPlayer.pause();
  audioPlayer.currentTime = 0; // Reset playback position
}

function resumeSong() {
  audioPlayer.play();
}

function playNextSong() {
  if (files.length > 0) {
    songIndex = (songIndex + 1) % files.length; // Move to next song, loop back if at the end
    playCurrentSong();
  }
}

// Event listeners for control buttons
playBtn.addEventListener('click', playCurrentSong);
stopBtn.addEventListener('click', stopSong);
resumeBtn.addEventListener('click', resumeSong);
nextBtn.addEventListener('click', playNextSong);

// Progress Bar Functionality
function updateProgressBar() {
  if (audioPlayer.duration) {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
  }
}

function seekAudio(event) {
  const seekTime = (event.target.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = seekTime;
}

// Update progress bar as the audio plays
audioPlayer.addEventListener('timeupdate', updateProgressBar);

// Allow seeking through the progress bar
progressBar.addEventListener('input', seekAudio);

// Generate music drops
const musicDrops s= document.getElementById('music-drops');
setInterval(() => {
  const drop = document.createElement('div');
  drop.classList.add('music-drop');
  drop.style.left = Math.random() * 100 + 'vw';
  musicDrops.appendChild(drop);

  setTimeout(() => {
    drop.remove();
  }, 3000); // Remove after animation
}, 200);
