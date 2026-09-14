(function () {
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', function () {
    var isOpen = mobileNav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    mobileNav.hidden = !isOpen;
  });

  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('is-open');
      mobileNav.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();
