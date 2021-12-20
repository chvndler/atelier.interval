// DIRECTORY
var comp;

//var folder;
var mainLayer, layerLength, assetsFolder;

// DEFINE TOGGLE STYLE 01
function toggleStyleOne(value) {
  for (i = 1; i < comp.numLayers; i++) {
    if (comp.layer(i).name == '01-ADY-DEFAULT.mp4') {
      var effect = comp.layer(i);
      effect.property('ADBE Effect Parade').property(1).property('ADBE Brightness & Contrast 2-0002').setValue(value);
    }
  }
}

// (or) -->
function toggleStyleOne(isToggle) {
  for (i = 1; i < comp.numLayers; i++) {
    if (comp.layer(i).name == '01-ADY-DEFAULT.mp4') {
      if (isToggle == 'true') {
        comp.layer(i).enabled = true;
      }
      if (isToggle == 'false') {
        comp.layer(i).enabled = false;
      }
      return;
    }
  }
}

function selectedLayer() {
  if (app.project.activeItem == null) {
    return '';
  } else {
    //After Validating, running Every functions.
    comp = app.project.activeItem;
    return comp.selectedLayers[0].name.toString();
  }
}

function test(txt) {
  alert(txt.toString());
}

function deleteFiles01() {
  app.beginUndoGroup('Removing Layers');
  // precompileList (indexList);

  var list = [
    '01-ADY-DEFAULT.mp4',
    // CONTINUE ADDING STYLES HERE

    'TRANSFORM',
    'RED & BLUR',
    'COLOR GLOW',
    'FLICKER',
  ];

  // REMOVE LAYERS BY ALTERING HERE
  var k, l, m;
  for (k = 0; k < list.length; k++) {
    for (l = 1; l < app.project.numItems + 1; l++) {
      if (list[k] == app.project.item(l).name) {
        app.project.item(l).remove();
      } else if (app.project.item(l).name == '(ADY)-Assets') {
        app.project.item(l).remove();
      }
    }
  }

  for (m = 1; m < comp.numLayers; m++) {
    //alert(comp.layer(m).name);
    if (comp.layer(m).name == 'Bot clip') {
      comp.layer(m).remove();
    } else if (comp.layer(m).name == 'Top clip') {
      comp.layer(m).remove();
    }
  }

  app.endUndoGroup();
}
