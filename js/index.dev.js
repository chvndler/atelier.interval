'use strict';

$(document).ready(function () {
  $('.sliderContainer').oninput(function () {
    // SLIDE 1
    var slide = document.getElementById('grainRange');
    var output = document.getElementById('grainValue');
    // var progressBar = document.getElementById('progress');
    output.innerHTML = slide.value;

    slide.oninput = function () {
      output.innerHTML = this.value;
      var cur = this.value - this.min;
      var max = this.max - this.min;
      // progressBar.style.width = (cur / max) * 100 + '%';
      var val = document.getElementById('grainRange').value;
      // cs.evalScript('grainLevelChange("' + val + '")', function (res) {});
    };

    // SLIDE 2
    var slide2 = document.getElementById('redRange');
    var output2 = document.getElementById('redValue');
    // var progressBar2 = document.getElementById('progress2');
    output2.innerHTML = slide2.value;

    slide2.oninput = function () {
      output2.innerHTML = this.value;
      var cur = this.value - this.min;
      var max = this.max - this.min;
      //   progressBar2.style.width = (cur / max) * 100 + '%';
      var val = document.getElementById('redRange').value;
      // cs.evalScript('redAmoutChange("' + val + '")', function (res) {});
    };
  });
})();
