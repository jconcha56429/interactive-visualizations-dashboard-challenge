function build_plot(samp){
    var samp_vals = []
    var otu_ids = []
    var labels = []
    for(i=0;i<10;i++){
        samp_vals.push(samp.sample_values[i]);
        otu_ids.push(`UTO ${samp.otu_ids[i]}`);
        labels.push(samp.otu_labels[i]);
    }
    var filtered_samp_vals = samp_vals.filter(function(x){
        return x !== undefined
    }) 
    var filtered_otu_ids = otu_ids.filter(function(x) {
        return x !== "UTO undefined";
   });
   var filtered_labels = labels.filter(function(x){
       return x !== undefined
   })
    console.log(filtered_otu_ids)
    var trace1 = [{
        x: filtered_samp_vals.reverse(),
        y: filtered_otu_ids.reverse(),
        mode: 'markers',
        marker:{size:1},
        hoverinfo:"text",
        text: filtered_labels.reverse(),
        type: "bar",
        orientation: 'h',
    }]
    Plotly.newPlot("bar",trace1)
}
function build_bubble(samp){
    var otu_ids = samp.otu_ids;
    var samp_values = samp.sample_values;
    var labels = samp.otu_labels;
    var trace2 = {
        x: otu_ids,
        y: samp_values,
        mode: 'markers',
        text:labels,
        hoverinfo:"text",
        marker: {
            size: samp_values,
        }
    }
    var data = [trace2];
    Plotly.newPlot('bubble',data)
}
function demographic_data(data){
    d3.select("tbody").remove()
    var demo_spot = d3.select("#sample-metadata")
    var table = demo_spot.append("tbody")
    for (i=0;i<7;i++){
        table.append("tr").text(`${Object.keys(data)[i]}: ${Object.values(data)[i]}`)

    }
}
function gauge(samp){
    var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: samp.wfreq,
          title: { text: "Washing Frequency" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 9] },
          }
        }
      ];
    console.log(samp)
    var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);
}
function optionChanged(id){d3.json("../StarterCode/samples.json").then(function (data){
    var demo_data = (data.metadata);
    var samples = (data.samples);
    samples.forEach(sample=>{
        var ids = d3.select("#selDataset")
        ids.append("option")
        .attr("value",sample.id)
        .text(sample.id)
    })
    var filter_samp = samples.filter(samp => samp['id'] == id)
    var filter_demo = demo_data.filter(data => data['id'] == id)
    var numero_uno = samples[0]
    var numero_dos = demo_data[0]
    build_plot(numero_uno)
    build_bubble(numero_uno)
    demographic_data(numero_dos)
    gauge(numero_dos)
    build_plot(filter_samp[0])
    build_bubble(filter_samp[0])
    demographic_data(filter_demo[0])
    gauge(filter_demo[0])
})}
optionChanged()
