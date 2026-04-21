// ----------- THEME TOGGLE -----------
const themeToggle = document.getElementById('themeToggle');

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? "☀️" : "🌙";
});


// ----------- SEARCH -----------
const searchForm = document.querySelector('.search-bar');

searchForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = document.getElementById('searchInput').value.toLowerCase();
  alert("You searched for: " + query);
});


// ----------- RECENT SCROLLER -----------
const track = document.getElementById('recent-notifications');
if (track) {
  track.innerHTML += track.innerHTML;
}


// ----------- DATA -----------
const data = {
  instagram: [
    { name: "Likes", price: 500, speed: "Instant Delivery" },
    { name: "Followers", price: 1500, speed: "1 - 2 Hours" },
    { name: "Views", price: 300, speed: "Instant" },
    { name: "Comments", price: 800, speed: "30 mins" },
    { name: "Shares", price: 600, speed: "Instant" }
  ],
  tiktok: [
    { name: "Likes", price: 400, speed: "Instant" },
    { name: "Followers", price: 1200, speed: "1 Hour" },
    { name: "Views", price: 200, speed: "Instant" },
    { name: "Comments", price: 700, speed: "30 mins" },
    { name: "Shares", price: 500, speed: "Instant" }
  ],
  twitter: [
    { name: "Likes", price: 300, speed: "Instant" },
    { name: "Followers", price: 1000, speed: "2 Hours" },
    { name: "Retweets", price: 600, speed: "Instant" },
    { name: "Replies", price: 700, speed: "1 Hour" },
    { name: "Impressions", price: 900, speed: "Fast" }
  ],
  youtube: [
    { name: "Likes", price: 700, speed: "Instant" },
    { name: "Followers", price: 1000, speed: "2 Hours" },
    { name: "Retweets", price: 600, speed: "Instant" },
    { name: "Replies", price: 700, speed: "1 Hour" },
    { name: "Impressions", price: 900, speed: "Fast" }
  ]
};


// ----------- RENDER SERVICES -----------
function renderServices() {
  document.querySelectorAll('.tab-content').forEach(section => {
    const id = section.id;

    section.innerHTML = data[id].map(service => `
      <div class="card">
        <h3>${service.name}</h3>
        <p class="price">₦${service.price} (per 1000)</p>
        <p class="speed">${service.speed}</p>
        <button class="buy-btn" data-platform="${id}" data-name="${service.name}" data-price="${service.price}">
          Buy Now
        </button>
      </div>
    `).join('');
  });
}


// ----------- TAB SWITCHING -----------
function setupTabs() {
  const buttons = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      button.classList.add('active');
      document.getElementById(button.dataset.tab).classList.add('active');
    });
  });
}


// ----------- BUY BUTTON (EVENT DELEGATION) -----------
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('buy-btn')) {
    const platform = e.target.dataset.platform;
    const service = e.target.dataset.name;
    const price = e.target.dataset.price;

    alert(`You selected ${service} on ${platform} for ₦${price}`);

    // future:
    // window.location.href = `/checkout?platform=${platform}&service=${service}&price=${price}`;
  }
});


// ----------- INIT -----------
document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  setupTabs();
});


const words = ["Followers", "Likes", "Comments", "Views", "Shares"];
const el = document.getElementById("typing-word");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  el.textContent = currentWord.substring(0, charIndex);

  let speed = isDeleting ? 50 : 100;

  // When word is fully typed
  if (!isDeleting && charIndex === currentWord.length) {
    speed = 1500; // pause before deleting
    isDeleting = true;
  }

  // When word is fully deleted
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 300;
  }

  setTimeout(typeEffect, speed);
}

// start animation
document.addEventListener("DOMContentLoaded", typeEffect);
