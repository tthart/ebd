(function() {
	
	/* global TraversonJsonHalAdapter */
	'use strict';

	// register HAL adapter in Traverson's media type registry
	traverson.registerMediaType(TraversonJsonHalAdapter.mediaType,
		TraversonJsonHalAdapter);
		
		
	var uri = getParameterByName('id');
	person(uri);
	console.log(id);
		
/*****************************************************************************************************************************************************
	Person
************/
	function person(uri) {
		var url = "http://54.72.154.243/ebd" + uri;
		var href;
		var html;
		var name;
		//$('#json_hal_response').html('<img src="assets/spinner.gif"/>');
		var api = traverson
		.from(uri) // set root URL
		.jsonHal()
			.getResource(function(error, resource, traversal) {
				if (error) {
					console.error('No luck :-)')
				} else {
				
					/*How to get display name from embedded corp*/
					console.log(resource);
				//	var personlink = encodeURIComponent("/prototype/person?id=" + obj["_links"]["self"]["href"]);
					/****Do relations 
					**follow network link					
					***/
					html = '<h1>' + resource["displayName"] + '</h1>'
					
					/*
					
					for (var key in resource["_embedded"]["person"]) {
						if (resource["_embedded"]["person"].hasOwnProperty(key)) {
							var obj = resource["_embedded"]["person"][key];
							html += '<li><a href="../corporation/' + personlink + '">" + obj["displayName"] + "</a></li>';
							console.log(obj["displayName"]);
						}
					}
					*/

					$('#json_hal_response').html(html);

				}
			}

	) }
	
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

	
	


})();