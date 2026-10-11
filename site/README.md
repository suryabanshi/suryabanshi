# RAI vae — storefront

Static site (no build step). Open `index.html` or serve the folder: `python3 -m http.server -d site`.

| Where | What lives there |
|---|---|
| `js/config.js` | Brand, hero copy, nav, ticker, footer links, thresholds, demo login |
| `js/data.js` | Product catalog, featured SKUs, stats, safety numbers — the single source for storefront **and** dashboard |
| `js/render.js` | Builds all sections from config + data |
| `js/app.js` | Role switch, demo auth, interactions |
| `css/tokens.css` | Colors, fonts, widths |
| `css/main.css` | All component styles |

To add a product, add one entry to `products` in `data.js` (and its SKU to `featured` to show it publicly).

**Security note:** the shopkeeper login is a front-end demo; credentials in `config.js` are public. Use real server-side auth before handling real data.
