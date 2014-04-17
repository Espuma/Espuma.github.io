//links object info needs working, to incorporate directionality, correctly calculated from different input files
//graaf.usedNodes is not working correctly currently, everything gets put in exactly twice
//color grouping does not work for all groups, and is overfitted/not generalized
//make doEverything bigger to include other ways of triggering events, using that to update the graaf?
//the work on zooming is once again reset at zero
	var groepen=[];
	var graaf={"nodes":[],"links":[],"usedNodes":[]} //{"nodes":[{}],"links":[{},{},{}]}

window.addEventListener('load',function(){
	var bestand=document.getElementById('bestan')
	bestand.addEventListener('change',doEverything,false)
});

//functions
function doEverything(event){
console.log("1");
loadFile(event,parseFileInput);
/*this doesn't really do anything right now, 
but eventually needs to control the whole building of the graaf. 
The calling of makeGraaf in loadFile needs to be moved to here.*/
}

function loadFile(ev1,callback){ //load file, return contents
console.log("2")
	var loaded=ev1.target.files[0]
	var reader=new FileReader();
	reader.onload=function(){
		console.log("3")
		var fileContent=event.target.result;
		callback(fileContent,loaded.name,makeGraaf)};
	reader.readAsText(loaded)
}//end loadFile

function parseFileInput(content,filename,callback){
console.log(content.split("\n")[2])
regels=content.split("\n")
if(filename.split(".")[1]==="asqg"){var graaf= ASQGparse(regels)}
if(filename.search("454")>-1){var graaf=Newblerparse(regels)}
callback(graaf)
}

function ASQGparse(regels){
	for(i=0;i<regels.length;i++){//asqg parsing
		if (regels[i].split("\t")[0]==="VT"){//collect nodes
			var id=regels[i].split("\t")[1]
			var seq=regels[i].split("\t")[2]
			graaf.nodes[graaf.nodes.length]={"id":id,"sequence":seq,"length":seq.length,"group":kleurGroep(id)}
		}//end node loop

		if(regels[i].split("\t")[0]==="ED"){//collect links and overlap information
			var info=regels[i].split("\t")[1],
				s=info.split(" ")[0],
				t=info.split(" ")[1],
				sos=parseInt(info.split(" ")[2]),
				sol=parseInt(info.split(" ")[3]),
				tos=parseInt(info.split(" ")[5]),
				tol=parseInt(info.split(" ")[6]),
				revcomp=parseInt(info.split(" ")[8]);
			graaf.links[graaf.links.length]={"source":vindNode(s),"target":vindNode(t),"sStart":sos,"sEnd":sol,"tStart":tos,"tEnd":tol,"revcomp":revcomp}//if revcomp=1, reverse one of the seqs to match them
			if(!(s in graaf.usedNodes)){graaf.usedNodes.push({"id":s})};
			if(!(t in graaf.usedNodes)){graaf.usedNodes.push({"id":t})};
		}//end link loop
	}//end asqg for loop
//	console.log(typeof regels)
	return graaf
}//end ASQGparse function

function Newblerparse(regels){
	console.log(typeof regels[2].split("\t")[0])
	for (i=0;i<regels.length;i++){
		if(!isNaN(parseInt(regels[i].split("\t")[0]))){//collect nodes
			var waarschuwing="sorry, newbler zuigt in output. geen sequences, geen groepen"
			var id=regels[i].split("\t")[0]
			var contig=regels[i].split("\t")[1]
			var lengte=regels[i].split("\t")[2]
			graaf.nodes.push({"id":id,"sequence":contig,"length":lengte,"group":0})
		}//end node loop
		if(regels[i].split("\t")[0]==="C"){//collect links
			s=regels[i].split("\t")[1]
			t=regels[i].split("\t")[3]
			graaf.links[graaf.links.length]={"source":vindNode(s),"target":vindNode(t),"sStart":"","sEnd":"","tStart":"","tEnd":"","revcomp":""}
			if(!(s in graaf.usedNodes)){graaf.usedNodes.push({"id":s})};
			if(!(t in graaf.usedNodes)){graaf.usedNodes.push({"id":t})};
		}
	}
	console.log(graaf.nodes[2])
	return graaf
}

function kleurGroep(id){
	if (!(id.substr(0,3) in groepen)){groepen.push(id.substr(0,3))}
	return groepen.indexOf(id.substr(0,3))
}	

function vindNode(id) {
	for (var i in graaf["nodes"]) {
		if (graaf["nodes"][i]["id"] === id) {
			return graaf["nodes"][i]
		}
	};
}


	
function makeGraaf(graaf){
	
	var maxLen=longestContig(graaf)
	
	var w=700,
		h=700,//(graaf.nodes.length+graaf.links.length),
		zoomx=1,
		zoomy=1,
		rand=30;//border padding
		
	var radius=function(d){
		var procent=(d.length*100)/maxLen;
		if(procent<=1){return 5}
		else {return 0.2*procent+5}
	}
		
	var color = d3.scale.category20();//maybe change color orders?
	
	var x = d3.scale.linear()
		.domain([0, w])
		.range([0, w]);

	var y = d3.scale.linear()
		.domain([0, h])
		.range([h, 0]);

	var svg = d3.select("body").append("svg")
		.attr("id", "graafsvg")
		.attr({"height":"90%"})
		.attr("viewBox", "0 0 "+w+" "+h)
		.attr("preserveAspectRatio", "xMidYMid meet")
		.append("svg:g")
		.attr("id","veld")
		//.call(d3.behavior.zoom().on("zoom",zoom)); //.x(x).y(y).scaleExtent([1, 8])//I have no idea. It doesn't work right now...
		
	var force = d3.layout.force()
		.nodes(graaf.nodes)
		.links(graaf.links)
		.size([w, h])
		.charge(-30)
		.linkDistance(15)
		.linkStrength(1)
		.on("tick", tick)
		.start();

	var link = svg.selectAll(".link")
		.attr("id","linksvg")
		.data(graaf.links)
		.enter().append("line")
		.attr("class", "link");

	var node = svg.selectAll(".node")
	   .data(graaf.nodes)
	 .enter().append("circle")
	   .attr("class", "node")
	   .attr("r", radius)
//	   .on("mouseover",function mouseover(d){})
	   .style("fill", function(d) { return color(d.group)})//if(d.group===0){return "blue"}else{return "orange"}})
	   .call(force.drag);

	function tick() {
		link.attr("x1",function(d){return d.source.x;})
			.attr("y1",function(d){return d.source.y;})
			.attr("x2",function(d){return d.target.x;})
			.attr("y2",function(d){return d.target.y;});
										  
		node.attr("cx",function(d){return Math.max(rand,Math.min(w-rand,d.x));})
			.attr("cy",function(d){return Math.max(rand,Math.min(h-rand,d.y));});
	}	
	
	function zoom() {//doesn't work
	  veld.attr("transform","translate("+d3.event.translate+")"+" scale("+d3.event.scale+")");
	}	
	
	function transform(d) {
		return "translate(" + x(d[0]) + "," + y(d[1]) + ")";
	}
}

function longestContig(graaf){
	var waarde=0;
	for (i in graaf.nodes){
		if (parseInt(graaf.nodes[i]["length"])>waarde){
			waarde=parseInt(graaf.nodes[i]["length"])
		}
	};
	return waarde
};

function exporteer(graaf){//lees data object, schrijf naar .dot file.
	var dotbestand="digraph:{\n"
	for (regel in graaf.nodes){dotbestand.push(regel.id+" [comment=\""+regel.sequence+"\",group=\""+regel.group+"\"]\n")}
	for (regel in graaf.links){dotbestand.push(regel.source+" -> "+regel.target+"[comment=\"sStart=\""+regel.sStart+"\",sEnd=\""+regel.sEnd+"\",tStart=\""+regel.tStart+"\",tEnd=\""+regel.tEnd+"\",revcomp=\""+regel.revcomp+"\"]\n")}
	dotbestand+="}"
}