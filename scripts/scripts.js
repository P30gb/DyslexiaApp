var APP = APP || {}

APP.dyselxiaapp = function(el) {
  $('.dyslexia').each(function(index, element) {
    const dyslexia = {

      init: function() {
        this.module = $('.dyslexia');
        this.variables();
        this.events();
        this.serviceWorker();
        this.steps.hide();
        this.module.find(`.js-steps[data-step="${1}"]`).show();
        this.module.find('.back').hide();
        window.location.hash = "";
      },
      variables: function() {
        this.counter = 1;
        this.steps = this.module.find('.js-steps');
        this.getlastStep = this.steps.length;
        this.lastStep = this.module.find(`.js-steps[data-step="${this.getlastStep}"]`);
        this.moodImg = this.lastStep.find('.faces img');
        this.choiceBtn = this.steps.find('a');
        this.people = {
          man: ['img/boy-happy.png', 'img/boy-normal.png', 'img/boy-sad.png'],
          girl: ['img/girl-happy.png', 'img/girl-normal.png', 'img/girl-sad.png'],
          bigMan: ['img/bigBoy-happy.png', 'img/bigBoy-normal.png', 'img/bigBoy-sad.png'],
          bigGirl: ['img/bigGirl-happy.png', 'img/bigGirl-normal.png', 'img/bigGirl-sad.png']
        }
      },
      events: function() {
        var view = this;
        this.choiceBtn.on('click', function(event) {
          event.preventDefault();
          view.choices(event);
        });
        this.module.find('.js-footer').on('click', function(event) {
          const visibleStep = view.module.find('.js-steps:visible');

          event.preventDefault();

          view.module.find('.back').show();

          // go to next Step if it has a choice selected or if we are on home Page
          if (visibleStep.find('a').hasClass('selected') || visibleStep.data('step') == 1) {
            view.counter++;
            view.steps.hide();
            view.module.find(`.js-steps[data-step="${view.counter}"]`).show();
          }

          // hide footer from last Step
          if (view.steps.length == view.counter) {
            view.lastStep.find('.faces a').eq(0).addClass('selected');
            $(this).hide();
          }

          //Change images src if its Boy or Girl
          if (visibleStep.find('a[data-people="boy"]').hasClass('selected')) {
            view.lastStep.find('.middle').attr('src', view.people.bigMan[0])
            view.changeImgSrc(view.people.man)
          } else {
            view.lastStep.find('.middle').attr('src', view.people.bigGirl[0])
            view.changeImgSrc(view.people.girl)
          }
        });
        this.lastStep.find('.faces a').on('click', function(event) {
          const visibleStep = view.module.find('.js-steps:visible');

          event.preventDefault();

          if (view.module.find('.faces img').attr('src') == view.people.man[0]) {
            view.selectedImg(this, view.people.bigMan);
          } else {
            view.selectedImg(this, view.people.bigGirl);
          }

        });
        this.module.find('.back img').on('click', function(event) {
          const visibleStep = view.module.find('.js-steps:visible');

          event.preventDefault();

          view.counter--;
          view.steps.hide();
          view.module.find(`.js-steps[data-step="${view.counter}"]`).show();
          view.steps.find('a').removeClass('selected');
          view.module.find('.js-footer').show()
          view.module.find(`.js-steps[data-step="${this.getlastStep}"]`).find('img').attr('src', '');

          if (visibleStep != view.steps.length) {
            view.module.css('height', '100vh')
          }

          if (view.module.find(`.js-steps[data-step="${1}"]`).is(':visible')) {
            view.module.find('.back').hide();
          }
        })
      },
      serviceWorker: function() {
        if ('serviceWorker' in navigator) {
          try {
            navigator.serviceWorker.register('sw.js');
          } catch (error) {

          }
        }
      },
      choices: function(event) {
        if (this.module.find('.js-steps:visible').data('step') == this.counter) {
          this.choiceBtn.removeClass('selected');
          $(event.currentTarget).addClass('selected')
        }
      },
      changeImgSrc: function(gender) {
        for (let i = 0; i < this.moodImg.length; i++) {
          this.moodImg[i].src = gender[i];
        }
      },
      selectedImg: function(element, gender) {
        this.imageSelected = $(element).find('img');
        this.newImage = [];
        this.getIndex;

        //  get selected image src and assign new big image
        for (let i = 0; i < this.moodImg.length; i++) {
          this.getIndex = this.moodImg.index(this.imageSelected);
          this.newImage.push(gender[i]);
          $(element).parent().siblings('figure').find('.middle').attr('src', this.newImage[this.getIndex])
        }
      }
    }
    dyslexia.init();
  });

}

$(document).ready(function() {
  var el = $('.dyslexia');
  if (el.length) {
    APP.dyselxiaapp();
  }
});
