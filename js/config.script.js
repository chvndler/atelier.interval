(function () {
  //MAIN FUNCTION
  'use strict';

  var cs = new CSInterface();

  var mainLayer = localStorage.getItem('layerName');

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
  var progressBar = document.getElementById('progress');
  output.innerHTML = slide.value;
  progressBar.style.width = '0%';

  slide.oninput = function () {
    output.innerHTML = this.value;
    var cur = this.value - this.min;
    var max = this.max - this.min;
    progressBar.style.width = (cur / max) * 100 + '%';
    var val = document.getElementById('grainRange').value;
    cs.evalScript('grainLevelChange("' + val + '")', function (res) {});
  };

  // SLIDE 2
  var slide2 = document.getElementById('redRange');
  var output2 = document.getElementById('redValue');
  var progressBar2 = document.getElementById('progress2');
  output2.innerHTML = slide2.value;
  progressBar2.style.width = '30%';

  slide2.oninput = function () {
    output2.innerHTML = this.value;
    var cur = this.value - this.min;
    var max = this.max - this.min;
    progressBar2.style.width = (cur / max) * 100 + '%';
    var val = document.getElementById('redRange').value;
    cs.evalScript('redAmoutChange("' + val + '")', function (res) {});
  };

  document.getElementById('addGrain').addEventListener('click', function () {
    var check = document.getElementById('addGrain').checked;

    cs.evalScript('toggleGrain("' + check + '")', function () {});
  });
})();

/*
let listeSwitch;


document.addEventListener("DOMContentLoaded", function () {
    listeSwitch = document.querySelectorAll(".switch");
    for (let index = 0; index < listeSwitch.length; index++) {

        listeSwitch[index].querySelector("circle").setAttribute("r", listeSwitch[index].querySelector("svg").getBoundingClientRect().height * 0.9 / 2);
        if (listeSwitch[index].querySelector("input").checked) {
            listeSwitch[index].querySelector("circle").setAttribute("cx", listeSwitch[index].querySelector("svg").getBoundingClientRect().width - (listeSwitch[index].querySelector("svg").getBoundingClientRect().height / 2));
        } else {
            listeSwitch[index].querySelector("circle").setAttribute("cx", (listeSwitch[index].querySelector("svg").getBoundingClientRect().height / 2));
        }

        listeSwitch[index].querySelector("circle").setAttribute("cy", listeSwitch[index].querySelector("svg").getBoundingClientRect().height / 2);
        listeSwitch[index].addEventListener("click", function () {

            if (listeSwitch[index].querySelector("input").checked) {
                listeSwitch[index].querySelector("circle").setAttribute("cx", listeSwitch[index].querySelector("svg").getBoundingClientRect().width - (listeSwitch[index].querySelector("svg").getBoundingClientRect().height / 2));
            } else {
                listeSwitch[index].querySelector("circle").setAttribute("cx", (listeSwitch[index].querySelector("svg").getBoundingClientRect().height / 2));
            }

        })

    }


    window.addEventListener("resize", function () {

        for (let i = 0; i < listeSwitch.length; i++) {

            listeSwitch[i].querySelector("circle").setAttribute("r", listeSwitch[i].querySelector("svg").getBoundingClientRect().height * 0.9 / 2);
            if (listeSwitch[i].querySelector("input").checked) {
                listeSwitch[i].querySelector("circle").setAttribute("cx", listeSwitch[i].querySelector("svg").getBoundingClientRect().width - (listeSwitch[i].querySelector("svg").getBoundingClientRect().height / 2));
            } else {
                listeSwitch[i].querySelector("circle").setAttribute("cx", (listeSwitch[i].querySelector("svg").getBoundingClientRect().height / 2));
            }
            listeSwitch[i].querySelector("circle").setAttribute("cy", listeSwitch[i].querySelector("svg").getBoundingClientRect().height / 2);

        }

    })


})
*/
