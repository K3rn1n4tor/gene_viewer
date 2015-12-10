/**
 *
 */
var test = 0;
var test2 = 0;
//define the main module having 4 dependencies: d3 (external library), caleydo main, caleydo data, and a header template for a common styling
define(['d3', '../caleydo_core/main', '../caleydo_core/data', '../caleydo_d3/databrowser', '../caleydo_vis/axis', '../caleydo_vis/box', '../caleydo_vis/distribution', '../caleydo_vis/barplot', '../caleydo_vis/heatmap', '../wrapper_bootstrap_fontawesome/header'], function (d3, C, data, browser, axis, box, dist, bars, heatmap, header) {
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
    var rowData = gene.slice(20,21);
    // compute new range
    rowData.data().then( function(arr)
    {
      rowData.desc.value.range = d3.extent(arr);
      test = arr;

      console.log('create plots');
      //box.create(rowData, base);
      dist.create(rowData, base, { scale: [2,3] });
      //bars.create(rowData,  base, { width: 1000, heighti: 200 });
      //heatmap.create(gene, base);
      //axis.create(rowData, axisDiv, {r: 0, scale: [8,0.08], shift: 20, orient: 'bottom'});
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
