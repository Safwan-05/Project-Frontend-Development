// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const nav = document.querySelector("nav");
const dropdownParents = document.querySelectorAll(".has-dropdown");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Dropdown toggle for mobile
dropdownParents.forEach(parent => {
  parent.addEventListener("click", (e) => {
    if(window.innerWidth <= 768) {
      e.preventDefault();
      parent.classList.toggle("open");
    }
  });
});

// Close nav + reset dropdowns on resize back to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    nav.classList.remove("active");
    dropdownParents.forEach(p => p.classList.remove("open"));
  }
});

// Footer columns reveal
document.addEventListener("DOMContentLoaded", () => {
  const cols = document.querySelectorAll(".fade-col");

  function revealOnScroll() {
    cols.forEach((col, index) => {
      const rect = col.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        if (window.innerWidth <= 768) {
          col.classList.add("show"); // mobile: animate immediately
        } else {
          setTimeout(() => col.classList.add("show"), index * 200);
        }
      } else {
        col.classList.remove("show");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("resize", revealOnScroll);
  revealOnScroll();
});

// Auto-close nav when link is clicked (mobile only)
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      nav.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".newsletter"); 
  if (!form) return;

  const emailInput = form.querySelector("input[type='email']");
  const btn = form.querySelector("button");

  // Newsletter base styles via JS
  form.style.display = "flex";
  form.style.gap = "8px";
  emailInput.style.flex = "1";
  emailInput.style.padding = "10px";
  emailInput.style.border = "2px solid #ff9f1c";
  emailInput.style.borderRadius = "6px";
  emailInput.style.outline = "none";

  btn.style.background = "#ff9f1c";
  btn.style.color = "white";
  btn.style.border = "none";
  btn.style.padding = "10px 16px";
  btn.style.borderRadius = "6px";
  btn.style.cursor = "pointer";
  btn.style.transition = "0.3s";

  btn.addEventListener("mouseover", () => btn.style.background = "#82b400");
  btn.addEventListener("mouseout", () => btn.style.background = "#ff9f1c");

  // Create toast container (top-right)
  const toastContainer = document.createElement("div");
  toastContainer.style.position = "fixed";
  toastContainer.style.top = "20px";
  toastContainer.style.right = "20px";
  toastContainer.style.zIndex = "9999";
  document.body.appendChild(toastContainer);

  // Subscribe button click
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    if (!email) {
      showToast("⚠ Please enter your email.", "#ff9f1c"); 
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("❌ Invalid email format.", "#ff9f1c");
      return;
    }

    showToast("✅ You’re subscribed! 🎉", "#82b400");
    emailInput.value = "";
  });

  // Toast function
  function showToast(message, color) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.background = "white";
    toast.style.color = "#333";
    toast.style.borderLeft = `5px solid ${color}`;
    toast.style.padding = "10px 18px";
    toast.style.marginTop = "10px";
    toast.style.borderRadius = "8px";
    toast.style.fontSize = "14px";
    toast.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    toast.style.transform = "translateY(-10px)";
    toastContainer.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    }, 100);

    // Remove after 3s
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-10px)";
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  // ✅ Responsiveness via JS
  function makeResponsive() {
    if (window.innerWidth <= 600) {
      form.style.flexDirection = "column";
      emailInput.style.width = "100%";
      emailInput.style.marginBottom = "8px";
      btn.style.width = "100%";
    } else {
      form.style.flexDirection = "row";
      emailInput.style.width = "auto";
      btn.style.width = "auto";
      emailInput.style.marginBottom = "0";
    }
  }

  window.addEventListener("resize", makeResponsive);
  makeResponsive(); // run on load
});



// hero section 

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");

  // Fade + Animate on Load
  setTimeout(() => {
    hero.classList.add("show");
  }, 400);

  // Responsive adjustment using JS
  function resizeHero() {
    const content = hero.querySelector(".content");
    if (window.innerWidth < 600) {
      hero.style.height = "60vh";
      content.style.padding = "0 14px";
    } else if (window.innerWidth < 900) {
      hero.style.height = "65vh";
      content.style.padding = "0 18px";
    } else {
      hero.style.height = "70vh";
      content.style.padding = "0 22px";
    }
  }

  window.addEventListener("resize", resizeHero);
  resizeHero();

  // Subtle Parallax Effect
 window.addEventListener("scroll", () => {
  const offset = window.scrollY * 0.05; // smaller factor
  hero.style.backgroundPosition = `center ${50 + offset}%`;
});

});

// -------------------- uk section 
// Image gallery interaction
  const hero = document.querySelector(".hero");
  const thumbs = document.querySelectorAll(".thumbs img");
  thumbs.forEach(img => {
    img.addEventListener("click", () => {
      hero.src = img.src;
      thumbs.forEach(t => t.classList.remove("active"));
      img.classList.add("active");
    });
  });

  // Weather for UK
  const apiKey = "775b2d659b6dfc81c1e03ff27814f079"; // Replace with your OpenWeather key
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  // UK fallback weather
  const randomWeather = [
    { city: "London", temp: 18, condition: "Cloudy ☁️", humidity: 65, wind: 10 },
    { city: "Manchester", temp: 16, condition: "Rain 🌧️", humidity: 72, wind: 12 },
    { city: "Birmingham", temp: 17, condition: "Sunny ☀️", humidity: 55, wind: 8 },
    { city: "Liverpool", temp: 15, condition: "Fog 🌫️", humidity: 80, wind: 7 },
    { city: "Edinburgh", temp: 14, condition: "Windy 💨", humidity: 70, wind: 15 }
  ];

  function displayWeather(data) {
    document.getElementById("weather").innerHTML = `
      <div class="weather-main"><i class="fa-solid fa-location-dot"></i> ${data.city} - ${data.condition}</div>
      <div class="weather-temp">${data.temp}°C</div>
      <div class="weather-details"><i class="fa-solid fa-droplet"></i> Humidity: ${data.humidity}% | <i class="fa-solid fa-wind"></i> Wind: ${data.wind} km/h</div>
    `;
  }

  async function fetchWeather(city = "London") {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      if (!response.ok) throw new Error("API error");
      const data = await response.json();

      if (data.cod === "401" || data.cod === 401) throw new Error("Invalid API key");

      displayWeather({
        city: data.name,
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        wind: data.wind.speed,
        condition: data.weather[0].main + " ☁️"
      });
    } catch (error) {
      console.warn("API failed → Showing random UK weather");
      const random = randomWeather[Math.floor(Math.random() * randomWeather.length)];
      displayWeather(random);
    }
  }

  // Load default UK weather on page load
  fetchWeather();


  // Scroll animation
    const cards = document.querySelectorAll('.info-card');
    window.addEventListener('scroll', () => {
      const trigger = window.innerHeight * 0.85;
      cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if(cardTop < trigger){
          card.classList.add('show');
        }
      });
    });


    // top tours 
      // Carousel
    const track = document.getElementById('tourTrack');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.getAttribute('data-index'));
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
      });
    });

    document.addEventListener("scroll", function () {
  const heading = document.querySelector(".tours-section h2");
  const rect = heading.getBoundingClientRect();

  if (rect.top < window.innerHeight - 100) {
    heading.classList.add("show");
  }
});


// ----------------------------------------------------------------------------------------------------

document.addEventListener("scroll", () => {
  const section = document.querySelector(".activity-head");
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    section.classList.add("show");
  }
});


// ---------- Data ----------
    const activities = [
      { id: 'thames-rib', city: 'London, UK', title:'High Speed Thames River RIB Cruise in London', duration:'2 hours', rating:4.8, reviews:215, priceAdult:260, priceChild:180, priceSenior:200, img:'https://media.istockphoto.com/id/452475311/photo/famous-tower-bridge-in-london-england.webp?a=1&b=1&s=612x612&w=0&k=20&c=NFyEEC9b7WhF2LceQYNY8ac-6-LmsTpq7FE0IAdXLxg=' },
      { id: 'stonehenge', city: 'Wiltshire, UK', title:'Stonehenge, Windsor Castle and Bath with Pub', duration:'12+ hours', rating:4.6, reviews:154, priceAdult:520, priceChild:350, priceSenior:420, img:'https://images.unsplash.com/photo-1609998864958-ec0c22c2e24b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFN0b25laGVuZ2UlMkMlMjBXaW5kc29yJTIwQ2FzdGxlJTIwYW5kJTIwQmF0aCUyMHdpdGglMjBQdWJ8ZW58MHx8MHx8fDA%3D' },
      { id: 'edinburgh-dark', city: 'Edinburgh, UK', title:'Edinburgh Darkside Walking Tour', duration:'2.0 hours', rating:4.7, reviews:88, priceAdult:80, priceChild:50, priceSenior:60, img:'https://plus.unsplash.com/premium_photo-1732481078521-e94e84a1a0a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RWRpbmJ1cmdoJTIwRGFya3NpZGUlMjBXYWxraW5nJTIwVG91cnxlbnwwfHwwfHx8MA%3D%3D' },
      { id: 'westminster', city: 'London, UK', title:'Westminster Walking Tour & Abbey Entry', duration:'Full day', rating:4.9, reviews:301, priceAdult:150, priceChild:90, priceSenior:120, img:'https://media.istockphoto.com/id/2173420752/photo/facade-of-westminster-abbey-in-london-uk.webp?a=1&b=1&s=612x612&w=0&k=20&c=xm2NhdKkYJHCnnbiLX1ydP4uZWASUQN2yiPIxivL6fA=' },
    { id:'lake-district', city:'Cumbria, UK', title:'Lake District Scenic Day Tour', duration:'9 hours', rating:4.7, reviews:120, priceAdult:220, priceChild:150, priceSenior:180, img:'https://media.istockphoto.com/id/2197043935/photo/view-on-the-footpath-via-dellamore-in-cinque-terre.webp?a=1&b=1&s=612x612&w=0&k=20&c=0bUQT35wV5dLGZexQQd27wIVt9mTObcthT7RU-PJW1o=' },
  { id:'giants-causeway', city:'Northern Ireland, UK', title:'Giant’s Causeway Tour', duration:'6 hours', rating:4.8, reviews:260, priceAdult:180, priceChild:110, priceSenior:140, img:'https://media.istockphoto.com/id/1125764541/photo/giants-causeway-hexagonal-rock-formation-northern-ireland.webp?a=1&b=1&s=612x612&w=0&k=20&c=4-wDDTa1NtywpXuXMax0RHcuS6Wsat4ZZ4vkw28KjLw=' },
  { id:'windsor', city:'London, UK', title:'Windsor Castle Entry Ticket', duration:'3 hours', rating:4.5, reviews:95, priceAdult:100, priceChild:70, priceSenior:85, img:'https://media.istockphoto.com/id/157434278/photo/st-georges-chapel-windsor-castle.webp?a=1&b=1&s=612x612&w=0&k=20&c=rUT4oHdX9O7PxeKnyDeZzwqjKc119b4aZ6u2baH7Og4=' },
  { id:'stratford', city:'Stratford-upon-Avon, UK', title:'Shakespeare Birthplace & Town Tour', duration:'4 hours', rating:4.6, reviews:130, priceAdult:120, priceChild:80, priceSenior:95, img:'https://images.unsplash.com/photo-1660749488490-eee8990c0b67?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8U2hha2VzcGVhcmUlMjBCaXJ0aHBsYWNlJTIwJTI2JTIwVG93biUyMFRvdXJ8ZW58MHx8MHx8fDA%3D' }

    
    ];

    // ---------- Helpers ----------
    const $$ = (s, r=document) => r.querySelector(s);
    const $$$ = (s, r=document) => Array.from(r.querySelectorAll(s));
    const fmt = n => '$' + n.toFixed(2);

    // ---------- Render Cards ----------
    const cardsEl = $$('#cards');
    cardsEl.innerHTML = activities.map(a => `
      <article class="card" data-id="${a.id}">
        <div class="media">
          <img src="${a.img}" alt="${a.title}">
          <button class="fav" title="Save"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
        </div>
        <div class="content">
          <div class="meta">${a.city}</div>
          <div class="title">${a.title}</div>
          <div class="row">
            <span class="chip">⭐ ${a.rating} · ${a.reviews} reviews</span>
            <span class="chip">⏱ ${a.duration}</span>
          </div>
          <div class="row">
            <div class="price">From ${fmt(a.priceAdult)}</div>
            <button class="btn book">Book</button>
          </div>
        </div>
      </article>
    `).join('');

    // ---------- Favorite toggle ----------
    $$$('.fav').forEach(b=>b.addEventListener('click',e=>{e.currentTarget.classList.toggle('active')}));

    // ---------- Modal logic ----------
    // const bookingModal = $$('#bookingModal');
    // const liveTotal = $$('#liveTotal');
    // const priceLegend = $$('#priceLegend');
    // let currentActivity = null;

    // function openModal(activity){
    //   currentActivity = activity;
    //   $$('#modalTitle').textContent = 'Book – ' + activity.title;
    //   priceLegend.textContent = `Adult: ${fmt(activity.priceAdult)} · Child: ${fmt(activity.priceChild)} · Senior: ${fmt(activity.priceSenior)}`;
    //   $$('#date').value = new Date().toISOString().split('T')[0];
    //   $$('#time').selectedIndex = 1;
    //   $$('#adult').value = 1; $$('#child').value = 0; $$('#senior').value = 0; $$('#notes').value = '';
    //   updateLiveTotal();
    //   bookingModal.classList.add('show');
    //   bookingModal.setAttribute('aria-hidden','false');
    // }
    // function closeModal(){ bookingModal.classList.remove('show'); bookingModal.setAttribute('aria-hidden','true'); }

    // ---------- Modal logic ----------
// ---------- Modal logic ----------
const bookingModal = $$('#bookingModal');
const liveTotal = $$('#liveTotal');
const priceLegend = $$('#priceLegend');
let currentActivity = null;

// Helper to format local date as YYYY-MM-DD
function formatLocalDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // months 0-11
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function openModal(activity){
  currentActivity = activity;
  $$('#modalTitle').textContent = 'Book – ' + activity.title;
  priceLegend.textContent = `Adult: ${fmt(activity.priceAdult)} · Child: ${fmt(activity.priceChild)} · Senior: ${fmt(activity.priceSenior)}`;
  
  // ✅ Get local today
  const today = new Date();
  const localDate = formatLocalDate(today);

  const dateInput = $$('#date');
  dateInput.value = localDate;        // default value
  dateInput.min = localDate;          // prevent past dates

  $$('#time').selectedIndex = 1;
  $$('#adult').value = 1; 
  $$('#child').value = 0; 
  $$('#senior').value = 0; 
  $$('#notes').value = '';
  updateLiveTotal();
  bookingModal.classList.add('show');
  bookingModal.setAttribute('aria-hidden','false');
}

function closeModal(){ 
  bookingModal.classList.remove('show'); 
  bookingModal.setAttribute('aria-hidden','true'); 
}



    function updateLiveTotal(){
      const a = parseInt($$('#adult').value||0), c=parseInt($$('#child').value||0), s=parseInt($$('#senior').value||0);
      const total = a*currentActivity.priceAdult + c*currentActivity.priceChild + s*currentActivity.priceSenior;
      liveTotal.textContent = fmt(total);
      return total;
    }

    // qty buttons
    $$$('.q-inc').forEach(b=>b.addEventListener('click',()=>{ const id=b.dataset.q; const i=$(`#${id}`); i.value = (+i.value||0) + 1; updateLiveTotal(); }));
    $$$('.q-dec').forEach(b=>b.addEventListener('click',()=>{ const id=b.dataset.q; const i=$(`#${id}`); i.value = Math.max(0, (+i.value||0) - 1); updateLiveTotal(); }));
    ;['adult','child','senior'].forEach(id=> $$("#"+id).addEventListener('input', updateLiveTotal));

    // open modal on Book
    $$$('.book').forEach(btn=>btn.addEventListener('click', e=>{
      const id = e.currentTarget.closest('.card').dataset.id;
      const activity = activities.find(x=>x.id===id);
      openModal(activity);
    }));

    $$('#closeModal').addEventListener('click', closeModal);

    // ---------- Cart state ----------
    const cart = [];

    function updateCartBadge(){ $$('#cartCount').textContent = cart.reduce((n,i)=> n + i.qty, 0); }

    function renderCart(){
      const list = $$('#cartItems');
      if(cart.length===0){ list.innerHTML = `<div class="small" style="padding:16px">Your cart is empty. Start by adding an activity! 🧳</div>`; }
      else{
        list.innerHTML = cart.map((it,idx)=>{
          return `
            <div class="cart-item" data-idx="${idx}">
              <img src="${it.img}" alt="${it.title}">
              <div>
                <h4>${it.title}</h4>
                <p>${it.date} • ${it.time} • ${it.adults}A ${it.children}C ${it.seniors}S</p>
                <p class="small">Qty: ${it.qty}</p>
              </div>
              <div style="text-align:right">
                <div class="price">${fmt(it.total * it.qty)}</div>
                <div class="act">
                  <button class="minus">−</button>
                  <button class="plus">+</button>
                  <button class="remove">Remove</button>
                </div>
              </div>
            </div>`;}).join('');
      }

      // bind actions
      $$$('.cart-item .remove', list).forEach(btn=>btn.addEventListener('click', e=>{
        const idx = +e.currentTarget.closest('.cart-item').dataset.idx; cart.splice(idx,1); renderCart(); updateTotals(); updateCartBadge();
      }));
      $$$('.cart-item .plus', list).forEach(btn=>btn.addEventListener('click', e=>{
        const idx = +e.currentTarget.closest('.cart-item').dataset.idx; cart[idx].qty++; renderCart(); updateTotals(); updateCartBadge();
      }));
      $$$('.cart-item .minus', list).forEach(btn=>btn.addEventListener('click', e=>{
        const idx = +e.currentTarget.closest('.cart-item').dataset.idx; cart[idx].qty = Math.max(1, cart[idx].qty-1); renderCart(); updateTotals(); updateCartBadge();
      }));
    }

    function updateTotals(){
      const sub = cart.reduce((s,i)=> s + i.total * i.qty, 0);
      const fees = sub * 0.07; // 7% taxes & service
      const grand = sub + fees;
      $$('#subTotal').textContent = fmt(sub);
      $$('#taxes').textContent = fmt(fees);
      $$('#grandTotal').textContent = fmt(grand);
    }

    // Add to Cart from modal
    $$('#addToCart').addEventListener('click', ()=>{
      if(!currentActivity) return;
      const adults = parseInt($$('#adult').value||0), children=parseInt($$('#child').value||0), seniors=parseInt($$('#senior').value||0);
      if(adults+children+seniors === 0){ alert('Please select at least one participant.'); return; }
      const total = updateLiveTotal();
      const item = {
        id: currentActivity.id,
        title: currentActivity.title,
        img: currentActivity.img,
        date: $$('#date').value,
        time: $$('#time').value,
        adults, children, seniors,
        total,
        qty: 1
      };
      cart.push(item);
      closeModal();
      openCart();
      renderCart(); updateTotals(); updateCartBadge();
    });

    // ---------- Cart drawer ----------
    const drawer = $$('#drawer');
    function openCart(){ drawer.classList.add('open'); }
    function closeCart(){ drawer.classList.remove('open'); }
    $$('#openCart').addEventListener('click', ()=>{ openCart(); renderCart(); });
    $$('#closeCart').addEventListener('click', closeCart);

    // Checkout
    $$('#checkout').addEventListener('click', ()=>{
      if(cart.length===0) { alert('Your cart is empty.'); return; }
      const summary = cart.map((i,idx)=>`#${idx+1} ${i.title}\n  Date: ${i.date} @ ${i.time}\n  Pax: ${i.adults}A ${i.children}C ${i.seniors}S\n  Line Total: ${fmt(i.total*i.qty)}`).join('\n\n');
      const grand = $$('#grandTotal').textContent;
      alert(`Thank you! Your booking summary:\n\n${summary}\n\nGrand Total: ${grand}`);
      cart.length = 0; renderCart(); updateTotals(); updateCartBadge(); closeCart();
    });

    // Close modal with backdrop click
    bookingModal.addEventListener('click', (e)=>{ if(e.target===bookingModal) closeModal(); });

    // Small helper for older browsers
    function $(sel){ return document.querySelector(sel); }


