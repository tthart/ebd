$(function(){ // on dom ready

	$.getJSON( "http://petej.info/ebd/network/http%3A//viaf.org/viaf/51792789",
		function(resp) {
			
			var size = resp._embedded.relation.length;
			var nodeids = [];
			var nodes = [];
			var edges = [];
			
			for (var i=0; i<size; i++) {
				
				var sid = resp._embedded.relation[i]._embedded.subject._links.self.href;
				var shortsid = 'n' + sid.split('/').pop();
				var sname = resp._embedded.relation[i]._embedded.subject.displayName;
				var oid = resp._embedded.relation[i]._embedded.object._links.self.href;
				var shortoid = 'n' + oid.split('/').pop();
				var oname = resp._embedded.relation[i]._embedded.object.displayName;
				var rel = resp._embedded.relation[i].relTypeLabel;
				
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
      
					edges: edges
				},
  
				layout: {
					name: 'breadthfirst',
					fit: false ,
					avoidOverlap: true,
					padding: 5,
					directed: false,
					circle: true,
					roots: '#n51792789'
				}
			});			

         });        
}); // on dom ready
