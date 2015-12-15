/**
 *
 */
var test = 0;
var test2 = 0;
//define the main module having 4 dependencies: d3 (external library), caleydo main, caleydo data, and a header template for a common styling
define(['jquery', 'd3', '../caleydo_core/main', '../caleydo_core/data', '../caleydo_d3/databrowser', '../caleydo_vis/axis',
  '../caleydo_vis/box', '../caleydo_vis/distribution', '../caleydo_vis/barplot', '../caleydo_vis/heatmap',
  '../caleydo_core/multiform' , '../caleydo_window/main', '../gene_vis/linechart', '../gene_vis/boxchart', '../wrapper_bootstrap_fontawesome/header'],
  function ($, d3, C, data, browser, axis, box, dist, bars, heatmap, multiform, window, linechart, boxchart, header) {
  'use strict';

  var appHeader = header.create(document.body,
    {
    app: 'Gene App'
  });

  var base = document.getElementById('plots');
  var axisDiv = document.getElementById('axis');

  test2 = data;

  function renderGenomicData(gene)
  {
    // extract slice
    var rowData = gene.slice(120,121);
    // compute new range
    rowData.data().then( function(arr)
    {
      rowData.desc.value.range = d3.extent(arr);
      test = arr;

      console.log('create plots');
      //box.create(rowData, base);
      //dist.create(rowData, base, { scale: [2,3] });
      //bars.create(rowData,  base, { width: 1000, heighti: 200 });
      //heatmap.create(gene, base);
      //axis.create(rowData, axisDiv, {r: 0, scale: [8,0.08], shift: 20, orient: 'bottom'});
      // for

      // first look for all the divs and the one with id main, then append
      // a new division to it with css attribute position
      var windows = $('<div>').css('position', 'absolute').appendTo('#main')[0];

      // create a new visualization window
      var win = window.createVisWindow(windows,
        {
          closeable: false,
          animatedHeader: false,
          zcontrols: false,
          zoomAble: true,
          resizeable: false,
          draggable: false
        });

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

      var boxC = boxchart.create(rowData, win.node);
      win.title = 'First Box Chart';
      $('.slices').on('change', function() {
        //console.log(this.value);
        var rowData = gene.slice(this.value, this.value + 1);
        boxC.updateGraph(rowData); });



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

      console.log('finished.');
    });

    test2 = rowData;

  }

  // get one specific data
  data.getFirstByName('OV_D1_Mean_Tumor_7p_Mean_Small').then(
    function(d) { renderGenomicData(d); });


  // list all available datasets
  //data.list().then(function(list) {
    //for (var i = 0; i < list.length; ++i)
    //{
    //  console.log(list[i].desc.name);
    //}
  //});
});
