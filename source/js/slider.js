import Swiper from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css';

const lWidth = 1200;
const tabletWidthOnlyMediaQuery = window.matchMedia(`(max-width: ${lWidth - 1}px)`);
const desktopWidthMediaQuery = window.matchMedia(`(min-width: ${lWidth}px)`);

const sliderElements = document.querySelectorAll('.slider');

const initSlider = (sliderElement) => {
  let slider;
  const swiperElement = sliderElement.querySelector('.slider__swiper');
  const sliderNavigationPrevElement = sliderElement.querySelector('.swiper-button-prev');
  const sliderNavigationNextElement = sliderElement.querySelector('.swiper-button-next');

  const createSlider = () => {
    slider = new Swiper(swiperElement, {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      init: false,
      navigation: {
        nextEl: sliderNavigationNextElement,
        prevEl: sliderNavigationPrevElement,
      },
      breakpoints: {
        576: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
      },
    });

    slider.init();
  };

  const swapSlides = () => {
    const slides = slider.slides;

    if (slides[1] && slides[2]) {
      const parent = slides[1].parentNode;

      parent.insertBefore(slides[2], slides[1]);
      slider.update();
    }
  };

  const registerResizeWindowEvents = () => {
    tabletWidthOnlyMediaQuery.addEventListener('change', (evt) => {
      if (evt.matches) {
        swapSlides();
      }
    });

    desktopWidthMediaQuery.addEventListener('change', (evt) => {
      if (evt.matches) {
        swapSlides();
      }
    });
  };

  const initSliderElement = () => {
    createSlider();
    registerResizeWindowEvents();

    if (window.innerWidth >= lWidth) {
      swapSlides();
    }
  };

  initSliderElement();
};

const initAllSliders = () => {
  if (sliderElements.length) {
    sliderElements.forEach((slider) => {
      initSlider(slider);
    });
  }
};

export {initAllSliders};
