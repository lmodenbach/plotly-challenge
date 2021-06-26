//read in json data from samples.json
d3.json("./static/data/samples.json").then((importedData) => {
  var data = importedData; 

  //grab all needed elements and place in array variables
  var participant_ids = data.metadata.map((row) => row.id);
  var ethnicities = data.metadata.map((row) => row.ethnicity);
  var genders = data.metadata.map((row) => row.gender);
  var ages = data.metadata.map((row) => row.age);
  var locations = data.metadata.map((row) => row.location);
  var bbtypes = data.metadata.map((row) => row.bbtype);
  var wfrequencies = data.metadata.map((row) => row.wfreq);

  var otuIDs = data.samples.map((row) => row.otu_ids);
  var sampleValues = data.samples.map((row) => row.sample_values); 
  var otuLabels = data.samples.map((row) => row.otu_labels);

  //populate dropdown menu using d3
  d3.select("#dropdown")
  .selectAll("option")
  .data(participant_ids)
  .enter()
  .append("option")
  .text(function(id) {
    return id;
  });

  init();
  var dropdownMenu = d3.selectAll("#dropdown");
  dropdownMenu.on("change", filterViz);
  
  function init() {
    filterViz();
  }

  function filterViz() {
  //when comparing input from user return index of selected participant_id
  //get all relevant data by index
    d3.event.preventDefault();
    userSelect = d3.select('#dropdown option:checked').text();
    console.log(userSelect);

  }


});















  
//     // Slice the first 10 objects for plotting
//     data = data.slice(0, 10);
  
//     // Reverse the array due to Plotly's defaults
//     data = data.reverse();
  
//     // Trace1 for the Greek Data
//     var trace1 = {
//       x: data.map(row => row.greekSearchResults),
//       y: data.map(row => row.greekName),
//       text: data.map(row => row.greekName),
//       name: "Greek",
//       type: "bar",
//       orientation: "h"
//     };
  
//     // data
//     var chartData = [trace1];
  
//     // Apply the group bar mode to the layout
//     var layout = {
//       title: "Greek gods search results",
//       margin: {
//         l: 100,
//         r: 100,
//         t: 100,
//         b: 100
//       }
//     };
  
//     // Render the plot to the div tag with id "plot"
//     Plotly.newPlot("plot", chartData, layout);
//   });