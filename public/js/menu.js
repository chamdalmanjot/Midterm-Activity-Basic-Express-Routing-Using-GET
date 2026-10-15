const grid = document.getElementById('menu-grid');
const statusEl = document.getElementById('status');
const buttons = document.querySelectorAll('.filters button');

async function loadMenu(category = '') {
  statusEl.textContent = 'Loading...';
  try {
    const url = category
      ? `/api/menu?category=${encodeURIComponent(category)}`
      : '/api/menu';
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
    const products = await res.json();

    grid.innerHTML = products.map(p => `
      <article class="item">
        <img src="${p.image}" alt="${p.name}" onerror="this.removeAttribute('src')">
        <div class="body">
          <h3>${p.name}</h3>
          <p class="price">&#8369;${p.price.toFixed(2)}</p>
          ${p.note ? `<p class="note">${p.note}</p>` : ''}
        </div>
      </article>`).join('');
    statusEl.textContent = '';
  } catch (err) {
    statusEl.textContent = `Could not load the menu: ${err.message}`;
  }
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    loadMenu(btn.dataset.category);
  });
});

loadMenu();