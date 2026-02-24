/* ============================================================
   PROJECT SLAYERS WIKI - SCRIPT.JS
   Funcionalidades: Navegação SPA, Busca, FAQ, Back-to-Top
   ============================================================ */

'use strict';

// ── DADOS DE BUSCA (índice de conteúdo) ──────────────────────
const SEARCH_INDEX = [
  { section: 'home', icon: '🏠', title: 'Página Inicial', keywords: ['home', 'início', 'wiki', 'project slayers', 'apresentação'] },
  { section: 'comecando', icon: '🌟', title: 'Começando no Jogo', keywords: ['início', 'novo jogador', 'personagem', 'criação', 'tutorial', 'iniciante', 'dicas'] },
  { section: 'mapa', icon: '🗺️', title: 'Mapa do Primeiro Mundo', keywords: ['mapa', 'local', 'cidade', 'vila', 'farm', 'spawn', 'região', 'mundo 1'] },
  { section: 'missoes', icon: '📜', title: 'Missões do Primeiro Mundo', keywords: ['missão', 'quest', 'objetivo', 'recompensa', 'npc', 'tarefa'] },
  { section: 'npcs', icon: '👤', title: 'NPCs Importantes', keywords: ['npc', 'personagem', 'vendedor', 'treinador', 'guia', 'seleção'] },
  { section: 'progressao', icon: '⬆️', title: 'Sistema de Progressão', keywords: ['progressão', 'xp', 'exp', 'nível', 'level', 'evoluir', 'respiração', 'combate', 'habilidade'] },
  { section: 'inimigos', icon: '👹', title: 'Inimigos e Bosses', keywords: ['inimigo', 'monstro', 'boss', 'demônio', 'oni', 'estratégia', 'derrotar'] },
  { section: 'itens', icon: '⚔️', title: 'Itens e Equipamentos', keywords: ['item', 'espada', 'roupa', 'equipamento', 'drop', 'cura', 'katana', 'armadura'] },
  { section: 'guia', icon: '📋', title: 'Guia Completo Início ao Fim', keywords: ['guia', 'completo', 'caminho', 'progressão', 'ordem', 'roteiro', 'final do mundo 1'] },
  { section: 'faq', icon: '❓', title: 'Perguntas Frequentes (FAQ)', keywords: ['faq', 'pergunta', 'dúvida', 'resposta', 'frequente', 'ajuda'] },
  // Termos específicos do jogo
  { section: 'progressao', icon: '💨', title: 'Respiração Solar', keywords: ['respiração solar', 'sun breathing', 'hinokami'] },
  { section: 'progressao', icon: '💧', title: 'Respiração da Água', keywords: ['respiração da água', 'water breathing'] },
  { section: 'progressao', icon: '⚡', title: 'Respiração do Trovão', keywords: ['respiração trovão', 'thunder breathing'] },
  { section: 'inimigos', icon: '😈', title: 'Akaza', keywords: ['akaza', 'boss', 'upper moon', 'lua superior'] },
  { section: 'inimigos', icon: '😈', title: 'Rui', keywords: ['rui', 'spider demon', 'montanha', 'boss'] },
  { section: 'missoes', icon: '📜', title: 'Final Selection', keywords: ['seleção final', 'final selection', 'montanha', 'seleção de slayers'] },
  { section: 'mapa', icon: '🏘️', title: 'Aldeia Kiribating', keywords: ['kiribating', 'aldeia', 'primeira aldeia', 'início'] },
  { section: 'mapa', icon: '⛩️', title: 'Montanha Fujikasane', keywords: ['fujikasane', 'montanha', 'final selection', 'seleção'] },
];

// ── UTILITÁRIOS ──────────────────────────────────────────────
function qs(sel, ctx = document) { return ctx.querySelector(sel); }
function qsAll(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

// ── NAVEGAÇÃO SPA ────────────────────────────────────────────
function navigateTo(sectionId) {
  // Esconder todas as seções
  qsAll('.content-section').forEach(s => s.classList.remove('active'));
  qsAll('.nav-link').forEach(l => l.classList.remove('active'));

  // Mostrar seção alvo
  const target = qs(`#section-${sectionId}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Ativar link no sidebar
  const link = qs(`[data-section="${sectionId}"]`);
  if (link) link.classList.add('active');

  // Fechar sidebar mobile
  closeMobileSidebar();

  // Salvar estado na URL
  history.pushState({ section: sectionId }, '', `#${sectionId}`);

  // Fechar busca
  closeSearch();
}

// ── SIDEBAR MOBILE ───────────────────────────────────────────
function openMobileSidebar() {
  qs('#sidebar').classList.add('open');
  qs('#sidebar-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileSidebar() {
  qs('#sidebar').classList.remove('open');
  qs('#sidebar-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ── BUSCA ────────────────────────────────────────────────────
function doSearch(query, resultsContainer) {
  query = query.trim().toLowerCase();
  if (!query || query.length < 2) {
    resultsContainer.style.display = 'none';
    return;
  }

  const results = SEARCH_INDEX.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.keywords.some(k => k.includes(query))
  );

  if (results.length === 0) {
    resultsContainer.innerHTML = `<div class="search-result-item"><div><div class="search-result-title">Nenhum resultado encontrado</div><div class="search-result-section">Tente outro termo</div></div></div>`;
    resultsContainer.style.display = 'block';
    return;
  }

  // Remover duplicatas por section
  const seen = new Set();
  const unique = results.filter(r => {
    if (seen.has(r.section + r.title)) return false;
    seen.add(r.section + r.title);
    return true;
  });

  resultsContainer.innerHTML = unique.slice(0, 7).map(item => `
    <div class="search-result-item" onclick="navigateTo('${item.section}')">
      <span class="search-result-icon">${item.icon}</span>
      <div>
        <div class="search-result-title">${highlightMatch(item.title, query)}</div>
        <div class="search-result-section">Ir para seção</div>
      </div>
    </div>
  `).join('');

  resultsContainer.style.display = 'block';
}

function highlightMatch(text, query) {
  const idx = text.toLowerCase().indexOf(query);
  if (idx === -1) return text;
  return text.slice(0, idx) + `<span class="search-match">${text.slice(idx, idx + query.length)}</span>` + text.slice(idx + query.length);
}

function closeSearch() {
  const res = qs('#search-results');
  if (res) res.style.display = 'none';
}

// ── FAQ ACCORDION ────────────────────────────────────────────
function initFAQ() {
  qsAll('.faq-item').forEach(item => {
    const btn = qs('.faq-question', item);
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Fechar todos
      qsAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Abrir o clicado se estava fechado
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ── BACK TO TOP ──────────────────────────────────────────────
function initBackToTop() {
  const btn = qs('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── STAT BARS ANIMADAS ───────────────────────────────────────
function animateStatBars() {
  qsAll('.stat-bar-fill[data-width]').forEach(bar => {
    const width = bar.dataset.width;
    setTimeout(() => { bar.style.width = width; }, 200);
  });
}

// ── INICIALIZAÇÃO ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // --- Navegação por links do sidebar ---
  qsAll('.nav-link[data-section]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(link.dataset.section);
    });
  });

  // --- Botões de nav dentro das páginas ---
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-nav]');
    if (btn) {
      e.preventDefault();
      navigateTo(btn.dataset.nav);
    }
  });

  // --- Hamburger ---
  qs('#hamburger')?.addEventListener('click', openMobileSidebar);
  qs('#sidebar-overlay')?.addEventListener('click', closeMobileSidebar);

  // --- Busca header ---
  const headerInput = qs('#search-input');
  const headerResults = qs('#search-results');
  if (headerInput && headerResults) {
    headerInput.addEventListener('input', () => doSearch(headerInput.value, headerResults));
    qs('#search-btn')?.addEventListener('click', () => doSearch(headerInput.value, headerResults));
    headerInput.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeSearch();
      if (e.key === 'Enter') doSearch(headerInput.value, headerResults);
    });
  }

  // --- Busca sidebar ---
  const sidebarInput = qs('#sidebar-search-input');
  if (sidebarInput) {
    sidebarInput.addEventListener('input', () => {
      const query = sidebarInput.value.toLowerCase().trim();
      qsAll('.nav-link').forEach(link => {
        const text = link.textContent.toLowerCase();
        link.style.display = (!query || text.includes(query)) ? '' : 'none';
      });
    });
  }

  // Fechar busca ao clicar fora
  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrapper')) closeSearch();
  });

  // --- FAQ ---
  initFAQ();

  // --- Back to top ---
  initBackToTop();

  // --- Roteamento por hash ---
  function loadFromHash() {
    const hash = window.location.hash.replace('#', '') || 'home';
    const validSections = SEARCH_INDEX.map(s => s.section);
    const section = validSections.includes(hash) ? hash : 'home';
    // Ativar sem push history
    qsAll('.content-section').forEach(s => s.classList.remove('active'));
    qsAll('.nav-link').forEach(l => l.classList.remove('active'));
    const target = qs(`#section-${section}`);
    if (target) target.classList.add('active');
    const link = qs(`[data-section="${section}"]`);
    if (link) link.classList.add('active');
  }

  loadFromHash();
  window.addEventListener('popstate', loadFromHash);

  // --- Animação das stat bars quando section ativa ---
  const progressionSection = qs('#section-progressao');
  if (progressionSection) {
    const observer = new MutationObserver(() => {
      if (progressionSection.classList.contains('active')) animateStatBars();
    });
    observer.observe(progressionSection, { attributes: true, attributeFilter: ['class'] });
  }

  // Se a seção progressão já estiver ativa
  if (qs('#section-progressao.active')) animateStatBars();

  console.log('[SlayersWiki] Inicializado com sucesso! ⚔️');
});
