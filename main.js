// ============================================================
// DX学科 AI体験授業サイト - 共通JavaScript
// ============================================================

// ── コピーボタン機能 ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {

  // コードブロックのコピーボタン
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const block = this.closest('.code-block');
      const pre = block.querySelector('pre');
      // プレーンテキストを取得（HTMLタグを除去）
      const text = pre.innerText || pre.textContent;

      navigator.clipboard.writeText(text.trim()).then(() => {
        const original = this.innerHTML;
        this.classList.add('copied');
        this.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          コピーしました！`;
        setTimeout(() => {
          this.classList.remove('copied');
          this.innerHTML = original;
        }, 2000);
      }).catch(() => {
        // フォールバック
        const ta = document.createElement('textarea');
        ta.value = text.trim();
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);

        const original = this.innerHTML;
        this.classList.add('copied');
        this.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          コピーしました！`;
        setTimeout(() => {
          this.classList.remove('copied');
          this.innerHTML = original;
        }, 2000);
      });
    });
  });

  // アクティブなナビリンクのハイライト
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === currentPage) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

});

// ── コピーボタンのHTML生成ヘルパー ───────────────────────
function makeCopyBtn() {
  return `<button class="copy-btn" type="button">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
    </svg>
    コピー
  </button>`;
}
