/**
 *
 */
var debug = 0;
var debug2 = 0;

var rangeModule = 0;
//define the main module having 4 dependencies: d3 (external library), caleydo main, caleydo data, and a header template for a common styling
define(['jquery', 'd3', '../caleydo_core/ajax', '../caleydo_core/main', '../caleydo_core/data',
  '../caleydo_d3/databrowser', '../caleydo_vis/axis', '../caleydo_vis/box', '../caleydo_vis/distribution',
  '../caleydo_vis/barplot', '../caleydo_vis/heatmap', '../caleydo_core/multiform', '../caleydo_window/main',
  '../gene_vis/linechart', '../gene_vis/boxchart', '../gene_vis/boxplot', '../caleydo_core/range',
  '../caleydo_core/plugin', '../wrapper_bootstrap_fontawesome/header'],
  function ($, d3, ajax, C, data, browser, axis, box, dist, bars, heatmap, multiform, window, linechart, boxchart, boxplot, range, plugin, header) {
  'use strict';

  var appHeader = header.create(document.body,
    {
    app: 'Gene App'
  });

  var base = document.getElementById('plots');
  var axisDiv = document.getElementById('axis');

  debug2 = data;

  rangeModule = range;

  function renderGenomicData(gene)
  {
    console.log(gene);
    debug = gene;

    // extract column slice
    //var colData = gene.slice(121);
    // for row data --> take transposed matrix and use slice function
    var rowData = gene.t.slice(0);
    rowData.data().then( function(arr)
    {
      //debug2 = arr;
      console.log(arr);
      rowData.desc.value.range = d3.extent(arr);

      console.log('create plots');
      //box.create(rowData, base);
      //dist.create(rowData, base, { scale: [2,3] });
      //bars.create(rowData,  base, { width: 1000, heighti: 200 });


      //axis.create(rowData, axisDiv, {r: 0, scale: [8,0.08], shift: 20, orient: 'bottom'});
      // for

      // first look for all the divs and the one with id main, then append
      // a new division to it with css attribute position
      var winBoxChart = $('<div>').css('position', 'relative').appendTo('.boxChart')[0];

      // create a new visualization window
      var winBox = window.createVisWindow(winBoxChart,
        {
          closeable: false, animatedHeader: false, zcontrols: false,
          zoomAble: true, resizeable: false, draggable: false
        });

      var winBoxPlot = $('<div>').css('position', 'relative').appendTo('.boxPlot')[0];
      var winBoxP = window.createVisWindow(winBoxPlot,
        {
          closeable: false, animatedHeader: false, zcontrols: false,
          zoomAble: true, resizeable: false, draggable: false
        });


      //var test = [[1,2,3],[3,4,5]];
      //
      //var mat = matrix.constructor()
      //heatmap.create(test, win.node);

      // create a new multiform
      // displays a window with title and all plugins that are able to display the data
      //var multiP = Promise.resolve(multiform.create(gene, win.node, { initialVis : 2 }));
      //heatmap.create(gene, win.node, { scale: [0.1,0.1] });
      //dist.create(rowData, win.node, { scale: [2,4] });
      //win.title = 'Histogram';

      //var lineC = linechart.create(rowData, win.node);
      //win.title = 'First Line Chart';
      //$('.slices').on('change', function() {
      //  //console.log(this.value);
      //  var rowData = gene.slice(this.value, this.value + 1);
      //  lineC.updateGraph(rowData); });

      var boxC = boxchart.create(rowData, winBox.node);
      winBox.title = 'First Box Chart';
      $('.slices').on('change', function() {
        //console.log(this.value);
        var rowData = gene.t.slice(this.value, this.value + 1);
        boxC.updateGraph(rowData); });

      var boxP = boxplot.create(rowData, winBoxP.node);
      winBoxP.title = 'First Box Plot';
      $('.slices').on('change', function() {
        //console.log(this.value);
        var rowData = gene.t.slice(this.value, this.value + 1);
        boxP.updateGraph(rowData); });

      $('.slices').on('change', function() {
        var newValue = this.value;
        $('.sliderText').text('Slice: ' + String(newValue));
      });




      //multiP.then(function(multi)
      //{
      //  console.log('multiform creation completed');
      //  // add icon viewer to choose which vis plugin should be used
      //  multiform.addIconVisChooser(win.toolbar.node, multi);
      //  // attach multiform to window
      //  win.attachVis(multi, multi.asMetaData);
      //  // set position if pos is not valid
      //  win.pos = [400, 50];
      //  // make window movable
      //  var vis = win.adapter(multi);
      //  // this is important, otherwise title will not be displayed and window is not movable
      //
      //  var entry =
      //  {
      //    mw: win,
      //    multi : multi
      //  };
      //
      //  return entry;
      //});
    });


    //var query = {};
    ////console.log(path);
    //console.log('try to invoke clustering')
    //var test = ajax.getAPIJSON('/gene_clustering/kmeans/3/' + gene.desc.id, query);
    //test.then(function (d) { console.log(d); });
    //
    //var test2 = ajax.getAPIJSON('/gene_clustering/hierarchical/complete/' + gene.desc.id, query);
    //test2.then(function (d) { console.log(d); });

    console.log('finished.');
    //test2 = rowData;

  }

  // get one specific data
  data.getFirstByName('OV_D1_Mean_Tumor_7p_Mean_Small').then(
    function(d) {
      renderGenomicData(d);
    });


  // list all available datasets
  //data.list().then(function(list) {
    //for (var i = 0; i < list.length; ++i)
    //{
    //  console.log(list[i].desc.name);
    //}
  //});
});
