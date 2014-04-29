//links object info needs working, to incorporate directionality, correctly calculated from different input files
//graaf.usedNodes is not working correctly currently, everything gets put in exactly twice
//color grouping does not work for all groups, and is overfitted/not generalized
//make doEverything bigger to include other ways of triggering events, using that to update the graaf?
//the work on zooming is once again reset at zero
	var groepen=[];
	var graaf={"nodes":[],"links":[],"usedNodes":[]} //{"nodes":[{}],"links":[{},{},{}]}
	var newblerACE={
"1":[1,23628,3],
"2":[2,16743,4],"3":[3,15465,10],"4":[4,6,13782],"5":[5,12408,19],"6":[6,11927,10],
"7":[7,29,11385],"8":[8,4,10726],"9":[9,12,10322],"10":[10,9,9160],"11":[11,2,7771],
"12":[12,7406,4],"13":[13,8,7523],"14":[14,7424,6],"15":[15,7443,7],"16":[16,3,7169],
"17":[17,6827,9],"18":[18,6,6886],"19":[19,6762,3],"20":[20,6857,1],"21":[21,6524,2],
"22":[22,6636,7],"23":[23,1,6307],"24":[24,2,6322],"25":[25,6167,1],"26":[26,6139,2],
"27":[27,1,5892],"28":[28,16,5980],"29":[29,5745,2],"30":[30,2,5775],"31":[31,5293,0],
"32":[32,3,5073],"33":[33,0,4966],"34":[34,4866,4],"35":[35,4781,0],"36":[36,4799,5],
"37":[37,0,4748],"38":[38,11,4781],"39":[39,1,4665],"40":[40,8,4569],"41":[41,4592,5],
"42":[42,3,4526],"43":[43,4322,1],"44":[44,7,4177],"45":[45,2,4162],"46":[46,3979,2],
"47":[47,3878,1],"48":[48,3711,0],"49":[49,17,3677],"50":[50,6,3405],"51":[51,3454,0],
"52":[52,3400,3],"53":[53,3342,1],"54":[54,3247,2],"55":[55,1,3281],"56":[56,3332,2],
"57":[57,0,3253],"58":[58,0,3011],"59":[59,2,3039],"60":[60,0,3059],"61":[61,0,2973],
"62":[62,1,2954],"63":[63,0,2765],"64":[64,2,2815],"65":[65,2560,6],"66":[66,0,2565],
"67":[67,2,2509],"68":[68,1,2408],"69":[69,0,2467],"70":[70,2380,0],"71":[71,22,2325],
"72":[72,2,2302],"73":[73,2309,0],"74":[74,2058,2],"75":[75,3,1959],"76":[76,1902,0],
"77":[77,1922,0],"78":[78,1869,4],"79":[79,1784,4],"80":[80,2,1829],"81":[81,1853,0],
"82":[82,5,1858],"83":[83,5,1835],"84":[84,1708,2],"85":[85,1,1768],"86":[86,1775,9],
"87":[87,13,1784],"88":[88,0,1733],"89":[89,4,1734],"90":[90,1685,1],"91":[91,1,1713],
"92":[92,1,1676],"93":[93,0,1536],"94":[94,3,1586],"95":[95,2,1531],"96":[96,0,1442],
"97":[97,1412,1],"98":[98,0,1409],"99":[99,1388,7],"100":[100,1313,2],"101":[101,1350,0],
"102":[102,0,1299],"103":[103,0,1326],"104":[104,1376,5],"105":[105,0,1324],"106":[106,1300,2],
"107":[107,0,1203],"108":[108,1159,3],"109":[109,0,1111],"110":[110,2,1164],"111":[111,1114,8],
"112":[112,0,1088],"113":[113,2,1120],"114":[114,1046,3],"115":[115,0,1104],"116":[116,0,1054],
"117":[117,1030,1],"118":[118,0,928],"119":[119,918,0],"120":[120,929,5],"121":[121,0,825],
"122":[122,0,850],"123":[123,745,0],"124":[124,3,781],"125":[125,688,1],"126":[126,3,703],
"127":[127,0,665],"128":[128,1,626],"129":[129,599,0],"130":[130,0,586],"131":[131,0,539],
"132":[132,522,0],"133":[133,0,512],"134":[134,1,473],"135":[135,431,0],"136":[136,482,0],
"137":[137,488,0],"138":[138,436,0],"139":[139,0,392],"140":[140,315,0],"141":[141,365,4],
"142":[142,429,388],"143":[143,0,396],"144":[144,0,414],"145":[145,394,0],"146":[146,0,369],
"147":[147,0,352],"148":[148,0,361],"149":[149,0,352],"150":[150,0,652],"151":[151,0,341],
"152":[152,0,302],"153":[153,0,304],"154":[154,0,257],"155":[155,0,268],"156":[156,0,251],
"157":[157,251,0],"158":[158,0,239],"159":[159,0,271],"160":[160,0,218],"161":[161,0,218],
"162":[162,215,1],"163":[163,0,233],"164":[164,187,0],"165":[165,205,1],"166":[166,3,184],
"167":[167,394,0],"168":[168,1324,1330],"169":[169,0,179],"170":[170,139,0],"171":[171,169,0],
"172":[172,0,184],"173":[173,162,2],"174":[174,149,0],"175":[175,0,155],"176":[176,149,142],
"177":[177,0,128],"178":[178,0,133],"179":[179,0,128],"180":[180,122,0],"181":[181,109,0],
"182":[182,0,112],"183":[183,0,1650],"184":[184,0,120],"185":[185,228,0],"186":[186,118,97],
"187":[187,683,712],"188":[188,328,0],"189":[189,85,94],"190":[190,0,118],"191":[191,0,94],
"192":[192,80,1],"193":[193,0,1147],"194":[194,164,0],"195":[195,830,0],"196":[196,10,85],
"197":[197,405,161],"198":[198,73,82],"199":[199,0,745],"200":[200,156,0],"201":[201,0,132],
"202":[202,65,38],"203":[203,133,0],"204":[204,0,257],"205":[205,200,0],"206":[206,0,733],
"207":[207,0,63],"208":[208,0,963],"209":[209,60,2],"210":[210,53,67],"211":[211,55,60],
"212":[212,69,77],"213":[213,0,122],"214":[214,0,142],"215":[215,59,60],"216":[216,122,3],
"217":[217,363,725],"218":[218,0,117],"219":[219,113,0],"220":[220,46,48],"221":[221,0,400],
"222":[222,55,44],"223":[223,0,505],"224":[224,109,0],"225":[225,0,68],"226":[226,0,199],
"227":[227,0,124],"228":[228,43,0],"229":[229,0,139],"230":[230,0,27],"231":[231,0,269],
"232":[232,220,502],"233":[233,37,0],"234":[234,128,110],"235":[235,74,275],"236":[236,0,41],
"237":[237,196,267],"238":[238,41,0],"239":[239,73,0],"240":[240,175,2],"241":[241,0,59],
"242":[242,0,63],"243":[243,184,292],"244":[244,0,200],"245":[245,197,0],"246":[246,0,394],
"247":[247,0,72],"248":[248,234,498],"249":[249,72,131],"250":[250,0,229],"251":[251,0,364],
"252":[252,79,0],"253":[253,0,343],"254":[254,0,90],"255":[255,0,36],"256":[256,0,469],
"257":[257,0,47],"258":[258,0,113],"259":[259,0,60]//waarom zijn er maar 259 nodes met informatie, als er 295 zijn?
}
	


window.addEventListener('load',function(){
	var bestand=document.getElementById('bestan')
	bestand.addEventListener('change',doEverything,false)
});

//functions
function doEverything(event){
loadFile(event,parseFileInput);
/*this doesn't really do anything right now, 
but eventually needs to control the whole building of the graaf. 
The calling of makeGraaf in loadFile needs to be moved to here.*/
}

function loadFile(ev1,callback){ //load file, return contents
	var loaded=ev1.target.files[0]
	var reader=new FileReader();
	reader.onload=function(){
		var fileContent=event.target.result;
		callback(fileContent,loaded.name,makeGraaf)};//parseFileInput
	reader.readAsText(loaded)
}//end loadFile

function parseFileInput(content,filename,callback){
regels=content.split("\n")
if(filename.split(".")[1]==="asqg"){var graaf= ASQGparse(regels)}
if(filename.search("454")>-1){var graaf=Newblerparse(regels,filename)}
callback(graaf)
}

function ASQGparse(regels){
	for(i=0;i<regels.length;i++){//asqg parsing
		if (regels[i].split("\t")[0]==="VT"){//collect nodes
			var id=regels[i].split("\t")[1]
			var seq=regels[i].split("\t")[2]
			graaf.nodes[graaf.nodes.length]={"id":id,"sequence":seq,"length":seq.length,"proportions":[{"group": 1, "value":1},{"group":2, "value":0}]}
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
	}//end regel loop
	return graaf
}//end ASQGparse function

function Newblerparse(regels,filename){
	for (i=0;i<regels.length;i++){
		if(!isNaN(parseInt(regels[i].split("\t")[0]))){//collect nodes
			var waarschuwing="sorry, newbler zuigt in output. geen sequences, geen groepen"
			var id=regels[i].split("\t")[0]
			var contig=regels[i].split("\t")[1]
			var lengte=regels[i].split("\t")[2]
			graaf.nodes.push({"id":id,"sequence":contig,"length":lengte,"proportions": [{"value":id,"group":readRatio(contig)[0],"waarde":readRatio(contig)[1]},{"value":id,"group":readRatio(contig)[2],"waarde":readRatio(contig)[3]}]})
		}//end node loop
		if(regels[i].split("\t")[0]==="C"){//collect links
			s=regels[i].split("\t")[1]
			t=regels[i].split("\t")[3]
			graaf.links[graaf.links.length]={"source":vindNode(s),"target":vindNode(t),"sStart":"","sEnd":"","tStart":"","tEnd":"","revcomp":""}
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
			return graaf["nodes"][i]
		}
	};
}

function readRatio(contigname){
			//still needs to made extensible for more than 2 organisms. Use user input data for this choice.
	if(typeof newblerACE[parseInt(contigname.slice(-4)).toString()]!='undefined'){//used to fill groups with read ratio values, and to filter out contigs with no read mappings
		return [1,newblerACE[parseInt(contigname.slice(-4)).toString()][0],2,newblerACE[parseInt(contigname.slice(-4)).toString()][1]]//[group1,value1,group2,value2]
	}else{ return [3,4,3,1]}
}
function makeGraaf(graaf){
	var w=800,
		h=800,
		r=30
		
	function radius(len){//I don't make the rules, I only write them down. Why does d.value reference the contig number? I don't know, but I can work with it
		//console.log(contignumber,graaf);
		var maxLen=longestContig(graaf),
			procent=(len*100)/maxLen;
		//if(len<100){return 0}//remove nodes that are too small for read mapping)
		if(procent<=1){return 5}
		else {return 0.4*procent+5}
	}
	var color = d3.scale.category10();
	
		var x = d3.scale.linear()
		.domain([0, w])
		.range([0, w]);

	var y = d3.scale.linear()
		.domain([0, h])
		.range([h, 0]);
	
	var pie = d3.layout.pie()
		.value(function(d){return d.waarde})
		.sort(null);

    var arc = d3.svg.arc()
		.outerRadius(function(d){return radius(graaf.nodes[(parseInt(d.data.value)-1).toString()].length)})
	
	var svg = d3.select("body").append("svg")
		.attr("id", "graafsvg")
		.attr({"height":"90%"})
		.attr("viewBox", "0 0 "+w+" "+h)
		.attr("preserveAspectRatio", "xMidYMid meet")
		.append("svg:g")
		.attr("id","veld")
		//some zooming behaviour
		
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
		.enter().append("g")
		.attr("class", "node")
		.call(force.drag);

	node.selectAll("path")
		.data(function(d) {return pie(d.proportions)})
		.enter()
		.append("svg:path")
		.attr("d",arc)
		.attr("fill", function(d) { return color(d.data.group)});
									
	function tick() {
		link.attr("x1",function(d){return d.source.x;})
			.attr("y1",function(d){return d.source.y;})
			.attr("x2",function(d){return d.target.x;})
			.attr("y2",function(d){return d.target.y;});
										  
		node.attr("x",function(d){return Math.max(r,Math.min(w-r,d.x));})
			.attr("y",function(d){return Math.max(r,Math.min(h-r,d.y));})
			.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"});
	}		
}

function pieGraaf(graaf){//deze werkt wel, maar zowel het verslepen als de bounding box zijn weg. Maar dat is iets voor morgen!
	var w=700,
		h=700,
		radius=8/*function(d){//functie herschrijven om via arc alsnog te werken
		var maxLen=longestContig(graaf),
			procent=(d.length*100)/maxLen;
		if(procent<=1){return 5}
		else {return 0.2*procent+5}
	}//*/
	var color = d3.scale.category10();

    var pie = d3.layout.pie()
        .value(function(d){return d.value})
		.sort(null);

    var arc = d3.svg.arc()
        .outerRadius(radius)

	var svg = d3.select("body").append("svg")
		.attr("width", w)
        .attr("height", h);
		
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
        .data(graaf.links)
        .enter().append("line")
        .attr("class", "link");

    var node = svg.selectAll(".node")
        .data(graaf.nodes)
        .enter().append("g")
        .attr("class", "node");

    node.selectAll("path")
        .data(function(d) {return pie(d.proportions)})
        .enter()
        .append("svg:path")
        .attr("d", arc)
        .attr("fill", function(d) { return color(d.data.group)});

	function tick() {
		link.attr("x1",function(d){return d.source.x;})
			.attr("y1",function(d){return d.source.y;})
			.attr("x2",function(d){return d.target.x;})
			.attr("y2",function(d){return d.target.y;});
										  
		node.attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; })
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"});
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