<!-----------LIGHT & DARK MODE------------->
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
});


<!-----------SEARCH BAR------------->
const searchForm = document.querySelector('.search-bar');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const query = document.getElementById('searchInput').value.toLowerCase();

  alert("You searched for: " + query);
});


<!-----------HOMEPAGE TOP-SLIDER------------->
const slides = document.querySelectorAll('.slide');
const slidesContainer = document.querySelector('.slides');
const totalSlides = slides.length;

const dotsContainer = document.getElementById('dots');

let currentIndex = 0;

/* ---------------- CREATE DOTS ---------------- */
let dots = [];

for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  dotsContainer.appendChild(dot);
  dots.push(dot);

  dot.addEventListener('click', () => {
    currentIndex = i;
    updateSlider();
  });
}

/* ---------------- UPDATE SLIDER ---------------- */
function updateSlider() {
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[currentIndex]) {
    dots[currentIndex].classList.add('active');
  }
}

/* ---------------- NEXT / PREV ---------------- */
function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
}

/* ---------------- AUTO SLIDE ---------------- */
setInterval(nextSlide, 3000);

/* ---------------- BUTTONS ---------------- */
document.getElementById('next')?.addEventListener('click', nextSlide);
document.getElementById('prev')?.addEventListener('click', prevSlide);

/* ---------------- INIT ---------------- */
updateSlider();
