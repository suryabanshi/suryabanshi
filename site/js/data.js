/* Central catalog + operations data. Storefront and dashboard both render from this. */
window.RAI = window.RAI || {};

window.RAI.data = {
  products: [
    { sku: 'NX-01', line: 'TECH', name: 'OCTOPUS',  type: 'ADAPTIVE PARKA',   price: 1290, stock: 24, supplier: 'ATELIER-PARIS' },
    { sku: 'NX-02', line: 'FLUX', name: 'ECHO',     type: 'MAGNETIC TROUSER', price: 890,  stock: 8,  supplier: 'CARACAS-WORKS' },
    { sku: 'NX-03', line: 'CORE', name: 'VANTA',    type: 'LIQUID KNIT',      price: 1050, stock: 0,  supplier: 'CARACAS-WORKS' },
    { sku: 'NX-04', line: 'TECH', name: 'QUANTUM',  type: 'BLAZER',           price: 1590, stock: 15, supplier: 'ATELIER-PARIS' },
    { sku: 'NX-05', line: 'CORE', name: 'NEURAL',   type: 'HOODIE',           price: 690,  stock: 42, supplier: 'ATELIER-PARIS' },
  ],

  // Products shown on the public storefront (SKUs)
  featured: ['NX-01', 'NX-02', 'NX-03'],

  // Dashboard headline numbers that are not derivable from the catalog
  stats: { totalOrders: 1284, revenueK: 142 },

  safety: {
    suppliers: { active: 12, flagged: 0 },
    flaggedTransactions: 2,
    tunnel: { cipher: 'AES-256', latencyMs: 12 },
  },
};
