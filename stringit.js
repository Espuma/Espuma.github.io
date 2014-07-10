//http://bl.ocks.org/GerHobbelt/3104394  2-tiered node aggregation, looks very nice!

//I might want an option (in UI) at n=5 to remove any node that has no children (remove all single-node-subgraphs)

//when node is clicked, it is selected.
//when mouse scrolls, selected nodes zoom in/out.
//n is checked, lowered/heightened by 1, and corresponding underlying nodes are expanded/collapsed

//use css to make border elements
	
var maxLen=0,tiers,
	totalGroups,w,h,aspRatio,lsize=[],
	neighbours={},nodelookup=[],currentNodes=[];
    
window.addEventListener('load',function(){
	var bestand=document.getElementById('bestand')
	bestand.addEventListener('change',readFile,false)
});

function readFile(ev){
	var reader=new FileReader()
	reader.readAsText(ev.target.files[0])
	reader.onload=function(){handleContent(event.target.result.split("\n"))}
}

function handleContent(regels){
	totalGroups=regels[0].split("\t")[4].slice(1,-1).split(",").length,//total number of groups
	origraaf={nodes:[],edges:[]}
	
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
			origraaf.nodes.push(nodegegevens)
			
		}
		if(regels[i].split("\t")[0]==="E"){//edges
			var s=parseInt(regels[i].split("\t")[2]),
				t=parseInt(regels[i].split("\t")[3]);
			if(s<=origraaf.nodes.length&&t<=origraaf.nodes.length){//used to skip edges with references to unexisting nodes
				origraaf.edges.push({"source":nodelookup[s],"target":nodelookup[t]})
				neighbours[s]!=undefined?neighbours[s].push(t):neighbours[s]=[t]
				neighbours[t]!=undefined?neighbours[t].push(s):neighbours[t]=[s]
			}
		}
	}
	return determineTiers(origraaf)
}

function groepering(mappingstr,totalGroups){
	var biggest=0,
		biggesti=0,
		totalreads=0;
	for(k in mappingstr){
		totalreads+=parseInt(mappingstr[k])
		if(parseInt(mappingstr[k])>biggest){
			biggest=parseInt(mappingstr[k])
			biggesti=parseInt(k)
		}
	}
	if((biggest/totalreads)>(1.5/totalGroups)){return biggesti+1}else{return 0}
	//need to add check all groups if > 1.5/totalGroups, not only biggest
	//If there are more with that value, recalculate again with that number for totalGroups
	//if no consensus is reached anywhere, assign groep 0
	//lets skip the fiddling on this exact number.
}
	
function determineTiers(parsedgraaf){
	var groupid=parsedgraaf.nodes.length,
		level1=[],level2=[],level3=[],level4=[];
	lsize=[groupid,0,0,0,0]
	tiers={nodes:[],edges:[],sizes:[]}
	
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
				lsize[n]+=1
				nodelookup[groupid]={"id":groupid,"children":cgn,"edges":oe}

				if(cgn.length>1){console.log("tier",n,"groupid",groupid,"found all partners:",cgn)}
			}
		}
	}
	num=1
	for(i=0;i<=4;i++){
		tiers.sizes[i]=[num,(num+=lsize[i])-1]
	}
	
	for(nd in parsedgraaf.nodes){nodelookup[parsedgraaf.nodes[nd].id]=parsedgraaf.nodes[nd]}

	for(nd in nodelookup){
		groep=nodelookup[nd]
		for(t in tiers.sizes){
			if(nd>=tiers.sizes[t][0]&&nd<=tiers.sizes[t][1]){n=t}
		}
		console.log("tier:",n)
		onderliggend=[]
		for(child in groep.children){//based on groep.children, but recalculated to reference n-1
			if(!(contains(onderliggend,nodelookup[groep.children[child]].group[n-1]))){onderliggend.push(nodelookup[groep.children[child]].group[n-1])}
		}
		props=[{id:groep.id,origin:1,waarde:100}]
		//go through all props of all children and aggregate results.
		tiers.nodes.push({tier:n,id:groep.id,children:onderliggend,proportions:props})//name,sequence,lengte,proportions are missing
		console.log("	node:",groep.id,onderliggend,props)
		pgn=[]//previous group neighbours
		for(oe in groep.edges){
			buur=groep.edges[oe]
			edge=nodelookup[buur].group[n]
			if(!(contains(pgn,edge))){pgn.push(edge)}
		}
		for(ed in pgn){
			buur=pgn[ed]
			console.log("		edge:",groep.id,buur)
			tiers.edges.push({source:groep.id,target:buur,tier:n})
		}
	}
	tn=4
	graaf={nodes:[],edges:[]}
	for(i=tiers.sizes[tn][0];i<=tiers.sizes[tn][1];i++){
		graaf.nodes.push(nodelookup[tiers.nodes[i-1].id])
		if(tiers.nodes[i-1].tier==0){
			for(j in neighbours[tiers.nodes[i-1].id]){
				buur=neighbours[tiers.nodes[i-1].id][j]
				if(buur>tiers.nodes[i-1].id){
					graaf.edges.push({source:nodelookup[tiers.nodes[i-1].id],target:nodelookup[buur]})
				}
			}
		}else{
			for(j in tiers.nodes[i-1].children){
				buur=tiers.nodes[i-1].children[j]
				//everything fails right around here
				
	}
	
	return drawGraph(graaf)
}

function contains(array,object){
    var i = array.length;
    while(i--){if(array[i]==object){return true}}
    return false;
}

function matchcriteria(node,partner,n){
	if(n==1 && neighbours[node.id].length<=2 && neighbours[partner.id].length<=2){return true}
	if(n==2 && node.origin==partner.origin && node.origin!=0){return true}
	if(n==3){//n=3 does not take over whole content of n=2 yet, because of different selection criteria.
		for(origin in node.proportions){
			if(node.proportions[origin].waarde>=0.8*partner.proportions[origin].waarde && node.proportions[origin].waarde<=1.2*partner.proportions[origin].waarde){return true}else{break}
		}
	}
	if(n==4){return true}
	return false
}

function changeGraaf(graaf,prev){
//this will be the function that handles changing graaf based on scrolling and its previous state.
//nodes will be built from gathering nodes in same group
//edges can be collected from neighbours
}

function drawGraph(graaf){
	aspRatio=screen.width/screen.height
	h=0.4*tiers.sizes[0][1]+800
	w=aspRatio*h
	
	var svg = d3.select("body").append("svg")
		.attr("id", "graafsvg")
		.attr("height","90%")
		.attr("width","100%")
		.attr("viewBox", "0 0 "+w+" "+h)
		//.attr("preserveAspectRatio", "xMidYMid meet")
		.append("g")
		.attr("id","veld")
	
	var force = d3.layout.force()
		.nodes(graaf.nodes)
		.links(graaf.edges)
		.charge(-60)
		.gravity(0)
		.linkDistance(25)//needs to vary with group[n-1]
		.linkStrength(0.1)
		.on("tick", tick)
		.start();

	var edge = svg.selectAll(".link")
		.attr("id","edges")
		.data(graaf.edges)
		.enter().append("line")
		.attr("class", "link");

	var node = svg.selectAll(".node")
		.data(graaf.nodes,function(d){return d.id})
		.enter().append("g")
		.attr("class", "node")
		.call(force.drag)
		.on("click",function(d){console.log(d)})

	var pie = d3.layout.pie()
		.value(function(d){return d.waarde})
		.sort(null);

    var arc = d3.svg.arc()
		.outerRadius(function(d){radius(nodelookup[d.data.id].lengte)})
		
	
	var color = d3.scale.category10();
	
	node.selectAll("path")
		.data(function(d) {if(d.tier==0){return pie(d.proportions)}else{return d.id}})
		.enter()
		.append("path")
		.attr("d",function(d){if(d.tier==0){return arc}else{return "circle"}})
		.attr("fill", function(d){if(d.tier==0){return color(d.data.origin)}else{return "black"}})
		.attr("stroke",12);
									
	function tick(e) {
		var r=30
		
		node.each(gravity(e.alpha))
		
		node.attr("cx",function(d){return d.x=Math.max(r,Math.min(w-r,d.x));})
			.attr("cy",function(d){return d.y=Math.max(r,Math.min(h-r,d.y));})
			.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"});
	
		edge.attr("x1", function(d){return d.source.x})
			.attr("y1", function(d){return d.source.y})
			.attr("x2", function(d){return d.target.x})
			.attr("y2", function(d){return d.target.y});
	}	
}

function zooming(d){
	console.log(d)}

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
}//gravity groups based on origin

function coordinates(originnummer){
	if(originnummer==0){return [0.5*w,0.5*h]}else{//either this, or they start floating...
		var cx=0.5*w+0.2*aspRatio*w*Math.round(1000*Math.sin(((1+originnummer*2)*Math.PI)/totalGroups))/1000
		var cy=0.5*h+0.2*h*Math.round(1000*Math.cos((1+originnummer*2*Math.PI)/totalGroups))/1000
		return [cx,cy]
	}//is still skewed slightly past 45 degrees, somehow.
}