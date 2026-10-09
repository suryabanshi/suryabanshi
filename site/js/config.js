/* Central site configuration — edit copy, navigation and settings here. */
window.RAI = window.RAI || {};

window.RAI.config = {
  brand: { name: 'RAI', suffix: 'vae', year: 2099, currency: '€' },

  hero: {
    tag: 'SS·2099 — MEN’S AVANT-GARDE',
    slogan: 'KEEP SHOPPING WITH RAI vae',
    description:
      'A synthesis of Parisian precision and Caracas energy. Engineered for the future man — ' +
      'where fabric meets code, and silhouette becomes signal. Fully secure dropshipping network.',
    ctas: [
      { label: 'EXPLORE DROP 01', href: '#collection', secondary: false },
      { label: 'VIRTUAL FIT', href: '#', secondary: true },
    ],
  },

  nav: [
    { label: 'Collection', href: '#collection' },
    { label: 'Atelier', href: '#' },
    { label: 'Future', href: '#' },
    { label: 'Archive', href: '#' },
  ],

  ticker: [
    'QUANTUM FIBERS', 'ADAPTIVE FIT', 'BIOMETRIC WEAVE', 'NEURAL AESTHETIC',
    'LIMITLESS FORM', 'SECURE DROPSHIP', 'MCP CONNECTED',
  ],

  footerLinks: [
    { label: 'INSTAGRAM', href: '#' },
    { label: 'COORDINATES', href: '#' },
    { label: 'LEGAL', href: '#' },
  ],

  inventory: { lowStockThreshold: 10 },

  /*
   * DEMO ONLY. This is client-side and visible to anyone who views source,
   * so it does NOT protect anything. Replace with real server-side auth
   * (e.g. Shopify / Supabase Auth) before storing real orders or customers.
   */
  demoAuth: { id: 'RAI-2099', key: 'demo-2099', unlockDelayMs: 800 },
};
