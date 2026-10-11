/* Behaviour: role switching, demo auth, hero scan interaction, simulated live badges. */
(function () {
  const { config, data, render } = window.RAI;
  const $ = (id) => document.getElementById(id);

  const userView = $('user-view');
  const shopkeeperView = $('shopkeeper-view');
  const loginGate = $('login-gate');
  const accessMessage = $('access-message');
  const roleBtns = document.querySelectorAll('.role-btn');

  let isAuthenticated = false;

  function setRole(role) {
    const isShop = role === 'shopkeeper';
    if (!isShop) {
      isAuthenticated = false;
      accessMessage.textContent = '';
      accessMessage.classList.remove('success');
    }
    userView.hidden = isShop;
    shopkeeperView.hidden = !(isShop && isAuthenticated);
    loginGate.hidden = !(isShop && !isAuthenticated);
    roleBtns.forEach((b) => b.classList.toggle('active', b.dataset.role === role));
  }

  function authenticate() {
    const id = $('mcp-id').value.trim();
    const key = $('mcp-pass').value.trim();
    accessMessage.classList.remove('success');

    if (!id || !key) {
      accessMessage.textContent = '⚠ MCP-ID AND ACCESS KEY REQUIRED';
      return;
    }
    if (id !== config.demoAuth.id || key !== config.demoAuth.key) {
      accessMessage.textContent = '⚠ ACCESS DENIED · INVALID MCP CREDENTIALS';
      return;
    }
    accessMessage.textContent = '✓ MCP AUTHENTICATED · FILTERED ACCESS GRANTED';
    accessMessage.classList.add('success');
    setTimeout(() => {
      isAuthenticated = true;
      setRole('shopkeeper');
    }, config.demoAuth.unlockDelayMs);
  }

  function initHeroScan() {
    const canvas = document.querySelector('.fashion-canvas');
    const scan = canvas && canvas.querySelector('.scan-line');
    if (!scan) return;
    canvas.addEventListener('mousemove', (e) => {
      const r = canvas.getBoundingClientRect();
      scan.style.top = ((e.clientY - r.top) / r.height) * 100 + '%';
    });
    canvas.addEventListener('mouseleave', () => { scan.style.top = '0%'; });
  }

  // Simulated live feed — placeholder until wired to a real backend
  function initSimulatedFeed() {
    let flagged = data.safety.flaggedTransactions;
    setInterval(() => {
      if (Math.random() > 0.7) {
        flagged = Math.max(0, Math.min(5, flagged + (Math.random() > 0.5 ? 1 : -1)));
        render.setFlagged(flagged);
      }
    }, 5000);
  }

  render.all();
  roleBtns.forEach((b) => b.addEventListener('click', () => setRole(b.dataset.role)));
  $('login-btn').addEventListener('click', authenticate);
  $('mcp-pass').addEventListener('keydown', (e) => { if (e.key === 'Enter') authenticate(); });
  initHeroScan();
  initSimulatedFeed();
  setRole('user');
})();
