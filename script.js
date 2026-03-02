const reasons = [
  "Your heart knows what matters, and your moral compass is one of the things I admire most about you.",
  "Your comedic view of the world makes hard moments feel lighter.",
  "You live in the present, and that kind of fearless joy is part of your magic.",
  "Your smile can reset an entire day.",
  "Everything pink looks like it was made for you.",
  "Your sense of adventure makes life feel bigger and better.",
  "Your big ideas make the future feel exciting.",
  "You bring light with you, even when you are not trying."
];

const quizQuestions = [
  {
    question: "Which kind of movement feels the most like her energy?",
    options: ["Jazz funk", "Contemporary", "Ballet"],
    answer: 2,
    success: "Exactly. Ballet is part of what makes you you."
  },
  {
    question: "Which Friends character suits Jasmine best?",
    options: ["Phoebe", "Monica", "Rachel"],
    answer: null,
    success: "Trick question. You are Phoebe, Monica, and Rachel all at once.",
    trickAllCorrect: true
  },
  {
    question: "Which movie feels the most locked-in for her?",
    options: ["The Notebook", "Interstellar", "10 Things I Hate About You"],
    answer: 1,
    success: "Right. Interstellar stays elite."
  },
  {
    question: "If her aura showed up in a room, what would it look like?",
    options: ["Lavender with silver", "Peach with white", "Soft pink with silver"],
    answer: 2,
    success: "Obviously. Pink light with star energy."
  },
  {
    question: "Which comfort-watch world feels the most like her kind of cozy?",
    options: ["New Girl", "Friends", "Gilmore Girls"],
    answer: 1,
    success: "Exactly. Friends stays in the comfort-watch hall of fame."
  },
  {
    question: "Which plan sounds the most like her perfect main-character night?",
    options: ["A quiet puzzle night by 8", "A camping trip with no music", "A pop concert and a late-night city walk"],
    answer: 2,
    success: "Right. Big music and main-character energy wins."
  }
];

const memories = {
  universal: {
    title: "Universal Studios",
    message: "A full-on fun day. Loud, playful, adventurous, and exactly the kind of memory that belongs in your birthday reel.",
    images: [
      "PHOTOS/IMG_3867.heic.png",
      "PHOTOS/IMG_3890.heic.png",
      "PHOTOS/IMG_3950.HEIC.png"
    ]
  },
  la: {
    title: "LA + Taylor",
    message: "The LA trip for Taylor Swift was pure Jasmine energy: music, excitement, and a memory that feels impossible to top.",
    images: [
      "PHOTOS/taylor.png"
    ]
  },
  billiebrina: {
    title: "BillieBrina Day",
    message: "Back-to-back Billie Eilish and Sabrina Carpenter is honestly such a perfect chapter for your pop-girl heart.",
    images: [
      "PHOTOS/BB.JPG",
      "PHOTOS/BB2.JPG",
      "PHOTOS/bb3.png"
    ]
  },
  halloween: {
    title: "Cosmo and Wanda Halloween",
    message: "This one deserves its own category. Funny, iconic, and way too on-brand for us not to love forever.",
    images: [
      "PHOTOS/hh1.JPG",
      "PHOTOS/hh2.JPG"
    ]
  },
  nyc: {
    title: "Our First New York Trip",
    message: "A first New York memory feels exactly right here, because you make every city feel more alive.",
    images: [
      "PHOTOS/IMG_0567.JPEG"
    ]
  }
};

const tracks = [
  {
    title: "Gold Rush",
    artist: "Taylor Swift",
    file: "Songs/Gold Rush - Taylor Swift.mp3"
  },
  {
    title: "You & I",
    artist: "One Direction",
    file: "Songs/You & I - One Direction.mp3"
  },
  {
    title: "Sun Bleached Flies",
    artist: "Ethel Cain",
    file: "Songs/Ethel Cain – Sun Bleached Flies.mp3"
  },
  {
    title: "Look At That Woman",
    artist: "ROLE MODEL",
    file: "Songs/ROLE MODEL - Look At That Woman .mp3"
  },
  {
    title: "Only Angel",
    artist: "Harry Styles",
    file: "Songs/Harry Styles - Only Angel.mp3"
  }
];

const openLetterButton = document.getElementById("open-letter");
const startSurpriseButton = document.getElementById("start-surprise");
const pinGate = document.getElementById("pin-gate");
const pinForm = document.getElementById("pin-form");
const pinInput = document.getElementById("pin-input");
const pinFeedback = document.getElementById("pin-feedback");
const letterModal = document.getElementById("letter-modal");
const letterPanel = document.getElementById("letter-panel");
const letterBackdrop = document.getElementById("letter-backdrop");
const closeLetterButton = document.getElementById("close-letter");
const nextReasonButton = document.getElementById("next-reason");
const reasonText = document.getElementById("reason-text");
const timelineCards = document.querySelectorAll(".timeline-card");
const memoryStage = document.getElementById("memory-stage");
const memoryTitle = document.getElementById("memory-title");
const memoryMessage = document.getElementById("memory-message");
const swipeHint = document.getElementById("swipe-hint");
const memoryImage = document.getElementById("memory-image");
const memoryDots = document.getElementById("memory-dots");
const memoryPrev = document.getElementById("memory-prev");
const memoryNext = document.getElementById("memory-next");
const secretOptions = document.querySelectorAll(".secret-option");
const secretMessage = document.getElementById("secret-message");
const secretReset = document.getElementById("secret-reset");
const secretModal = document.getElementById("secret-modal");
const secretBackdrop = document.getElementById("secret-backdrop");
const closeSecretButton = document.getElementById("close-secret");
const rewardModal = document.getElementById("reward-modal");
const rewardBackdrop = document.getElementById("reward-backdrop");
const closeRewardButton = document.getElementById("close-reward");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizFeedback = document.getElementById("quiz-feedback");
const quizProgress = document.getElementById("quiz-progress");
const nextQuestionButton = document.getElementById("next-question");
const confettiButton = document.getElementById("confetti-button");
const wishButton = document.getElementById("wish-button");
const wishSky = document.getElementById("wish-sky");
const surpriseNote = document.getElementById("surprise-note");
const musicList = document.getElementById("music-list");
const nowPlaying = document.getElementById("now-playing");
const birthdayPlayer = document.getElementById("birthday-player");
const vinylPlayer = document.getElementById("vinyl-player");
const record = document.getElementById("record");
const playerToggle = document.getElementById("player-toggle");
const playerProgress = document.getElementById("player-progress");
const playerTime = document.getElementById("player-time");

let reasonIndex = 0;
let quizIndex = 0;
let currentMemoryKey = "universal";
let currentMemoryIndex = 0;
let rewardUnlocked = false;
let quizResults = new Array(quizQuestions.length).fill(null);

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function renderMemory(memoryKey) {
  currentMemoryKey = memoryKey;
  currentMemoryIndex = 0;
  const selected = memories[memoryKey];
  memoryTitle.textContent = selected.title;
  memoryMessage.textContent = selected.message;
  swipeHint.textContent = selected.images.length > 1 ? "Tap through the photos." : "One snapshot for this memory.";
  renderMemoryImage();
}

function renderMemoryImage() {
  const selected = memories[currentMemoryKey];
  const imagePath = selected.images[currentMemoryIndex];
  memoryImage.src = imagePath;
  memoryImage.alt = selected.title;
  memoryDots.innerHTML = "";

  selected.images.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "memory-dot";
    if (index === currentMemoryIndex) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      currentMemoryIndex = index;
      renderMemoryImage();
    });
    memoryDots.appendChild(dot);
  });

  const isSingle = selected.images.length <= 1;
  memoryPrev.hidden = isSingle;
  memoryNext.hidden = isSingle;
}

function renderQuiz() {
  const current = quizQuestions[quizIndex];
  quizQuestion.textContent = current.question;
  quizOptions.innerHTML = "";
  quizFeedback.textContent = "Pick an answer to see the answer card.";
  quizProgress.textContent = `Question ${quizIndex + 1} of ${quizQuestions.length}`;

  current.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;

    button.addEventListener("click", () => {
      const optionButtons = quizOptions.querySelectorAll(".quiz-option");
      optionButtons.forEach((node) => {
        node.disabled = true;
      });

      if (current.trickAllCorrect) {
        optionButtons.forEach((node) => {
          node.classList.add("correct");
        });
        quizResults[quizIndex] = true;
        quizFeedback.textContent = current.success;
        maybeUnlockReward();
        return;
      }

      if (index === current.answer) {
        button.classList.add("correct");
        quizResults[quizIndex] = true;
        quizFeedback.textContent = current.success;
        maybeUnlockReward();
      } else {
        button.classList.add("wrong");
        quizResults[quizIndex] = false;
        optionButtons[current.answer].classList.add("correct");
        quizFeedback.textContent = "Not quite. The right answer is the most Jasmine answer.";
      }
    });

    quizOptions.appendChild(button);
  });
}

function renderTracks() {
  musicList.innerHTML = "";

  tracks.forEach((track) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "track-button";

    const title = document.createElement("span");
    title.className = "track-title";
    title.textContent = track.title;

    const artist = document.createElement("span");
    artist.className = "track-artist";
    artist.textContent = track.artist;

    button.appendChild(title);
    button.appendChild(artist);

    button.addEventListener("click", async () => {
      const encodedPath = encodeURI(track.file);
      const sameTrack = birthdayPlayer.dataset.currentTrack === track.file;

      document.querySelectorAll(".track-button").forEach((node) => node.classList.remove("active"));
      button.classList.add("active");

      if (!sameTrack) {
        birthdayPlayer.src = encodedPath;
        birthdayPlayer.dataset.currentTrack = track.file;
      }

      nowPlaying.textContent = `Now playing: ${track.title} by ${track.artist}`;

      try {
        await birthdayPlayer.play();
        record.classList.add("spinning");
        vinylPlayer.classList.add("playing");
        playerToggle.textContent = "Pause";
      } catch (error) {
        nowPlaying.textContent = `Ready to play: ${track.title} by ${track.artist}`;
      }
    });

    musicList.appendChild(button);
  });
}

function addStarAt(x, y) {
  const bounds = wishSky.getBoundingClientRect();
  const star = document.createElement("span");
  star.className = "star";
  star.style.left = `${x - bounds.left}px`;
  star.style.top = `${y - bounds.top}px`;
  wishSky.appendChild(star);

  window.setTimeout(() => {
    star.remove();
  }, 900);
}

function burstConfetti() {
  const colors = ["#ff7cb7", "#b68a68", "#fff3cc", "#ffd3e8"];

  for (let i = 0; i < 32; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 180}ms`;
    document.body.appendChild(piece);

    window.setTimeout(() => {
      piece.remove();
    }, 2300);
  }
}

function openLetterModal() {
  letterModal.classList.add("open");
  letterModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLetterModal() {
  letterModal.classList.remove("open");
  letterModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function openSecretModal() {
  secretModal.classList.add("open");
  secretModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeSecretModal() {
  secretModal.classList.remove("open");
  secretModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function openRewardModal() {
  rewardModal.classList.add("open");
  rewardModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeRewardModal() {
  rewardModal.classList.remove("open");
  rewardModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function resetSecretQuestion() {
  secretOptions.forEach((button) => {
    button.disabled = false;
    button.classList.remove("correct", "wrong");
  });
  secretMessage.textContent = "Pick an answer to unlock it.";
  secretReset.hidden = true;
}

function maybeUnlockReward() {
  if (rewardUnlocked) {
    return;
  }

  const allAnswered = quizResults.every((value) => value !== null);
  const allCorrect = quizResults.every((value) => value === true);

  if (allAnswered && allCorrect) {
    rewardUnlocked = true;
    openRewardModal();
  }
}

function forceScrollTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function rainLobsters() {
  for (let i = 0; i < 18; i += 1) {
    const lobster = document.createElement("span");
    lobster.className = "lobster";
    lobster.textContent = "🦞";
    lobster.style.left = `${Math.random() * 100}vw`;
    lobster.style.animationDelay = `${Math.random() * 200}ms`;
    lobster.style.fontSize = `${1.6 + Math.random() * 1.4}rem`;
    document.body.appendChild(lobster);

    window.setTimeout(() => {
      lobster.remove();
    }, 2700);
  }
}

openLetterButton.addEventListener("click", () => {
  openLetterModal();
});

startSurpriseButton.addEventListener("click", () => {
  openLetterModal();
  burstConfetti();
  surpriseNote.textContent = "Birthday mode activated. The page officially chose sparkle.";
});

closeLetterButton.addEventListener("click", () => {
  closeLetterModal();
});

letterBackdrop.addEventListener("click", () => {
  closeLetterModal();
});

closeSecretButton.addEventListener("click", () => {
  closeSecretModal();
});

secretBackdrop.addEventListener("click", () => {
  closeSecretModal();
});

closeRewardButton.addEventListener("click", () => {
  closeRewardModal();
});

rewardBackdrop.addEventListener("click", () => {
  closeRewardModal();
});

nextReasonButton.addEventListener("click", () => {
  reasonIndex = (reasonIndex + 1) % reasons.length;
  reasonText.textContent = reasons[reasonIndex];
});

timelineCards.forEach((card) => {
  card.addEventListener("click", () => {
    timelineCards.forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    card.insertAdjacentElement("afterend", memoryStage);
    renderMemory(card.dataset.memoryKey);
  });
});

memoryPrev.addEventListener("click", () => {
  const selected = memories[currentMemoryKey];
  currentMemoryIndex = (currentMemoryIndex - 1 + selected.images.length) % selected.images.length;
  renderMemoryImage();
});

memoryNext.addEventListener("click", () => {
  const selected = memories[currentMemoryKey];
  currentMemoryIndex = (currentMemoryIndex + 1) % selected.images.length;
  renderMemoryImage();
});

secretOptions.forEach((option) => {
  option.addEventListener("click", () => {
    secretOptions.forEach((button) => {
      button.disabled = true;
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
    });

    if (option.dataset.correct === "true") {
      option.classList.add("correct");
      secretMessage.textContent = "Correct. Open your secret message.";
      secretReset.hidden = true;
      openSecretModal();
      rainLobsters();
      return;
    }

    option.classList.add("wrong");
    secretMessage.textContent = "Close, but your lobster answer is Ross.";
    secretReset.hidden = false;
  });
});

secretReset.addEventListener("click", () => {
  resetSecretQuestion();
});

nextQuestionButton.addEventListener("click", () => {
  quizIndex = (quizIndex + 1) % quizQuestions.length;
  renderQuiz();
});

confettiButton.addEventListener("click", () => {
  burstConfetti();
  surpriseNote.textContent = "Happy Birthday, Jasmine. This whole page is in celebration mode.";
});

wishButton.addEventListener("click", () => {
  const bounds = wishSky.getBoundingClientRect();

  for (let i = 0; i < 6; i += 1) {
    const x = bounds.left + Math.random() * bounds.width;
    const y = bounds.top + Math.random() * bounds.height;
    addStarAt(x, y);
  }

  surpriseNote.textContent = "Wish launched. The birthday sky is working overtime.";
});

wishSky.addEventListener("click", (event) => {
  addStarAt(event.clientX, event.clientY);
});

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

playerToggle.addEventListener("click", async () => {
  if (!birthdayPlayer.src) {
    const firstTrack = musicList.querySelector(".track-button");
    if (firstTrack) {
      firstTrack.click();
    }
    return;
  }

  if (birthdayPlayer.paused) {
    try {
      await birthdayPlayer.play();
    } catch (error) {
      playerToggle.textContent = "Play";
    }
  } else {
    birthdayPlayer.pause();
  }
});

birthdayPlayer.addEventListener("play", () => {
  record.classList.add("spinning");
  vinylPlayer.classList.add("playing");
  playerToggle.textContent = "Pause";
});

birthdayPlayer.addEventListener("pause", () => {
  record.classList.remove("spinning");
  vinylPlayer.classList.remove("playing");
  playerToggle.textContent = "Play";
});

birthdayPlayer.addEventListener("loadedmetadata", () => {
  playerTime.textContent = `${formatTime(0)} / ${formatTime(birthdayPlayer.duration)}`;
});

birthdayPlayer.addEventListener("timeupdate", () => {
  if (birthdayPlayer.duration) {
    playerProgress.value = String((birthdayPlayer.currentTime / birthdayPlayer.duration) * 100);
  } else {
    playerProgress.value = "0";
  }
  playerTime.textContent = `${formatTime(birthdayPlayer.currentTime)} / ${formatTime(birthdayPlayer.duration)}`;
});

birthdayPlayer.addEventListener("ended", () => {
  record.classList.remove("spinning");
  vinylPlayer.classList.remove("playing");
  playerToggle.textContent = "Play";
  playerProgress.value = "0";
});

playerProgress.addEventListener("input", () => {
  if (!birthdayPlayer.duration) {
    return;
  }

  birthdayPlayer.currentTime = (Number(playerProgress.value) / 100) * birthdayPlayer.duration;
});

pinForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (pinInput.value === "0302") {
    forceScrollTop();
    pinGate.classList.add("unlocked");
    pinGate.setAttribute("aria-hidden", "true");
    pinFeedback.textContent = "Unlocked.";
    document.body.style.overflow = "";
    requestAnimationFrame(() => {
      forceScrollTop();
      window.setTimeout(() => {
        forceScrollTop();
      }, 120);
    });
    burstConfetti();
    return;
  }

  pinFeedback.textContent = "Wrong pin. Try 4 digits again.";
  pinInput.value = "";
  pinInput.focus();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && letterModal.classList.contains("open")) {
    closeLetterModal();
  }
  if (event.key === "Escape" && secretModal.classList.contains("open")) {
    closeSecretModal();
  }
  if (event.key === "Escape" && rewardModal.classList.contains("open")) {
    closeRewardModal();
  }
});

renderMemory("universal");
timelineCards[0].insertAdjacentElement("afterend", memoryStage);
renderQuiz();
renderTracks();
resetSecretQuestion();
document.body.style.overflow = "hidden";
forceScrollTop();
