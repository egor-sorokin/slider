(function ($) {
  'use strict';

  var actions = {
    slide: function (direction) {
      var self = this;

      self.slider.data.centerElementIndex += direction;

      console.log("break ------------");
      console.log("center: ", self.slider.data.centerElementIndex);

      for (var i = 0; i < self.slider.data.statesClassesKeys.length + 1; i++) {
        var elementIndex = self.slider.data.centerElementIndex + (((self.slider.data.statesClassesKeys.length - 1) / 2 * direction) + (i * -direction));

        if (elementIndex >= self.slider.data.items.length) {
          elementIndex = elementIndex % self.slider.data.items.length;
        } else if (elementIndex < 0) {
          elementIndex = elementIndex % self.slider.data.items.length - 1;
          elementIndex = self.slider.data.items.length + elementIndex;
        }

        var classIndex = direction <= 0 ? i : self.slider.data.statesClassesKeys.length - 1 - i;

        console.log("elementIndex: ", elementIndex);
        console.log("classIndex: ", classIndex);

        if (i !== self.slider.data.statesClassesKeys.length) {
          self.slider.data.items[elementIndex].addClass(self.slider.data.options.classes[self.slider.data.statesClassesKeys[classIndex]]);
        }
        if (i !== 0) {
          self.slider.data.items[elementIndex].removeClass(self.slider.data.options.classes[self.slider.data.statesClassesKeys[classIndex + direction]]);
        }
      }
    },
    _init: function (customOptions) {
      var self = this;

      self.slider.init = true;

      self.slider.data = {};
      self.slider.data.options = customOptions;

      self.slider.data.centerElementIndex = self.slider.data.options.centerElementIndex;
      self.slider.data.statesClassesKeys = Object.keys(self.slider.data.options.classes);

      self.slider.data.$slider = $(this).addClass('slider');
      self.slider.data.$list = $('<ul/>')
          .addClass('slider__list')
          .appendTo(self.slider.data.$slider);
      self.slider.data.items = [];

      self.slider.data.$slider.children('img')
          .addClass('slider__picture')
          .each(function () {
            self.slider.data.items.push(
                $('<li/>')
                    .addClass('slider__item')
                    .appendTo(self.slider.data.$list)
                    .append($(this))
            );
          });

      self.slider.data.buttons = $(
          $('<button/>')
              .addClass('slider__btn slider__btn--left')
              .appendTo(self.slider.data.$slider)
              .on('click', function () {
                actions.slide.call(self, -1);
              }),
          $('<button/>')
              .addClass('slider__btn slider__btn--right')
              .appendTo(self.slider.data.$slider)
              .on('click', function () {
                actions.slide.call(self, 1);
              })
      );

      actions._keyBind.call(this);

      actions.slide.call(self, 1);
    },

    _keyBind: function () {
      var self = this;

      $(window).keyup(function (event) {
        if (event.keyCode == 37) { // left arrow
          actions.slide.call(self, -1);
        } else if (event.keyCode == 39) { // right arrow
          actions.slide.call(self, 1);
        }
      });
    }

  };

  $.fn.slider = function (options, params) {
    if (typeof options === 'object' || typeof options === 'undefined') {
      options = $.extend({}, $.fn.slider.defaults, options);

      if (!this.slider.init) {
        actions._init.call(this, options);
      }
    } else if (typeof actions[options] !== 'undefined') {
      actions[options].call(this, params);
    }

    return this;
  };

  $.fn.slider.defaults = {
    centerElementIndex: 3,
    classes: {
      leftOutside: 'slider__item--left-outside',
      left: 'slider__item--left',
      center: 'slider__item--center',
      right: 'slider__item--right',
      rightOutside: 'slider__item--right-outside'
    }
    /* imagesCount: 7*/
  };

  $('[data-bind="slider"]').slider();


})(jQuery);
