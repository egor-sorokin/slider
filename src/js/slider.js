var slider;

(function () {
  'use strict';

  var extend = function (out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      if (!arguments[i])
        continue;

      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key))
          out[key] = arguments[i][key];
      }
    }

    return out;
  };

  slider = SliderClass;

  function SliderClass(element, options) {
    var self = this;
    self.data = {};
    self.data.slider = element;

    if (typeof options !== 'object') {
      options = {};
    }

    var defaults = {
      itemWidth: 300,
      itemHeight: 300,
      centerElementIndex: 3,
      classes: {
        slider: 'slider',
        list: 'slider__list',
        item: {
          default: 'slider__item',
          states: {
            leftOutside: 'slider__item--left-outside',
            left: 'slider__item--left',
            center: 'slider__item--center',
            right: 'slider__item--right',
            rightOutside: 'slider__item--right-outside'
          }
        },
        picture: 'slider__picture'
      }
    };

    self.data.options = extend({}, defaults, options);

    self.slide = function (direction) {
      self.data.centerElementIndex += direction;

      for (var i = 0; i < self.data.statesClassesKeys.length + 1; i++) {
        var elementIndex = self.data.centerElementIndex + (((self.data.statesClassesKeys.length - 1) / 2 * direction) + (i * -direction));

        if (elementIndex >= self.data.items.length) {
          elementIndex = elementIndex % self.data.items.length;
        } else if (elementIndex < 0) {
          elementIndex = elementIndex % self.data.items.length - 1;
          elementIndex = self.data.items.length + elementIndex;
        }

        var classIndex = direction <= 0 ? i : self.data.statesClassesKeys.length - 1 - i;

        if (i !== self.data.statesClassesKeys.length) {
          self.data.items[elementIndex].classList.add(self.data.options.classes.item.states[self.data.statesClassesKeys[classIndex]]);
        }
        if (i !== 0) {
          self.data.items[elementIndex].classList.remove(self.data.options.classes.item.states[self.data.statesClassesKeys[classIndex + direction]]);
        }
      }
    };

    function pictureResize(pictureElement) {
      var imgWidth = pictureElement.width,
          imgHeight = pictureElement.height,
          imgProportion = imgWidth / imgHeight,
          itemProportion = self.data.options.itemWidth / self.data.options.itemHeight;

      var newImgWidth = 0,
          newImgHeight = 0,
          marginValue = 0;

      if (itemProportion > imgProportion) {
        newImgWidth = self.data.options.itemWidth;
        newImgHeight = newImgWidth * (1 / imgProportion);
        marginValue = Math.round((newImgHeight - self.data.options.itemHeight) / 2);

        pictureElement.style.width = newImgWidth + 'px';
        pictureElement.style.height = newImgHeight + 'px';
        pictureElement.style.marginTop = -marginValue + 'px';
      } else if (itemProportion < imgProportion) {
        newImgHeight = self.data.options.itemHeight;
        newImgWidth = newImgHeight * (1 / imgProportion);
        marginValue = Math.round((newImgWidth - self.data.options.itemWidth) / 2);

        pictureElement.style.width = newImgWidth + 'px';
        pictureElement.style.height = newImgHeight + 'px';
        pictureElement.style.marginLeft = -marginValue + 'px';
      }
    }

    function init() {
      self.init = true;

      self.data.centerElementIndex = self.data.options.centerElementIndex;
      self.data.statesClassesKeys = Object.keys(self.data.options.classes.item.states);

      self.data.slider.classList.add(self.data.options.classes.slider);

      self.data.list = document.createElement('ul');
      self.data.list.classList.add(self.data.options.classes.list);

      self.data.items = [];

      var images = self.data.slider.children;

      for (var i = 0, len = images.length; i < len; i++) {
        var img = images[0];
        var li = document.createElement('li');

        li.classList.add(self.data.options.classes.item.default);

        img.classList.add(self.data.options.classes.picture);

        pictureResize(img);

        li.appendChild(img);
        li.style.width = self.data.options.itemWidth + 'px';
        li.style.height = self.data.options.itemHeight + 'px';

        self.data.list.appendChild(li);

        self.data.items.push(li);
      }

      self.data.list.style.height = self.data.options.itemHeight + 'px';
      self.data.slider.appendChild(self.data.list);

      buttonGenerate(+1);
      buttonGenerate(-1);

      keyBind();

      self.slide(1);
    }

    function buttonGenerate(direction) {
      var button = document.createElement('button');

      button.classList.add('slider__btn');
      button.classList.add('slider__btn--' + (direction > 0 ? 'right' : 'left'));
      button.addEventListener('click', function () {
        self.slide(direction);
      });

      self.data.slider.appendChild(button);
    }

    function keyBind() {
      window.addEventListener('keyup', function (event) {
        if (event.keyCode == 37) { // left arrow//
          self.slide(-1);
        } else if (event.keyCode == 39) { // right arrow
          self.slide(1);
        }
      });
    }

    init();
  }

})();
