// ====== CART SYSTEM ======
let cart = [];

function updateCartUI() {
  const countEl = document.getElementById('cart-count');
  const listEl = document.getElementById('cart-list');
  const emptyEl = document.getElementById('cart-empty');
  const footerEl = document.getElementById('cart-footer');
  const totalEl = document.getElementById('cart-total');
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  if (totalItems > 0) {
    countEl.classList.remove('hidden');
    countEl.textContent = totalItems;
    countEl.style.animation = 'none';
    countEl.offsetHeight;
    countEl.style.animation = 'bump 300ms ease';
    emptyEl.classList.add('hidden');
    listEl.classList.remove('hidden');
    footerEl.classList.remove('hidden');
    listEl.innerHTML = cart.map((item, i) => `
      <div class="flex gap-4 items-start">
        <div class="w-20 h-24 bg-neutral-100 rounded-lg flex-shrink-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=160&h=192&fit=crop" class="w-full h-full object-cover" alt="${item.name}" />
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-[13px] font-medium tracking-tight truncate">${item.name}</h4>
          <p class="text-[13px] text-neutral-400 mt-0.5">$${item.price}</p>
          <div class="flex items-center gap-3 mt-3">
            <button onclick="changeQty(${i},-1)" class="w-7 h-7 border border-neutral-200 rounded-lg flex items-center justify-center text-xs hover:border-neutral-400 transition-colors">−</button>
            <span class="text-[13px] font-medium w-4 text-center">${item.qty}</span>
            <button onclick="changeQty(${i},1)" class="w-7 h-7 border border-neutral-200 rounded-lg flex items-center justify-center text-xs hover:border-neutral-400 transition-colors">+</button>
          </div>
        </div>
        <button onclick="removeFromCart(${i})" class="text-neutral-300 hover:text-neutral-900 transition-colors mt-1">
          <span class="iconify" data-icon="lucide:x" data-width="15"></span>
        </button>
      </div>
    `).join('');
    totalEl.textContent = `$${totalPrice}`;
  } else {
    countEl.classList.add('hidden');
    emptyEl.classList.remove('hidden');
    listEl.classList.add('hidden');
    footerEl.classList.add('hidden');
  }
}

function addToCart(name, price, img) {
  const existing = cart.find(i => i.name === name);
  if (existing) existing.qty++; else cart.push({ name, price, img, qty: 1 });
  updateCartUI();
  showToast(`${name} added to bag`);
}

function changeQty(i, d) { cart[i].qty += d; if (cart[i].qty <= 0) cart.splice(i, 1); updateCartUI(); }
function removeFromCart(i) { const n = cart[i].name; cart.splice(i, 1); updateCartUI(); showToast(`${n} removed`); }

// ====== TOAST ======
function showToast(msg) {
  const c = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = 'toast-in bg-neutral-900 text-white px-5 py-3.5 flex items-center gap-3 shadow-xl rounded-xl';
  t.innerHTML = `<span class="iconify text-green-400" data-icon="lucide:check-circle" data-width="16"></span><span class="text-[13px] font-light">${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => { t.classList.remove('toast-in'); t.classList.add('toast-out'); setTimeout(() => t.remove(), 400); }, 2500);
}

// ====== CART DRAWER ======
const cartBtn = document.getElementById('cart-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartShopLink = document.getElementById('cart-shop-link');

function openCart() { cartOverlay.style.display = 'block'; setTimeout(() => cartDrawer.style.transform = 'translateX(0)', 10); }
function closeCartFn() { cartDrawer.style.transform = 'translateX(100%)'; setTimeout(() => cartOverlay.style.display = 'none', 500); }
cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCartFn);
cartOverlay.addEventListener('click', closeCartFn);
cartShopLink.addEventListener('click', closeCartFn);

// ====== MOBILE MENU ======
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuBtn = document.getElementById('close-menu');
menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
closeMenuBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ====== SEARCH ======
const searchBtn = document.getElementById('search-btn');
const searchOverlay = document.getElementById('search-overlay');
const closeSearch = document.getElementById('close-search');
const searchInput = document.getElementById('search-input');
searchBtn.addEventListener('click', () => { searchOverlay.style.display = 'flex'; setTimeout(() => searchInput.focus(), 100); });
closeSearch.addEventListener('click', () => { searchOverlay.style.display = 'none'; });

// ====== FILTER ======
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => { b.classList.remove('bg-neutral-900','text-neutral-50','active'); b.classList.add('border','border-neutral-200','text-neutral-400'); });
    btn.classList.add('bg-neutral-900','text-neutral-50','active'); btn.classList.remove('border','border-neutral-200','text-neutral-400');
    const f = btn.dataset.filter;
    productCards.forEach(c => {
      if (f === 'all' || c.dataset.category === f) {
        c.style.display = ''; c.style.opacity = '0'; c.style.transform = 'translateY(12px)';
        requestAnimationFrame(() => { c.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; c.style.opacity = '1'; c.style.transform = 'translateY(0)'; });
      } else { c.style.display = 'none'; }
    });
  });
});

// ====== NEWSLETTER ======
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('newsletter-form').classList.add('hidden');
  document.getElementById('newsletter-success').classList.remove('hidden');
  showToast('Successfully subscribed');
});

// ====== WISHLIST TOGGLE ======
document.querySelectorAll('.wishlist-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const isActive = this.classList.contains('bg-neutral-900');
    if (isActive) {
      this.classList.remove('bg-neutral-900','text-white'); this.classList.add('bg-white/95','text-neutral-900');
    } else {
      this.classList.add('bg-neutral-900','text-white'); this.classList.remove('bg-white/95','text-neutral-900');
      showToast('Added to wishlist');
    }
  });
});

// ====== SCROLL ANIMATIONS ======
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; observer.unobserve(entry.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('section > div').forEach(el => {
  el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; el.style.transition = 'opacity 0.9s ease-out, transform 0.9s ease-out';
  observer.observe(el);
});

// ====== COUNTER ANIMATION ======
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target; const target = parseInt(el.dataset.target);
      let current = 0; const step = Math.max(1, Math.floor(target / 40));
      const timer = setInterval(() => { current += step; if (current >= target) { current = target; clearInterval(timer); } el.textContent = current + (target === 98 ? '%' : ''); }, 30);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));

// ====== BACK TO TOP ======
const btt = document.getElementById('back-to-top');
window.addEventListener('scroll', () => { btt.classList.toggle('visible', window.scrollY > 600); });
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ====== PARALLAX on Hero (subtle) ======
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-bg-pulse');
  if (hero) { const y = window.scrollY * 0.3; hero.style.transform = `scale(${1.05 + window.scrollY * 0.0001}) translateY(${y}px)`; }
});
