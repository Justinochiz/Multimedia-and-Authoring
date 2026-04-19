const ORBITAL_PERIODS = {
  Mercury: 0.2408467,
  Venus: 0.61519726,
  Earth: 1,
  Mars: 1.8808158,
  Jupiter: 11.862615,
  Saturn: 29.447498,
  Uranus: 84.016846,
  Neptune: 164.79132,
  Pluto: 248,
};

const form = document.getElementById("age-form");
const earthAgeInput = document.getElementById("earth-age");
const errorMessage = document.getElementById("error-message");
const cards = Array.from(document.querySelectorAll(".planet-card"));
const summaryCells = Array.from(document.querySelectorAll("[data-summary]"));

function formatYears(years) {
  return `${years.toFixed(2)} years`;
}

function animateNumber(targetElement, finalValue) {
  const duration = 650;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = finalValue * eased;
    targetElement.textContent = formatYears(current);

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

function updateAges(earthAge) {
  cards.forEach((card) => {
    const planet = card.dataset.planet;
    const period = ORBITAL_PERIODS[planet];
    const output = card.querySelector("[data-output]");
    const ageOnPlanet = earthAge / period;
    animateNumber(output, ageOnPlanet);
  });

  summaryCells.forEach((cell) => {
    const planet = cell.dataset.summary;
    const period = ORBITAL_PERIODS[planet];
    const ageOnPlanet = earthAge / period;
    animateNumber(cell, ageOnPlanet);
  });
}

function validateAge(value) {
  if (value === "") {
    return "Please enter your age first.";
  }

  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    return "Age must be a valid number.";
  }

  if (parsed <= 0) {
    return "Age must be greater than 0.";
  }

  if (parsed > 130) {
    return "Please enter an age from 0.1 to 130.";
  }

  return "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const error = validateAge(earthAgeInput.value);
  errorMessage.textContent = error;

  if (error) {
    return;
  }

  updateAges(Number(earthAgeInput.value));
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((section, index) => {
  section.style.transitionDelay = `${index * 0.09}s`;
  revealObserver.observe(section);
});
