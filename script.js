function notify(message, type = "info") {
  const toast = document.createElement("div");

  toast.textContent = message;

  const colors = {
    info: "#111",
    success: "#00A86B",
    error: "#D9534F",
    warning: "#F0AD4E"
  };

  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${colors[type] || "#111"};
    color: white;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 14px;
    z-index: 9999;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    opacity: 0;
    transform: translateY(20px);
    transition: 0.3s ease;
  `;

  document.body.appendChild(toast);

  // animate in
  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  }, 50);

  // remove after 3s
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}



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
  notify("You searched for: " + query, "info");
});


// ----------- RECENT SCROLLER -----------
const track = document.getElementById('recent-notifications');
if (track) {
  track.innerHTML += track.innerHTML;
}


// ----------- DATA -----------
const data = {
  instagram: [
    { name: "Likes", price: 8500, speed: "12 Hours" },
    { name: "Followers", price: 12850, speed: "3 - 6 Hours" },
    { name: "Reels Views", price: 6500, speed: "Instant" },
    { name: "Custom Comments", price: 25200, speed: "2 Hours" },
    { name: "Random Comments", price: 7550, speed: "8 Hours" },
    { name: "Shares", price: 600, speed: "Instant" }
  ],
  tiktok: [
    { name: "Likes", price: 9850, speed: "10 Hours" },
    { name: "Nigerian Followers", price: 18300, speed: "1 Day" },
    { name: "Fast Views", price: 10500, speed: "Instant" },
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
        <p class="price">₦${service.price}</p>
        <p class="per-room-txt">(per 1000)</p>
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

  notify(`${service} selected (${platform}) — ₦${price} per 1000`, "success");
    
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


// ----------- MODAL ELEMENTS -----------
const modal = document.getElementById('orderModal');
const closeModal = document.getElementById('closeModal');

const categoryField = document.getElementById('modal-category');
const descriptionField = document.getElementById('modal-description');
const linkField = document.getElementById('modal-link');
const quantityField = document.getElementById('modal-quantity');
const chargeField = document.getElementById('modal-charge');
const emailField = document.getElementById('modal-email');

let currentPrice = 0;
let currentOrderId = "";
let currentOrderData = {}; 

// OPEN MODAL
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('buy-btn')) {

    const platform = e.target.dataset.platform;
    const service = e.target.dataset.name;
    const price = Number(e.target.dataset.price);

    currentPrice = price;

    categoryField.value = platform;
    descriptionField.value = `(${platform}) ${service} service - ₦${price} per 1000`;
    quantityField.value = "";
    chargeField.value = "";

    modal.style.display = "flex";
  }
});

// CLOSE MODAL
closeModal.addEventListener('click', () => {
  modal.style.display = "none";
});

const paymentModal = document.getElementById('paymentModal');
const closePaymentModal = document.getElementById('closePaymentModal');

closePaymentModal?.addEventListener('click', () => {
  paymentModal.style.display = "none";
  notify("Payment window closed", "info");
});

// CLOSE ON OUTSIDE CLICK
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});


// ----------- PRICE CALCULATION -----------
quantityField.addEventListener('input', () => {
  const qty = Number(quantityField.value);

  if (!qty || qty <= 0) {
    chargeField.value = "";
    return;
  }

  const total = (qty / 1000) * currentPrice;
  chargeField.value = total.toLocaleString();
});


document.getElementById('confirmOrder').addEventListener('click', () => {
  
  const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/;

if (!urlPattern.test(linkField.value.trim())) {
  notify("Please enter a valid link", "warning");
  return;
}

  currentOrderData = {
    orderId: "ORD-" + Date.now(),
    category: categoryField.value,
    description: descriptionField.value,
    link: linkField.value,
    quantity: quantityField.value,
    charge: chargeField.value
  };

  currentOrderId = currentOrderData.orderId;
  
if (!currentOrderData.link || !currentOrderData.quantity || !currentOrderData.charge) {
  notify("Please fill all fields", "warning");
  return;
}
  
fetch("https://hook.eu1.make.com/cc7ua14hn8ya11ofj6o5nrnhffsclusm", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
 body: JSON.stringify(currentOrderData),
})
.then(() => {
  notify("Order sent!", "success");

  modal.style.display = "none";

  // OPEN PAYMENT MODAL
  document.getElementById('paymentModal').style.display = "flex";

  document.getElementById('payment-order-id').textContent =
    "Order ID: " + currentOrderId;

  startTimer();
})
.catch(() => {
  notify("Failed to send order", "warning");
});
  
  linkField.value = "";
quantityField.value = "";
chargeField.value = "";
});



let timerInterval;

function startTimer() {
  let time = 15 * 60; // 15 mins

  const display = document.getElementById("countdown");

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    display.textContent =
      `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    time--;

    if (time < 0) {
      clearInterval(timerInterval);
      document.getElementById('paymentModal').style.display = "none";
      notify("Payment time expired", "warning");
    }
  }, 1000);
}


document.querySelectorAll('.pay-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pay-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.pay-content').forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});


document.getElementById('paidBtn').addEventListener('click', () => {

  if (!currentOrderId) {
    notify("No active order", "warning");
    return;
  }

 const email = emailField.value;
  
  if (!email || !email.includes("@")) {
  notify("Enter a valid email", "warning");
  return;
}

fetch("https://hook.eu1.make.com/f1nbuumrnvavkbs9ek7089tf7r89mq9v", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
body: JSON.stringify({
  status: "PAID",
  email,
  ...currentOrderData
})
})
  .then(() => {
    notify("Payment notification sent!", "success");
    document.getElementById('paymentModal').style.display = "none";
  
  currentOrderData = {};
currentOrderId = "";
  })
  .catch(() => {
    notify("Failed to notify", "error");
  });

});


const copyBtn = document.getElementById("copyBtn");

copyBtn.addEventListener("click", () => {
  const accountNumber = document.getElementById("accountNumber").textContent;

  navigator.clipboard.writeText(accountNumber)
    .then(() => {
      notify("Account number copied!", "success");
    })
    .catch(() => {
      notify("Failed to copy", "error");
    });
});
