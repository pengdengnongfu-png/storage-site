function switchLang(lang) {
  document.body.classList.toggle('show-en', lang === 'en');
  document.querySelectorAll('.lang-bar a').forEach(a => a.classList.toggle('active', a.dataset.lang === lang));
  localStorage.setItem('lang', lang);
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// Form handling
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang') || 'zh';
  switchLang(saved);

  const form = document.getElementById('inquiryForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('.btn');
      const orig = btn.value || btn.textContent;
      btn.value = saved === 'en' ? 'Sending...' : '发送中...';
      btn.disabled = true;

      const data = {
        name: this.name.value,
        email: this.email.value,
        company: this.company.value,
        product: this.product.value,
        qty: this.qty.value,
        message: this.message.value
      };

      fetch('https://formsubmit.co/ajax/pengdengnongfu@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(r => r.json())
      .then(r => {
        if (r.success) {
          this.innerHTML = '<div style="text-align:center;padding:40px;color:#10b981;font-size:18px;font-weight:700;">' +
            (saved === 'en' ? '✓ Inquiry sent! We will contact you within 24 hours.' : '✓ 询价已发送！我们将在24小时内与您联系。') +
            '</div>';
        }
      })
      .catch(() => {
        btn.value = orig;
        btn.disabled = false;
        alert(saved === 'en' ? 'Network error. Please email us directly.' : '网络错误，请直接发邮件给我们。');
      });
    });
  }
});
