/* Renders every data-driven section from RAI.config and RAI.data. */
(function () {
  const { config, data } = window.RAI;
  const fmt = (n) => `${config.brand.currency} ${n.toLocaleString('en-US')}`;

  function el(tag, props = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else node.setAttribute(k, v);
    }
    [].concat(children).forEach((c) => c && node.appendChild(c));
    return node;
  }

  const byId = (id) => document.getElementById(id);
  const bySku = (sku) => data.products.find((p) => p.sku === sku);

  function stockStatus(stock) {
    if (stock <= 0) return { label: 'OUT OF STOCK', cls: 'badge-out', action: 'RESTOCK' };
    if (stock <= config.inventory.lowStockThreshold) return { label: 'LOW STOCK', cls: 'badge-low', action: 'EDIT' };
    return { label: 'IN STOCK', cls: 'badge-stock', action: 'EDIT' };
  }

  function renderChrome() {
    byId('hero-tag').textContent = config.hero.tag;
    byId('hero-slogan').textContent = config.hero.slogan;
    byId('hero-desc').textContent = config.hero.description;
    byId('footer-copy').textContent = `© ${config.brand.year} ${config.brand.name} ${config.brand.suffix} — ALL RIGHTS RESERVED`;

    byId('nav').replaceChildren(...config.nav.map((n) => el('a', { class: 'nav-link', href: n.href, text: n.label })));
    byId('hero-ctas').replaceChildren(
      ...config.hero.ctas.map((c) => el('a', { class: c.secondary ? 'cta cta-secondary' : 'cta', href: c.href, text: c.label }))
    );
    byId('footer-links').replaceChildren(...config.footerLinks.map((l) => el('a', { href: l.href, text: l.label })));

    // Ticker content is duplicated so the -50% scroll loops seamlessly
    const items = config.ticker.flatMap((t) => [el('span', { text: t }), el('span', { class: 'highlight', text: '●' })]);
    byId('ticker').replaceChildren(...items, ...items.map((n) => n.cloneNode(true)));
  }

  function renderStorefront() {
    const cards = data.featured.map(bySku).filter(Boolean).map((p) => {
      const visual = el('div', { class: 'card-visual' }, [el('div', { class: 'line' }), el('div', { class: 'line' }), el('div', { class: 'line' })]);
      return el('div', { class: 'card' }, [
        el('div', { class: 'card-tag', text: `${p.sku} / ${p.line}` }),
        el('div', { class: 'card-title', text: p.name }),
        el('div', { class: 'card-sub', text: p.type }),
        visual,
        el('div', { class: 'card-price', text: fmt(p.price) }, [el('span', { text: 'EUR' })]),
        p.stock > 0 ? el('div', { class: 'safety-tag', text: 'DROPSHIP VERIFIED' }) : el('div', { class: 'card-oos', text: 'SOLD OUT' }),
      ]);
    });
    byId('product-grid').replaceChildren(...cards);
  }

  function renderDashboard() {
    const lowCount = data.products.filter((p) => p.stock > 0 && p.stock <= config.inventory.lowStockThreshold).length;
    const stats = [
      ['TOTAL ORDERS', data.stats.totalOrders.toLocaleString('en-US'), ''],
      ['REVENUE', `${config.brand.currency} ${data.stats.revenueK}k`, ''],
      ['ACTIVE SKUS', String(data.products.length), ''],
      ['LOW STOCK', String(lowCount), 'warn'],
    ];
    byId('stats').replaceChildren(
      ...stats.map(([label, value, cls]) =>
        el('div', { class: 'stat-card' }, [el('div', { class: 'stat-label', text: label }), el('div', { class: `stat-value ${cls}`.trim(), text: value })])
      )
    );

    byId('inventory-body').replaceChildren(
      ...data.products.map((p) => {
        const s = stockStatus(p.stock);
        return el('tr', {}, [
          el('td', { text: `${p.name} ${p.type}` }),
          el('td', { text: p.sku }),
          el('td', { text: String(p.stock) }),
          el('td', { text: fmt(p.price) }),
          el('td', {}, [el('span', { class: `badge ${s.cls}`, text: s.label })]),
          el('td', {}, [el('button', { class: 'action-btn', type: 'button', text: s.action })]),
        ]);
      })
    );

    const { suppliers, flaggedTransactions, tunnel } = data.safety;
    byId('safety-suppliers').replaceChildren(
      el('span', { class: 'secure', text: suppliers.flagged === 0 ? '✓ ALL SUPPLIERS VERIFIED' : `⚠ ${suppliers.flagged} SUPPLIER(S) FLAGGED` }),
      el('br'),
      document.createTextNode(`${suppliers.active} active suppliers · ${suppliers.flagged} flagged`)
    );
    byId('safety-tunnel').replaceChildren(
      el('span', { class: 'secure', text: '✓ ENCRYPTED TUNNEL ACTIVE' }),
      el('br'),
      document.createTextNode(`${tunnel.cipher} · Latency: ${tunnel.latencyMs}ms`)
    );
    setFlagged(flaggedTransactions);
  }

  function setFlagged(n) {
    byId('safety-flagged').replaceChildren(
      el('span', { class: 'filtered', text: `⚠ ${n} FLAGGED TRANSACTIONS` }),
      el('br'),
      document.createTextNode('Auto-review in progress')
    );
  }

  window.RAI.render = { all() { renderChrome(); renderStorefront(); renderDashboard(); }, setFlagged };
})();
