let currentIndex = 0;
const texts = document.querySelectorAll('.testimonial-text');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  texts.forEach(txt => txt.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  texts[index].classList.add('active');
  dots[index].classList.add('active');
}

// Auto change every 3 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % texts.length;
  showSlide(currentIndex);
}, 3000);

// Initial display
showSlide(currentIndex);