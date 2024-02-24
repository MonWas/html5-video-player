"use strict";

// Play / Pause functionality
const playNpauseBtn = document.querySelector("#play-pause");
const video = document.querySelector("video");

function playNpauseFn() {
  video.paused ? video.play() : video.pause();
}

function updatePlayNPauseIcon() {
  const icon = playNpauseBtn.querySelector("i");
  icon.textContent = "";

  icon.textContent = video.paused ? "play_arrow" : "paused";
}

video.addEventListener("play", updatePlayNPauseIcon);
video.addEventListener('click', playNpauseFn)
video.addEventListener("pause", updatePlayNPauseIcon);
playNpauseBtn.addEventListener("click", playNpauseFn);

// Rewind / Fast Forward functionality
const rewindBtn = document.querySelector("#rewind");
const fastForwardBtn = document.querySelector("#fast-forward");

function rewindNforwardFn(type) {
  video.currentTime += type === "rewind" ? -10 : 10;
}

rewindBtn.addEventListener("click", () => rewindNforwardFn("rewind"));
fastForwardBtn.addEventListener("click", () => rewindNforwardFn("forward"));

// Un/Mute functionality
const volumeBtn = document.querySelector("#volume");

function muteNunmuteFn() {
  video.muted = video.muted ? false : true;
}

function updateVolumeIcon() {
  const icon = volumeBtn.querySelector("i");
  icon.textContent = "";
  icon.textContent = video.muted ? "volume_off" : "volume_up";
}

video.addEventListener("volumechange", updateVolumeIcon);
volumeBtn.addEventListener("click", muteNunmuteFn);

// Progress bar functionality
const progressIndicator = document.querySelector("#progress-indicator");

function updateProgress() {
  const progressPercentage = (video.currentTime / video.duration) * 100;

  progressIndicator.style.width = `${progressPercentage}%`;
}

video.addEventListener('timeupdate', updateProgress);

// Seeking functionality
const progessBar = document.querySelector("#progress-bar");

function seekingFn(e) {
  const updatedTime = (e.offsetX / progessBar.offsetWidth) * video.duration;

  video.currentTime = updatedTime;
}

let mouseIsDown = false;

progessBar.addEventListener("mousedown", () => (mouseIsDown = true));
progessBar.addEventListener("mouseup", () => (mouseIsDown = false));
progessBar.addEventListener("click", seekingFn);
progessBar.addEventListener("mousemove", (e) => mouseIsDown && seekingFn);

// Keyboard navigation for accessibility
window.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    playNpauseFn();
  }
});

window.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    playNpauseFn();
  } else if (e.code === "ArrowLeft") {
    rewindNforwardFn("rewind");
  } else if (e.code === "ArrowRight") {
    rewindNforwardFn("forward");
  } else {
    return;
  }
});



