/*************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2014 Adobe Inc.
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it. If you have received this file from a source other than Adobe,
 * then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 **************************************************************************/

// DIRECTORY
var comp;

// var FOLDER;
var mainLayer, layerLength, assetsFolder;

// DEFINE TOP LEVEL FUNCTIONS

// grainLevelChange();
// toggleGrain();
// redHalationChange();
// selectedLayer();

function grainLevelChange(value) {
  // OK // DEFAULT IS 100
  for (i = 1; i < comp.numLayers; i++) {
    if (comp.layer(i).name == '03-GRAIN.mp4') {
      var effect = comp.layer(i);
      effect.property('ADBE Effect Parade').property(1).property('ADBE Brightness & Contrast 2-0002').setValue(value);
    }
  }
}

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

function redHalationChange(value) {
  //OK // default 80
  for (i = 1; i < comp.numLayers; i++) {
    if (comp.layer(i).name == 'RED & BLUR') {
      var effect = comp.layer(i);
      effect.property('ADBE Effect Parade').property(1).property('ADBE Channel Blur-0001').setValue(value);
    }
  }
}

function selectedLayer() {
  if (app.project.activeItem == null) {
    return '';
  } else {
    // AFTER VALIDATION, RUN EVERY FUNCTION.
    comp = app.project.activeItem;
    return comp.selectedLayers[0].name.toString();
  }
}

// TEST STRING
function test(txt) {
  alert(txt.toString());
}

// BEGIN UNDO GROUP
function submitClick(val) {
  app.beginUndoGroup('Precompile');
  precompileStyleOneList(val);
  app.endUndoGroup();
}

//////////////////////////////// STYLE ONE ////////////////////////////////

function importStyleOneFiles(fileList) {
  fileList.sort();

  var w = comp.width;
  var h = comp.height;
  var vw, vh;
  var footageBlend = [
    BlendingMode.ADD, //SCRATCHES
    BlendingMode.LIGHTEN, //GAMMA
    BlendingMode.OVERLAY, //GRAIN
    BlendingMode.DIFFERENCE, //EDGES
    BlendingMode.CLASSIC_COLOR_BURN, //HORIZONTAL_BAR//
    BlendingMode.SCREEN, //FILM_BURNS//
    BlendingMode.HARD_LIGHT, //FRAME_OVERLAY
    BlendingMode.ADD, //SQUARE_OVERLAY
    BlendingMode.OVERLAY, //DIRTY_EDGES//
  ];

  for (var i = 0; i < fileList.length; i++) {
    // Verify if import is required
    var footageFile = getFileByName(fileList[i].name);

    if (footageFile == null) {
      var importFootage = app.project.importFile(new ImportOptions(fileList[i])); //Import to project
    }
    {
      // Rescale The clip to fit Composition
      vw = importFootage.width;
      vh = importFootage.height;
      xscale = (w / vw) * 100;
      yscale = (h / vh) * 100;
      var footage = comp.layers.add(importFootage); // Add footage to your composition
      footage.property('Scale').setValue([xscale, yscale]);
      footage.moveToBeginning();
      footage.blendingMode = footageBlend[i];
      //Set the duration
      var code = "loopOut('Cycle')";
      var outPoint = footage.outPoint;
      footage.timeRemapEnabled = true;
      footage.timeRemap.expression = code;
      var length = layerLength.toFixed(2);
      var duration = footage.source.duration.toFixed(2);
      footage.outPoint = length;
      footage.property('timeRemap').addKey(footage.inPoint);
      footage.property('timeRemap').addKey(duration);
      importFootage.parentFolder = assetsFolder;
      /*
      switch (importFootage.name) {
        case '02-GAMMA.mp4':
          footage.opacity.setValue(22);
          footage.property('ADBE Effect Parade').addProperty('ADBE Exposure2');
          break;

        case '03-GRAIN.mp4':
          footage.property('ADBE Effect Parade').addProperty('ADBE Brightness & Contrast 2');
          break;

        case '05-HORIZONTAL_BAR.mov':
          footage.property('ADBE Effect Parade').addProperty('ADBE Exposure2');
          footage.property('ADBE Effect Parade').property(1).name = 'Exposure';
          footage.property('ADBE Effect Parade').property(1).property('ADBE Exposure2-0003').setValue(1.6);
          footage.property('ADBE Effect Parade').addProperty('ADBE Glo2');
          footage.property('ADBE Effect Parade').property(2).name = 'GLOW';
          footage.property('ADBE Effect Parade').property(2).property('ADBE Glo2-0002').setValue(81.6);
          footage.property('ADBE Effect Parade').property(2).property('ADBE Glo2-0003').setValue(0);
          footage.property('ADBE Effect Parade').property(2).property('ADBE Glo2-0004').setValue(0);
          footage.selected = false;
          break;

        case '06-FILM_BURNS.mov':
          footage.enabled = false;
          break;

        case '09-DIRTY_EDGES.mov':
          footage.property('ADBE Effect Parade').addProperty('ADBE Gaussian Blur 2');
          footage.property('ADBE Effect Parade').property(1).name = 'GAUSSIAN BLUR';
          footage.property('ADBE Effect Parade').property(1).property('ADBE Gaussian Blur 2-0001').setValue(4);
          footage.selected = false;
          break;
      }
        */
    }
  }
}

// UNDO FUNCTION
function deleteStyleOneFiles() {
  app.beginUndoGroup('Removing Layers for Style One');
  // precompileList (indexList);

  var styleOneList = [
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

  // END UNDO GROUP
  app.endUndoGroup();
}

function precompileStyleOneList(layerName) {
  var styleOneList = [
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
    'Bot clip',
    'Top clip',
  ];

  list.push(layerName);

  // Alterate trough all the layers to get the "Layer Index" & precompile.
  var newList = [];
  var i, j;

  for (i = 1; i < comp.numLayers + 1; i++) {
    //alert(comp.layer(i).name);
    for (j = 0; j < list.length; j++) {
      //alert(comp.layer(i).name);
      if (comp.layer(i).name == list[j]);
      {
        newList.push(i);
        break;
      }
    }
  }

  comp.layers.precompose(newList, '(ADY)-001', true);
  /*
      var tempNullComp = app.project.items.addComp("tempNullComp", 100, 100, 1, 1, 24);
      var tempNullLayer = tempNullComp.layers.addNull();
      var nullFolder = tempNullLayer.source.parentFolder;
          tempNullLayer.source.remove();
          tempNullComp.remove();
      if (nullFolder.numItems === 0)
          nullFolder.remove();
     */
}

// CREATE STYLE ONE FOLDER
function createStyleOneFolder() {
  var folder_properties = { name: '(ADY)-001.Assets', typeName: 'Folder', label: 2, comment: '' };
  assetsFolder = findProjectItem(app.project.rootFolder, false, folder_properties);
  if (assetsFolder === null) {
    assetsFolder = app.project.items.addFolder('(ADY)-001.Assets');
  }
}

//////////////////////////////// STYLE TWO ////////////////////////////////
//
//
//
//
//
//
//
//
//////////////////////////////// STYLE TWO ////////////////////////////////

function getFileByName(fileName) {
  var myProject = app.project;
  for (var i = 1; i <= myProject.numItems; i++) {
    if (myProject.item(i) instanceof FolderItem && myProject.item(i).name == fileName) {
      result = folderName;

      return folderName;
    }
    return null;
  }
}

function findProjectItem(searchFolder, recursion, userData) {
  var folderItem;
  for (var i = 1, il = searchFolder.items.length; i <= il; i++) {
    folderItem = searchFolder.items[i];
    if (propertiesMatch(folderItem, userData)) return folderItem;
    else if (recursion === true && folderItem instanceof FolderItem && folderItem.numItems > 0) {
      var item = findProjectItem(folderItem, recursion, userData);
      if (item !== null) return item;
    }
  }
  return null;
}

function propertiesMatch(projectItem, userData) {
  if (typeof userData === 'undefined') return true;

  for (var propertyName in userData) {
    if (!userData.hasOwnProperty(propertyName)) continue;

    if (typeof userData[propertyName] !== typeof projectItem[propertyName]) return false;

    if (isArray(userData[propertyName]) && isArray(projectItem[propertyName])) {
      if (userData[propertyName].toString() !== projectItem[propertyName].toString()) {
        return false;
      }
    } else if (typeof userData[propertyName] === 'object' && typeof projectItem[propertyName] === 'object') {
      if (!propertiesMatch(projectItem[propertyName], userData[propertyName])) {
        return false;
      }
    } else if (projectItem[propertyName] !== userData[propertyName]) {
      return false;
    }
  }
  return true;
}
function isArray(object) {
  return Object.prototype.toString.apply(object) === '[object Array]';
}
