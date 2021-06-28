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

  filterViz();
  var dropdownMenu = d3.selectAll("#dropdown");
  dropdownMenu.on("change", filterViz);
  
  function filterViz() {
    if (d3.event != null) {
      d3.event.preventDefault();
    }
    userSelect = d3.select('#dropdown option:checked').text();
    for (var i = 0; i < participant_ids.length; i++) {
       if (parseInt(userSelect) === parseInt(participant_ids[i]))
           var selectIndex = i;
    }
    
    d3.select("#sample-metadata")
      .selectAll("p")
      .remove();
    d3.select("#sample-metadata")
      .append("p")
      .text(`Participant Ethnicity: ${ethnicities[selectIndex]}`)
      .append("p")
      .text(`Participant Gender: ${genders[selectIndex]}`)
      .append("p")
      .text(`Participant Age: ${ages[selectIndex]}`)
      .append("p")
      .text(`Participant Location: ${locations[selectIndex]}`)
      .append("p")
      .text(`Participant Navel Type: ${bbtypes[selectIndex]}`)
      .append("p")
      .text(`Participant Navel Wash Frequency: ${wfrequencies[selectIndex]}`);


  

  //render graphics calls
  otuIDs[selectIndex] = otuIDs[selectIndex].slice(0, 10);  
  sampleValues[selectIndex] = sampleValues[selectIndex].slice(0, 10);
  otuLabels[selectIndex] = otuLabels[selectIndex].slice(0, 10);

  otuIDs[selectIndex] = otuIDs[selectIndex].map(d => "OTU" + String(d));

  var trace = {
    y: otuIDs[selectIndex],
    x: sampleValues[selectIndex],
    text: otuLabels[selectIndex],
    name: "Top 10 OTUs",
    type: "bar",
    orientation: 'h'
  };

  var traceData = [trace];

  var layout = {
    title: "Navel BioDiversity Top 10 OTUs"
  };

  Plotly.newPlot("plot", traceData, layout);

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