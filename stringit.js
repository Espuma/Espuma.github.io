	var groepen=[];
	var graaf={"nodes":[],"edges":[],"usedNodes":[]} //{"nodes":[{}],"edges":[{},{},{}]}
	var newblerACE={//[readsfromsample1,readfromsample2,totalcontigsize]
"1":[23628,0,423460],//second value was 3
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
	


window.addEventListener('load',function(){
	var bestand=document.getElementById('bestand')
	bestand.addEventListener('change',doEverything,false)
});

function doEverything(event){
loadFile(event,parseFileInput);
//The calling of makeGraaf in loadFile needs to be moved to here.
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
if(filename.split(".")[1]==="asqg"){var graaf= ASQGparse(regels)}
if(filename.search("454")>-1){var graaf=Newblerparse(regels,filename)}
callback(graaf)
}

function ASQGparse(regels){//drop ASQG/SGA support?
	for(i=0;i<regels.length;i++){//asqg parsing
		if (regels[i].split("\t")[0]==="VT"){//collect nodes
			var id=regels[i].split("\t")[1]
			var seq=regels[i].split("\t")[2]
			graaf.nodes[graaf.nodes.length]={"id":id,"sequence":seq,"length":seq.length,"proportions":[{"group": 1, "value":1},{"group":2, "value":0}]}
		}//end node loop

		if(regels[i].split("\t")[0]==="ED"){//collect edges and overlap information
			var info=regels[i].split("\t")[1],
				s=info.split(" ")[0],
				t=info.split(" ")[1],
				sos=parseInt(info.split(" ")[2]),
				sol=parseInt(info.split(" ")[3]),
				tos=parseInt(info.split(" ")[5]),
				tol=parseInt(info.split(" ")[6]),
				revcomp=parseInt(info.split(" ")[8]);
			graaf.edges[graaf.edges.length]={"source":vindNode(s),"target":vindNode(t),"sStart":sos,"sEnd":sol,"tStart":tos,"tEnd":tol,"revcomp":revcomp}//if revcomp=1, reverse one of the seqs to match them
			if(!(s in graaf.usedNodes)){graaf.usedNodes.push({"id":s})};
			if(!(t in graaf.usedNodes)){graaf.usedNodes.push({"id":t})};
		}//end link loop
	}//end regel loop
	return graaf
}//end ASQGparse function

function Newblerparse(regels,filename){
	for (i=0;i<regels.length;i++){
		if(!isNaN(parseInt(regels[i].split("\t")[0]))){//collect nodes
			var id=regels[i].split("\t")[0]
			var contig=regels[i].split("\t")[1]
			var lengte=parseInt(regels[i].split("\t")[2])
			graaf.nodes.push({"id":id,"sequence":contig,"lengte":lengte,"proportions": [{"value":id,"group":readRatio(contig)[0],"waarde":readRatio(contig)[1]},{"value":id,"group":readRatio(contig)[2],"waarde":readRatio(contig)[3]}]})
		}//end node loop
		if(regels[i].split("\t")[0]==="C"){//collect edges
			s=regels[i].split("\t")[1]
			t=regels[i].split("\t")[3]
			if(regels[i].split("\t")[2]==regels[i].split("\t")[4])
				{rc=1}
			else{
				rc=0
				if(regels[i].split("\t")[2].slice(0,1)==5){//reverse source and target to follow read direction
					s=regels[i].split("\t")[3];
					t=regels[i].split("\t")[1];
				}
			}
			graaf.edges[graaf.edges.length]={"source":graaf.nodes[vindNode(s)],"target":graaf.nodes[vindNode(t)],"sLen":graaf.nodes[vindNode(s)].lengte,"tLen":graaf.nodes[vindNode(t)].lengte,"revcomp":rc}
			if(!(s in graaf.usedNodes)){graaf.usedNodes.push({"id":s})};
			if(!(t in graaf.usedNodes)){graaf.usedNodes.push({"id":t})};
		}//end link loop
	}//end regel loop
	return graaf
}

function kleurGroep(id){
	if (!(id.substr(0,3) in groepen)){groepen.push(id.substr(0,3))}
	return groepen.indexOf(id.substr(0,3))
}	

function vindNode(id) {
	for (var i in graaf["nodes"]) {
		if (graaf["nodes"][i]["id"] === id) {
			return i
		}
	};
}

function radius(len){
	var maxLen=longestContig(graaf),
		procent=(len*100)/maxLen;
	if(procent<=1){return 4}
	else {return 0.4*procent+5}
}
	
function readRatio(contigname){//load from (second) external file, not from internal var
			//still needs to made extensible for more than 2 organisms. Use user input data for this choice.
	if(typeof newblerACE[parseInt(contigname.slice(-4)).toString()]!='undefined'){
		return [1,newblerACE[parseInt(contigname.slice(-4)).toString()][0],2,newblerACE[parseInt(contigname.slice(-4)).toString()][1]]//[group1,value1,group2,value2]
	}else{ return [3,1,3,1]}
}
function makeGraaf(graaf){
	var w=500,//need to make dynamic to fit different screens
		h=500,
		r=30
		
	var svg = d3.select("body").append("svg")
		.attr("id", "tekenveld")
		.attr({"height":"90%"})//to account for top frame
		//.attr({"width":"70%"})//(later) to account for side frame
		.attr("preserveAspectRatio", "xMidYMid meet")
		.attr("viewBox", "0 0 "+w+" "+h)
		.append("g")
		.attr("id","graafgegevens")
	
	var force = d3.layout.force()
		.nodes(graaf.nodes)
		.links(graaf.edges)
		.size([w, h])
		.charge(-30)
		.linkDistance(1)
		.linkStrength(1)
		.on("tick", tick)
		.start();

	var node = svg.selectAll(".node")
		.data(graaf.nodes)
		.enter().append("g")
		.attr("class", "node")
		.call(force.drag);

	var arrow = svg.append("defs").selectAll("marker")
		.data(["pijl"])
		.enter().append("marker")
		.attr("id", String)
		.attr("viewBox", "0 -5 10 10")
		.attr("refX", 30)//function(d){return radius(d.tLen)+1)
		.attr("refY",-1.2)
		.attr("orient","auto")
		.append("path")
		.attr("d", "M0,-5L10,0L0,5 Z");
		//.attr(iets met kleur)
		
	var path = svg.selectAll("path")
		.attr("id","edges")
		.data(graaf.edges)
		.enter().append("path")
		.attr("marker-end","url(#pijl)")//I need node information to make the arrows match. need to rebuild link information with that data
		.attr("class", "link");

	var pie = d3.layout.pie()
		.value(function(d){return d.waarde})
		.sort(null);
		
    var arc = d3.svg.arc()
		.outerRadius(function(d){console.log(d);return radius(graaf.nodes[(parseInt(d.value)-1).toString()].lengte)})
		
	var color = d3.scale.category10();
	
	node.selectAll("path")
		.data(function(d) {return pie(d.proportions)})
		.enter()
		.append("path")
		.attr("d",arc)
		.attr("fill", function(d) { return color(d.data.group)});
									
	function tick() {
	//	link.attr("x1",function(d){return d.source.x;})
	//		.attr("y1",function(d){return d.source.y;})
	//		.attr("x2",function(d){return d.target.x;})
	//		.attr("y2",function(d){return d.target.y;});
										  
		node.attr("x",function(d){return Math.max(r,Math.min(w-r,d.x));})
			.attr("y",function(d){return Math.max(r,Math.min(h-r,d.y));})
			.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"});
			
		 path.attr("d", function(d) {
				var dx = d.target.x - d.source.x,
					dy = d.target.y - d.source.y,
					dr = Math.sqrt(dx * dx + dy * dy);
				return "M" + 
					d.source.x + "," + 
					d.source.y + "L" + //change to L and correct coordinates to remove elliptical arc
					//dr + "," + dr + " 0 0,1 " + 
					d.target.x + "," + 
					d.target.y;
			});
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
	for (regel in graaf.edges){dotbestand.push(regel.source+" -> "+regel.target+"[comment=\"sStart=\""+regel.sStart+"\",sEnd=\""+regel.sEnd+"\",tStart=\""+regel.tStart+"\",tEnd=\""+regel.tEnd+"\",revcomp=\""+regel.revcomp+"\"]\n")}
	dotbestand+="}"
}