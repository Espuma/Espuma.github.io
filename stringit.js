//links object info needs working, to incorporate directionality, correctly calculated from different input files
//graaf.usedNodes is not working correctly currently, everything gets put in exactly twice
//color grouping does not work for all groups, and is overfitted/not generalized
//make doEverything bigger to include other ways of triggering events, using that to update the graaf?
//the work on zooming is once again reset at zero
	var groepen=[];
	var graaf={"nodes":[],"links":[],"usedNodes":[]} //{"nodes":[{}],"links":[{},{},{}]}
	var newblerACE={
		"1":1,"2":1,"3":1,"4":0,"5":1,"6":1,"7":0,"8":0,"9":0,"10":0,
		"11":0,"12":1,"13":0,"14":1,"15":1,"16":0,"17":1,"18":0,"19":1,"20":1,
		"21":1,"22":1,"23":0,"24":0,"25":1,"26":1,"27":0,"28":0,"29":1,"30":0,
		"31":1,"32":0,"33":0,"34":1,"35":1,"36":1,"37":0,"38":0,"39":0,"40":0,
		"41":1,"42":0,"43":1,"44":0,"45":0,"46":1,"47":1,"48":1,"49":0,"50":0,
		"51":1,"52":1,"53":1,"54":1,"55":0,"56":1,"57":0,"58":0,"59":0,"60":0,
		"61":0,"62":0,"63":0,"64":0,"65":1,"66":0,"67":0,"68":0,"69":0,"70":1,
		"71":0,"72":0,"73":1,"74":1,"75":0,"76":1,"77":1,"78":1,"79":1,"80":0,
		"81":1,"82":0,"83":0,"84":1,"85":0,"86":1,"87":0,"88":0,"89":0,"90":1,
		"91":0,"92":0,"93":0,"94":0,"95":0,"96":0,"97":1,"98":0,"99":1,"100":1,
		"101":1,"102":0,"103":0,"104":1,"105":0,"106":1,"107":0,"108":1,"109":0,"110":0,
		"111":1,"112":0,"113":0,"114":1,"115":0,"116":0,"117":1,"118":0,"119":1,"120":1,
		"121":0,"122":0,"123":1,"124":0,"125":1,"126":0,"127":0,"128":0,"129":1,"130":0,
		"131":0,"132":1,"133":0,"134":0,"135":1,"136":1,"137":1,"138":1,"139":0,"140":1,
		"141":1,"142":0.525,"143":0,"144":0,"145":1,"146":0,"147":0,"148":0,"149":0,"150":0,
		"151":0,"152":0,"153":0,"154":0,"155":0,"156":0,"157":1,"158":0,"159":0,"160":0,
		"161":0,"162":1,"163":0,"164":1,"165":1,"166":0,"167":1,"168":0.499,"169":0,"170":1,
		"171":1,"172":0,"173":1,"174":1,"175":0,"176":0.512,"177":0,"178":0,"179":0,"180":1
		,"181":1,"182":0,"183":0,"184":0,"185":1,"186":0.549,"187":0.49,"188":1,"189":0.475,"190":0,
		"191":0,"192":1,"193":0,"194":1,"195":1,"196":0.105,"197":0.716,"198":0.471,"199":0,"200":1,
		"201":0,"202":0.631,"203":1,"204":0,"205":1,"206":0,"207":0,"208":0,"209":1,"210":0.442,
		"211":0.478,"212":0.473,"213":0,"214":0,"215":0.496,"216":1,"217":0.334,"218":0,"219":1,"220":0.489,
		"221":0,"222":0.556,"223":0,"224":1,"225":0,"226":0,"227":0,"228":1,"229":0,"230":0,
		"231":0,"232":0.305,"233":1,"234":0.538,"235":0.212,"236":0,"237":0.423,"238":1,"239":1,"240":1,
		"241":0,"242":0,"243":0.387,"244":0,"245":1,"246":0,"247":0,"248":0.32,"249":0.355,"250":0,
		"251":0,"252":1,"253":0,"254":0,"255":0,"256":0,"257":0,"258":0,"259":0}
	


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
		callback(fileContent,loaded.name,pieGraaf)};//parseFileInput
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
			graaf.nodes[graaf.nodes.length]={"id":id,"sequence":seq,"length":seq.length,"proportions":[{"group": 0, "value":0},{"group":0, "value":0}]}
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
			graaf.nodes.push({"id":id,"sequence":contig,"length":lengte,"proportions": [{"group":1,"value":a=newblerACE[parseInt(contig.slice(-4)).toString()]},{"group":2,"value":1-a}]})
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

function makeGraaf(graaf){
	
	
	var w=700,
		h=700,
		r=30
		
	var radius=function(d){
		var maxLen=longestContig(graaf),
			procent=(d.length*100)/maxLen;
		if(procent<=1){return 5}
		else {return 0.2*procent+5}
	}
	var color = d3.scale.category10();
	
	var pie = d3.layout.pie()
		.value(function(d){return d.group})
		.sort(null);

    var arc = d3.svg.arc()
        .outerRadius(radius)
	
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
		.attr("class", "node");

	node.selectAll("path")
		.data(function(d) {return pie(d.proportions)})
		.enter()
		.append("svg:path")
		.attr("d", arc)
		.attr("fill", function(d) { return color(d.data.group)});

	var x = d3.scale.linear()
		.domain([0, w])
		.range([0, w]);

	var y = d3.scale.linear()
		.domain([0, h])
		.range([h, 0]);
									
	function tick() {
		link.attr("x1",function(d){return d.source.x;})
			.attr("y1",function(d){return d.source.y;})
			.attr("x2",function(d){return d.target.x;})
			.attr("y2",function(d){return d.target.y;});
										  
		node.attr("cx",function(d){return Math.max(r,Math.min(w-r,d.x));})
			.attr("cy",function(d){return Math.max(r,Math.min(h-r,d.y));});
	}	
	
	function zoom() {//doesn't work
	  veld.attr("transform","translate("+d3.event.translate+")"+" scale("+d3.event.scale+")");
	}	
	
	function transform(d) {
		return "translate(" + x(d[0]) + "," + y(d[1]) + ")";
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