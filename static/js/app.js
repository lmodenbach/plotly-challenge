//read in json data from samples.json
d3.json("./static/data/samples.json").then((importedData) => {
    var data = importedData; 
});

function unpackData(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

  var ids = unpack(data.metadata, 0);
  console.log(ids);

















  
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