var fileDisplay=document.getElementById('display');
window.onload=function(){
//load file; file recognition not yet implemented, below code is for formatting .dot files
var bestand=document.getElementById('bestand');
bestand.addEventListener('change',function(){
laadBestand=bestand.files[0];
var reader=new FileReader();
reader.readAsText(laadBestand,"UTF-8");
//store file in var
reader.onload=function(event){
var geladen=event.target.result;
regels=geladen.split("\n");
var graaf={"nodes":[],"links":[]} //{"nodes":[{}],"links":[{},{},{}]}
var vindNode = function (id) {
        for (var i in graaf["nodes"]) {
			if (graaf["nodes"][i]["id"] === id) {
				return graaf["nodes"][i]
			}
		};
	}

for(i=0;i<regels.length;i++){//asqg parsing

if (regels[i].split("\t")[0]==="VT"){//collect nodes
n=regels[i].split("\t")[1]
seq=regels[i].split("\t")[2]
graaf.nodes[graaf.nodes.length]={"id":n,"sequence":seq}

}//end if loop

if(regels[i].split("\t")[0]==="ED"){//collect links and overlap information
info=regels[i].split("\t")[1]
s=info.split(" ")[0]
t=info.split(" ")[1]



sos=parseInt(info.split(" ")[2])
sol=parseInt(info.split(" ")[3])
tos=parseInt(info.split(" ")[5])
tol=parseInt(info.split(" ")[6])
revcomp=parseInt(info.split(" ")[8])
graaf.links[graaf.links.length]={"source":vindNode(s),"target":vindNode(t),"sStart":sos,"sEnd":sol,"tStart":tos,"tEnd":tol,"revcomp":revcomp}//if revcomp=1, reverse one of the seqs to match them

}//de naam van de contig wordt nu opgeslagen als source/target, niet de plaats in de lijst van nodes. findNode() moet nog gebruikt worden.
}//end asqg for loop
//reload graph with nodes and links
	console.log(graaf.links[100]);
	var width = 6600,
		height = 6400;
	
	var color = d3.scale.category20();

	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height);

	var force = d3.layout.force()
		.nodes(graaf.nodes)
		.links(graaf.links)
		.size([width, height])
		.charge(-200)
		.on("tick", tick)
		.start();

	var link = svg.selectAll(".link")
	   .data(graaf.links)
	 .enter().append("line")
	   .attr("class", "link");

	var node = svg.selectAll(".node")
	   .data(graaf.nodes)
	 .enter().append("circle")
	   .attr("class", "node")
	   .attr("r", 4.5)
	   .style("fill", function(d) { return color(d.group); })
	   .call(force.drag);

	function tick() {
	  link.attr("x1", function(d) { return d.source.x; })
		  .attr("y1", function(d) { return d.source.y; })
		  .attr("x2", function(d) { return d.target.x; })
		  .attr("y2", function(d) { return d.target.y; });

	  node.attr("cx", function(d) { return d.x; })
		  .attr("cy", function(d) { return d.y; });
	}
	
}//end reader.onload
})//end bestand.addeventlistener
};//end window.onload

var minigraaf={"nodes":[{"id":"henk","group":4},{"id":"ab"},{"id":"bc"},{"id":"cd"}],"links":[{source:1,target:0},{source:2,target:1}]};