const songs = [
    { title: "Admiring You - Karan Aujla", videoId: "k85UB5b6pJU" },
    { title: "Chal Diye - Hum Kahan Ke Sachay Thay", videoId: "TCQ7ijIUskk" },
    { title: "Ranjha - Shershaah", videoId: "V7LwfY5U5WI" },
    { title: "Patiala Peg - Diljit Dosanjh", videoId: "slUoxZedJwE" },
    { title: "Brown Munde - AP Dhillon", videoId: "VNs_cCtdbPc" },
  ];
  
  let currentSongIndex = 0;
  
  // Load the current song in the iframe
  function loadSong(index) {
    const song = songs[index];
    const iframe = document.getElementById("video-frame");
    iframe.src = `https://www.youtube.com/embed/${song.videoId}?autoplay=1`;
    document.getElementById("song-title").textContent = song.title;
  }
  
  // Navigate to the next or previous song
  function changeSong(direction) {
    currentSongIndex = (currentSongIndex + direction + songs.length) % songs.length;
    loadSong(currentSongIndex);
  }
  
  // Add event listeners to controls
  document.getElementById("prev").addEventListener("click", () => changeSong(-1));
  document.getElementById("next").addEventListener("click", () => changeSong(1));
  document.getElementById("play-pause").addEventListener("click", () => {
    const iframe = document.getElementById("video-frame");
    const isPlaying = iframe.src.includes("autoplay=1");
    iframe.src = iframe.src.replace("autoplay=1", isPlaying ? "autoplay=0" : "autoplay=1");
  });
  
  // Load the first song on page load
  loadSong(currentSongIndex);
  