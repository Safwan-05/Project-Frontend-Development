
// cart.js — multi-page cart (localStorage powered)
(function () {
  const STORAGE_KEY = 'mp_cart_v1';

  function getCart() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }
  function saveCart(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    updateCartCount();
  }
  function fmt(n) {
    return '$' + (Number(n || 0).toFixed(2));
  }
  function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    if (!countEl) return;
    const cart = getCart();
    const qty = cart.reduce((s, it) => s + (it.qty || 1), 0);
    countEl.textContent = qty;
  }
  function addItem(item) {
    const cart = getCart();
    cart.push(item);
    saveCart(cart);
    toast('Added to cart');
  }
  function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCartPage();
  }
  function clearCart() {
    saveCart([]);
    renderCartPage();
  }
  function toast(msg){
    // lightweight toast
    let t = document.createElement('div');
    t.textContent = msg;
    t.style.position='fixed'; t.style.bottom='20px'; t.style.right='20px';
    t.style.background='#111'; t.style.color='#fff'; t.style.padding='10px 14px';
    t.style.borderRadius='10px'; t.style.boxShadow='0 6px 20px rgba(0,0,0,.2)';
    t.style.zIndex='9999'; t.style.opacity='0'; t.style.transition='opacity .2s ease, transform .2s ease';
    t.style.transform='translateY(8px)';
    document.body.appendChild(t);
    requestAnimationFrame(()=>{ t.style.opacity='1'; t.style.transform='translateY(0)'; });
    setTimeout(()=>{ t.style.opacity='0'; t.style.transform='translateY(8px)'; }, 1400);
    setTimeout(()=> t.remove(), 1700);
  }

  // ------ Renderers for cart.html and checkout.html ------
  function renderCartPage() {
    const holder = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-grand-total');
    if (!holder || !totalEl) return;
    const cart = getCart();
    holder.innerHTML = '';
    let grand = 0;
    if (cart.length === 0) {
      holder.innerHTML = '<div class="empty">Your cart is empty.</div>';
      totalEl.textContent = fmt(0);
      updateCartCount();
      return;
    }
    cart.forEach((it, idx) => {
      const sub = Number(it.subtotal || 0);
      grand += sub;
      const row = document.createElement('div');
      row.className = 'cart-row';
      row.innerHTML = `
        <div class="col main">
          <div class="title">${escapeHtml(it.title || it.type || 'Item')}</div>
          <div class="meta">${escapeHtml(it.summary || '')}</div>
          <div class="tag">${escapeHtml(it.type || '')}</div>
        </div>
        <div class="col price">${fmt(sub)}</div>
        <div class="col actions">
          <button class="btn btn-danger" data-rm="${idx}">Remove</button>
        </div>`;
      holder.appendChild(row);
    });
    totalEl.textContent = fmt(grand);

    holder.querySelectorAll('[data-rm]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = Number(e.currentTarget.getAttribute('data-rm'));
        removeItem(i);
      });
    });
    updateCartCount();
  }

  function renderCheckoutPage() {
    const list = document.getElementById('checkout-list');
    const totalEl = document.getElementById('checkout-grand-total');
    if (!list || !totalEl) return;
    const cart = getCart();
    let grand = 0;
    list.innerHTML = '';
    cart.forEach(it => {
      const sub = Number(it.subtotal || 0);
      grand += sub;
      const li = document.createElement('li');
      li.innerHTML = `<span>${escapeHtml(it.title)}</span><strong>${fmt(sub)}</strong>`;
      list.appendChild(li);
    });
    totalEl.textContent = fmt(grand);
    updateCartCount();
  }

  // Basic utility
  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

  // Expose minimal API
  window.CartAPI = { getCart, saveCart, addItem, clearCart, renderCartPage, renderCheckoutPage, updateCartCount, fmt };
  // Keep badge in sync on every page load
  document.addEventListener('DOMContentLoaded', updateCartCount);
})();
