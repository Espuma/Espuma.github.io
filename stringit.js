//http://bl.ocks.org/mbostock/1093130  click functionality I want, simple on/off toggle
//http://jsfiddle.net/mdml/Q7uNz data structure I want, simple graph json

//origin=for gravity
//group=ID for aggregation
//id=group[0]=for nodelookup purposes
//reads and their ratios are used to determine both group and origin

//I might want an option (in UI) at n=5 to remove any node that has no children (remove all single-node-subgraphs)

//when node is clicked, it is selected.
//when mouse scrolls, selected nodes zoom in/out.
//n is checked, lowered/heightened by 1, and corresponding underlying nodes are expanded/collapsed
	
var graaf={"nodes":[],"edges":[]}, //{"nodes":[{}],"edges":[{},{},{}]}
	maxLen=0,
	r=30,//bounding box padding, measured from center of node
	totalGroups,w,h,aspRatio,//newblerACE["1"].length-1
	level1=[],level2=[],level3=[],level4=[],
	neighbours={},nodelookup=[];
    
window.addEventListener('load',function(){
	var bestand=document.getElementById('bestand')
	bestand.addEventListener('change',readFile,false)
	//only doEverything once both files (graph&read map) are selected
});

function readFile(ev){
	var loaded=ev.target.files[0]
	var reader=new FileReader()
	reader.readAsText(loaded)
	reader.onload=function(){
		fileContent=event.target.result
		makeGraaf(handleContent(fileContent.split("\n")))
	}
}

function handleContent(regels){
	totalGroups=regels[0].split("\t")[4].slice(1,-1).split(",").length//total number of groups
	for(i=0;i<regels.length;i++){
		if(regels[i].split("\t")[0]==="C"){//contigs
			var eid=regels[i].split("\t")[1],
				id=parseInt(regels[i].split("\t")[2])
				sequence=regels[i].split("\t")[3],
				lengte=sequence.length,
				totalReads=0;
			if(parseInt(lengte)>maxLen){maxLen=parseInt(lengte)}
			map=regels[i].split("\t")[4].slice(1,-1).split(",")//list of mapping, as strings
			props=[]
			for(j in map){totalReads+=parseInt(map[j])}	
			if(totalReads>0){
				for(j in map){
					props.push({"id":id,"origin":parseInt(j)+1,"waarde":parseInt(map[j])})
				}
			}else{
				props.push({"id":id,"origin":totalGroups+1,"waarde":1})
			}
			nodegegevens={
				"id":id,//number of node in list,1-inclusive
				"group":[id,0,0,0,0],//groupid
				"name":eid,//contig name
				"sequence":sequence,
				"lengte":lengte,
				"origin":groepering(map,totalGroups),//sample with largest contribution
				"proportions":props//read mapping per sample
			}
			nodelookup[parseInt(id)]=nodegegevens
			graaf.nodes.push(nodegegevens)
			
		}
		if(regels[i].split("\t")[0]==="E"){//edges
			var s=parseInt(regels[i].split("\t")[2]),
				t=parseInt(regels[i].split("\t")[3]);
			if(s<=graaf.nodes.length&&t<=graaf.nodes.length){//used to skip edges with references to unexisting nodes
				graaf.edges.push({"source":nodelookup[s],"target":nodelookup[t]})
				neighbours[s]!=undefined?neighbours[s].push(t):neighbours[s]=[t]
				neighbours[t]!=undefined?neighbours[t].push(s):neighbours[t]=[s]
			}
		}
	}
	return determineTiers(graaf)
}

function groepering(mappingstr,totalGroups){
	biggest=0
	biggesti=0
	totalreads=0
	for(k in mappingstr){
		totalreads+=parseInt(mappingstr[k])
		if(parseInt(mappingstr[k])>biggest){
			biggest=parseInt(mappingstr[k])
			biggesti=parseInt(k)
		}
	}
	if((biggest/totalreads)>(1.5/totalGroups)){return biggesti+1}else{return 0}
	//now simply returns the largest group.
		
//for gravity purposes, only nodes with an overwhelming amount of a single read get a groep assigned. 
//1.5/totalGroups, if there is only one origin that has such a high value.
//If there are more with that value, recalculate again with that number for totalGroups
//if no consensus is reached anywhere, assign groep 0
//lets skip the fiddling on this exact number.

}
	
function determineTiers(parsedgraaf){
	var groupid=0
	for(n=1;n<=4;n++){
		for(gn in parsedgraaf.nodes){
			if(parsedgraaf.nodes[gn].group[n]==0){//select unassigned node, put in new group, collect whole group
				groupid+=1
				parsedgraaf.nodes[gn].group[n]=groupid
				newNode=0
				cgn=[parsedgraaf.nodes[gn].group[0]]
				oe=[]
				do{
					newNode=0
					for(nd in cgn){//gets filled with ids
						if(neighbours[cgn[nd]]!=undefined){
							for(num in neighbours[cgn[nd]]){
								if(!(contains(cgn,neighbours[cgn[nd]][num]))){
									if(matchcriteria(parsedgraaf.nodes[gn],nodelookup[parseInt(neighbours[cgn[nd]][num])],n)){//id of neighbouring node
										cgn.push(parseInt(neighbours[cgn[nd]][num]))
										parsedgraaf.nodes[neighbours[cgn[nd]][num]-1].group[n]=groupid
										newNode+=1
									}else{
										oe.push(parseInt(neighbours[cgn[nd]][num]))
									}
								}
							}
						}
					}
				}while(newNode>0)
				if(n==1){level1.push({"id":groupid,"children":cgn,"edges":oe})}
				if(n==2){level2.push({"id":groupid,"children":cgn,"edges":oe})}
				if(n==3){level3.push({"id":groupid,"children":cgn,"edges":oe})}
				if(n==4){level4.push({"id":groupid,"children":cgn,"edges":oe})}
				//cgn is filled with references to n=0. Use filled levelXs to rebuild graph with n-1 references.
				//for link in oe
				//find groupid[n-1]
				
				
				if(cgn.length>1){console.log("tier",n,"groupid",groupid,"found all partners:",cgn)}
			}
		}
	}
	
	for(nd in parsedgraaf.nodes){nodelookup[parsedgraaf.nodes[nd].id]=parsedgraaf.nodes[nd]}
		
	//first rebuild nodelookup to incorporate all groupids.
	tiers={0:parsedgraaf,1:{nodes:[],edges:[]},2:{nodes:[],edges:[]},3:{nodes:[],edges:[]},4:{nodes:[],edges:[]}}
	for(n=1;n<=4;n++){
	levelx=eval("level"+n)
		for(gr in levelx){
			groep=levelx[gr]
			children=[]
			for(child in groep.children){//based on groep.children, but recalculated to reference n-1
				children.push(nodelookup[groep.children[child]].group[n-1])
			}
			tiers[n].nodes.push({"id":groep.id,"children":children})
			for(oe in groep.edges){
				buur=groep.edges[oe]
				edge=nodelookup[buur].group[n]
				tiers[n].edges.push({"source":groep.id,"target":edge})
			}
		}//for level[n] with 1<=n<=4
	}


	
	return tiers
						
//graaf.nodes[x]=nodelookup[x+1]
//graaf.nodes[x].id==graaf.nodes[x].group[0]==x+1
//nodelookup takes id and returns whole node

}

function contains(array,object){
    var i = array.length;
    while(i--){if(array[i]==object){return true}}
    return false;
}

function matchcriteria(node,partner,n){
	//case n=0 not necessary, because this is already assigned in the beginning.
	if(n==1 && neighbours[node.id].length<=2 && neighbours[partner.id].length<=2){return true}
	if(n==2 && node.origin==partner.origin && node.origin!=0){return true}
	if(n==3){
		for(origin in node.proportions){
			if(node.proportions[origin].waarde>=0.8*partner.proportions[origin].waarde && node.proportions[origin].waarde<=1.2*partner.proportions[origin].waarde){return true}else{break}
		//only considers waarde, not waarde/total
		}
	}
	if(n==4){return true}
		//all partners are eligible for this group, making a group for every set of connected nodes
	return false
}

function makeGraaf(graaf){
	n=0//select different tiers
	aspRatio=screen.width/screen.height
	h=0.4*graaf[n].nodes.length+800
	w=aspRatio*h	
	
	var svg = d3.select("body").append("svg")
		.attr("id", "graafsvg")
		.attr("height","90%")
		.attr("width","100%")
		.attr("viewBox", "0 0 "+w+" "+h)
		.attr("preserveAspectRatio", "xMidYMid meet")
		.append("g")
		.attr("id","veld")
	
	var force = d3.layout.force()
		.nodes(graaf[n].nodes)
		.links(graaf[n].edges)
		.size([w,h])
		.charge(-30)
		.gravity(0)
		.linkDistance(25)//make them stick together if the level above indicates that they would have the same group, and more loose if they are different.
		.linkStrength(0.1)//smallAMOStests works better this way
		.on("tick", tick)
		.start();

	var edge = svg.selectAll(".link")
		.attr("id","edges")
		.data(graaf[n].edges)
		.enter().append("line")
		.attr("class", "link");

	var node = svg.selectAll(".node")
		.data(graaf[n].nodes,function(d){return d.id})
		.enter().append("g")
		.attr("class", "node")
		.call(force.drag);

	var pie = d3.layout.pie()
		.value(function(d){return d.waarde})
		.sort(null);

    var arc = d3.svg.arc()
		.outerRadius(function(d){return radius(nodelookup[d.data.id].lengte)})
	
	var color = d3.scale.category10();
	
	function pieChart(proportions){
	totaal=0
	for(j in proportions){
		totaal+=proportions[j].waarde
	}
	if(totaal>0){return pie(proportions)}
	else{props={id:proportions[0].id,origin:totalGroups+1,waarde:1};return props}
	}
		
	
	node.selectAll("path")
		.data(function(d) {return pie(d.proportions)})
		.enter()
		.append("path")
		.attr("d",arc)
		.attr("fill", function(d) { return color(d.data.origin)});
									
	function tick(e) {
		node.each(gravity(e.alpha))//again better for smallAMOStests
		
		node.attr("cx",function(d){return d.x=Math.max(r,Math.min(w-r,d.x));})
			.attr("cy",function(d){return d.y=Math.max(r,Math.min(h-r,d.y));})
			.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"});
	
		edge.attr("x1", function(d){return d.source.x})
			.attr("y1", function(d){return d.source.y})
			.attr("x2", function(d){return d.target.x})
			.attr("y2", function(d){return d.target.y});
	}	
}

function radius(len){
	procent=(len*100)/maxLen
	procent<=1?waarde=4:waarde=0.2*procent+5
	return waarde
}

function gravity(alpha) {
	return function(d) {
		d.origin>0?a=0.12*alpha:a=0.01*alpha;//can install a variable gravity-pull-threshold here
		d.x+=(coordinates(d.origin)[0]-d.x)*a;
		d.y+=(coordinates(d.origin)[1]-d.y)*a;
  }
}//gravity groups based on origin, calculated as the sample with the most reads (above a certain value)

function coordinates(originnummer){
	if(originnummer==0){return [0.5*w,0.5*h]}else{//either this, or they start floating...
		var cx=0.5*w+0.2*aspRatio*w*Math.round(1000*Math.sin(((1+originnummer*2)*Math.PI)/totalGroups))/1000
		var cy=0.5*h+0.2*h*Math.round(1000*Math.cos((1+originnummer*2*Math.PI)/totalGroups))/1000
		return [cx,cy]
	}//not working perfectly, but at least it helps.
}

function exporteer(graaf){//lees data object, schrijf naar .dot file.
	var dotbestand="digraph:{\n"
	for (regel in graaf.nodes){dotbestand.push(regel.id+" [comment=\""+regel.sequence+"\",group=\""+regel.group+"\"]\n")}
	for (regel in graaf.edges){dotbestand.push(regel.source+" -> "+regel.target+"[comment=\"sStart=\""+regel.sStart+"\",sEnd=\""+regel.sEnd+"\",tStart=\""+regel.tStart+"\",tEnd=\""+regel.tEnd+"\",revcomp=\""+regel.revcomp+"\"]\n")}
	dotbestand+="}"
}