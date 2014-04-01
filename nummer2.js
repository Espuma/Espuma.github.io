var fileDisplay=document.getElementById('display');
var graaf={"nodes":[],"links":[],"usedNodes":[]} //{"nodes":[{}],"links":[{},{},{}]}

window.onload=function(){
//load file; file recognition not yet implemented, below code is for formatting .dot files

var vindNode = function (id) {
        for (var i in graaf["nodes"]) {
			if (graaf["nodes"][i]["id"] === id) {
				return graaf["nodes"][i]
			}
		};
	}

var groepen=[];
var kleurGroep = function(id){
	if (!(id.substr(0,3) in groepen)){groepen.push(id.substr(0,3))}
	return groepen.indexOf(id.substr(0,3));
};	
	
bestand.addEventListener('change',function(){
	laadBestand=bestand.files[0];
	var reader=new FileReader();
	reader.readAsText(laadBestand,"UTF-8");
	//store file in var
reader.onload=function(event){
	var geladen=event.target.result;
	regels=geladen.split("\n");
	
for(i=0;i<regels.length;i++){//asqg parsing

if (regels[i].split("\t")[0]==="VT"){//collect nodes
	var id=regels[i].split("\t")[1]
	var seq=regels[i].split("\t")[2]
	graaf.nodes[graaf.nodes.length]={"id":id,"sequence":seq,"group":kleurGroep(id)}
}//end node if loop

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
	if(!(s in graaf.usedNodes)){graaf.usedNodes.push({"id":s})};
	if(!(t in graaf.usedNodes)){graaf.usedNodes.push({"id":t})};
	
}//end link if loop
}//end asqg for loop
//load graph with nodes and links
window.graaf=graaf;
	var maxLen=0;
	for (i in graaf.nodes){if (graaf.nodes[i]["sequence"].length>maxLen){maxLen=graaf.nodes[i]["sequence"].length}};
	var w=6600,
		h=6400,
		zoomx=1,
		zoomy=1;
	
	var color = d3.scale.category20();

	var svg = d3.select("body").append("svg")
		.attr("id", "graafsvg")
		.attr("viewBox", "0 0 " + w + " " + h )
		.attr("preserveAspectRatio", "xMidYMid meet")

	var force = d3.layout.force()
		.nodes(graaf.nodes)
		.links(graaf.links)
		.size([w, h])
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
	   .attr("r", function(d){return 10*(d.sequence.length/maxLen)})
	   .style("fill", function(d) { if(d.group===0){return "blue"}else{return "orange"}})
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