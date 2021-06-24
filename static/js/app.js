//read in json data from samples.json
d3.json("./static/data/samples.json").then((importedData) => {
  var data = importedData; 

  var participant_ids = data.metadata.map((row) => row.id);
  //when comparing input from user return index of selected participant_id
  //get all relevant data by index
  var ethnicities = data.metadata.map((row) => row.ethnicity);
  var genders = data.metadata.map((row) => row.gender);
  var ages = data.metadata.map((row) => row.age);
  var locations = data.metadata.map((row) => row.location);
  var bbtypes = data.metadata.map((row) => row.bbtype);
  var wfrequencies = data.metadata.map((row) => row.wfreq);

  var otuIDs = data.samples.map((row) => row.otu_ids);
  var sampleValues = data.samples.map((row) => row.sample_values); 
  var otuLabels = data.samples.map((row) => row.otu_labels);

  console.log(otuLabels[0]);

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