var inputdot="digraph G {\n"+
  "edge [dir=both arrowhead=none arrowtail=none]\n"+
  "node [shape=none, fontname=courier, fontsize=9]\n"+
  "GCAACGGGCAATATGTCTCTGTGTGGATAAA:e -> CAACGGGCAATATGTCTCTGTGTGGATAAAA:w\n"+
  "AAAAAGAGTTCTGATAGCAGCTTCTGAACTG:e -> AAAAGAGTTCTGATAGCAGCTTCTGAACTGG:w\n"+
  "TATGTCTCTGTGTTGGATTAAAAAAGAGTGT:w -> ATATGTCTCTGTGTTGGATTAAAAAAGAGTG:e\n"+
  "CGGGCAATATGTCTCTGTGTGGATTAAAAAA:e -> GGGCAATATGTCTCTGTGTGGATTAAAAAAA:w\n"+
  "CGGGCAATATGTCTCTGTGTGGATTAAAAAA:e -> GGGCAATATGTCTCTGTGTGGATTAAAAAAG:w\n"+
  "AGGTAACCAGTTCAGAAGCTGCTATCGACAC:e -> GGTAACCAGTTCAGAAGCTGCTATCGACACT:w\n"+
  "GACATATTGCCCGTTCGCAAGTCAGAATGAA:e -> ACATATTGCCCGTTCGCAAGTCAGAATGAAA:w\n"+
  "AGCAGCTTCTGAACGGTTACCTGCCGTGAGT:e -> GCAGCTTCTGAACGGTTACCTGCCGTGAGTA:w\n"+
  "GCAGCTTCTGAACGGTTACCTGCCGTGAGTA:e -> CAGCTTCTGAACGGTTACCTGCCGTGAGTAA:w\n"+
  "AGCTTCTGAACTGGTACCTGCCGTGAGTAAA:e -> GCTTCTGAACTGGTACCTGCCGTGAGTAAAT:w\n"+
  "TTTCATTCTGACTGCAACGGGCAATATGTCT:w -> CTTTCATTCTGACTGCAACGGGCAATATGTC:e\n"+
  "GCTTTCATTCTGACTGCAACGGGCAATATGT:w -> AGCTTTCATTCTGACTGCAACGGGCAATATG:e\n"+
  "TCTCTGTGTGGATTAAAAAAAGAGTTCTGAT:w -> GTCTCTGTGTGGATTAAAAAAAGAGTTCTGA:e\n"+
"}\n";

//draculagraph 
window.onload = function() {
	var width = $(document).width();
    var height = $(document).height();
	
	var render = function(r, n) {
		/* the Raphael set is obligatory, containing all you want to display */
		var set = r.set().push(
			/* custom objects go here */
			r.rect(n.point[0]-30, n.point[1]-2, 60, 24).attr({"fill": "#feb", r : "12px", "stroke-width" : n.distance == 0 ? "3px" : "1px" })).push(
			r.text(n.point[0], n.point[1] + 10, (n.label || n.id)));
		return set;
	};
	
    var g = new Graph();
	
    var layouter=new Graph.Layout.Spring(g);
    var renderer=new Graph.Renderer.Raphael('canvas', g, width, height);
	
	redraw = function() {
	
	dotfile=document.getElementById('blok').value;
	rawlines=dotfile.split("\n");
	nodes=[]
	for(var i=3;i<rawlines.length-2;i++){
		nodes[i-3]=[rawlines[i].split("->")[0],rawlines[i].split("->")[1]]
	};
	
	function printNodes(element,index,array){
	var nodea=element[0];
	var nodeb=element[1];
	g.addNode(nodea, {render:render});
	g.addNode(nodeb, {render:render});
	g.addEdge(nodea,nodeb);
	};
	nodes.forEach(printNodes);
	

    layouter.layout();
    renderer.draw();
    };
	
};