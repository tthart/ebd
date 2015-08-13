$(function(){ // on dom ready
 var self = getParameterByName('link');
  var name = getParameterByName('name');
  if(getParameterByName('id')) {
	var uri = getParameterByName('id');
  }
  
  var url = "http://130.88.139.69:5551/" + uri;
		
	$.getJSON( url,
		function(resp) {
			
			var size = resp._embedded.relation.length;
			var nodeids = [];
			var nodes = [];
			var edges = [];
			
			for (var i=0; i<size; i++) {
				console.log(obj);
				var obj = resp._embedded.relation[i];
		
				var sid = obj._embedded.subject[0]._links.self.href;
				var shortsid = 'n' + sid.split('/').pop();
				var sname = obj._embedded.subject[0].displayName;
				var oid = obj._embedded.object[0]._links.self.href;
				var shortoid = 'n' + oid.split('/').pop();
				var oname = obj._embedded.object[0].displayName;
				var rel = obj.relTypeLabel;
				var relDef = obj.relTypeDef;
				
				
				
				if (!(sname == 'Britain Can Make It') && !(oname == 'Britain Can Make It')) {
					if (!(shortsid in nodeids)) {
						nodeids.push(shortsid);
						var node = {};
						node.data = {};
						node.data.id = shortsid;
						node.data.label = sname;
						nodes.push(node);
					}
					if (!(shortoid in nodeids)) {
						nodeids.push(shortoid);
						var node = {};
						node.data = {};
						node.data.id = shortoid;
						node.data.label = oname;
						nodes.push(node);
					}
					var edge = {};
					edge.data = {};
					edge.data.id = 'e' + i.toString();
					edge.data.weight = 1;
					edge.data.source = shortsid;
					edge.data.target = shortoid;
					edge.data.label = rel;
					edges.push(edge);
				}
			}
					
			var cy = cytoscape({
				container: document.getElementById('cy'),
  
				style: cytoscape.stylesheet()
				.selector('node')
				.css({
					'content': 'data(label)',
					'background-color': '#9e0b0f'
				})
				.selector('edge')
				.css({
					'content': 'data(label)',
					'font-size': 'smaller', 
					'target-arrow-shape': 'triangle',
					'width': 3,
					'line-color': '#009647',
					'target-arrow-color': '#009647'
		
				}),
  
				elements: {
					nodes: nodes, 
      
					edges: edges,
					
				},
  
				layout: {
					name: 'random',
					fit: true ,
					avoidOverlap: true,
					directed: false,
			
					roots: '#n51792789'
				},
				
			});	
				cy.$('node').on('click', function(e){
  var ele = e.cyTarget;
  console.log('clicked ' + ele.id());
});	
	
 });    
		 
		   function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
	
function getURL(url)
	{
var fromurl = "http://54.72.154.243" +url.dataset.url;	
	console.log(url.dataset.url);
		var networkres="";
		var name = url.dataset.name;
		var networkurl = "";
		var api = traverson
		.from(fromurl) // set root URL
		.jsonHal()
		.follow("network")
			.getResource(function(error, resource, traversal) {
					console.log(resource._links.self.href);
					networkres= resource._links.self.href;
					window.location.replace("http://54.76.94.166/chart/?id=" + encodeURIComponent(networkres) + "&name=" + name);
			});
				console.log(networkurl);
			//window.location.replace("/charts");

	}    


}); // on dom ready
