var gegevens="eens kijken of dit werkt"
var inhoud="<html><head><title>"+gegevens+"</title></head><body>succes!<div id=\'dif\'></div></body></html>"
var check=document.getElementById('check')
var werkt=3

function reload_page() {window.location.href="sigmajs.html?check="+werkt};
function clean_page(){window.location.href="sigmajs.html"};
	
function init() {
 var sigInst = sigma.init(document.getElementById('sigma-example'));
 sigInst.drawingProperties({
  defaultLabelColor: '#ccc',
  font: 'Arial',
  edgeColor: 'source',
  defaultEdgeType: 'curve'
}).graphProperties({
  minNodeSize: 1,
  maxNodeSize: 10	
});
sigInst
.addNode('hello',{label: 'Hello', x:1, y:0,color:'#ff0000'})
.addNode('world',{label: 'World', x:0, y:0})
//.addNode('max',{label: 'Max', x:3, y:3})
.addEdge('hello_world','hello','world')
//.addEdge('hello_max','hello','max')
.draw();
// Draw the graph :
sigInst.draw();
}
function pagina_laden(){
init()
eval(window.location.search.substring(1))
document.getElementById('check').innerHTML=check

}

window.onload=pagina_laden;

function bestandLaden(){
var inputVal=document.getElementById('bestandinput')
var bestanden=inputVal.target.files
check.innerHTML=bestanden
}
