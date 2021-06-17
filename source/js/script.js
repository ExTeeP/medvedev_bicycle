'use strict';

document.documentElement.classList.remove('nojs');

// Оптимизация ресайза окна
(function () {
  var throttle = function (type, name, obj) {
    obj = obj || window;
    var running = false;

    var func = function () {
      if (running) {
        return;
      }

      running = true;

      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  throttle('resize', 'optimizedResize');
})();

// Переключаетль меню
(function () {
  var MAX_WIDTH = 1023;

  var toggle = document.querySelector('.burger');
  var menu = document.querySelector('.header__nav');

  var changeButtonLabel = function () {
    if (toggle.classList.contains('burger__active')) {
      toggle.children[0].innerText = 'Закрыть меню';
    } else {
      toggle.children[0].innerText = 'Открыть меню';
    }
  };

  var showerMenu = function () {
    document.documentElement.classList.toggle('page--menu-open');
    toggle.classList.toggle('burger__active');
    menu.classList.toggle('header__menu-open');

    changeButtonLabel();
  };

  var onMenuLinkClick = function (evt) {
    if (evt.target.tagName === 'A') {
      showerMenu();
    }
  };

  var onMenuButtonClick = function () {
    showerMenu();
  };

  var menuToggleHandlers = function () {
    if (window.innerWidth > MAX_WIDTH) {
      toggle.removeEventListener('click', onMenuButtonClick);
      menu.removeEventListener('click', onMenuLinkClick);
    } else {
      toggle.addEventListener('click', onMenuButtonClick);
      menu.addEventListener('click', onMenuLinkClick);
    }
  };

  toggle.addEventListener('click', onMenuButtonClick);
  menu.addEventListener('click', onMenuLinkClick);

  menuToggleHandlers();

  window.addEventListener('optimizedResize', function () {
    menuToggleHandlers();
  });
})();
