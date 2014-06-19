//http://bl.ocks.org/mbostock/1093130  click functionality I want, simple on/off toggle
//http://jsfiddle.net/mdml/Q7uNz data structure I want, simple graph json


//origin=for gravity
//group=ID for aggregation
//reads and their ratios are used to determine both group and origin

//I might want an option (in UI) at n=5 to remove any node that has no children (remove all single-node-subgraphs)

var newblerACE={//[readsfromsample1,readfromsample2,totalcontigsize]
//needs to be dynamic
"1":[23628,3,423460],
"2":[16743,4,303982],"3":[15465,10,279068],"4":[6,13782,250157],"5":[12408,19,229142],"6":[11927,10,215321],
"7":[29,11385,204610],"8":[4,10726,194325],"9":[12,10322,186071],"10":[9,9160,167624],"11":[2,7771,142557],
"12":[7406,4,135878],"13":[8,7523,135651],"14":[7424,6,135513],"15":[7443,7,134855],"16":[3,7169,129630],
"17":[6827,9,124643],"18":[6,6886,123627],"19":[6762,3,123123],"20":[6857,1,122187],"21":[6524,2,120086],
"22":[6636,7,119760],"23":[1,6307,115218],"24":[2,6322,114563],"25":[6167,1,113713],"26":[6139,2,111427],
"27":[1,5892,106954],"28":[16,5980,106808],"29":[5745,2,104818],"30":[2,5775,103376],"31":[5293,0,97063],
"32":[3,5073,90645],"33":[0,4966,90232],"34":[4866,4,89324],"35":[4781,0,86495],"36":[4799,5,86136],
"37":[0,4748,85042],"38":[11,4781,84739],"39":[1,4665,83625],"40":[8,4569,83337],"41":[4592,5,83214],
"42":[3,4526,81972],"43":[4322,1,80253],"44":[7,4177,74332],"45":[2,4162,73963],"46":[3979,2,71064],
"47":[3878,1,68801],"48":[3711,0,66300],"49":[17,3677,65022],"50":[6,3405,64166],"51":[3454,0,62834],
"52":[3400,3,62438],"53":[3342,1,59030],"54":[3247,2,58411],"55":[1,3281,58397],"56":[3332,2,58326],
"57":[0,3253,58202],"58":[0,3011,56239],"59":[2,3039,53842],"60":[0,3059,53527],"61":[0,2973,53090],
"62":[1,2954,52254],"63":[0,2765,49927],"64":[2,2815,49003],"65":[2560,6,47983],"66":[0,2565,46649],
"67":[2,2509,44075],"68":[1,2408,44020],"69":[0,2467,43402],"70":[2380,0,42541],"71":[22,2325,42248],
"72":[2,2302,41148],"73":[2309,0,40961],"74":[2058,2,36175],"75":[3,1959,34951],"76":[1902,0,34902],
"77":[1922,0,34571],"78":[1869,4,34010],"79":[1784,4,33809],"80":[2,1829,33725],"81":[1853,0,33362],
"82":[5,1858,32586],"83":[5,1835,32362],"84":[1708,2,32032],"85":[1,1768,32044],"86":[1775,9,31603],
"87":[13,1784,31531],"88":[0,1733,31448],"89":[4,1734,30555],"90":[1685,1,30402],"91":[1,1713,29829],
"92":[1,1676,29341],"93":[0,1536,28718],"94":[3,1586,28653],"95":[2,1531,28074],"96":[0,1442,25754],
"97":[1412,1,25662],"98":[0,1409,25503],"99":[1388,7,24704],"100":[1313,2,24463],"101":[1350,0,24377],
"102":[0,1299,23810],"103":[0,1326,23742],"104":[1376,5,23722],"105":[0,1324,23191],"106":[1300,2,22754],
"107":[0,1203,22251],"108":[1159,3,20834],"109":[0,1111,19886],"110":[2,1164,19838],"111":[1114,8,19592],
"112":[0,1088,19528],"113":[2,1120,19003],"114":[1046,3,18770],"115":[0,1104,18652],"116":[0,1054,18175],
"117":[1030,1,18010],"118":[0,928,17555],"119":[918,0,16928],"120":[929,5,15925],"121":[0,825,15406],
"122":[0,850,14900],"123":[745,0,13260],"124":[3,781,12875],"125":[688,1,11905],"126":[3,703,11879],
"127":[0,665,11828],"128":[1,626,11401],"129":[599,0,10931],"130":[0,586,10286],"131":[0,539,9851],
"132":[522,0,9321],"133":[0,512,8936],"134":[1,473,8496],"135":[431,0,8417],"136":[482,0,8151],
"137":[488,0,8059],"138":[436,0,7959],"139":[0,392,7549],"140":[315,0,7166],"141":[365,4,7161],
"142":[429,388,7088],"143":[0,396,6841],"144":[0,414,6860],"145":[394,0,6718],"146":[0,369,6585],
"147":[0,352,6421],"148":[0,361,6320],"149":[0,352,5913],"150":[0,652,5784],"151":[0,341,5667],
"152":[0,302,5561],"153":[0,304,5057],"154":[0,257,4726],"155":[0,268,4681],"156":[0,251,4382],
"157":[251,0,4110],"158":[0,239,3993],"159":[0,271,3957],"160":[0,218,3699],"161":[0,218,3685],
"162":[215,1,3673],"163":[0,233,3604],"164":[187,0,3154],"165":[205,1,3083],"166":[3,184,3077],
"167":[394,0,3133],"168":[1324,1330,3701],"169":[0,179,2922],"170":[139,0,2782],"171":[169,0,2716],
"172":[0,184,2499],"173":[162,2,2447],"174":[149,0,2437],"175":[0,155,2251],"176":[149,142,2258],
"177":[0,128,2152],"178":[0,133,2122],"179":[0,128,1761],"180":[122,0,1704],"181":[109,0,1677],
"182":[0,112,1553],"183":[0,1650,1878],"184":[0,120,1476],"185":[228,0,1480],"186":[118,97,1471],
"187":[683,712,1685],"188":[328,0,1434],"189":[85,94,1318],"190":[0,118,1272],"191":[0,94,1245],
"192":[80,1,1229],"193":[0,1147,1423],"194":[164,0,1174],"195":[830,0,1321],"196":[10,85,1111],
"197":[405,161,1147],"198":[73,82,944],"199":[0,745,1044],"200":[156,0,888],"201":[0,132,825],
"202":[65,38,798],"203":[133,0,803],"204":[0,257,818],"205":[200,0,799],"206":[0,733,892],
"207":[0,63,751],"208":[0,963,933],"209":[60,2,693],"210":[53,67,686],"211":[55,60,680],
"212":[69,77,688],"213":[0,122,635],"214":[0,142,637],"215":[59,60,600],"216":[122,3,598],
"217":[363,725,746],"218":[0,117,582],"219":[113,0,539],"220":[46,48,527],"221":[0,400,560],
"222":[55,44,516],"223":[0,505,560],"224":[109,0,478],"225":[0,68,479],"226":[0,199,392],
"227":[0,124,390],"228":[43,0,363],"229":[0,139,369],"230":[0,27,341],"231":[0,269,342],
"232":[220,502,388],"233":[37,0,307],"234":[128,110,303],"235":[74,275,298],"236":[0,41,264],
"237":[196,267,309],"238":[41,0,236],"239":[73,0,228],"240":[175,2,217],"241":[0,59,202],
"242":[0,63,187],"243":[184,292,215],"244":[0,200,196],"245":[197,0,193],"246":[0,394,196],
"247":[0,72,165],"248":[234,498,198],"249":[72,131,166],"250":[0,229,152],"251":[0,364,153],
"252":[79,0,137],"253":[0,343,154],"254":[0,90,125],"255":[0,36,114],"256":[0,469,143],
"257":[0,47,114],"258":[0,113,109],"259":[0,60,104]
}
var graaf={"nodes":[],"edges":[]}, //{"nodes":[{}],"edges":[{},{},{}]}
	maxLen=0,
	r=30,//bounding box padding, measured from center of node
	totalGroups,w,h,aspRatio,//newblerACE["1"].length-1
	groupid=0,aantalnodes=0,
	neighbours={},nodelookup=[],
	level1,level2,level3,level4,level5,
	currentlevel={"nodes":[],"neighbours":[],"edges":[]};
    
window.addEventListener('load',function(){
	var bestand=document.getElementById('bestand')
	bestand.addEventListener('change',doEverything,false)
	//only doEverything once both files (graph&read map) are selected
});

function doEverything(event){
loadFile(event,parseFileInput);
//the calling of makeGraaf in loadFile needs to be moved to here.
}

function loadFile(ev1,callback){ //load file, return contents
	var loaded=ev1.target.files[0]
	var reader=new FileReader();
	reader.onload=function(){
		var fileContent=event.target.result;
		callback(fileContent,loaded.name,makeGraaf)};//parseFileInput gets called here
	reader.readAsText(loaded)
}//end loadFile

function parseFileInput(content,filename,callback){
	regels=content.split("\n")
	if(filename.search("454")>-1){var graaf=Newblerparse(regels,filename)}
	if(filename.search("AMOS")>-1){var graaf=AMOSparse(regels,filename)}
	//else error/exception
	callback(graaf)
}

function AMOSparse(regels,filename){
	totalGroups=regels[0].split("\t")[4].slice(1,-1).split(",").length//total number of groups
	for(i=0;i<regels.length;i++){
		if(regels[i].split("\t")[0]==="C"){//contigs
			var eid=regels[i].split("\t")[1],
				id=parseInt(eid.slice(6)).toString()
				sequence=regels[i].split("\t")[3],
				lengte=sequence.length,
				aantalnodes+=1
			if(parseInt(lengte)>maxLen){maxLen=parseInt(lengte)}
			map=regels[i].split("\t")[4].slice(1,-1).split(",")//list of mapping, as strings
			props=[]//{"id":id,"origin":1,"waarde":1}], add comparison between waarde and totaalwaarde
			for(j in map){props.push({"id":id,"origin":parseInt(j)+1,"waarde":parseInt(map[j])})}	
			nodegegevens={
				"id":id,//origin
				"group":[0,0,0,0,0],//groupid
				"name":eid,"sequence":sequence,
				"lengte":lengte,"origin":groepering(map,totalGroups),
				"proportions":props
				}
			nodelookup[parseInt(id)]=nodegegevens
			graaf.nodes.push(nodegegevens)
			
		}
		if(regels[i].split("\t")[0]==="E"){//edges
			var adj=regels[i].split("\t")[4],
				s=regels[i].split("\t")[2],
				t=regels[i].split("\t")[3];
			if(adj[0]=="A"||adj[0]=="I"){s=[t,t=s][0]}
			if(adj[0]=="I"||adj[0]=="O"){rc=1}else{rc=0}//not really necessary. If I want to use this, work with 2 checks: 1 flips both source and target, and the other just the target. Flipped twice=not flipped, and save flip yes/no per source/target
			if(!(s>aantalnodes)&&!(t>aantalnodes)){//used to skip edges with references to unexisting nodes
				graaf.edges.push({"source":nodelookup[s],"target":nodelookup[t]})
				neighbours[s]!=undefined?neighbours[s].push(t):neighbours[s]=[t]
				neighbours[t]!=undefined?neighbours[t].push(s):neighbours[t]=[s]
			}
			
		}
	}
	determineZoomLevelGroups()
	return graaf
}

//nodeneighbours needs to be full for the determination of the different groups
//group and proportions already need to be determined as well
//that means this needs to be filled in each node, after nodes and edges are gathered from file in XXXparse

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
	if((biggest/totalreads)>(1/totalGroups)){return biggesti+1}else{return 0}
	//now simply returns the largest group.
	}
		
//for gravity purposes, only nodes with an overwhelming amount of a single read get a groep assigned. 
//1.5/totalGroups, if there is only one origin that has such a high value.
//If there are more with that value, recalculate again with that number for totalGroups
//if no consensus is reached anywhere, assign groep 0
//lets skip the fiddling on this exact number.

function Newblerparse(regels,filename){
	totalGroups=newblerACE["1"].length-1
	for (i=0;i<regels.length;i++){
		if(!isNaN(parseInt(regels[i].split("\t")[0]))){//collect nodes
			var id=regels[i].split("\t")[0],
				contig=regels[i].split("\t")[1],
				lengte=regels[i].split("\t")[2];
			if(parseInt(lengte)>maxLen){maxLen=parseInt(lengte)}
			props=[{"id":id,"group":readRatio(contig)[1],"waarde":readRatio(contig)[2]},{"id":id,"group":readRatio(contig)[3],"waarde":readRatio(contig)[4]}]
			graaf.nodes.push({"groupid":[id,0,0,0,0],"sequence":contig,"lengte":lengte,"origin":readRatio(contig)[0],"proportions": props})
						
		}//end node loop
		if(regels[i].split("\t")[0]==="C"){//collect edges
			var adj=regels[i].split("\t")[2]+regels[i].split("\t")[4],
				s=regels[i].split("\t")[1],
				t=regels[i].split("\t")[3];
			if(adj[0]=="B"){s=[t,t=s][0]}
			if(adj[0]===adj[1]){rc=1}else{rc=0}
			graaf.edges.push({"source":graaf.nodes[vindNode(s,0)],"target":graaf.nodes[vindNode(t,0)],"sLen":graaf.nodes[vindNode(s,0)].lengte,"tLen":graaf.nodes[vindNode(t,0)].lengte,"revcomp":rc})
			//make source and target only reference the ID, without copying all the data from the whole node in this slot. It must do so without breaking the data part for the pie charts.
		}//end edge loop
	}//end regel loop
	return graaf
}

function readRatio(contigname){//load from (second) external file, not from internal var
			//still needs to made extensible for more than 2 organisms. Use user input data for this choice.
			
	if(typeof newblerACE[parseInt(contigname.slice(-4)).toString()]!='undefined'){//used to fill groups with read ratio values, and to filter out contigs with no read mappings
		
		var reads=newblerACE[parseInt(contigname.slice(-4)).toString()]
		if((reads[0]/reads[1]>3||reads[0]/reads[1]<0.333)&&reads[2]>99){
			var ass=1+reads.indexOf(Math.max.apply(Math,reads.slice(0,totalGroups)))
			//some more math here to determine origin correctly
		}else{ass=0}
		var lijst=[ass,2,reads[0],3,reads[1]]//[assignedGroup,group1,value1,group2,value2]
		return lijst
	}else{ return [0,1,1,1,0]}
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

function matchcriteria(node,partner,n){
	//case n=0 not necessary, because this is already assigned in the beginning.
	if(n==1 && neighbours[node.id].length==2 && neighbours[partner.id].length==2){return true}
	if(n==2 && node.origin==partner.origin){return true}
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
function lookupGroup(n,graafnodes,oeid){
	for(nd in graafnodes){
		node=graafnodes[nd]
		if(node.id[n-1]===oeid){
			return node.id[n]
		}
	}
}
	
function determineZoomLevelGroups(){
	for(n=0;n<=4;n++){
		var groupid=0;
		for(gn in graaf.nodes){
			if(n==0){
				groupid+=1
				graaf.nodes[gn].group[n]=parseInt(graaf.nodes[gn].id);
			}else{
				if(graaf.nodes[gn].group[n]==0){//select unassigned node, put in new group, collect whole group
					var cgn=[],//nodes in current group (children)
						oe=[],//(Outside Edges) nodes not in group that are connected to those that are
						newlyadded=0
					groupid+=1
					graaf.nodes[gn].group[n]=groupid;
					cgn.push(graaf.nodes[gn].group[n-1])//will contain whole group with same groepid
					do{
						if(n==4&&groupid>30){break}
						newlyadded=0
						for(nd in cgn){
							nig=cgn[nd]
							if(neighbours[nig]!=undefined){
								for(num in neighbours[nig]){
									buur=nodelookup[neighbours[nig][num]]//complete node
									//if(graaf.nodes[neighbours[nig][num]-1].group[n]==0){
										if(!(contains(cgn,buur.group[n-1]))){
											if(matchcriteria(nodelookup[nig],buur,n)){
												console.log("tier",n,"groepid",groupid,"now adding",buur.group[n-1],"group size",cgn.length)
												graaf.nodes[neighbours[nig][num]-1].group[n]=groupid
												cgn.push(buur.group[n-1])
												newlyadded+=1
											}else{
												if(!(contains(oe,buur.group[n-1]))){oe.push(buur.group[n-1])}
											}
										}
									//}
								}
							}
						}
					}while(newlyadded>0)//fails if no new node was added.
					currentlevel.nodes.push({"id":groupid,"children":cgn})
					currentlevel.neighbours.push({"id":groupid,"edgesto":oe})
					console.log("tier",n,"groupid",groupid,"current group",cgn)
					
				}else{console.log("already added",graaf.nodes[gn].id,graaf.nodes[gn])}
			}
		}
		//perhaps need new way to draw edges, so that source and target are evaluated on the same level. 
		//Here, we evaluate for the highest n, but that might nog be necessary
		for(oe in currentlevel.neighbours){
			for(buur in oe.edgesto){
				currentlevel.edges.push({"source":oe.id,"target":lookupGroup(n,currentlevel.nodes,buur)})
			}
		}
		
		if(n==0){level1=currentlevel}			
		if(n==1){level2=currentlevel}			
		if(n==2){level3=currentlevel}		
		if(n==3){level4=currentlevel}		
		if(n==4){level5=currentlevel}
		cgn=[],oe=[],currentlevel={"nodes":[],"neighbours":[],"edges":[]};
	}
}


function makeGraaf(graaf){
	aspRatio=screen.width/screen.height
	h=0.4*aantalnodes+800
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
		.nodes(graaf.nodes)
		.links(graaf.edges)
		.size([w,h])
		.charge(-30)
		.gravity(0)
		.linkDistance(25)//make them stick together if the level above indicates that they would have the same group, and more loose if they are different.
		.linkStrength(0.1)//smallAMOStests works better this way
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
		.call(force.drag);

	var pie = d3.layout.pie()
		.value(function(d){return d.waarde})
		.sort(null);

    var arc = d3.svg.arc()
		.outerRadius(function(d){return radius(nodelookup[d.data.id].lengte)})
	
	var color = d3.scale.category10();
	
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

function exporteer(graaf){//lees data object, schrijf naar .dot file.
	var dotbestand="digraph:{\n"
	for (regel in graaf.nodes){dotbestand.push(regel.id+" [comment=\""+regel.sequence+"\",group=\""+regel.group+"\"]\n")}
	for (regel in graaf.edges){dotbestand.push(regel.source+" -> "+regel.target+"[comment=\"sStart=\""+regel.sStart+"\",sEnd=\""+regel.sEnd+"\",tStart=\""+regel.tStart+"\",tEnd=\""+regel.tEnd+"\",revcomp=\""+regel.revcomp+"\"]\n")}
	dotbestand+="}"
}

function contains(array,object){
    var i = array.length;
    while(i--){if(array[i]==object){return true}}
    return false;
}