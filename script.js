// ===== Mobile nav toggle =====
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

// ===== Shared motion/input checks =====
var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ===== Hero spotlight (follows cursor, hero section only) =====
(function () {
  if (prefersReducedMotion || !hasFinePointer) return;

  var hero = document.querySelector('.hero');
  var spotlight = document.querySelector('.hero-spotlight');
  if (!hero || !spotlight) return;

  hero.addEventListener('mouseenter', function () {
    spotlight.classList.add('is-active');
  });
  hero.addEventListener('mouseleave', function () {
    spotlight.classList.remove('is-active');
  });
  hero.addEventListener('mousemove', function (e) {
    var rect = hero.getBoundingClientRect();
    var x = ((e.clientX - rect.left) / rect.width) * 100;
    var y = ((e.clientY - rect.top) / rect.height) * 100;
    spotlight.style.setProperty('--spot-x', x + '%');
    spotlight.style.setProperty('--spot-y', y + '%');
  });
})();

// ===== Scroll-triggered reveal =====
(function () {
  var groups = document.querySelectorAll('.timeline, .project-grid, .ledger, .work-list');

  groups.forEach(function (group) {
    var items = group.children;
    Array.prototype.forEach.call(items, function (item, i) {
      item.classList.add('reveal');
      item.style.transitionDelay = prefersReducedMotion ? '0s' : (i * 0.08) + 's';
    });
  });

  var revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(function (el) { observer.observe(el); });
})();

// ===== Magnetic buttons and project links =====
(function () {
  if (prefersReducedMotion || !hasFinePointer) return;

  var targets = document.querySelectorAll('.btn, .project-link a');

  targets.forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var rect = el.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = 'translate(' + (x * 0.25) + 'px, ' + (y * 0.25) + 'px)';
    });
    el.addEventListener('mouseleave', function () {
      el.style.transform = '';
    });
  });
})();
