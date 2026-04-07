/* ============================================================
   CGP Website — Main JS
   ============================================================ */

'use strict';

/* ---------- Navbar scroll behavior ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.remove('transparent');
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.add('transparent');
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ---------- Mobile Menu ---------- */
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu   = document.getElementById('mobileMenu');
const mobileClose  = document.getElementById('mobileClose');

mobileToggle?.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose?.addEventListener('click', () => mobileMenu.classList.remove('open'));
mobileMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ---------- Language Toggle ---------- */
const langToggle = document.getElementById('langToggle');
let   currentLang = 'EN';
langToggle?.addEventListener('click', () => {
  currentLang = currentLang === 'EN' ? 'ID' : 'EN';
  langToggle.innerHTML = currentLang === 'EN'
    ? '<span class="active">EN</span> / ID'
    : 'EN / <span class="active">ID</span>';
});

/* ---------- Portfolio Tabs ---------- */
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b   => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(`tab-${target}`)?.classList.add('active');
  });
});

/* ---------- Modal ---------- */
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose    = document.getElementById('modalClose');
const modalTitle    = document.getElementById('modalTitle');
const modalImg      = document.getElementById('modalImg');
const modalOrigin   = document.getElementById('modalOrigin');
const modalCategory = document.getElementById('modalCategory');
const modalDesc     = document.getElementById('modalDesc');
const modalProducts = document.getElementById('modalProducts');

const brandData = {
  leggos: {
    name: "Leggo's",
    origin: "Australia",
    category: "Sauces & Pastes",
    img: "assets/images/brands/leggos-product.jpg",
    desc: "Leggo's is one of Australia's most trusted pasta sauce brands with over 100 years of heritage. CGP is the exclusive distributor for the Indonesian market, offering the full range of pasta sauces, passata, and crushed tomatoes.",
    products: ["Passata Sauce — Italian Herbs & Basil 700g", "Crushed Tomatoes 2.9kg", "Tomato Pasta Sauce 500g", "Bolognese Sauce 500g"]
  },
  kanokwan: {
    name: "Kanokwan",
    origin: "Thailand",
    category: "Sauces & Pastes",
    img: "assets/images/brands/kanokwan-product.jpg",
    desc: "Kanokwan is Thailand's premier brand of authentic curry pastes and cooking sauces, trusted by professional chefs and home cooks across Asia. CGP distributes the full Thai culinary range across Indonesia.",
    products: ["Red Curry Paste 50g", "Green Curry Paste 50g", "Tom Yum Paste 30g", "Massaman Curry Paste 50g", "Pad Thai Paste 72g", "Holy Basil Sauce 200g", "All Purpose Stir Fry Sauce 200g"]
  },
  ccs: {
    name: "CC's",
    origin: "Australia",
    category: "Snacks",
    img: "assets/images/brands/ccs-product.jpg",
    desc: "CC's corn chips by Snackbrands Australia are a market-leading snack brand known for their bold, authentic flavours. CGP brings the iconic range to premium Indonesian retail channels.",
    products: ["Original Corn Chips", "Nacho Cheese", "Tasty Cheese", "BBQ"]
  },
  edgell: {
    name: "Edgell",
    origin: "Australia",
    category: "Canned Goods",
    img: "assets/images/brands/edgell-product.jpg",
    desc: "Edgell is Australia's leading brand of canned and frozen vegetables — a staple in professional kitchens and premium households for over 80 years. The full canned vegetable range is distributed by CGP across Indonesia.",
    products: ["Corn Kernels", "Four Bean Mix", "Red Kidney Beans", "Sliced Beetroot", "Chickpeas"]
  },
  johnwest: {
    name: "John West",
    origin: "Australia",
    category: "Canned Goods",
    img: "assets/images/brands/johnwest-product.jpg",
    desc: "John West is an iconic Australian seafood brand with a rich heritage in sustainable, premium-quality canned tuna and salmon. CGP distributes the range to modern retail and food service channels in Indonesia.",
    products: ["Tuna in Springwater", "Tuna in Oil", "Salmon Red", "Salmon Pink", "Tuna in Sweet Chilli"]
  },
  manuka: {
    name: "Barnes Naturals",
    origin: "Australia",
    category: "Wellness & Health",
    img: "assets/images/brands/manuka-product.jpg",
    desc: "Barnes Naturals offers premium Australian Manuka honey and Apple Cider Vinegar products — a growing segment in Indonesia's premium health and wellness retail sector.",
    products: ["Manuka Honey MGO 100+", "Manuka Honey MGO 250+", "Apple Cider Vinegar with Manuka Honey", "Raw Apple Cider Vinegar 750ml"]
  },
  oho: {
    name: "Oho",
    origin: "Australia",
    category: "Snacks",
    img: null,
    desc: "Oho is a healthy snack brand offering a range of roasted nuts and trail mixes positioned for the premium convenience channel.",
    products: ["Roasted Mixed Nuts", "Trail Mix", "Salted Cashews", "Honey Roasted Almonds"]
  },
  fnv: {
    name: "FNV",
    origin: "Australia",
    category: "Canned Goods",
    img: null,
    desc: "FNV is a value-tier canned vegetable range offering quality produce for the food service sector and premium supermarkets.",
    products: ["Canned Corn", "Canned Green Peas", "Canned Tomatoes"]
  },
  namxanh: {
    name: "Nam Xanh",
    origin: "Vietnam",
    category: "Sauces & Pastes",
    img: null,
    desc: "Nam Xanh brings authentic Vietnamese culinary heritage to Indonesian kitchens — featuring fermented sauces, chilli blends, and traditional condiments.",
    products: ["Fish Sauce", "Hoisin Sauce", "Chilli Sauce", "Soy Sauce"]
  },
  sohatea: {
    name: "Soha Tea",
    origin: "Vietnam",
    category: "Wellness & Health",
    img: null,
    desc: "Soha Tea is a premium Vietnamese herbal tea brand distributed through specialty and premium retail channels across Indonesia.",
    products: ["Green Tea", "Jasmine Tea", "Lotus Tea", "Artichoke Tea"]
  },
  missvietspice: {
    name: "Miss Vietspice",
    origin: "Vietnam",
    category: "Sauces & Pastes",
    img: null,
    desc: "Miss Vietspice is a premium Vietnamese spice and condiment brand bringing authentic Southeast Asian flavour profiles to retail and food service.",
    products: ["Pho Spice Mix", "Lemongrass Paste", "Vietnamese Curry Powder", "Banh Mi Sauce"]
  },
  stonbarn: {
    name: "Stonbarn",
    origin: "Australia",
    category: "Wellness & Health",
    img: null,
    desc: "Stonbarn is an Australian brand of premium honey and natural pantry staples, distributed across modern trade channels in Indonesia.",
    products: ["Pure Clover Honey", "Raw Wildflower Honey", "Creamed Honey"]
  }
};

const categoryData = {
  sauces: {
    name: "Sauces & Pastes",
    img: "assets/images/brands/kanokwan-header.jpg",
    desc: "From Thai curry pastes to Italian tomato sauces, our portfolio covers the full spectrum of premium cooking sauces and pastes.",
    products: ["Kanokwan — Full Thai Paste Range", "Leggo's — Italian Pasta Sauces", "Nam Xanh — Vietnamese Condiments", "Miss Vietspice — Southeast Asian Spices"]
  },
  canned: {
    name: "Canned Goods",
    img: "assets/images/brands/edgell-product.jpg",
    desc: "Premium canned vegetables and seafood from trusted Australian brands — serving modern retail and food service channels.",
    products: ["Edgell — Canned Vegetables", "John West — Canned Tuna & Salmon", "FNV — Canned Produce Range"]
  },
  snacks: {
    name: "Snacks",
    img: "assets/images/brands/ccs-product.jpg",
    desc: "Market-leading Australian snack brands — positioned for premium retail, modern trade, and food service.",
    products: ["CC's by Snackbrands — Corn Chips Range", "Oho — Roasted Nuts & Trail Mixes"]
  },
  wellness: {
    name: "Wellness & Health",
    img: "assets/images/brands/manuka-product.jpg",
    desc: "A curated selection of premium wellness products including Manuka honey, apple cider vinegar, and herbal teas — catering to Indonesia's fast-growing health consumer segment.",
    products: ["Barnes Naturals — Manuka Honey & ACV", "Stonbarn — Premium Australian Honey", "Soha Tea — Vietnamese Herbal Teas"]
  }
};

function openModal(data) {
  modalTitle.textContent = data.name;
  modalOrigin.textContent = data.origin || '';
  modalCategory.textContent = data.category || '';
  modalDesc.textContent = data.desc || '';

  if (data.img) {
    modalImg.src = data.img;
    modalImg.style.display = 'block';
  } else {
    modalImg.style.display = 'none';
  }

  modalProducts.innerHTML = '';
  (data.products || []).forEach(p => {
    const li = document.createElement('li');
    li.textContent = p;
    modalProducts.appendChild(li);
  });

  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-modal]').forEach(el => {
  el.addEventListener('click', () => {
    const key = el.dataset.modal;
    const data = brandData[key] || categoryData[key];
    if (data) openModal(data);
  });
});

modalClose?.addEventListener('click', closeModal);
modalBackdrop?.addEventListener('click', e => {
  if (e.target === modalBackdrop) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ---------- Partner Carousel ---------- */
const partnerSlides   = document.querySelectorAll('.partner-slide');
const partnerDots     = document.querySelectorAll('.carousel-dot');
const partnerPrev     = document.getElementById('partnerPrev');
const partnerNext     = document.getElementById('partnerNext');
const progressBar     = document.getElementById('carouselProgress');

let currentSlide      = 0;
let carouselTimer     = null;
let progressTimer     = null;
let progressWidth     = 0;
const AUTO_INTERVAL   = 5000; // ms per slide
const PROGRESS_STEP   = 100 / (AUTO_INTERVAL / 60); // % per ~60ms frame

function goToSlide(index) {
  partnerSlides[currentSlide].classList.remove('active');
  partnerDots[currentSlide].classList.remove('active');

  currentSlide = (index + partnerSlides.length) % partnerSlides.length;

  partnerSlides[currentSlide].classList.add('active');
  partnerDots[currentSlide].classList.add('active');

  resetProgress();
}

function resetProgress() {
  progressWidth = 0;
  if (progressBar) progressBar.style.width = '0%';
  clearInterval(progressTimer);
  progressTimer = setInterval(() => {
    progressWidth = Math.min(progressWidth + PROGRESS_STEP, 100);
    if (progressBar) progressBar.style.width = progressWidth + '%';
    if (progressWidth >= 100) {
      clearInterval(progressTimer);
    }
  }, 60);
}

function startAutoPlay() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => goToSlide(currentSlide + 1), AUTO_INTERVAL);
}

if (partnerSlides.length) {
  partnerPrev?.addEventListener('click', () => { goToSlide(currentSlide - 1); startAutoPlay(); });
  partnerNext?.addEventListener('click', () => { goToSlide(currentSlide + 1); startAutoPlay(); });
  partnerDots.forEach(dot => {
    dot.addEventListener('click', () => { goToSlide(parseInt(dot.dataset.slide)); startAutoPlay(); });
  });

  // Pause on hover
  document.querySelector('.partner-carousel')?.addEventListener('mouseenter', () => {
    clearInterval(carouselTimer);
    clearInterval(progressTimer);
  });
  document.querySelector('.partner-carousel')?.addEventListener('mouseleave', () => {
    startAutoPlay();
    resetProgress();
  });

  // Start
  startAutoPlay();
  resetProgress();
}

/* ---------- Scroll Reveal ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Contact Form ---------- */
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = contactForm.querySelector('.btn-submit');
  btn.textContent = 'Message Sent ✓';
  btn.style.background = '#2a7a4b';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Send Inquiry';
    btn.style.background = '';
    btn.disabled = false;
    contactForm.reset();
  }, 4000);
});

/* ---------- Stat counter animation ---------- */
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.stat-number[data-target]').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1600;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = el.dataset.prefix + Math.floor(current) + el.dataset.suffix;
        if (current >= target) clearInterval(timer);
      }, 16);
    });
    statObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

const statsSection = document.getElementById('stats');
if (statsSection) statObserver.observe(statsSection);

/* ---------- Init ---------- */
navbar.classList.add('transparent');
