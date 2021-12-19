// Main.js
(function () {
  //MAIN FUNCTION
  'use strict';

  var cs = new CSInterface();

  document.addEventListener('DOMContentLoaded', function () {});

  document.getElementById('logo').addEventListener('click', function () {
    cs.openURLInDefaultBrowser('https://www.ady.world');
  });

  setInterval(function () {
    // UPDATE LAYER NAME
    cs.evalScript('selectedLayer()', function (res) {
      // DRAW LAYER NAME
      if (res == '') {
        res = 'Select a Layer';
      }
      document.getElementById('layerName').innerHTML = res;
      var win = window.self;
      var wid = win.outerHeight * 0.8;
      win.resizeTo(wid, win.outerHeight);
    });
  }, 500); //run this thing every half second

  document.getElementById('addButton').addEventListener('click', function () {
    // GET FILE LOCATION
    var loc = window.location.pathname;
    var dir = loc.substring(0, loc.lastIndexOf('/'));
    // GET MAIN LAYER FUNCTION
    var value = document.getElementById('layerName').innerHTML;
    localStorage.setItem('layerName', value);

    cs.evalScript('applyClick("' + dir + '")', function (res) {
      // AFTER IMPORTING
      if (res == 'ok') {
        window.location.href = 'settings.html';
      }
    });
  });
})();
