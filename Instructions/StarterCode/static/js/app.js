function build_plot(samp){
    test = []

    for(i=0;i<10;i++){
        test.push(samp.sample_values[i]);
        //var otu_ids = samp.otu_ids[i];
        //var otu_labels = samp.otu_labels[i];
        var trace1 = [{
            x: [1,2,3,4,5,6,7,8,9,10],
            y: test,
            type: "bar"
            
        }]
        Plotly.newPlot("bar",trace1)
    }
    console.log(test)

}


function optionChanged(id){d3.json("../StarterCode/samples.json").then(function (data){
    var samples = (data.samples)
    samples.forEach(sample=>{
        var ids = d3.select("#selDataset")
        ids.append("option")
        .attr("value",sample.id)
        .text(sample.id)
    })
    //console.log(id)
    var numero_uno = samples[0]
    build_plot(numero_uno)
})}
optionChanged()
