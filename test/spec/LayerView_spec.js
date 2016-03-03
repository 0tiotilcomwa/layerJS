var jsdom = require("jsdom").jsdom;

var LayerView = require('../../src/framework/layerview.js');
var LayerData = require('../../src/framework/layerdata.js');
var CommonViewTests = require('./helpers/commonviewtests.js');
var CommonGroupViewTests = require('./helpers/commongroupviewtests.js');
var GroupView_renderChildPositionTests = require('./helpers/groupview_renderchildpositiontests.js');
var Common_renderChildPositionTests = require('./helpers/common_renderchildpositiontests.js');
var DatasetReader = require('./helpers/datasetreader.js');

var ViewsCommonParseTests = require('./helpers/views/common/parsetests.js');
var ViewsGroup_parseChildrenTests = require('./helpers/views/group/_parseChildrentests.js');


describe("LayerView", function() {
  var datasetReader = new DatasetReader();

  /*
      CommonViewTests(function() {
        return {
            data: datasetReader.readFromFile('simple_layerdata.js')[0],
            ViewType : LayerView
        };
      });
  */

  CommonGroupViewTests('simple_layerdata.js', function() {
    return {
      data: datasetReader.readFromFile('simple_layerdata.js'),
      ViewType: LayerView,
      parentId: 5
    };
  });

  Common_renderChildPositionTests('simple_layerdata.js', function() {
    return {
      data: datasetReader.readFromFile('simple_layerdata.js'),
      ViewType: LayerView,
      parentId: 5
    };
  });

  CommonGroupViewTests('test_data_set.js', function() {
    return {
      data: datasetReader.readFromFile('test_data_set.js'),
      ViewType: LayerView,
      parentId: 5
    };
  });

  Common_renderChildPositionTests('test_data_set.js', function() {
    return {
      data: datasetReader.readFromFile('test_data_set.js'),
      ViewType: LayerView,
      parentId: 5
    };
  });

  ViewsCommonParseTests({
    ViewType: LayerView,
    viewTypeName: 'LayerView',
    type: 'layer'
  });

  it('the Parse method will set nativeScroll to true if a scroller is found in the DOM element', function() {
    var element = document.createElement('div');
    element.innerHTML = "<div data-wl-helper='scroller'/>";


    var layerView = new LayerView(new LayerView.Model({}));
    var dataModel = layerView.parse(element);

    expect(dataModel.attributes.nativeScroll).toBeTruthy();
  });

  it('the Parse method will set nativeScroll to false if no scroller is found in the DOM element', function() {
    var element = document.createElement('div');
    element.innerHTML = "<div/>";


    var layerView = new LayerView(new LayerView.Model({}));
    var dataModel = layerView.parse(element);

    expect(dataModel.attributes.nativeScroll).toBeFalsy();
  });

  ViewsGroup_parseChildrenTests({
    ViewType: LayerView,
    viewTypeName: 'LayerView',
    type: 'layer',
    HTML: "<div id='100' data-wl-id='100' data-wl-type='layer'>" +
      "<div id='element1'></div>" +
      "<div id='101' data-wl-id='101' data-wl-type='frame'></div>" +
      "<div id='element2'></div>" +
      "<div id='102' data-wl-id='102' data-wl-type='frame'></div>" +
      "<div id='element3'></div>",
    expectedChildren: ['101', '102']
  });


})
