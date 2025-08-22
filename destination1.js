

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


// small JS for guests, date, entrance animation & auto-suggestions for srch bar
(function () {
    const guestCountEl = document.getElementById('guestCount');
    const inc = document.getElementById('guestInc');
    const dec = document.getElementById('guestDec');
    let guests = 1;

    inc.addEventListener('click', () => {
        guests = Math.min(20, guests + 1);
        guestCountEl.textContent = guests;
    });
    dec.addEventListener('click', () => {
        guests = Math.max(1, guests - 1);
        guestCountEl.textContent = guests;
    });

    // set date min to today
    const dateInput = document.getElementById('date');
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;

    // default to 2 weeks from today
    const d2 = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 14);
    dateInput.value = `${d2.getFullYear()}-${String(d2.getMonth()+1).padStart(2,'0')}-${String(d2.getDate()).padStart(2,'0')}`;

    // Animate card entrance
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // 🔹 Destination Auto-suggestions
const destinationInput = document.getElementById('destination');
const suggestions = ["Paris", "New York", "London", "Dubai", "Tokyo", "Bali", "Istanbul", "Rome", "Cairo"];

const suggestionBox = document.createElement("ul");
suggestionBox.style.position = "absolute";
suggestionBox.style.background = "#fff";
suggestionBox.style.border = "1px solid #ddd";
suggestionBox.style.borderTop = "none";
suggestionBox.style.marginTop = "2px";
suggestionBox.style.borderRadius = "0 0 6px 6px";
suggestionBox.style.maxHeight = "160px";
suggestionBox.style.overflowY = "auto";
suggestionBox.style.listStyle = "none";
suggestionBox.style.padding = "4px 0";
suggestionBox.style.display = "none";
suggestionBox.style.zIndex = "999";

/* 👉 match width of input dynamically */
function updateSuggestionWidth() {
    suggestionBox.style.width = destinationInput.offsetWidth + "px";
}
updateSuggestionWidth();
window.addEventListener("resize", updateSuggestionWidth);

destinationInput.parentNode.style.position = "relative";
destinationInput.parentNode.appendChild(suggestionBox);


    destinationInput.addEventListener("input", () => {
        const val = destinationInput.value.toLowerCase();
        suggestionBox.innerHTML = "";
        if (val) {
            const filtered = suggestions.filter(item => item.toLowerCase().includes(val));
            if (filtered.length > 0) {
                suggestionBox.style.display = "block";
                filtered.forEach(item => {
                    const li = document.createElement("li");
                    li.textContent = item;
                    li.style.padding = "6px 10px";
                    li.style.cursor = "pointer";
                    li.addEventListener("click", () => {
                        destinationInput.value = item;
                        suggestionBox.style.display = "none";
                    });
                    suggestionBox.appendChild(li);
                });
            } else {
                suggestionBox.style.display = "none";
            }
        } else {
            suggestionBox.style.display = "none";
        }
    });

    // search handling
    window.doSearch = function () {
        const dest = document.getElementById('destination').value || '(any)';
        const type = document.getElementById('type').value || '(any)';
        const when = document.getElementById('date').value;
        console.log('Search ->', { destination: dest, type: type, when: when, guests });
        const btn = document.querySelector('.search-btn');
        btn.animate([{ transform: 'scale(1)' }, { transform: 'scale(.95)' }, { transform: 'scale(1)' }], { duration: 200 });
        alert(`Searching:\nDestination: ${dest}\nType: ${type}\nWhen: ${when}\nGuests: ${guests}`);
    };
})();

//  --------------- top destinations
const carousel = document.getElementById('tdScroll');
const prevBtn = document.querySelector('.td-btn.prev');
const nextBtn = document.querySelector('.td-btn.next');

// Take all cards and group into pages of 8
const allCards = Array.from(carousel.children);
carousel.innerHTML = ''; // clear

const cardsPerPage = 8;
for (let i = 0; i < allCards.length; i += cardsPerPage) {
  const page = document.createElement('div');
  page.classList.add('td-page');
  allCards.slice(i, i + cardsPerPage).forEach(card => page.appendChild(card));
  carousel.appendChild(page);
}

let currentPage = 0;
const totalPages = carousel.children.length;

function updateCarousel() {
  carousel.style.transform = `translateX(-${currentPage * 100}%)`;
}

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages - 1) {
    currentPage++;
    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    updateCarousel();
  }
});

// Animate cards on scroll
const pages = document.querySelectorAll('.td-page');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.td-card');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('reveal');
        }, i * 150); // stagger by 150ms
      });
      observer.unobserve(entry.target); // run once
    }
  });
}, { threshold: 0.2 }); // trigger when 20% visible

pages.forEach(page => observer.observe(page));


