(function (slider) {
  'use strict';

  var sliders = [];
  var slidersElements = document.querySelectorAll('[data-bind="slider"]');

  for (var i = 0, len = slidersElements.length; i < len; i++) {
    var currentSlider = new slider(slidersElements[i], {
      itemWidth: 300,
      itemHeight: 300
/*      width: 1000,
      height: 300,
      innerPadding: 10,
      outerPadding: 20*/
    });

    sliders.push(currentSlider);
  }

})(slider);
