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
        Plotly.newPlot("bar",trace1)
    }
}


function optionChanged(id){d3.json("../StarterCode/samples.json").then(function (data){
    var samples = (data.samples)
    samples.forEach(sample=>{
        var ids = d3.select("#selDataset")
        ids.append("option")
        .attr("value",sample.id)
        .text(sample.id)
    })
    var filter_samp = samples.filter(samp => samp['id'] == id)
    var numero_uno = samples[0]
    build_plot(numero_uno)
    build_plot(filter_samp[0])
    console.log(numero_uno)
})}
optionChanged()
