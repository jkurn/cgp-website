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
  // Re-render modal product list if a modal is open
  if (currentModalData) renderModalProducts(currentModalData);
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

/* Product names support { en, id } objects — rendered per currentLang.
   Strings are kept for category brand-roll-ups (language-neutral). */
const brandData = {
  leggos: {
    name: "Leggo's",
    origin: "Australia",
    category: "Sauces & Pastes",
    img: "assets/images/brands/leggos-product.jpg",
    desc: "Leggo's is one of Australia's most trusted pasta sauce brands with over 100 years of heritage. CGP is the exclusive distributor for the Indonesian market, offering the full range of pasta sauces, passata, and crushed tomatoes.",
    products: [
      { en: "Alfredo with Fresh Cream & Cheese Pasta Sauce", id: "Saus Pasta Alfredo dengan Krim dan Keju" },
      { en: "Lasagne Bechamel Cheese Sauce", id: "Saus Bechamel untuk Lasagna" },
      { en: "Bolognese with Chunky Tomato, Garlic & Herbs Pasta Sauce", id: "Saus Pasta Bolognese" },
      { en: "Carbonara with Fresh Cream, Onion & Cheese Paste Sauce", id: "Saus Pasta Carbonara dengan Krim, Bawang Bombay, dan Keju" },
      { en: "Pasta Bake with Creamy Tomato & Mozzarella", id: "Saus Pasta Panggang dengan Krim, Tomat, dan Mozzarella" },
      { en: "Napoletana with Chunky Tomato & Herbs Pasta Sauce", id: "Saus Pasta Napoletana" },
      { en: "Passata Sauce Italian Herbs with Basil and Parsley", id: "Saus Pasta Italia dengan Basil dan Parsley" },
      { en: "Sauce Passata Classic", id: "Saus Tomat Klasik" },
      { en: "Pesto Basil", id: "Saus Kemangi" },
      { en: "Puree Tomat", id: "Puree Tomat" },
      { en: "Pasta Bake with Tomato, Ricotta & Spinach", id: "Saus Panggang dengan Tomat, Ricotta, dan Bayam" },
      { en: "Roasted Garlic with Chunky Tomato & Onion Pasta Sauce", id: "Saus Pasta dengan Bawang Putih Panggang, Tomat, dan Bawang Bombay" },
      { en: "Stir Through Tomato, Olive & Chilli", id: "Saus Tomat dengan Campuran Zaitun, dan Cabai" },
      { en: "Pasta Bake with Three Cheese Sauce", id: "Saus Putih untuk Pasta Panggang dengan Keju" },
      { en: "Crushed Tomatoes", id: "Tomat Cincang" },
      { en: "Tomato Paste", id: "Pasta Tomat" },
      { en: "Sauce for Tuna Bake with Spinach & Garlic", id: "Saus Pasta Panggang untuk Tuna dengan Bayam & Bawang Putih" },
      { en: "Bolognese with Bacon, Chunky Tomato & Herbs Pasta Sauce", id: "Saus Pasta Bolognese dengan Daging Babi" },
      { en: "Classic Herb Sauce", id: "Saus Tomat Klasik (Herb)" }
    ]
  },
  kanokwan: {
    name: "Kanokwan",
    origin: "Thailand",
    category: "Sauces & Pastes",
    img: "assets/images/brands/kanokwan-product.jpg",
    desc: "Kanokwan is Thailand's premier brand of authentic curry pastes and cooking sauces, trusted by professional chefs and home cooks across Asia. CGP distributes the full Thai culinary range across Indonesia.",
    products: [
      { en: "All Purpose Stir Fry Sauce", id: "Saus Bumbu Tumis" },
      { en: "Aromatic Grill Chicken Seasoning Mix", id: "Bumbu Ayam Panggang" },
      { en: "Green Curry Paste", id: "Bumbu Pasta Kari Hijau" },
      { en: "Holy Basil Sauce", id: "Saus Bumbu Basil" },
      { en: "Thai Eastern Style Soup Concentrate (Jaew Hon)", id: "Bumbu Kari Jaew Hon" },
      { en: "Korean BBQ Sauce", id: "Saus BBQ" },
      { en: "Kua Kling Stir Fry Curry Sauce", id: "Bumbu Rasa Kari" },
      { en: "Massaman Curry Paste", id: "Pasta Bumbu Kari" },
      { en: "Oriental Braised Beef Seasoning Paste", id: "Bumbu Pasta Daging" },
      { en: "Pad Thai Paste", id: "Bumbu Pasta" },
      { en: "Panang Curry Paste", id: "Bumbu Kari Panang Pasta" },
      { en: "Red Curry Paste", id: "Bumbu Pasta Kari Merah" },
      { en: "Japanese Style Sukiyaki Soup", id: "Bumbu Sukiyaki ala Jepang" },
      { en: "Tom Kha Paste", id: "Bumbu Pasta Tom Kha" },
      { en: "Tom Yum Paste", id: "Bumbu Pasta Tom Yum" },
      { en: "Yellow Curry Paste", id: "Bumbu Pasta Kari Kuning" }
    ]
  },
  edgell: {
    name: "Edgell",
    origin: "Australia",
    category: "Canned Goods",
    img: "assets/images/brands/edgell-product.jpg",
    desc: "Edgell is Australia's leading brand of canned and frozen vegetables — a staple in professional kitchens and premium households for over 80 years. The full canned vegetable range is distributed by CGP across Indonesia.",
    products: [
      { en: "Red Kidney Beans", id: "Kacang Merah dalam Kaleng" },
      { en: "Corn Kernels", id: "Jagung dalam Kaleng" },
      { en: "Four Beans Mix", id: "Campuran Kacang dalam Kaleng" },
      { en: "Sliced Beetroot", id: "Irisan Bit dalam Larutan Gula dan Garam" }
    ]
  },
  johnwest: {
    name: "John West",
    origin: "Australia",
    category: "Canned Goods",
    img: "assets/images/brands/johnwest-product.jpg",
    desc: "John West is an iconic Australian seafood brand with a rich heritage in sustainable, premium-quality canned tuna and salmon. CGP distributes the range to modern retail and food service channels in Indonesia.",
    products: [
      { en: "Anchovies Fillets in Olive Oil", id: "Ikan Teri dalam Minyak Zaitun" },
      { en: "Salmon Chilli", id: "Salmon dalam Saus Cabe" },
      { en: "Salmon Lemon & Cracked Pepper", id: "Salmon dengan campuran Lemon & Lada" },
      { en: "Salmon Lime, Ginger, & Chilli", id: "Salmon dengan campuran Jeruk Nipis, Jahe, & Cabe" },
      { en: "Salmon Olive Oil Blend", id: "Salmon dengan campuran Minyak Zaitun" },
      { en: "Salmon Slice in Springwater", id: "Irisan Salmon" },
      { en: "Salmon Sliced Smoked", id: "Irisan Salmon Asap" },
      { en: "Salmon Springwater", id: "Salmon dalam Kaleng" },
      { en: "Salmon Teriyaki", id: "Salmon Teriyaki" },
      { en: "Tuna with Brown & Red Rice, Lime, Lemongrass & Chickpeas", id: "Tuna dengan campuran Beras Coklat & Merah, dan Kacang Arab" },
      { en: "Tuna with Capsicum, Sweetcorn, Chilli & Red Kidney Bean Mix", id: "Tuna dengan campuran Paprika, Jagung Manis, dan Kacang Merah" }
    ]
  },
  manuka: {
    name: "Barnes Naturals",
    origin: "Australia",
    category: "Wellness & Health",
    img: "assets/images/brands/manuka-product.jpg",
    desc: "Barnes Naturals offers premium Australian Manuka honey and Apple Cider Vinegar products — a growing segment in Indonesia's premium health and wellness retail sector.",
    products: [
      { en: "Apple Cider Vinegar with Turmeric, Ginger, Moringa Leaf and Honey", id: "Cuka Apel dengan Kunyit, Jahe, Daun Kelor dan Madu" },
      { en: "Apple Cider Vinegar", id: "Cuka Apel" },
      { en: "Manuka Honey", id: "Madu Manuka" },
      { en: "Pure Australian Honey", id: "Madu Australia Murni" }
    ]
  },
  oho: {
    name: "oho!",
    origin: "Australia",
    category: "Snacks",
    img: null,
    desc: "oho! is a contemporary Australian snack brand producing extruded lentil chips in bold flavours — a premium, better-for-you snack for the modern trade and specialty grocery channels.",
    products: [
      { en: "Lentil Chips Cheddar Cheese Taste", id: "Makanan Ringan Ekstrudat Stik Lentil Rasa Keju" },
      { en: "Lentil Chips Maple Bacon Taste", id: "Makanan Ringan Ekstrudat Stik Lentil Rasa Maple Bacon" },
      { en: "Lentil Chips Sour Cream and Onion Taste", id: "Makanan Ringan Ekstrudat Stik Lentil Rasa Krim Asam dan Bawang Bombay" },
      { en: "Lentil Chips with Lime and Jalapeno Taste", id: "Makanan Ringan Ekstrudat Stik Lentil Rasa Jeruk Nipis dan Jalapeno" }
    ]
  },
  fnv: {
    name: "FNV",
    origin: "Australia",
    category: "Snacks",
    img: null,
    desc: "FNV produces premium wholegrain snack bars combining brown rice with nuts, seaweed, and protein — a better-for-you snack brand for the premium convenience and specialty grocery channel.",
    products: [
      { en: "Seaweed Walnut Brown Rice Bar", id: "Makanan Ringan Berbentuk Bar dengan Campuran Rumput Laut, Kacang Kenari dan Beras Merah" },
      { en: "Almond Brown Rice Bar with Pork Floss", id: "Makanan Ringan Berbentuk Bar dengan Kacang Almond, Beras Merah, dan Abon Babi" },
      { en: "Boat Cake and Nutritional Nuts", id: "Makanan Ringan Berbentuk Bar dengan Campuran aneka Kacang" },
      { en: "Seaweed Chicken Breast Brown Rice Bar", id: "Makanan Ringan Berbentuk Bar dengan Campuran Rumput Laut, Dada Ayam, dan Beras Merah" }
    ]
  },
  namxanh: {
    name: "Nam Xanh",
    origin: "Vietnam",
    category: "Snacks",
    img: null,
    desc: "Nam Xanh brings authentic Vietnamese confectionery to Indonesian kitchens — artisanal lotus seeds, pomelo peels, and candied ginger that blend traditional craft with modern snacking.",
    products: [
      { en: "Pomelo Peels Coated With Paprika Chili", id: "Kulit Buah Bersalut Paprika" },
      { en: "Pomelo Peels Coated With Pickled Apricots", id: "Kulit Buah Bersalut Pikel Aprikot" },
      { en: "Grilled Ginger With Honey", id: "Irisan Jahe dengan Madu" },
      { en: "Lotus Seeds Coated With Ginger and Honey", id: "Biji Teratai dengan Jahe dan Madu" },
      { en: "Lotus Seeds Coated With Coconut and Honey", id: "Biji Teratai dengan Kelapa dan Madu" },
      { en: "Dried Lotus Seeds", id: "Biji Teratai Kering" },
      { en: "Mango Spring Roll", id: "Makanan Pencuci Mulut Berbasis Buah Mangga" }
    ]
  },
  missvietspice: {
    name: "Miss Vietspice",
    origin: "Vietnam",
    category: "Sauces & Pastes",
    img: null,
    desc: "Miss Vietspice is a premium Vietnamese seasoning brand bringing authentic Southeast Asian flavour profiles — marinades, ragouts, and curry blends — to retail and food service.",
    products: [
      { en: "BBQ Seasoning", id: "Bumbu BBQ" },
      { en: "Beef Ragout Seasoning", id: "Bumbu Ragout Sapi" },
      { en: "Seasoning of Braised Chicken with Chilli and Lemongrass", id: "Bumbu Marinasi Ayam dengan Cabe dan Sereh" },
      { en: "Seasoning of Braised Fish with Turmeric", id: "Bumbu Marinasi Ikan dengan Kunyit" },
      { en: "Bun Bo Seasoning", id: "Bumbu Bun Bo" },
      { en: "Japanese Curry Seasoning", id: "Bumbu Kari Jepang" }
    ]
  }
};

const categoryData = {
  sauces: {
    name: "Sauces & Pastes",
    img: "assets/images/brands/kanokwan-header.jpg",
    desc: "From Thai curry pastes to Italian tomato sauces, our portfolio covers the full spectrum of premium cooking sauces and pastes.",
    products: ["Leggo's — Italian Pasta Sauces & Passata", "Kanokwan — Full Thai Paste & Sauce Range", "Miss Vietspice — Vietnamese Seasoning Blends"]
  },
  canned: {
    name: "Canned Goods",
    img: "assets/images/brands/edgell-product.jpg",
    desc: "Premium canned vegetables and seafood from trusted Australian brands — serving modern retail and food service channels.",
    products: ["Edgell — Canned Vegetables & Beans", "John West — Canned Tuna, Salmon & Anchovies"]
  },
  snacks: {
    name: "Snacks",
    img: "assets/images/brands/edgell-product.jpg",
    desc: "Better-for-you snack brands — lentil chips, brown rice bars, and Vietnamese confectionery — positioned for premium retail and specialty grocery.",
    products: ["oho! — Lentil Chips", "FNV — Brown Rice Snack Bars", "Nam Xanh — Vietnamese Confectionery"]
  },
  wellness: {
    name: "Wellness & Health",
    img: "assets/images/brands/manuka-product.jpg",
    desc: "Premium wellness products — Manuka honey and apple cider vinegar — catering to Indonesia's fast-growing health consumer segment.",
    products: ["Barnes Naturals — Manuka Honey, ACV & Pure Australian Honey"]
  }
};

let currentModalData = null;

function renderModalProducts(data) {
  modalProducts.innerHTML = '';
  (data.products || []).forEach(p => {
    const li = document.createElement('li');
    if (typeof p === 'string') {
      // Category roll-ups stay language-neutral
      li.textContent = p;
    } else {
      li.textContent = currentLang === 'ID' ? (p.id || p.en) : (p.en || p.id);
    }
    modalProducts.appendChild(li);
  });
}

function openModal(data) {
  currentModalData = data;
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

  renderModalProducts(data);

  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalBackdrop.classList.remove('open');
  document.body.style.overflow = '';
  currentModalData = null;
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
  const next = (index + partnerSlides.length) % partnerSlides.length;
  if (next === currentSlide) return;

  partnerSlides[currentSlide].classList.remove('active');
  partnerDots[currentSlide].classList.remove('active');

  currentSlide = next;

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
}, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Contact Form (FormSubmit AJAX) ---------- */
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = contactForm.querySelector('.btn-submit');
  const originalText = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    const res = await fetch('https://formsubmit.co/ajax/info@cgp.co.id', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(contactForm)
    });
    const data = await res.json();

    const isSuccess    = data.success === 'true' || data.success === true;
    // FormSubmit sends an activation email on first use — treat as success
    const isActivation = !isSuccess && typeof data.message === 'string' &&
                         data.message.toLowerCase().includes('activation');

    if (isSuccess || isActivation) {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#2a7a4b';
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 5000);
    } else {
      throw new Error(data.message || 'Submission failed');
    }
  } catch (err) {
    console.error('[CGP Form]', err.message);
    btn.textContent = 'Failed — Please Try Again';
    btn.style.background = '#8b1a1a';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  }
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
