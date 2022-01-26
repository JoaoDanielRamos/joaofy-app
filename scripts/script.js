'use strict';

// ! VARIABLES
// * Elements
const musicPlayer_container = document.getElementById('music-player'),
  title = document.getElementById('title'),
  disc = document.getElementById('disc'),
  progressContainer = document.getElementById('progress-container'),
  progressBar = document.getElementById('progress-bar'),
  audio = document.getElementById('audio');

// * Buttons
const play = document.getElementById('play'),
  pause = document.getElementById('pause'),
  previous = document.getElementById('previous'),
  next = document.getElementById('next');

// * Song Titles
const songs = [
  'Freddie Gibbs - Gang Signs (feat. ScHoolboy Q)',
  'Kendrick Lamar - Swimming Pools (Drank)',
  'Lofi Girl - Lofi hip hop beats',
];
// * Track of song
let songIndex = 0;

loadSong(songs[songIndex]);

// ! FUNCTIONS
// * Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  disc.style.background = `url('../assets/${song}.jpeg')`;
  disc.style.backgroundRepeat = 'no-repeat';
  disc.style.backgroundSize = 'cover';
}

// * Toggle pause / play
function toggleHidden(element1, element2) {
  element1.classList.add('hidden');
  element2.classList.remove('hidden');
}

// * Play song
function playSong() {
  musicPlayer_container.classList.add('play');
  toggleHidden(play, pause);
  audio.play();
}

// * Pause song
function pauseSong() {
  toggleHidden(pause, play);
  musicPlayer_container.classList.remove('play');
  audio.pause();
}

// * Update Progress
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  progressBar.style.width = `${(currentTime / duration) * 100}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// ! EVENT LISTENERS

// * Play Button
play.addEventListener('click', () => {
  playSong();
});

// * Pause Button
pause.addEventListener('click', () => {
  pauseSong();
});

// * Next Button
next.addEventListener('click', () => {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }

  progressBar.style.width = `0%`;
  loadSong(songs[songIndex]);
  playSong();
});

// * Previous Button
previous.addEventListener('click', () => {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex--;
  }

  progressBar.style.width = `0%`;
  loadSong(songs[songIndex]);
  playSong();
});

// * Progress Bar
progressContainer.addEventListener('click', setProgress);

// * Getting the current time of the song
audio.addEventListener('timeupdate', updateProgress);

// * song Ends
audio.addEventListener('ended', () => {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }

  progressBar.style.width = `0%`;
  loadSong(songs[songIndex]);
  playSong();
});
