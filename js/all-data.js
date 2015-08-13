/* global TraversonJsonHalAdapter */
	'use strict';

	// register HAL adapter in Traverson's media type registry
	traverson.registerMediaType(TraversonJsonHalAdapter.mediaType,
		TraversonJsonHalAdapter);

	// create a new Traverson instance to work with HAL


	function content(letter)
	{
		var html="";
	//var fromurl = "http://54.72.154.243/ebd/persons/?n=" + letter;	
	var fromurl = "http://54.72.154.243/ebd/person-" + letter + ".json"; 
			var href;
		var name;
		var api = traverson
		.from(fromurl) // set root URL
		.jsonHal()
			.getResource(function(error, resource, traversal) {
					for (var key in resource["_embedded"]["person"]) {
						
						if (resource["_embedded"]["person"].hasOwnProperty(key)) {
							var obj = resource["_embedded"]["person"][key];
							var decodeU = encodeURIComponent(obj["_links"]["self"]["href"]);
							html += "<li><a href='/person?id=" + decodeU  + "'>" + obj["displayName"] + "</a>";
							if(obj._links.hubRec){html+=" <span class='label success'>Featured</span>"}
							html+="</li>";
							console.log(obj["displayName"]);
						}
				
					}
					$('#letterlist').html(html);
					$('#letterlist').html(html);
					console.log($("#"+letter).html);
			});
			$(document).foundation('accordion', 'reflow');
	}
	
	function contentOrganisations(letter)
	{
		var html="";
//	var fromurl = "http://54.72.154.243/ebd/corps/?n=" + letter;	
var fromurl = "http://54.72.154.243/ebd/corp-" + letter + ".json"; 
			var href;
		var name;
		var api = traverson
		.from(fromurl) // set root URL
		.jsonHal()
			.getResource(function(error, resource, traversal) {
					for (var key in resource["_embedded"]["corp"]) {
						
						if (resource["_embedded"]["corp"].hasOwnProperty(key)) {
							var obj = resource["_embedded"]["corp"][key];
							var decodeU = encodeURIComponent(obj["_links"]["self"]["href"]);
							html += "<li><a href='/organisation?id=" + decodeU  + "'>" + obj["displayName"] + "</a>";
							if(obj._links.hubRec){html+=" <span class='label success'>Featured</span>"}
							html+="</li>";
							console.log(obj["displayName"]);
						}
				
					}
					
					$('#letterlist').html(html);
					console.log($("#"+letter).html);
			});
			$(document).foundation('accordion', 'reflow');
	}
	
	function contentExhibitions(letter)
	{
		var html="";
//	var fromurl = "http://54.72.154.243/ebd/exhibitions/?n=" + letter;	
var fromurl = "http://54.72.154.243/ebd/exhibition-" + letter + ".json"; 
			var href;
		var name;
		var api = traverson
		.from(fromurl) // set root URL
		.jsonHal()
			.getResource(function(error, resource, traversal) {
					for (var key in resource["_embedded"]["exhibition"]) {
						
						if (resource["_embedded"]["exhibition"].hasOwnProperty(key)) {
							var obj = resource["_embedded"]["exhibition"][key];
							var decodeU = encodeURIComponent(obj["_links"]["self"]["href"]);
							html += "<li><a href='/exhibition?id=" + decodeU  + "'>" + obj["label"] + "</a>";
							if(obj._links.hubRec){html+=" <span class='label success'>Featured</span>"}
							html+="</li>";
							console.log(obj["displayName"]);
						}
				
					}
					
					$('#letterlist').html(html);
					console.log($("#"+letter).html);
			});
			$(document).foundation('accordion', 'reflow');
	}
	
	function contentPlaces(letter)
	{
		var html="";
	//var fromurl = "http://54.72.154.243/ebd/places/?n=" + letter;	
	var fromurl = "http://54.72.154.243/ebd/place-" + letter + ".json"; 
			var href;
		var name;
		var api = traverson
		.from(fromurl) // set root URL
		.jsonHal()
			.getResource(function(error, resource, traversal) {
					for (var key in resource["_embedded"]["place"]) {
						
						if (resource["_embedded"]["place"].hasOwnProperty(key)) {
							var obj = resource["_embedded"]["place"][key];
							var decodeU = encodeURIComponent(obj["_links"]["self"]["href"]);
							html += "<li><a href='/place?id=" + decodeU  + "'>" + obj["label"] + "</a>";
							if(obj._links.hubRec){html+=" <span class='label success'>Featured</span>"}
							html+="</li>";
							//console.log(obj["displayName"]);
						}
				
					}
					
					$('#letterlist').html(html);
					console.log($("#"+letter).html);
			});
			$(document).foundation('accordion', 'reflow');
	}

/********************************************************************************************************************************
	All Organisations
************/
	function corps(fromurl) {
		
		var href;
		var name;
		////$('#json_hal_response').html('<img src="assets/spinner.gif"/>');
		var api = traverson
		.from(fromurl) // set root URL
		//.withRequestOptions({ headers: { 'x-requested-with': 'application/xml' },  })
		.jsonHal()
			//.withTemplateParameters({name: 'corps'})
		//	.follow('corps')
			.getResource(function(error, resource, traversal) {
				if (error) {

					console.error('No luck :-)')
				} else {
				var next;
				var prev;
					/*How to get display name from embedded corp*/
				http://54.72.154.243/ebd/places/?n=
					
					console.log(resource);
					var i = 0;
					var html = "";
					for (var key in resource["_embedded"]["corp"]) {
					if(i % 5 == 0) { 
					html += "</ul></div><div class='large-3 columns'><ul>";
					}
						if (resource["_embedded"]["corp"].hasOwnProperty(key)) {
							var obj = resource["_embedded"]["corp"][key];
							var decodeU = encodeURIComponent(obj["_links"]["self"]["href"]);
							html += "<li><a href='/organisation/index.html?id=" + decodeU + "'>" + obj["displayName"] + "</a>";
							if(obj._links.hubRec){html+=" <span class='label success'>Featured</span>"}
							html+="</li>";
							console.log(obj["displayName"]);
						}
					i++;
					
					}
					
					
							next = resource["_links"]["next"]["href"];
				
					html += "</ul></div>";
					
		
					var buttons = '<div class="large-12 columns">';
							next = resource["_links"]["next"]["href"];
							
							if(resource._links.prev)
							{
								prev = resource._links.prev.href;
								buttons+='<a data-prev="http://54.72.154.243'+prev+'" data-type="corps" id="btn-hal-prev" class="btn btn-primary" role="button">Previous </a>';
								
							}
							
							if(resource._links.next)
							{
								next = resource._links.next.href;
								buttons+='<a data-next="http://54.72.154.243'+next+'" data-type="corps" href="#" id="btn-hal-next" class="btn btn-primary" role="button">Next</a>';
							}
							
					
					buttons += '</div>';

					$('#json_hal_response').html(html + buttons);

				}
			})

	}
	

/*****************************************************************************************************************************************************
	All People
************/
	function people(fromurl) {
		
		var href;
		var name;
		////$('#json_hal_response').html('<img src="assets/spinner.gif"/>');
		var api = traverson
		.from(fromurl) // set root URL
		//.withRequestOptions({ headers: { 'x-requested-with': 'application/xml' },  })
		.jsonHal()
			//.withTemplateParameters({name: 'corps'})
		//	.follow('corps')
			.getResource(function(error, resource, traversal) {
				if (error) {

					console.error('No luck :-)')
				} else {
				var next;
				var prev;
					/*How to get display name from embedded corp*/
				
					
					console.log(resource);
					var html = "";
					var i = 0;
					for (var key in resource["_embedded"]["person"]) {
						if(i % 5 == 0) { 
						html += "</ul></div><div class='large-3 columns'><ul>";
						 }
						if (resource["_embedded"]["person"].hasOwnProperty(key)) {
							var obj = resource["_embedded"]["person"][key];
							var decodeU = encodeURIComponent(obj["_links"]["self"]["href"]);
							html += "<li><a href='/person?id=" + decodeU  + "'>" + obj["displayName"] + "</a>";
							if(obj._links.hubRec){html+=" <span class='label success'>Featured</span>"}
							html+="</li>";
							console.log(obj["displayName"]);
						}
						console.log(i);
					i++;
					}
				html += "</ul></div>";
				
					var buttons = '<div class="large-12 columns">';
							next = resource["_links"]["next"]["href"];
							
							if(resource._links.prev)
							{
								prev = resource._links.prev.href;
								buttons+='<a data-prev="http://54.72.154.243'+prev+'" data-type="people" id="btn-hal-prev" class="btn btn-primary" role="button">Previous </a>';
								
							}
							
							
							if(resource._links.next)
							{
								next = resource._links.next.href;
								buttons+='<a data-next="http://54.72.154.243'+next+'" data-type="people" href="#" id="btn-hal-next" class="btn btn-primary" role="button">Next</a>';
							}
							
					
					buttons += '</div>';

					$('#json_hal_response').html(html + buttons);

				}
			}

	) }
	
/********************************************************************************************************************************
	All Rooms
************/
	function rooms(fromurl) {
		
		var href;
		var name;
		////$('#json_hal_response').html('<img src="assets/spinner.gif"/>');
		var api = traverson
		.from(fromurl) // set root URL
		//.withRequestOptions({ headers: { 'x-requested-with': 'application/xml' },  })
		.jsonHal()
			//.withTemplateParameters({name: 'corps'})
		//	.follow('corps')
			.getResource(function(error, resource, traversal) {
				if (error) {

					console.error('No luck :-)')
				} else {
				var next;
				var prev;
					/*How to get display name from embedded corp*/
				
					
					console.log(resource);
					var html = "";
					html += "<div class='large-12 columns'><ul>";
					for (var key in resource["_embedded"]["room"]) {

						if (resource["_embedded"]["room"].hasOwnProperty(key)) {
							var obj = resource["_embedded"]["room"][key];
							var decodeU = encodeURIComponent(obj["_links"]["self"]["href"]);
							html += "<li><a href='/room?id=" + decodeU  + "'>" + obj["label"] + "</a></li>";
							console.log(obj["displayName"]);
						}
						
				
					}
				html += "</ul></div>";
				
					var buttons = '<div class="large-12 columns">';
						
							
							if(resource._links.prev)
							{
								prev = resource._links.prev.href;
								buttons+='<a data-prev="http://54.72.154.243'+prev+'" data-type="rooms" id="btn-hal-prev" class="btn btn-primary" role="button">Previous</a>';
								
							}
							
							if(resource._links.next)
							{
								next = resource._links.next.href;
								buttons+='<a data-next="http://54.72.154.243'+next+'" data-type="rooms" href="#" id="btn-hal-next" class="btn btn-primary" role="button">Next</a>';
							}
							
					
					buttons += '</div>';

					$('#json_hal_response').html(html + buttons);

				}
			}

	) }
/********************************************************************************************************************************
	All Exhibitions
************/
	function exhibitions(fromurl) {
		
		var href;
		var name;
		////$('#json_hal_response').html('<img src="assets/spinner.gif"/>');
		var api = traverson
		.from(fromurl) // set root URL
		//.withRequestOptions({ headers: { 'x-requested-with': 'application/xml' },  })
		.jsonHal()
			//.withTemplateParameters({name: 'corps'})
		//	.follow('corps')
			.getResource(function(error, resource, traversal) {
				if (error) {

					console.error('No luck :-)')
				} else {
				var next;
				var prev;
					/*How to get display name from embedded corp*/
				
					
					console.log(resource);
					var html = "";
					html += "<div class='large-12 columns'><ul>";
					for (var key in resource["_embedded"]["exhibition"]) {

						if (resource["_embedded"]["exhibition"].hasOwnProperty(key)) {
							var obj = resource["_embedded"]["exhibition"][key];
							var decodeU = encodeURIComponent(obj["_links"]["self"]["href"]);
							html += "<li><a href='/exhibition?id=" + decodeU  + "'>" + obj["label"] + "</a></li>";
						//	console.log(obj["displayName"]);
						}
						
				
					}
				html += "</ul></div>";
				
					var buttons = '<div class="large-12 columns">';
						
							
							if(resource._links.prev)
							{
								prev = resource._links.prev.href;
								buttons+='<a data-prev="http://54.72.154.243'+prev+'" data-type="exhibitions" id="btn-hal-prev" class="btn btn-primary" role="button">Previous</a>';
								
							}
							
							if(resource._links.next)
							{
								next = resource._links.next.href;
								buttons+='<a data-next="http://54.72.154.243'+next+'" data-type="exhibitions" href="#" id="btn-hal-next" class="btn btn-primary" role="button">Next</a>';
							}
							
					
					buttons += '</div>';

					$('#json_hal_response').html(html + buttons);

				}
			}

	) }
/********************************************************
Helper functions
*********************/	

	function logArrayElements(element, index, array) {
		console.log('a[' + index + '] = ' + element);
	}

	function showProps(obj, objName) {
		var result = "";
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				result += objName + "." + i + " = " + obj[i] + "\n";
			}
		}
		return result;
	}

$('body').on('click', '#btn-hal', function(){
 corps('http://54.72.154.243/ebd/corps');
});
$('body').on('click', '#btn-hal-people', function(){
 people('http://54.72.154.243/ebd/persons');
});

		
$('#json_hal_response').on('click', '#btn-hal-prev', function(){
if($(this).data("type")=="corps"){corps($(this).data("prev"));}
 if($(this).data("type")=="people")  { people($(this).data("prev"));}
  if($(this).data("type")=="rooms")  { rooms($(this).data("prev"));} 
   if($(this).data("type")=="exhibitions")  { exhibitions($(this).data("prev"));} 
});

$('#json_hal_response').on('click', '#btn-hal-next', function(){
if($(this).data("type")=="corps"){corps($(this).data("next"));}
 if($(this).data("type")=="people")  { people($(this).data("next"));}
  if($(this).data("type")=="rooms")  { rooms($(this).data("next"));} 
     if($(this).data("type")=="exhibitions")  { exhibitions($(this).data("next"));} 
	});
