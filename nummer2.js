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

for(i=0;i<regels.length;i++){//asqg parsing

if(regels[i].split("\t")[0]==="ED"){//collect links and overlap information
info=regels[i].split("\t")[1]
s=info.split(" ")[0]
t=info.split(" ")[1]
sos=parseInt(info.split(" ")[2])
sol=parseInt(info.split(" ")[3])
tos=parseInt(info.split(" ")[5])
tol=parseInt(info.split(" ")[6])
revcomp=parseInt(info.split(" ")[8])
graaf.links[graaf.links.length]={"source":s,"target":t,"sStart":sos,"sEnd":sol,"tStart":tos,"tEnd":tol,"revcomp":revcomp}//if revcomp=1, reverse one of the seqs to match them
}
if (regels[i].split("\t")[0]==="VT"){//collect nodes
n=regels[i].split("\t")[1]
seq=regels[i].split("\t")[2]
graaf.nodes[graaf.nodes.length]={"name":n,"sequence":seq}
}


/*dotfile parsing
for(var i=0;i<regels.length;i++){//dotfiles only
//if(regels[i].split(" "))

if(regels[i].split(" ")[3]==="->"){//fill links
var s=parseInt(regels[i].split("->")[0])
var t=parseInt(regels[i].split("->")[1].split("{")[0])
graaf.links[graaf.links.length]={"source":s,"target":t}
};//end if
}//end dotfile for loop */

}//end asqg for loop
//reload graph with nodes and links
var force = d3.layout.force()
	.nodes(graaf.nodes)
	.links(graaf.links)
	.start()

}//end reader.onload
})//end bestand.addeventlistener
};//end window.onload
/* no longer needed, remove this and accompanying divs?
var maakLijst=function(){

var invoer=document.getElementById('invoer').value
var theData=[]
var sources=[13,19,2,0,45,111,2,3,4,5,900]
var targets=[2,900,4,111,0,19,45,4,5,3,13]
var lastLine=Math.min(sources.length,100)

for(var i=0;i<lastLine;i++)
{
theData[theData.length]={"source":sources[i],"target":targets[i]};
};

var p = d3.select("body").selectAll("p")
  .data(theData)
  .enter()
  .append("p")
  .text(function(d){return "s="+d.source+", t="+d.target;});
}
*/