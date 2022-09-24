// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

import burgerMenu from './components/burger-menu';
import popupsFunc from './components/popup';
import initSwiper from './components/slider';
import initSelects from './components/select';
import scrollTo from './components/scroll-to';

import mobHeight from './helpers/mob-height';
import initBodyHeight from './helpers/body-height';
import Popups from './components/full-popup';
import initTabs from './components/tabs';
// import 'animate.css';

(($) => {
  // When DOM is ready
  $(() => {
    burgerMenu.init();
    popupsFunc.init();
    initSwiper();
    initSelects();
    scrollTo.init();
    initTabs();

    mobHeight();
    initBodyHeight();
    const popups = new Popups();

    //navigation
    if (document.querySelector('.js-menu')) {
      let lastId,
        topMenu = $('.js-menu'),
        menuItems = topMenu.find('a'),
        scrollItems = menuItems.map(function () {
          let item = $($(this).attr('href'));
          if (item.length) {
            return item;
          }
        });

      menuItems.click(function (e) {
        let href = $(this).attr('href'),
          offsetTop = href === '#' ? 0 : $(href).offset().top - 49;
        $('html, body').stop().animate(
          {
            scrollTop: offsetTop,
          },
          500
        );
        e.preventDefault();
      });

      $(window).scroll(function () {
        let fromTop = $(this).scrollTop() + 50;
        let cur = scrollItems.map(function () {
          if ($(this).offset().top < fromTop) return this;
        });
        cur = cur[cur.length - 1];
        let id = cur && cur.length ? cur[0].id : '';

        if (lastId !== id) {
          lastId = id;
          menuItems
            .parent()
            .removeClass('active')
            .end()
            .filter("[href='#" + id + "']")
            .parent()
            .addClass('active');
        }
      });
    }

    // toggle site theme
    const themeSwitchers = document.querySelectorAll('.js-theme-switch');

    themeSwitchers.forEach((item) =>
      item.addEventListener('click', (event) => {
        const button = event.target.closest('button');

        if (!button || button.classList.contains('active')) return;

        const activeBtn = event.currentTarget.querySelector('.active');
        const isDark = button.classList.contains('js-theme-dark');

        activeBtn.classList.remove('active');
        button.classList.add('active');

        toggleTheme(isDark);
      })
    );

    function setTheme(themeName) {
      localStorage.setItem('theme', themeName);
      document.documentElement.className = themeName;
    }

    function toggleTheme(isDark) {
      if (isDark) {
        setTheme('theme-dark');
      } else {
        setTheme('theme-light');
      }
    }

    (function () {
      if (localStorage.getItem('theme') === 'theme-light') {
        setTheme('theme-light');
      } else {
        setTheme('theme-dark');
      }
    })();

    //play btn
    const video = document.getElementById('video');
    const circlePlayButton = document.getElementById('play-btn');

    function togglePlay() {
      if (video.paused || video.ended) {
        video.play();
      } else {
        video.pause();
      }
    }

    circlePlayButton.addEventListener('click', togglePlay);
    video.addEventListener('playing', function () {
      circlePlayButton.style.opacity = 0;
    });
    video.addEventListener('pause', function () {
      circlePlayButton.style.opacity = 1;
    });
  });
})(jQuery);

/* HOMEPAGE */

// Navmenu
$('ul.sub-menu').hide();
$('ul.menu__list > li, ul.sub-menu > li').hover(function () {
  if ($('> ul.sub-menu', this).length > 0) {
    $('> ul.sub-menu', this).stop().slideDown('slow');
  }
}, function () {
  if ($('> ul.sub-menu', this).length > 0) {
    $('> ul.sub-menu', this).stop().slideUp('slow');
  }
});

// Onclick submenu
$("#introSection").hide();
$(document).on('click', '#immersive', function (event) {
  event.preventDefault();
  $("#introSection").show("slow");
  $('.introPlay__playButton').toggleClass('active');
  $('.introPlay__playSE').toggleClass('active');
  $('.introPlay__playBE').toggleClass('active');
  $('.intro-home-section').toggleClass('intro-home-section__active').show("slow");
});

let flaghOver = false;
let words = 'BOOK A CONCULTATION',
part = '',
i = 0,
len = words.length,
speed = 70;

$("#bookconsultation").hover(function(){
  if(!flaghOver) {
    let ttttt = setInterval(function () {
      part = words.substr(0, i);
      i++;
      if (i >= len) {
        flaghOver = true;
        i = 0;
        clearInterval(ttttt);
      }
      $('#bookconsultation').text(part);
    },speed);
  }
});

$("#bookconsultation").mouseleave(function(){
  flaghOver = false;
  i = 0;
});

// Onclick button
$(".backgroundVideo").hide();
$(document).on('click', '#bookconsultation', function (event) {
  event.preventDefault();
  $(".backgroundVideo").show(0, function () {
    $('.backgroundVideo').toggleClass('active');
    $('.intro-home-section').toggleClass('videoStarted');
  });
  $('.introPlay__playButton').toggleClass('hidden');
  $('.introPlay__playSE').toggleClass('hidden');
  $('.introPlay__playBE').toggleClass('hidden');
  scrollBanner();
});

let x = 0
let y = 0
function scrollBanner() {
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (x === 0) {
      $('.backgroundVideo').toggleClass('scrolled');
      x = 1
    }
    //$('.intro-home-section').toggleClass('scrolled');
    $('.intro-home-section').css({
      //width: (100 + scroll / 5) + "%",
      //transform: `rotateX(${(scroll * 90)}deg)`,
      transform: `rotateX(${(scroll * 0.1)}deg)`,
      //transitionDuration: `3s`,
      transformOrigin: "top"
    })
    if (y === 0) {
      //$(".caseStudies").hide();
      //$('.caseStudies').show(3000, "slow");
      //$('.caseStudies').slideUp('slow');
      y = 1
    }
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let oldImg = '', currentImg = '';

// Case studies animation
$(document).on('click', '.study-case', function (event) {
  event.preventDefault();
  $('.caseStudies').attr("case-center", this.id);
  if (this.id == "studyCase1") centerCase1();
  if (this.id == "studyCase2") centerCase2();
  if (this.id == "studyCase3") centerCase3();
  if (this.id == "studyCase4") centerCase4();
  if (this.id == "studyCase5") centerCase5();
})

async function centerCase2() {
  if(currentImg === 'studyCase4-img') {
    $('#studyCase4-img').css({"animation-play-state" : 'running'});
    sleep(1500).then(() => { $('#studyCase4-img').removeClass('studyCase4-img'); });
    // await setTimeout(() => {
    //   $('#studyCase4-img').removeClass('studyCase4-img');
    // }, "1500");
  }
  else if(currentImg === 'studyCase1-img') {
    $('#studyCase1-img').css({"animation-play-state" : 'running'});
    sleep(1500).then(() => { $('#studyCase1-img').removeClass('studyCase1-img'); });
    // await setTimeout(() => {
    //   $('#studyCase1-img').removeClass('studyCase1-img');
    // }, "1500");
  }
  else if(currentImg === 'studyCase5-img') {
    $('#studyCase5-img').css({"animation-play-state" : 'running'});
    sleep(1500).then(() => { $('#studyCase5-img').removeClass('studyCase5-img'); });
    // await setTimeout(() => {
    //   $('#studyCase5-img').removeClass('studyCase5-img');
    // }, "1500");
  }
  
  oldImg = currentImg;
  currentImg = 'studyCase2-img';

  $('#studyCase2').toggleClass('active');
  $('#studyCase1').removeClass('active');
  $('#studyCase3').removeClass('active');
  $('#studyCase4').removeClass('active');
  $('#studyCase5').removeClass('active');
  var tl = new TimelineMax()
    .to('#studyCase1', 1, { xPercent: -60, z: -800 }, 0)
    .to('#studyCase2', 1, { xPercent: 0, z: 1 }, 0)
    .to('#studyCase3', 1, { xPercent: 260, z: -800 }, 0)
    .to('#studyCase4', 1, { xPercent: -10, z: 10 }, 0)
    .to('#studyCase5', 1, { xPercent: 280, z: 75 }, 0)
}


async function centerCase4() {
  if(currentImg === 'studyCase1-img') {
    $('#studyCase1-img').css({"animation-play-state" : 'running'});
    sleep(1500).then(() => { $('#studyCase1-img').removeClass('studyCase1-img'); });
    // await setTimeout(() => {
    //   $('#studyCase1-img').removeClass('studyCase1-img');
    // }, "1500");
  }
  else if(currentImg === 'studyCase5-img') {
    $('#studyCase5-img').css({"animation-play-state" : 'running'});
    sleep(1500).then(() => { $('#studyCase5-img').removeClass('studyCase5-img'); });
    // await setTimeout(() => {
    //   $('#studyCase5-img').removeClass('studyCase5-img');
    // }, "1500");
  }
  $("#studyCase4-img").addClass("studyCase4-img");
  sleep(1500).then(() => { $("#studyCase4-img").css({"animation-play-state" : 'paused'}); });
  // await setTimeout(() => {
  //   $("#studyCase4-img").css({"animation-play-state" : 'paused'});
  // }, "1500");
  
  oldImg = currentImg;
  currentImg = 'studyCase4-img';

  $('#studyCase4').toggleClass('active');
  $('#studyCase1').removeClass('active');
  $('#studyCase2').removeClass('active');
  $('#studyCase3').removeClass('active');
  $('#studyCase5').removeClass('active');
  var tl = new TimelineMax()
    .to('#studyCase5', 1, { xPercent: 140, z: -800 }, 0)
    .to('#studyCase1', 1, { xPercent: -20, z: -190 }, 0)
    .to('#studyCase2', 1, { xPercent: 190, z: -380 }, 0)
    .to('#studyCase3', 1, { xPercent: -140, z: -800 }, 0)
    .to('#studyCase4', 1, { xPercent: 0, z: 1 }, 0)
}

async function centerCase1() {
  if(currentImg === 'studyCase4-img') {
    $('#studyCase4-img').css({"animation-play-state" : 'running'});
    sleep(1500).then(() => { $('#studyCase4-img').removeClass('studyCase4-img'); });
    // await setTimeout(() => {
    //   $('#studyCase4-img').removeClass('studyCase4-img');
    // }, "1500");
  }
  else if(currentImg === 'studyCase5-img') {
    $('#studyCase5-img').css({"animation-play-state" : 'running'});
    sleep(1500).then(() => { $('#studyCase5-img').removeClass('studyCase5-img'); });
    // await setTimeout(() => {
    //   $('#studyCase5-img').removeClass('studyCase5-img');
    // }, "1500");
  }
  $("#studyCase1-img").addClass("studyCase1-img");

  $("#studyCase1-img").addClass("studyCase1-img");
  sleep(1500).then(() => { $("#studyCase1-img").css({"animation-play-state" : 'paused'}); });
  // await setTimeout(() => {
  //   $("#studyCase1-img").css({"animation-play-state" : 'paused'});
  // }, "1500");

  oldImg = currentImg;
  currentImg = 'studyCase1-img';

  $('#studyCase1').toggleClass('active');
  $('#studyCase2').removeClass('active');
  $('#studyCase3').removeClass('active');
  $('#studyCase4').removeClass('active');
  $('#studyCase5').removeClass('active');
  var tl = new TimelineMax()
    .to('#studyCase1', 1, { xPercent: 0, z: 1 }, 0)
    .to('#studyCase2', 1, { xPercent: 130, z: -800 }, 0)
    .to('#studyCase3', 1, { xPercent: -20, z: -90 }, 0)
    .to('#studyCase4', 1, { xPercent: 265, z: 0 }, 0)
    .to('#studyCase5', 1, { xPercent: -50, z: -800 }, 0)
}

async function centerCase3() {
  if(currentImg === 'studyCase4-img') {
    $('#studyCase4-img').css({"animation-play-state" : 'running'});
    sleep(1500).then(() => { $('#studyCase4-img').removeClass('studyCase4-img'); });
    // await setTimeout(() => {
    //   $('#studyCase4-img').removeClass('studyCase4-img');
    // }, "1500");
  }
  else if(currentImg === 'studyCase1-img') {
    $('#studyCase1-img').css({"animation-play-state" : 'running'});
    sleep(1500).then(() => { $('#studyCase1-img').removeClass('studyCase1-img'); });
    // await setTimeout(() => {
    //   $('#studyCase1-img').removeClass('studyCase1-img');
    // }, "1500");
  }
  else if(currentImg === 'studyCase5-img') {
    $('#studyCase5-img').css({"animation-play-state" : 'running'});
    sleep(1500).then(() => { $('#studyCase5-img').removeClass('studyCase5-img'); });
    // await setTimeout(() => {
    //   $('#studyCase5-img').removeClass('studyCase5-img');
    // }, "1500");
  }

  oldImg = currentImg;
  currentImg = 'studyCase3-img';

  $('#studyCase3').toggleClass('active');
  $('#studyCase1').removeClass('active');
  $('#studyCase2').removeClass('active');
  $('#studyCase4').removeClass('active');
  $('#studyCase5').removeClass('active');
  var tl = new TimelineMax()
    .to('#studyCase1', 1, { xPercent: 195, z: -240 }, 0)
    .to('#studyCase2', 1, { xPercent: -60, z: -850 }, 0)
    .to('#studyCase3', 1, { xPercent: 0, z: 1 }, 0)
    .to('#studyCase4', 1, { xPercent: 130, z: -800 }, 0)
    .to('#studyCase5', 1, { xPercent: 0, z: 40 }, 0)
}

async function centerCase5() {
  if(currentImg === 'studyCase1-img') {
    $('#studyCase1-img').css({"animation-play-state" : 'running'});
    sleep(1500).then(() => { $('#studyCase1-img').removeClass('studyCase1-img'); });
    // await setTimeout(() => {
    //   $('#studyCase1-img').removeClass('studyCase1-img');
    // }, "1500");
  }
  else if(currentImg === 'studyCase4-img') {
    $('#studyCase4-img').css({"animation-play-state" : 'running'});
    sleep(1500).then(() => { $('#studyCase4-img').removeClass('studyCase4-img'); });
    // await setTimeout(() => {
    //   $('#studyCase4-img').removeClass('studyCase4-img');
    // }, "1500");
  }
  $("#studyCase5-img").addClass("studyCase5-img");

  $("#studyCase5-img").addClass("studyCase5-img");
  sleep(1500).then(() => { $("#studyCase5-img").css({"animation-play-state" : 'paused'}); });
  // await setTimeout(() => {
  //   $("#studyCase5-img").css({"animation-play-state" : 'paused'});
  // }, "1500");

  oldImg = currentImg;
  currentImg = 'studyCase5-img';

  $('#studyCase5').toggleClass('active');
  $('#studyCase1').removeClass('active');
  $('#studyCase2').removeClass('active');
  $('#studyCase3').removeClass('active');
  $('#studyCase4').removeClass('active');
  var tl = new TimelineMax()
    .to('#studyCase1', 1, { xPercent: 195, z: -615 }, 0)
    .to('#studyCase2', 1, { xPercent: -60, z: -850 }, 0)
    .to('#studyCase3', 1, { xPercent: 290, z: -575 }, 0)
    .to('#studyCase4', 1, { xPercent: 5, z: -800 }, 0)
    .to('#studyCase5', 1, { xPercent: 0, z: 1 }, 0)
}

$(function () {
  centerCase2();
  oldImg = 'studyCase2-img';
  currentImg = 'studyCase2-img';
})
// Case studies animation END

// Awards animation
$(document).on('click', '.award', function (event) {
  event.preventDefault();
  $('.caseAwards').attr("award-center", this.id);
  if (this.id == "award1") centerAward1();
  if (this.id == "award2") centerAward2();
  if (this.id == "award3") centerAward3();
  if (this.id == "award4") centerAward4();
  if (this.id == "award5") centerAward5();
})

function centerAward1() {
  var tl = new TimelineMax()
    .to('#award1', 1, { scale: 1.1, xPercent: 0, z: 1 }, 0)
    .to('#award2', 1, { scale: 0.9, xPercent: 130, y: -65, z: 0 }, 0)
    .to('#award3', 1, { scale: 0.8, xPercent: 95, y: -80, z: 0 }, 0)
    .to('#award4', 1, { scale: 1.1, xPercent: 296, y: -36, z: 0 }, 0)
    .to('#award5', 1, { scale: 0.8, xPercent: -50, y: 30, z: 0 }, 0)
}

function centerAward2() {
  var tl = new TimelineMax()
    .to('#award1', 1, { scale: 0.8, xPercent: '83%', y: -85, z: -800 }, 0)
    .to('#award2', 1, { scale: 1.5, xPercent: '222%', z: 1 }, 0)
    .to('#award3', 1, { scale: 1.1, xPercent: 8, y: 16, z: 0 }, 0)
    .to('#award4', 1, { xPercent: 306, y: -190, z: 0 }, 0)
    .to('#award5', 1, { xPercent: -145, z: 75 }, 0)
}

function centerAward3() {
  var tl = new TimelineMax()
    .to('#award1', 1, { xPercent: 68, y: -232, z: 0 }, 0)
    .to('#award2', 1, { scale: 1.1, xPercent: 388, z: 0 }, 0)
    .to('#award3', 1, { scale: 1.5, xPercent: 183, y: 100, z: 1 }, 0)
    .to('#award4', 1, { xPercent: 130, z: -800 }, 0)
    .to('#award5', 1, { scale: 1.1, xPercent: -265, y: 200, z: 0 }, 0)
}

function centerAward4() {
  var tl = new TimelineMax()
    .to('#award5', 1, { scale: 1.1, xPercent: 15, y: 185, z: 0 }, 0)
    .to('#award1', 1, { xPercent: -120, y: -58, z: 0 }, 0)
    .to('#award2', 1, { xPercent: 146, z: -380 }, 0)
    .to('#award3', 1, { scale: 0.8, xPercent: 240, y: -67, z: 0 }, 0)
    .to('#award4', 1, { scale: 1.5, xPercent: 130, z: 1 }, 0)
}

function centerAward5() {
  var tl = new TimelineMax()
    .to('#award1', 1, { xPercent: -25, y: -226, z: 0 }, 0)
    .to('#award2', 1, { scale: 0.8, xPercent: 360, y: -200, z: 0 }, 0)
    .to('#award3', 1, { scale: 1.1, xPercent: 305, z: -575 }, 0)
    .to('#award4', 1, { scale: 1.1, xPercent: 5, y: 20, z: 0 }, 0)
    .to('#award5', 1, { scale: 1.5, xPercent: -100 }, 0)
}

$(function () {
  centerAward1();
})
// Awards animation END

function scrollStudies() {
  let x = 0
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    let ihs = $('#intro-home-section').height()
    if (scroll > ihs - 200) {
      if (x === 0) {
        $('.tag1').css({
          opacity: 0,
          animation: "fadeIn .2s ease-in both"
        })
        $('.tag2').css({
          opacity: 0,
          animation: "fadeIn 1s ease-in both"
        })
        $('.tag3').css({
          opacity: 0,
          animation: "fadeIn 1.8s ease-in both"
        })
        $('.tag4').css({
          opacity: 0,
          animation: "fadeIn 2.6s ease-in both"
        })
        $('.section-title').toggleClass('active');
      }
      x = 1
    }
  });
}

function scrollAwards() {
  let x = 0
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    let ihs = $('.studies-section').height() + $('#intro-home-section').height()
    if (scroll > ihs) {
      if (x === 0) {
        $('#award1').css({
          animation: "fadeIn 0.8s ease-in both"
        })
        $('#award2').css({
          animation: "fadeIn 1.6s ease-in both"
        })
        $('#award3').css({
          animation: "fadeIn 2.4s ease-in both"
        })
        $('#award4').css({
          animation: "fadeIn 3.2s ease-in both"
        })
        $('#award5').css({
          animation: "fadeIn 4s ease-in both"
        })
        $('#awardEmpty1').css({
          animation: "fadeIn 4.8s ease-in both"
        })
        $('#awardEmpty2').css({
          animation: "fadeIn 5.6s ease-in both"
        })
        $('.awards-title-main').toggleClass('active');
      }
      x = 1
    }
  });
}

// function scrollNews() {
//   let x = 0
//   $(window).on('scroll', function () {
//     var scroll = $(window).scrollTop();
//     let ihs = $('.awards-section').height() + $('.studies-section').height() + $('#intro-home-section').height()
//     if (scroll > ihs) {
//       if (x === 0) {
//         $('.newsSlide1').css({
//           transform: "translateZ(-50%)"
//         })
//         $('.newsSlide2').css({
//           animation: "slide 0.5s forwards"
//         })
//         $('.news-title').toggleClass('active');
//       }
//       x = 1
//     }
//   });
// }

(function () {
  const win = window
  const doc = document.documentElement

  doc.classList.remove('no-js')
  doc.classList.add('js')

  // Reveal animations
  if (document.body.classList.contains('has-animations')) {
    /* global ScrollReveal */
    const sr = window.sr = ScrollReveal()

    sr.reveal('.hero-title, .hero-paragraph, .hero-form', {
      duration: 1000,
      distance: '40px',
      easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
      origin: 'bottom',
      interval: 150
    })
  }


  // Moving objects
  const movingObjects = document.querySelectorAll('.is-moving-object')

  // Throttling
  function throttle (func, milliseconds) {
    let lastEventTimestamp = null
    let limit = milliseconds

    return (...args) => {
      let now = Date.now()

      if (!lastEventTimestamp || now - lastEventTimestamp >= limit) {
        lastEventTimestamp = now
        func.apply(this, args)
      }
    }
  }

  // Init vars
  let mouseX = 0
  let mouseY = 0
  let scrollY = 0
  let coordinateX = 0
  let coordinateY = 0
  let winW = doc.clientWidth
  let winH = doc.clientHeight

  // Move Objects
  function moveObjects (e, object) {
    mouseX = e.pageX
    mouseY = e.pageY
    scrollY = win.scrollY
    coordinateX = ((winW / 2) - mouseX) / 10
    coordinateY = ((winH / 2) - (mouseY - scrollY)) / 5

    for (let i = 0; i < object.length; i++) {
      const translatingFactor = object[i].getAttribute('data-translating-factor') || 20
      const rotatingFactor = object[i].getAttribute('data-rotating-factor') || 20
      const perspective = object[i].getAttribute('data-perspective') || 500
      let tranformProperty = []

      if (object[i].classList.contains('is-translating')) {
        tranformProperty.push('translate(' + coordinateX / translatingFactor + 'px, ' + coordinateY / translatingFactor + 'px)')
      }

      if (object[i].classList.contains('is-rotating')) {
        tranformProperty.push('perspective(' + perspective + 'px) rotateY(' + -coordinateX / rotatingFactor + 'deg) rotateX(' + coordinateY / rotatingFactor + 'deg)')
      }

      if (object[i].classList.contains('is-translating') || object[i].classList.contains('is-rotating')) {
        tranformProperty = tranformProperty.join(' ')

        object[i].style.transform = tranformProperty
        object[i].style.transition = 'transform 1s ease-out'
        object[i].style.transformStyle = 'preserve-3d'
        object[i].style.backfaceVisibility = 'hidden'
      }
    }
  }

  // Call function with throttling
  if (movingObjects) {
    win.addEventListener('mousemove', throttle(
      function (e) {
        moveObjects(e, movingObjects)
      },
      150
    ))
  }
}())

scrollStudies();
scrollAwards();
// scrollNews();

/* HOMEPAGE END */
