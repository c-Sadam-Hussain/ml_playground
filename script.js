const cardPanel = document.querySelector("#cardPanel");
const openCardButton = document.querySelector("#openCard");
const confettiButton = document.querySelector("#burstConfetti");
const wishButton = document.querySelector("#newWish");
const wishText = document.querySelector("#wishText");
const repairButton = document.querySelector("#repairButton");
const thermosButton = document.querySelector("#thermosButton");
const repairFill = document.querySelector("#repairFill");
const repairPercent = document.querySelector("#repairPercent");
const waterLevel = document.querySelector(".water-level");
const countdownTitle = document.querySelector("#countdownTitle");
const daysEl = document.querySelector("#days");
const hoursEl = document.querySelector("#hours");
const minutesEl = document.querySelector("#minutes");
const secondsEl = document.querySelector("#seconds");
const canvas = document.querySelector("#confetti");
const ctx = canvas.getContext("2d");

const wishes = [
  "May this year bring you peaceful days, brave choices, and reasons to smile without trying.",
  "May your heart feel lighter, your dreams feel closer, and your birthday feel properly celebrated.",
  "May every good thing meant for you find its way to your door this year.",
  "May your friendships stay warm, your worries stay small, and your happiness keep growing.",
  "May June 12 bring you a fresh start wrapped in kindness, laughter, and lovely surprises.",
  "May you always be surrounded by people who remember your worth, even on ordinary days."
];

const colors = ["#f05f5c", "#ffd166", "#117c7a", "#b8dcff", "#9ee6cf", "#c9b8ff"];
let confettiPieces = [];
let repairValue = 0;
let lastWishIndex = -1;

function resizeCanvas() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
}

function createConfetti(amount = 150) {
  const width = window.innerWidth;

  for (let i = 0; i < amount; i += 1) {
    confettiPieces.push({
      x: Math.random() * width,
      y: -20 - Math.random() * window.innerHeight * 0.45,
      size: 5 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 2.2 + Math.random() * 4,
      drift: -1.2 + Math.random() * 2.4,
      rotation: Math.random() * 360,
      spin: -8 + Math.random() * 16
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  confettiPieces = confettiPieces.filter((piece) => piece.y < window.innerHeight + 30);

  confettiPieces.forEach((piece) => {
    piece.y += piece.speed;
    piece.x += piece.drift;
    piece.rotation += piece.spin;

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate((piece.rotation * Math.PI) / 180);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.62);
    ctx.restore();
  });

  requestAnimationFrame(drawConfetti);
}

function openBirthdayCard() {
  cardPanel.classList.add("show");
  cardPanel.scrollIntoView({ behavior: "smooth", block: "center" });
  createConfetti(180);
}

function showNewWish() {
  let nextIndex = Math.floor(Math.random() * wishes.length);

  if (wishes.length > 1) {
    while (nextIndex === lastWishIndex) {
      nextIndex = Math.floor(Math.random() * wishes.length);
    }
  }

  lastWishIndex = nextIndex;
  wishText.textContent = wishes[nextIndex];
  createConfetti(55);
}

function repairThermos() {
  repairValue = Math.min(100, repairValue + 20);
  repairFill.style.width = `${repairValue}%`;
  repairPercent.textContent = repairValue;
  waterLevel.style.height = `${12 + repairValue * 0.78}%`;
  thermosButton.classList.remove("repaired");
  void thermosButton.offsetWidth;
  thermosButton.classList.add("repaired");

  if (repairValue >= 100) {
    wishText.textContent = "The thermos is repaired. The old fight is officially retired. Happy birthday, Hira.";
    createConfetti(220);
  }
}

function getNextBirthday() {
  const now = new Date();
  const year = now.getMonth() > 5 || (now.getMonth() === 5 && now.getDate() > 12)
    ? now.getFullYear() + 1
    : now.getFullYear();

  return new Date(year, 5, 12, 0, 0, 0);
}

function updateCountdown() {
  const now = new Date();
  const birthday = getNextBirthday();
  const distance = birthday - now;

  if (now.getMonth() === 5 && now.getDate() === 12) {
    countdownTitle.textContent = "Today is Hira Gul's birthday. This page is officially in celebration mode.";
    daysEl.textContent = "0";
    hoursEl.textContent = "0";
    minutesEl.textContent = "0";
    secondsEl.textContent = "0";
    return;
  }

  const totalSeconds = Math.max(0, Math.floor(distance / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownTitle.textContent = "Counting down to Hira Gul's June 12 birthday.";
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

openCardButton.addEventListener("click", openBirthdayCard);
confettiButton.addEventListener("click", () => createConfetti(180));
wishButton.addEventListener("click", showNewWish);
repairButton.addEventListener("click", repairThermos);
thermosButton.addEventListener("click", repairThermos);
thermosButton.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    repairThermos();
  }
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
drawConfetti();
updateCountdown();
setInterval(updateCountdown, 1000);
setTimeout(() => createConfetti(100), 500);
