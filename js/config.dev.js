(function () {
  //MAIN FUNCTION
  'use strict';

  var cs = new CSInterface();

  document.addEventListener('DOMContentLoaded', function () {});

  document.getElementById('logo').addEventListener('click', function () {
    cs.openURLInDefaultBrowser('https://www.ady.world');
  });

  document.getElementById('backButton').addEventListener('click', function () {
    cs.evalScript('remove()', function (res) {
      window.location.href = 'index.html';
    });
  });

  document.getElementById('endButton').addEventListener('click', function () {
    cs.evalScript('submitClick("' + mainLayer + '")', function (res) {
      window.location.href = 'index.html';
    });
  });

  // SLIDE 1
  var slide = document.getElementById('grainRange');
  var output = document.getElementById('grainValue');
  output.innerHTML = slide.value;

  slide.oninput = function () {
    output.innerHTML = this.value;
    var cur = this.value - this.min;
    var max = this.max - this.min;
    var val = document.getElementById('grainRange').value;
    cs.evalScript('grainLevelChange("' + val + '")', function (res) {});
  };

  // SLIDE 2
  var slide2 = document.getElementById('redRange');
  var output2 = document.getElementById('redValue');
  output2.innerHTML = slide2.value;

  slide2.oninput = function () {
    output2.innerHTML = this.value;
    var cur = this.value - this.min;
    var max = this.max - this.min;
    var val = document.getElementById('redRange').value;
    cs.evalScript('redAmoutChange("' + val + '")', function (res) {});
  };
})();
