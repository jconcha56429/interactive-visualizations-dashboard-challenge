function build_plot(samp){
    samp_vals = []
    var otu_ids = []

    for(i=0;i<10;i++){
        samp_vals.push(samp.sample_values[i]);
        otu_ids.push(`UTO ${samp.otu_ids[i]}`);
        //var otu_labels = samp.otu_labels[i];
        var trace1 = [{
            x: samp_vals,
            y: otu_ids,
            type: "bar",
            orientation: 'h',
        }]
        Plotly.newPlot("bar",trace1)
    }
    console.log(samp_vals)
    console.log(otu_ids)
}


function optionChanged(id){d3.json("../StarterCode/samples.json").then(function (data){
    var samples = (data.samples)
    samples.forEach(sample=>{
        var ids = d3.select("#selDataset")
        ids.append("option")
        .attr("value",sample.id)
        .text(sample.id)
    })
    console.log(id)
    //console.log(id)
    var numero_uno = samples[0]
    build_plot(numero_uno)

})}
optionChanged()
