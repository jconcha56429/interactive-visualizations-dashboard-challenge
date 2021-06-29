function build_plot(samp){
    var samp_vals = []
    var otu_ids = []
    var labels = []

    for(i=0;i<10;i++){
        samp_vals.push(samp.sample_values[i]);
        otu_ids.push(`UTO ${samp.otu_ids[i]}`);
        labels.push(samp.otu_labels[i]);
        var trace1 = [{
            x: samp_vals,
            y: otu_ids,
            mode: 'markers',
            marker:{size:1},
            hoverinfo:"text",
            text: labels,
            type: "bar",
            orientation: 'h',
        }]
    }
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
    var demo_spot = d3.select("#sample-metadata")
    var table = demo_spot.append("tbody")

    for (i=0;i<7;i++){
        //console.log(Object.values(data)[i])
        //demo_spot.append("td").text('poopoo')[i]
        table.append("tr").text(`${Object.keys(data)[i]}: ${Object.values(data)[i]}`)
    }

    //console.log(Object.entries(data)[i])
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
    build_plot(numero_uno)
    build_bubble(numero_uno)
    build_plot(filter_samp[0])
    build_bubble(filter_samp[0])
    demographic_data(filter_demo[0])
    // demographic_data(filter_demo)
})}
optionChanged()
