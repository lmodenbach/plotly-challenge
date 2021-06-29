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
    .text(function (id) {
      return id;
    });

  //call function to filter data to initialize the page
  filterViz();

  //create listener for changes to dropdown menu, connect to filter function
  var dropdownMenu = d3.selectAll("#dropdown");
  dropdownMenu.on("change", filterViz);

  //filter function
  function filterViz() {

    //if accessed due to change prevent default reload behavior, if initializing skip
    if (d3.event != null) {
      d3.event.preventDefault();
    }

    //get user selection from dropdown, extract index number from array of IDs
    userSelect = d3.select('#dropdown option:checked').text();
    for (var i = 0; i < participant_ids.length; i++) {
      if (parseInt(userSelect) === parseInt(participant_ids[i]))
        var selectIndex = i;
    }

    //write to panel, retrieving needed data from arrays using index
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




    //render bar chart

    //slice out top 10 OTUs info
    Top10otuIDs = otuIDs[selectIndex].slice(0, 10);
    Top10sampleValues = sampleValues[selectIndex].slice(0, 10);
    Top10otuLabels = otuLabels[selectIndex].slice(0, 10);

    //create ID labels with OTU preceding ID
    Top10otuIDs = Top10otuIDs.map(d => "OTU" + String(d));

    //create trace/data and layout for horizontal bar chart per specs
    var barTrace = {
      y: Top10otuIDs,
      x: Top10sampleValues,
      text: Top10otuLabels,
      type: "bar",
      orientation: "h",
      marker: { color: "rgba(173, 244, 92, 0.69)" }
    };

    var barData = [barTrace];

    var barLayout = {
      title: "Navel BioDiversity Top 10 Bacteria Cultures",
      yaxis: {title: "Operational Taxonomic Unit ID"},
      xaxis: {title: "Number of Bacteria Cultures Present"}
    };

    //plot to bar tag id
    Plotly.newPlot("bar", barData, barLayout);


    //render bubble chart
    
    //attach OTU label to IDs
    otuIDs[selectIndex] = otuIDs[selectIndex].map(d => "OTU" + String(d));

    //empty array to hold variable length list of random colors
    colorArray = [];

    //populate array
    for (var i = 0; i < sampleValues[selectIndex].length; i++) {
      colorArray.push("rgb(" + String(Math.floor(Math.random() * 255) + 1) + "," + String(Math.floor(Math.random() * 255) + 1) + ","
                       + String(Math.floor(Math.random() * 255) + 1) + ")");
    }

    //reverse order of magnitude to ascending right
    otuIDs[selectIndex] = otuIDs[selectIndex].reverse();
    sampleValues[selectIndex] = sampleValues[selectIndex].reverse(); 
    otuLabels[selectIndex] = otuLabels[selectIndex].reverse();

    //create trace/data and layout for bubble chart per specs
    var bubbleTrace = {
      x: otuIDs[selectIndex],
      y: sampleValues[selectIndex],
      text: otuLabels[selectIndex],
      mode: 'markers',
      marker: {
        color: colorArray,
        size: sampleValues[selectIndex]
      }
    };

    var bubbleData = [bubbleTrace];

    var bubbleLayout = {
      title: "Navel BioDiversity Bacteria Cultures",
      showlegend: false,
      height: 600,
      width: 1000,
      xaxis: {title: "Operational Taxonomic Unit ID"},
      yaxis: {title: "Number of Bacteria Cultures Present"}  
    };

    //plot to bubble tag id
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);


    //render gauge chart

    //create trace/data and layout per specs, with added flair in color scale
    var gaugeData = [
      {
        type: "indicator",
        mode: "gauge+number",
        value: wfrequencies[selectIndex],
        title: { text: "Navel Wash Frequency Per Week", font: { size: 15 } },
        gauge: {
          axis: { range: [0, 9], tick0: 0, dtick: 1 },
          bar: { color: "rgba(174, 202, 176, 0.79)" },
          bgcolor: "rgba(207, 246, 209, 1)",
          borderwidth: 2,
          bordercolor: "rgba(49, 92, 52, 0.79)",
          steps: [
            { range: [0, 1], color: "rgba(22, 130, 121, 1)" },
            { range: [1, 2], color: "rgba(51, 216, 228, 1)" },
            { range: [2, 3], color: "rgba(27, 7, 206, 1)" },
            { range: [3, 4], color: "rgba(136, 7, 206, 1)" },
            { range: [4, 5], color: "rgba(244, 10, 209, 1)" },
            { range: [5, 6], color: "rgba(244, 45, 10, 1)" },
            { range: [6, 7], color: "rgba(236, 137, 8, 1)" },
            { range: [7, 8], color: "rgba(233, 243, 36, 1)" },
            { range: [8, 9], color: "rgba(109, 243, 36, 1)" }
          ],
        }
      }
    ];
    
    var gaugeLayout = {
      margin: { t: 25, r: 25, l: 25, b: 25 },
      paper_bgcolor: "rgba(167, 204, 167, 0.9)",
      font: { color: "rgba(49, 92, 52, 0.79)", family: "Arial" }
    };
    
    //plot to gauge tag id
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);

  }

});

