// Команда
$(function(){
  var accordItems = $('.accordeon__item');
  var accordName = $('.accordeon__name');
  var activ = 'accordeon__item--activ';

  accordName.on('click', function(){
    var clickName = $(this).closest(accordItems);
    if(clickName.hasClass(activ)){
      clickName.removeClass(activ);
    }
      else{
        clickName.addClass(activ).siblings().removeClass(activ);
      }
  })
});

// Мобильное меню

var menuLink = document.querySelector('.hamburger-menu-link');
var mobMenu  = document.querySelector('.mobail');
var close    = document.querySelector('.mobail__closing');

menuLink.addEventListener('click', function(event){
  event.preventDefault();
  mobMenu.style.display = 'block';
});

close.addEventListener('click', function(event){
  event.preventDefault();
  mobMenu.style.display = 'none';
});


// Меню 

$(function(){
  var mItem = $('.menu__item');
  var mName = $('.menu__name');
  var mActiv = 'menu__item--active';

  mName.on('click', function(){
    var mClick = $(this).closest(mItem);
    if(mClick.hasClass(mActiv)){
      mClick.removeClass(mActiv);
    }
      else{
        mClick.addClass(mActiv).siblings().removeClass(mActiv);
      }
  })
});


// карта

ymaps.ready(init);

  var placemarks = [
    {
      latitude: 59.97,
      longitude: 30.31,
      hintContent: '<div class="map__hint">ул. Литераторов, д. 19</div>',
      balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__img" src="img/elements/map-marker.png" alt="Бургер"/>',
        'Самые вкусные бургеры у нас!',
        '</div>'
      ]
    },
    {
      latitude: 59.94,
      longitude: 30.25,
      hintContent: '<div class="map__hint">Малый проспект В О, д 64</div>',
      balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__img" src="img/elements/map-marker.png" alt="Бургер"/>',
        'Самые вкусные бургеры у нас!',
        '</div>'
      ]
    },
    {
      latitude: 59.93,
      longitude: 30.34,
      hintContent: '<div class="map__hint">наб. реки Фонтанки, д. 56</div>',
      balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__img" src="img/elements/map-marker.png" alt="Бургер"/>',
        'Самые вкусные бургеры у нас!',
        '</div>'
      ]
    },
    {
      latitude: 59.92,
      longitude: 30.50,
      hintContent: '<div class="map__hint">ул. Лопатина, д. 48</div>',
      balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__img" src="img/elements/map-marker.png" alt="Бургер"/>',
        'Самые вкусные бургеры у нас!',
        '</div>'
      ]
    }
  ],
    geoObjects = [];

  function init() {
    var map = new ymaps.Map('map', {
      center: [59.94, 30.32],
      zoom: 12,
      controls: ['zoomControl'],
      behaviors: ['drag']
    });

  for (var i = 0; i < placemarks.length; i++) {
    geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
      {
        hintContent: placemarks[i].hintContent,
        balloonContent: placemarks[i].balloonContent.join('')
      },
      {
        iconLayout: 'default#image',
        iconImageHref: 'img/elements/map-marker.png',
        iconImageSize: [46, 57],
        iconImageOffset: [-23, -57],
        iconImageClipRect: [[415, 0], [461, 57]]
      });
  }
    var clusterer = new ymaps.Clusterer({
      clusterIcons: [
        {
          href: 'img/elements/map-marker.png',
          size: [100, 100],
          offset: [-50, -50]
        }
      ],
      clusterIconContentLayout: null
    });

    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
  }

// Слайдер

var left = document.querySelector('.slaider__scrool-left');
var right = document.querySelector('.slaider__scrool-reght');
var slaids = document.querySelector('.slaider__list');
var minRight = 0;
var maxRight = 400;
var step = 100;
var currentRight = 0;  

slaids.style.right= currentRight;

right.addEventListener('click', function(e){
  e.preventDefault();
  if(currentRight<maxRight){
     currentRight +=step; 
  }
  else{
    currentRight = 0;
    slaids.style.right = 0;
  }
  slaids.style.right = currentRight + "vw";
});

left.addEventListener('click', function(e){
  e.preventDefault();
  if(currentRight > minRight){
    currentRight -=step;
  }
  else{
    currentRight = maxRight;
  }
  slaids.style.right = currentRight + "vw";
});

$(function(){
  var compil = $('.compile');
  var composit = $('.composit');

  compil.on('click', function(e){
    e.preventDefault();
    var clickCompil = $(this).children(composit).last(); 
    if(clickCompil.css('display') == 'none'){
      clickCompil.css('display', 'block');
    }
    else{
      clickCompil.css('display', 'none');
    }
  });
});
// Отправка формы

var form = document.querySelector('.form');
var orderBtn = document.querySelector('.form__btn');

orderBtn.addEventListener('click', function(event){
  event.preventDefault();

  if(validateFofm(form)){
    var data = {
      name:form.elements.name.value,
      tel:form.elements.tel.value,
      street: form.elements.street.value,
      house: form.elements.house.value,
      housing: form.elements.housing.value,
      room: form.elements.room.value,
      floor: form.elements.floor.value,
      comment: form.elements.comment.value
    };
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.send(JSON.stringify(data));
    xhr.addEventListener('load', function(){
      var modalForm = document.querySelector('.modal');
      var modBtn = document.querySelector('.modal__btn');
      modalForm.style.display ='flex';
      modBtn.addEventListener('click', function(event){
        event.preventDefault();
        modalForm.style.display = 'none';
      }) 
       });
    }
});

function validateFofm(form){
  var valid = true;

  if(!validateFild(form.elements.name)){
    valid = false;
  }
  if(!validateFild(form.elements.tel)){
    valid = false;
  }
  if(!validateFild(form.elements.street)){
    valid = false;
  }
  if(!validateFild(form.elements.house)){
    valid = false;
  }
  if(!validateFild(form.elements.room)){
    valid = false;
  }
  return valid;
}
function validateFild(blocks){
  if(!blocks.checkValidity()){
    blocks.nextElementSibling.textContent = blocks.validationMessage;
    return false;
  }
    else{
      blocks.nextElementSibling.textContent = '';
      return true;
    }
}

// Модалка комментария
$(function(){
  var comBtn = $('.comment__btn');
  var comItem = $('.comment__item');
  var nohover = $('.nohover');
  var modalCom = $('.modalcom');
  var modalClose = $('.modalcom__closing');
  var elem = $('.comment__list');

  comBtn.on('click', function(event){
    event.preventDefault();
    var modal = $(this).parent().last().siblings().css('display', 'flex');
    if(modal.css('display') == 'flex'){
      comItem.addClass('nohover').removeClass('comment__item');
    }
  })

  modalClose.on('click', function(event){
    event.preventDefault();
    modalCom.css('display', 'none');

        if (modalCom.css('display') == 'none'){
          
       elem.children().addClass('comment__item').removeClass('nohover');

    }
  })
});

// Кнопочный скролл

$(function(){
  var sections = $('.section__wrapper');
  var display = $('.maincontent')  

  var inScroll = false;
  var md = new MobileDetect(window.navigator.userAgent);
  var isMobile = md.mobile();

  var setActiveMenuItem = function(itemEq){
    $('.pageScroll__item').eq(itemEq).addClass('activ').siblings().removeClass('activ');
  };

  var performTransition = function(sectionEq){
    var position = sectionEq * -100 + '%';
    var mouseInertionsFinished = 300;
    var transitionIsFinished = 1000;

    if(inScroll === false){
      inScroll = true;
      display.css({
        transform: 'translateY(' + position + ')'
      });
      sections.eq(sectionEq).addClass('active').siblings().removeClass('active');

      setTimeout(function(){
        inScroll = false;
        setActiveMenuItem(sectionEq);
      }, transitionIsFinished + mouseInertionsFinished);
    }
  };

  var scrollToSection = function(direction){
    var activeSection = sections.filter('.active');
    var prevSection = activeSection.prev();
    var nextSection = activeSection.next();

    if(direction === "up" && prevSection.length){
      performTransition(prevSection.index());
    }
    if(direction === "down" && nextSection.length){
      performTransition(nextSection.index());
    }
  };

  $(document).on({
    wheel: function(e){
      var direction = e.originalEvent.deltaY > 0 ? "down" : "up";
      scrollToSection(direction);
    },
    keydown: function(e){
      switch(e.keyCode){
        case 40:
          scrollToSection("down");
          break;
        case 38:
          scrollToSection("up");
          break;  
      }
    },
    touchmove: function(e){
      e.preventDefault();
    }
  });

  $("[data-scroll-to]").on("click", function(e){
    e.preventDefault();

    var target =$(e.currentTarget).attr("data-scroll-to");
    performTransition(target);
  });  

  if(isMobile){
    $(document).swipe({
      swipe:function(
        event,direction,distance,duration,fingerCount,filterData
      ) {
        var scrollDirection =direction ==="down" ? "up": "down";
      }
    })
  };
});

// Видео

var player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('yt__player', {
    height: '405',
    width: '660',
    videoId: 'M7lc1UVf-VE',
    playerVars: {
      controls: 0,
      disablekb: 0,
      modestbranding: 0,
      rel: 0,
      autoplay:0,
      showinfo:0
    },
    events: {
      'onReady': onPlayerReady,
       'onStateChange': onPlayerStateChange
    },
  });
}

function onPlayerStateChange(event){
  switch(event.data){
    case 1:
      $('.player__start').addClass('paused');
      $('.player__wrapper').addClass('player__wrapper--active');
    break;
    case 2:
      $('.player__start').removeClass('paused');
    break;
  }
}

function onPlayerReady(){
  var duration = player.getDuration();
  var interval;
  updateTimer()
  clearInterval(interval);
  interval = setInterval( function(){
    var completed = player.getCurrentTime();
    var percent = (completed / duration) * 100 + '%';
    changButtonPosition(percent);
    updateTimer()
  }, 1000);
}

function updateTimer(){
  $('.player__duration-completed').text(formatTime(player.getCurrentTime()));
  $('.player__duratiom-estimate').text(formatTime(player.getDuration()));
}

function formatTime(time){
  var roundTime = Math.round(time);

  var minutes = Math.floor(roundTime / 60);
  var seconds= roundTime - minutes * 60;
  var formatedSeconds = seconds < 10 ? '0${seconds}' : seconds;

  return minutes + ":" + formatedSeconds;
}

$('.player__start').on('click', function(e){
  e.preventDefault();
  var playerStatus =player.getPlayerState();
  
  if(playerStatus !== 1){
    player.playVideo();
  }
    else{
      player.pauseVideo();
    }
})

$('.player__playback').on('click', function(){
  var bar =$(e.currentTarget);
  var newButtonPosition = e.pageX - bar.offset().left;
  var clickedPercent = (newButtonPosition / bar.width()) * 100;
  var newPlayerTime = (player.getDuration() / 100) * clickedPercent;

  changButtonPosition(clickedPercent);
  player.seekTo(newPlayerTime);
})

$('.player__splash').on('click', function(){
  player.playVideo();
})

function changButtonPosition(percent){
  var percent = (completed / duration) * 100 + '%';
  $('.player__playback-button').css({
    left: percent
  })
}