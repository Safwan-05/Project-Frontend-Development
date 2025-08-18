

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


