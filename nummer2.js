//global vars
var graaf={"nodes":[],"links":[],"usedNodes":[]} //{"nodes":[{}],"links":[{},{},{}]}
var groepen=[];

//functions
var ASQGparse=function(regels){
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
	
	return graaf
}//end ASQGparse function

var Newblerparse=function(regels){
	for (i=0);i<regels.length;i++){
		if(typeof regels[i].split("/t")[0]==="number"){//collect nodes
			var waarschuwing="sorry, newbler zuigt in output. geen sequences, geen groepen"
			var id=regels.split("/t")[1]
			var lengte=regels.split("/t")[2]
			graaf.nodes[graaf.nodes.length]={"id":id,"sequence":"","length":lengte,"group":0}
		}//end node loop
		if(regels[i].split("/t")[0]==="C"){//collect links
			

		}
}

var vindNode = function (id) {
	for (var i in graaf["nodes"]) {
		if (graaf["nodes"][i]["id"] === id) {
			return graaf["nodes"][i]
		}
	};
}

var kleurGroep = function(id){
	if (!(id.substr(0,3) in groepen)){groepen.push(id.substr(0,3))}
	return groepen.indexOf(id.substr(0,3))
}	

var exporteer=function (graaf){//lees data object, schrijf naar .dot file.
	var dotbestand="digraph:{\n"
	for (regel in graaf.nodes){dotbestand.push(regel.id+" [comment=\""+regel.sequence+"\",group=\""+regel.group+"\"]\n")}
	for (regel in graaf.links){dotbestand.push(regel.source+" -> "+regel.target+"[comment=\"sStart=\""+regel.sStart+"\",sEnd=\""+regel.sEnd+"\",tStart=\""+regel.tStart+"\",tEnd=\""+regel.tEnd+"\",revcomp=\""+regel.revcomp+"\"]\n")}
	dotbestand+="}"
}


window.onload=function(){//is nodig voor addEventListener
	bestand.addEventListener('change',function(){ //when file is loaded, start with netvis
		var reader=new FileReader();
		reader.readAsText(bestand.files[0],"UTF-8");

		reader.onload=function(event){
			regels=event.target.result.split("\n");//load file, split by lines
			
			ASQGparse(regels)//recognize file type, apply right parser
			//hier reader.onload afkappen en een graaf.onload maken voor dynamisch laden?
			//load graph with nodes and links
			//window.graaf=graaf;
			var maxLen=0;
			for (i in graaf.nodes){if (graaf.nodes[i]["sequence"].length>maxLen){maxLen=graaf.nodes[i]["sequence"].length}};
			var w=graaf.links.length/4,
				h=(graaf.links.length)/4,
				zoomx=1,
				zoomy=1,
				rand=30;//border padding
			var radius=function(d){
				var procent=(d.sequence.length*100)/maxLen;
				if(procent<=1){return 5}
				else {return 0.2*procent+5}
			}
				
			var color = d3.scale.category20();
			
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
				.call(d3.behavior.zoom().on("zoom",zoom)); //.x(x).y(y).scaleExtent([1, 8])
				
			//var VIS=svg.append('svg:g');

			var force = d3.layout.force()
				.nodes(graaf.nodes)
				.links(graaf.links)
				.size([w, h])
				.charge(-30)
				.linkDistance(1)
				.linkStrength(12)
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
			
			function zoom() {
			  veld.attr("transform","translate("+d3.event.translate+")"+" scale("+d3.event.scale+")");
			}	
			
			function transform(d) {
				return "translate(" + x(d[0]) + "," + y(d[1]) + ")";
			}
			//exporteer(graaf)//make element with 'right click, save as, download .dot file

		}//end reader.onload
	})//end bestand.addeventlistener
};//end window.onload

var minigraaf={"nodes":[{"id":"henk","group":4},{"id":"ab"},{"id":"bc"},{"id":"cd"}],"links":[{source:1,target:0},{source:2,target:1}]};