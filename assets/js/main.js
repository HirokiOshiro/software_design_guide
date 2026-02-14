function copyPrompt(el) {
  navigator.clipboard.writeText(
    el.textContent.replace('📋 クリックでコピー', '').replace('✓ コピーしました', '').trim()
  );
  el.classList.add('copied');
  setTimeout(() => el.classList.remove('copied'), 1500);
}

function toggleChecklistItem(item) {
  item.classList.toggle('checked');
  item.setAttribute('aria-pressed', String(item.classList.contains('checked')));
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.checklist li').forEach(li => {
    li.setAttribute('role', 'button');
    li.setAttribute('tabindex', '0');
    li.setAttribute('aria-pressed', 'false');
    li.addEventListener('click', () => toggleChecklistItem(li));
    li.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleChecklistItem(li);
      }
    });
  });

  const sections = document.querySelectorAll('.section[id]');
  const links = document.querySelectorAll('.toc-link');
  if (sections.length && links.length && window.IntersectionObserver) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          const a = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
          if (a) a.classList.add('active');
        }
      });
    }, { rootMargin: '-80px 0px -60% 0px' });
    sections.forEach(s => obs.observe(s));
  }

  document.querySelectorAll('.kw-item').forEach(item => {
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    const copy = () => {
      const term = item.childNodes[0].textContent.trim();
      const prompt = `以下の用語について、バイブコーディング（AIにコードを書かせる開発手法）における「設計」の文脈で教えてください。\n\n用語：${term}\n\n1. 一言での定義\n2. なぜバイブコーディングの設計段階で重要か\n3. Webアプリ（例：備品予約システム）を例にした説明\n4. 関連する概念\n5. AIへの指示に活かすための実践的なアドバイス1つ`;
      navigator.clipboard.writeText(prompt);
      const original = item.innerHTML;
      item.classList.add('copied');
      item.innerHTML = '<span class="kw-copy-message">✓ プロンプトをコピーしました</span>';
      setTimeout(() => {
        item.innerHTML = original;
        item.classList.remove('copied');
      }, 1500);
    };
    item.addEventListener('click', copy);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        copy();
      }
    });
  });

  document.querySelectorAll('.deepdive code').forEach(c => {
    c.setAttribute('role', 'button');
    c.setAttribute('tabindex', '0');
    c.addEventListener('click', () => copyPrompt(c));
    c.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        copyPrompt(c);
      }
    });
  });
});
