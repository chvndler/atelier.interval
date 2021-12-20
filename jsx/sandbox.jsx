// var compCheck = app.project.item.length;
var exist = app.project.item.length > 0;

// alert(projName)
// var projName = app.project.file
// projName.replace("/", "done")
// alert(projName)
// .replace(/%20/g, "_")
// .replace(/\.(.{3,4}$)/, "");

// alert(exist)

function doesExist() {
  if (app.project.file !== null) return true;
  else return false;
}
// var aepName = app.project.fullPath.split($.os.indexOf("Windows") > -1 ? "\\" : "/").pop();

// alert(app.project.fullPath)

function docName() {
  var data = [];
  // alert(aepName)
  if (exist) {
    data.push('project name');
    data.push('path to');
    return data;
  }
}

// FOR THIS WE NEED TO DEFINE A FUNCTION TO UNDO DIFFERENT ITEMS BASED ON THE TOGGLE SELECTION
// OF THE STYLE THE USERS SELECTS

function toggleGrain(isToggle) {
  for (i = 1; i < comp.numLayers; i++) {
    if (comp.layer(i).name == '03-GRAIN.mp4') {
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

// FOR EXAMPLE: LET deleteFiles() = TOGGLE STYLE 01
// IF THIS IS TRUE: TOGGLING STYLE ONE SHOULD REMOVE AND UNDO A LIST OF FILE DEFINED.

function deleteFiles01() {
  app.beginUndoGroup('Removing Layers');
  // precompileList (indexList);

  var list = [
    '01-SCRATCHES.mp4',
    '02-GAMMA.mp4',
    '03-GRAIN.mp4',
    '04-EDGES.mp4',
    '05-HORIZONTAL_BAR.mov',
    '06-FILM_BURNS.mov',
    '07-FRAME_OVERLAY.mp4',
    '08-SQUARE_OVERLAY.mp4',
    '09-DIRTY_EDGES.mov',
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

// why is this not possible
function atelierStyleOne(value) {
  //OK // default 0
  for (i = 1; i < comp.numLayers; i++) {
    if (comp.layer(i).name == '03-GRAIN.mp4') {
      var effect = comp.layer(i);
      effect.property('ADBE Effect Parade').property(1).property('ADBE Brightness & Contrast 2-0002').setValue(value);
    }
  }
}
