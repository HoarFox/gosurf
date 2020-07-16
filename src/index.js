import $ from "jquery";

// ----- css and scss -----
import "normalize.css";
import "animate.css";
import "./css/main.scss";

// ----- Libs -----

// ----- slick -----
import "./js/libs/slick.min.js";

// ----- wow -----
import WOW from "../node_modules/wow.js/dist/wow.js";
// init wow
new WOW().init();

const prevArrow =
  '<img class="slider-arrow slider-arrow__left" src="img/arrow-left.svg" alt="" />';
const nextArrow =
  '<img class="slider-arrow slider-arrow__right" src="img/arrow-right.svg" alt="" />';

$(".header__slider").slick({
  infinite: true,
  fade: true,
  prevArrow,
  nextArrow,
  asNavFor: ".slider-dots",
});

$(".slider-dots").slick({
  slidesToShow: 4,
  slidesToScroll: 4,
  asNavFor: ".header__slider",
  focusOnSelect: true,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
});

$(".surf__slider").slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
  prevArrow,
  nextArrow,
  focusOnSelect: true,
  centerMode: false,
  asNavFor: ".surf__map",
  responsive: [
    {
      breakpoint: 1210,
      settings: {
        slidesToShow: 3,
        centerMode: false,
      },
    },
    {
      breakpoint: 899,
      settings: {
        slidesToShow: 2,
        centerMode: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        centerMode: true,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        centerMode: false,
      },
    },
  ],
});

$(".surf__map").slick({
  slidesToShow: 8,
  slidesToScroll: 1,
  focusOnSelect: true,
  asNavFor: ".surf__slider",
  arrows: false,
  infinite: true,
  centerMode: false,
  responsive: [
    {
      breakpoint: 1101,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
      },
    },
    {
      breakpoint: 950,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true,
      },
    },
    {
      breakpoint: 675,
      settings: {
        slidesToShow: 1,
        centerMode: true,
      },
    },

    {
      breakpoint: 375,
      settings: {
        slidesToShow: 1,
        centerMode: false,
      },
    },
  ],
});

$(".holder-slider, .shop-slider").slick({
  infinite: true,
  fade: true,
  prevArrow,
  nextArrow,
  asNavFor: ".slider-dots",
});

// INPUT

let controls = /* html */ `
  <div class="quantity-nav">
    <div class="quantity-button quantity-up">
      <img src="./img/plus.svg" alt=""/>
    </div>
    <div class="quantity-button quantity-down">
      <img src="./img/minus.svg" alt=""/>
    </div>
  </div>`;

$(controls).insertAfter(".quantity input");
$(".quantity").each(function () {
  let spinner = $(this),
    input = spinner.find('input[type="number"]'),
    btnUp = spinner.find(".quantity-up"),
    btnDown = spinner.find(".quantity-down"),
    min = input.attr("min"),
    max = input.attr("max");

  btnUp.click(function () {
    let oldValue = parseFloat(input.val());
    let newVal;
    if (oldValue >= max) {
      newVal = oldValue;
    } else {
      newVal = oldValue + 1;
    }
    spinner.find("input").val(newVal);
    spinner.find("input").trigger("change");
  });

  btnDown.click(function () {
    let oldValue = parseFloat(input.val());
    let newVal;
    if (oldValue <= min) {
      newVal = oldValue;
    } else {
      newVal = oldValue - 1;
    }
    spinner.find("input").val(newVal);
    spinner.find("input").trigger("change");
  });
});

const inputNightsEl = $(".input-nights"),
  inputGuestsEl = $(".input-guests"),
  summsEl = $(".result-summ"),
  sliderItemsEl = $("#sleep-section .holder-slider__item");

const guest = summsEl.data("guest"),
  night = summsEl.data("night");

let countSumm = (index) => {
  let summEl = summsEl.eq(index),
    inputNightEl = inputNightsEl.eq(index),
    inputGuestEl = inputGuestsEl.eq(index);

  let summ = inputNightEl.val() * night + (inputGuestEl.val() - 1) * guest;
  summEl.html("$" + summ);
};

let summChangeHandler = (e) => {
  let index = sliderItemsEl.index($(e.target).closest(".holder-slider__item"));

  countSumm(index);
};

inputNightsEl.on("change", summChangeHandler);
inputGuestsEl.on("change", summChangeHandler);

summsEl.each(function (index) {
  countSumm(index);
});

$(".shop-slider__goods-circle").on("click", function (e) {
  $(this).toggleClass("active");
});

$(".header__menu-btn").on("click", function (e) {
  let btn = $(this);
  let preventScrollEl = $("body, header");
  btn.toggleClass("active");
  window.scrollTo(0, 0);
  if (btn.hasClass("active")) {
    preventScrollEl.css("overflow", "hidden");
  } else {
    preventScrollEl.css("overflow", "auto");
  }
});

$(".header__aside-list a").on("click", function () {
  let btn = $(".header__menu-btn");
  let preventScrollEl = $("body, header");
  btn.removeClass("active");
  preventScrollEl.css("overflow", "auto");
});
