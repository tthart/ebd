(function() {

    /* global TraversonJsonHalAdapter */
    'use strict';

    // register HAL adapter in Traverson's media type registry
    traverson.registerMediaType(TraversonJsonHalAdapter.mediaType,
        TraversonJsonHalAdapter);

var dateFromType;
		var dateToType;
		var dateType;
    var uri = getParameterByName('id');
	if(uri!="")
	{
    room(uri);
	} else {
	var html="<p>No value selected.</p>"
	 $('#json_hal_response').html(html);	
	}

    /*****************************************************************************************************************************************************
    	Rooms
    ************/
    function room(uri) {
        var url = "http://54.72.154.243" + uri;
        var href;
        var html;
        var name;
        var api = traverson
            .from(url) // set root URL
            .jsonHal();


       // $('#json_hal_response').html('<div class="row"><div class="small-6 large-centered columns"><i class="fa fa-cog fa-spin text-center" style="font-size:20pt;"></i>  Loading</div></div>');
		
		

        api.newRequest().getResource(function(error, resource, traversal) {
            var obj;
			var note;
				var count;
			var decodeU;
	console.log(resource);
    	if(resource.labels) {html="<h1>" + resource.labels + "</h1>";}
		/**Events that happened**/
		if(resource.descriptions) {
			//++add in date?
		html+="<p>" + parse(resource.descriptions[0]) + "</p>";	
		html+="<hr class='hr' />";
		}
var place = "";
if(resource._embedded.place!="")
{
	place+="<h2 class=toggle><i class=\'fa fa-minus\'></i> Place</h2>";
		place+="<div class='row'><div class='large-12 columns'>";
				var obj2 = resource._embedded.place;
				for(var key2 in obj2)
				{
	//obj2 = obj[key]._embedded.place;
			 /**Organisation place address**/
			
				var postcode="";
				var address="";
				var label="";
			
				 
					var postcode="";
					var address="";
					var label="";
                    //place is array//
                 console.log(obj2[key2]);
						if(obj2[key2].label){label = obj2[key2].label}
						if(obj2[key2].address){address = parseA(obj2[key2].address);}
                        if(obj2[key2].postcode){address+=" ";postcode = obj2[key2].postcode}
						if(obj2[key2]._links.self.href){decodeU = encodeURIComponent(obj2[key2]._links.self.href);}
                          
						
                        place += '<p><a href="http://54.76.94.166/place/?id=' + decodeU + '">'+ label + "<br />" + address + "<br />" + postcode + '</a></p>';

                    				
			 
		//if(obj2[key2].label){place+="<p>" + obj2[key2].label + "</p>";}			
				}
	place+="</div></div>";
}


		if(resource._embedded){
	
		
		
           
/***New request******/
 api
		 .newRequest()
		 .follow("eventAsAgent")
		 .getResource(function(error, resource, traversal) {
			/***Embedded archival resources (images)*****/
			if(resource._embedded.relationArchivalResource!="") 
			{
		    obj = resource._embedded.relationArchivalResource;
			html+="<div class='gallery-wrap'>";
            for (var key in obj) {
				
				//Test to see if there is an image
			
				if(obj[key]._embedded.object)
				{
					obj2 = obj[key]._embedded.object;
				
						for (var key2 in obj2)
						{
							
							
						}
				
					
				}
			html+="</div>";
		
				
				
               
			   
            }
            

			} 
			
html+=place;
			  /***Related people**/
 	if(resource._embedded.relationPerson!="")
			{
				console.log(resource._embedded.relationPerson);
				   html += '<h2 class=toggle><i class=\'fa fa-minus\'></i> Related people</h2>';
		
            obj = resource._embedded.relationPerson;
        
			var count;
            for (var key in obj) {
				 var image="";
                var obj2 = obj[key]._embedded.object;
			//	var length = Object.keys(obj2).length;
				
                for (var key2 in obj2) {
					if(obj2[key2]._embedded){
					var obj3 = obj2[key2]._embedded.image;
				
				for (var key3 in obj3) {
						image="";
						  /**Image**/
		var obj2 = obj[key]._embedded.object;
		console.log(obj);
		console.log(obj2);
		console.log(obj3);
				  var details = "";
						  if(obj3[key3]._links.page){
					  details = '<p><strong>Title: </strong><a href='+obj3[key3]._links.page.href+'>'+obj3[key3].title+'</a></p>';
					  }
					  else {
						    details = '<p><strong>Title: </strong>'+obj3[key3].title+'</p>';
					  }
					  
				  if(obj3[key3].identifier){details+= '<p><strong>Identifier: </strong>'+obj3[key3].identifier+'</p>'}
				
				  if(obj3[key3].collection){details+='<p><strong>Collection: </strong>'+obj3[key3].collection+'</p>';}
				  		    if(obj3[key3].repository){details+= '<p><strong>Repository: </strong>'+obj3[key3].repository+'</p>'}
				  if(obj3[key3].rightsHolder){details+= '<p><strong>Rights holder:</strong> '+obj3[key3].rightsHolder+'</p>';}
				    if(obj3[key3].licence){details+= '<p><strong>Licence: </strong><a href='+obj3[key3]._links.licence.href+'>'+obj3[key3].licence+'</a></p>'}
			
				  
			image+='<a href="#"  data-featherlight="'+obj3[key3]._links.self.href+'">';
			image+='<div class=small-thumb><img src="' + obj3[key3]._links.thumbnail.href + '" /></div></a>';
			image+='<br /><a data-featherlight="'+details+'"><i class="fa fa-info-circle"></i> Details</a>';
			  
			/***Image***/
				}
					}
					
					
					html+= '<div class="row"><div class="large-12 columns"><dl>';
					
					     if(obj[key].relTypeLabel){
							 html += '<dt>'+'<abbr class="init" title="'+obj[key].relTypeDef+'">'+obj[key].relTypeLabel+'</abbr>' + '</dt>';
							 }
							 
							
					var decodeU = encodeURIComponent(obj2[key2]._links.self.href);
					
                    html += '<dd><a href="http://54.76.94.166/person/?id=' + decodeU + '">' + obj2[key2].displayName + '</a>';
					 
					if(obj2[key2]._links.hubRec){html+=" <span class='label success'>Featured</span>"}
					html+='</dd>';
					if(image!=""){html+='<dd>'+image+'</dd>';}
					image="";
					console.log(image);
                   if (obj2[key2].displayNote) {
                        html += '<dd>' + obj2[key2].displayNote + '</dd>';
                    }
                  if(obj[key].label) {
								html+='<dd class="i">'+obj[key].label+'</dd>';
							 }
				
					  html += '</dl></div>';
					  	html+="</div>";
                }

              
            }
			
			}
			
		
		
		
		
		/*Agent Corp embedded in an event(Organisations that made items)***/
	
			
				/**Related corporations**/
				if(resource._embedded.relationCorp!="") 
			{
				
			obj = resource._embedded.relationCorp;
			
			html+= "<h2 class=toggle><i class=\'fa fa-minus\'></i> Related Organisations</h2>";
			for(var key in obj){
				
				html+= '<div class="row"><div class="large-12 columns"><dl>';
				/**Embedded place**/
				var address = "";
		
				var objP = obj[key]._embedded.place;
				
				    for (var key2 in objP) {
					var postcode="";
					var address="";
					var label="";
                    //place is array//
                    if (obj2[key2]) {
                      
						if(objP[key2].label){label = objP[key2].label + "<br />"}
						if(objP[key2].address){address = parseA(objP[key2].address);}
                        if(objP[key2].postcode){address+="<br/>";postcode = objP[key2].postcode}
						
						if(objP[key2]._links.self){decodeU = encodeURIComponent(objP[key2]._links.self.href);
						
						  address= '<dd><a href="http://54.76.94.166/place/?id=' + decodeU + '">'+ label + address + postcode + '</a></dd>';
						}
						else {
							address= '<dd>'+ label + address + postcode + '</dd>';
						}
                          
						
                        

                    }
				
                }
			/**Embedded object**/
				var obj2 = obj[key]._embedded.object;
						if(obj[key].relTypeLabel){html += '<dt>'+'<abbr class="init" title="'+obj[key].relTypeDef+'">'+obj[key].relTypeLabel+'</abbr>' + '</dt>';}
					
				for(var key2 in obj2)
				{
					
				
				if(obj2[key2]._embedded)
				{
					
					
					var obj3 = obj2[key2]._embedded.image;
				
				for (var key3 in obj3) {
					var image = "";
						 	  /**Image**/
		
				  var details = "";
				  if(obj3[key3].title){
						  if(obj3[key3]._links.page){
					  details = '<p><strong>Title: </strong><a href='+obj3[key3]._links.page.href+'>'+obj3[key3].title+'</a></p>';
					  }
					  else {
						    details = '<p><strong>Title: </strong>'+obj3[key3].title+'</p>';
					  }
				  }
					  
				  if(obj3[key3].identifier){details+= '<p><strong>Identifier: </strong>'+obj3[key3].identifier+'</p>'}
				
				  if(obj3[key3].collection){details+='<p><strong>Collection: </strong>'+obj3[key3].collection+'</p>';}
				  		    if(obj3[key3].repository){details+= '<p><strong>Repository: </strong>'+obj3[key3].repository+'</p>'}
				  if(obj3[key3].rightsHolder){details+= '<p><strong>Rights holder:</strong> '+obj3[key3].rightsHolder+'</p>';}
				    if(obj3[key3].licence){details+= '<p><strong>Licence: </strong><a href='+obj3[key3]._links.licence.href+'>'+obj3[key3].licence+'</a></p>'}
			
				  
			
			
				  
			image+='<a href="#"  data-featherlight="'+obj3[key3]._links.self.href+'">';
			image+='<div class=small-thumb><img src="' + obj3[key3]._links.thumbnail.href + '"  /></div></a>';
			image+='<br /><a data-featherlight="'+details+'"><i class="fa fa-info-circle"></i> Details</a>';
			
			  
			/***Image***/
				}
				}
					var decodeU = encodeURIComponent(obj2[key2]._links.self.href);
					html+= '<dd><a href="http://54.76.94.166/organisation/?id='+decodeU+'">' + obj2[key2].displayName;
					
					
				if(obj2[key2]._links.hubRec) {
					console.log(obj2[key2]._links.hubRec);
				html+=' <span class="label success">Featured</span>';
				}
					
			html+='</a></dd>';
			
			html+= '<dd>'+image+'</dd>';
		
			image="";
			
					if(obj[key].dateFromType){dateFromType=obj[key].dateFromType + " "} else {dateFromType=""}
			if(obj[key].dateToType){dateToType=obj[key].dateToType + " "} else {dateToType=""}
			if(obj[key].dateType){dateType=obj[key].dateType + " "} else {dateType = ""}
			 if (obj[key].date) {
                    html += '<dd>' + dateType + convertDate(obj[key].date) + '</dd>';
                }

                if (obj[key].dateFrom) {
                    
					html += '<dd>' + dateFromType + convertDate(obj[key].dateFrom)
					if(obj[key].dateTo){html+=" - " + dateToType + convertDate(obj[key].dateTo)}
					html += '</dd>';
                }
             
			 if (obj[key].displayNote) {
                        html += '<dd>' + obj[key].displayNote + '</dd>';
                    }
					if(address!="")	
				{
						html+=address;
					}
					
			 if(obj[key].label) {
						html+='<dd class="i">'+obj[key].label+'</dd>';
					 }
					 
						
			
				}
				
			
		
			html+= '</div></div>';
			}
				//html+="<p>" + obj[key]._embedded[0].identifier + "</p>";
					//html+= '</div>';
			
			}
/****Britain can make it***/	
console.log(uri);
		if(uri=="/ebd/room/http%3A//data.archiveshub.ac.uk/ebd/id/event/Britain%2520Can%2520Make%2520It%253A%2520Things%2520in%2520their%2520home%2520setting")
		{
						html+='<h2 class=toggle><i class=\'fa fa-minus\'></i> Related Exhibition</h2>';
			html+="<dl><dd><a href='http://54.76.94.166/exhibition/?id=%2Febd%2Fexhibition%2Fhttp%253A%2F%2Fdata.archiveshub.ac.uk%2Febd%2Fid%2Fevent%2FBritain%252520Can%252520Make%252520It'>Britain Can Make It (1946), Victoria and Albert Museum</a></dd></dl>";
			
			html+='<h2 class=toggle><i class=\'fa fa-minus\'></i> Related Rooms</h2>';
			html+=document.getElementById('linksForRooms').innerHTML;
	
			
		}
	
		console.log(uri);
		if(uri.indexOf("/ebd/room/http%3A//data.archiveshub.ac.uk/ebd/id/event/Britain%2520Can%2520Make%2520It%253A%2520Things%2520in%2520their%2520home%2520setting%253A")>=0)
		{
				html+='<h2 class=toggle><i class=\'fa fa-minus\'></i> In section</h2>';
			html+="<dl><dd><a href='http://54.76.94.166/room/?id=%2Febd%2Froom%2Fhttp%253A%2F%2Fdata.archiveshub.ac.uk%2Febd%2Fid%2Fevent%2FBritain%252520Can%252520Make%252520It%25253A%252520Things%252520in%252520their%252520home%252520setting'>Britain Can Make It (1946), Victoria and Albert Museum</a></dd></dl>";
		}
		
		
	  /***Archival resource relation**/
			if(resource._embedded.relationArchivalResource!="") 
			{
			obj = resource._embedded.relationArchivalResource;
			html+= "<h2 class=toggle><i class=\'fa fa-minus\'></i> Related Archive and Museum Resources</h2><div class='row'><div class='large-12 columns'>";
				var number=0;
				for(var key in obj){
				console.log(obj[key]._embedded.object);
			
				var obj2 = obj[key]._embedded.object;
				

				/**If the title has a link to the item**/	
				html+= '<dl>';
				html += '<dt>'+'<abbr class="init" title="'+obj[key].relTypeDef+'">'+obj[key].relTypeLabel+'</abbr>'+'</dt>'
			for(var key2 in obj2) {
			
			if(obj2[key2]._embedded){
				console.log("---------------Embedded----");
				console.log(obj2[key2]._embedded.image);
				var obj3 = obj2[key2]._embedded.image;
				
				for (var key3 in obj3) {
					
						  /**Image**/
		
				  var details = "";
				  if(obj3[key3].title){
					  if(obj3[key3]._links.page){
					  details = '<p><strong>Title: </strong><a href='+obj3[key3]._links.page.href+'>'+obj3[key3].title+'</a></p>';
					  }
					  else {
						    details = '<p><strong>Title: </strong>'+obj3[key3].title+'</p>';
					  }
					  }
				  if(obj3[key3].identifier){details+= '<p><strong>Identifier: </strong>'+obj3[key3].identifier+'</p>'}
				
				  if(obj3[key3].collection){details+='<p><strong>Collection: </strong>'+obj3[key3].collection+'</p>';}
				  		    if(obj3[key3].repository){details+= '<p><strong>Repository: </strong>'+obj3[key3].repository+'</p>'}
				  if(obj3[key3].rightsHolder){details+= '<p><strong>Rights holder:</strong> '+obj3[key3].rightsHolder+'</p>';}
				    if(obj3[key3].licence){details+= '<p><strong>Licence: </strong><a href='+obj3[key3]._links.licence.href+'>'+obj3[key3].licence+'</a></p>'}
			
				  
			image+='<a href="#"  data-featherlight="'+obj3[key3]._links.self.href+'">';
			image+='<div class="small-thumb"><img src="' + obj3[key3]._links.thumbnail.href + '"  /></div></a>';
			image+='</a><a data-featherlight="'+details+'"><i class="fa fa-info-circle"></i> Details</a>';
			  
			/***Image***/
				}
			}
				if(obj2[key2]._links.self) {
				html+= '<dd><a href="'+obj2[key2]._links.self.href+'">' + obj2[key2].title + '</a></dd>';	
				html+= '<dd>'+image+'</dd>';
				
				image="";
				if(obj[key].dateFromType){dateFromType=obj[key].dateFromType + " "} else {dateFromType=""}
			if(obj[key].dateToType){dateToType=obj[key].dateToType + " "} else {dateToType=""}
			if(obj[key].dateType){dateType=obj[key].dateType + " "} else {dateType = ""}
					 if (obj[key].date) {html += '<dd>' + dateType + convertDate(obj[key].date) + '</dd>'; }

                if (obj[key].dateFrom) {       
					html += '<dd>' + dateFromType + convertDate(obj[key].dateFrom);
					if(obj[key].dateTo){html+=" - " + dateToType + convertDate(obj[key].dateTo)}
					html += '</dd>';
                }
					if(obj2[key2].identifier){html+= '<dd>' + obj2[key2].identifier + '</dd>';}
					if(obj2[key2].collection){html+= '<dd>' + obj2[key2].collection + '</dd>';}
					if(obj2[key2].repository){html+= '<dd>' + obj2[key2].repository + '</dd>';}
				} else {
					
					html+= '<dd>' + obj2[key2].title + '</a></dd>';
					html+= image;
					
					 if (obj[key].date) {html += '<dd>' + dateType + convertDate(obj[key].date) + '</dd>'; }

                if (obj[key].dateFrom) {       
					html += '<dd>' + dateFromType + convertDate(obj[key].dateFrom);
					if(obj[key].dateTo){html+=" - " + dateToType + convertDate(obj[key].dateTo)}
					html += '</dd>';
                }
						if(obj2[key2].identifier){html+= '<dd>' + obj2[key2].identifier + '</dd>';}
					if(obj2[key2].collection){html+= '<dd>' + obj2[key2].collection + '</dd>';}
					if(obj2[key2].repository){html+= '<dd>' + obj2[key2].repository + '</dd>';}
				}
			
			}
				
					
				
				
             

				 html+= '</dl>';
			}
				//html+="<p>" + obj[key]._embedded[0].identifier + "</p>";
				
html+='</div></div>';
			}
			
			if(resource._embedded.relationBibliographicResource!="") 
		
			{
				obj = resource._embedded.relationBibliographicResource;
			html+= "<h2 class=toggle><i class=\'fa fa-minus\'></i> Bibliographic Resources</h2><div class='row'><div class='large-12 columns'>";
				var number=0;
				for(var key in obj){
				console.log(obj[key]._embedded.object);
			
				var obj2 = obj[key]._embedded.object;
					html += '<h4>'+'<abbr class="init" title="'+obj[key].relTypeDef+'">'+obj[key].relTypeLabel+'</abbr>'+'</h4>';
					
					if(obj[key].relTypeLabel=="associated with" && number==2){html += '<h4>'+'<abbr class="init" title="'+obj[key].relTypeDef+'">'+obj[key].relTypeLabel+'</abbr>'+'</h4>';number=4}
				/**If the title has a link to the item**/	
			for(var key2 in obj2) {
				html+= '<dl>';
				html+= '<dd>'+obj2[key2].title+'</dd>';
				 html+= '</dl>';
			}
				
				
					 if (obj[key].date) {html += '<dd>' + obj[key].date + '</dd>'; }

                if (obj[key].dateFrom) {       
					html += '<dd>' + obj[key].dateFrom;
					if(obj[key].dateTo){html+=" - " + obj[key].dateTo}
					html += '</dd>';
                }
             

				 html+= '</dl>';
			}
				//html+="<p>" + obj[key]._embedded[0].identifier + "</p>";
				
html+='</div></div>';
				
			}
			
			
			
				/*******************************/
            /****Records****/
			var records = "<h2 class=toggle><i class=\'fa fa-minus\'></i> Records</h2><ul>";
			if(resource._links.viafRec) {records+= '<li><a href="' + resource._links.viafRec.href + '">' + resource._links.viafRec.href + '</a></li>'; } 
			if(resource._links.snacRec) {records+= '<li><a href="' + resource._links.snacRec.href + '">' + resource._links.snacRec.href + '</a></li>';}
			if(resource._links.hubRec) {records+= '<li><a href="' + resource._links.hubRec.href + '">' + resource._links.hubRec.href + '</a></li>';}
			if(records!="<h2 class=toggle><i class=\'fa fa-minus\'></i> Records</h2><ul>") {
				console.log(records);
			records+="</ul>";
			html+=records;	
			}
			
			if(resource._embedded.source!="") {html+="<h2 class=toggle><i class=\'fa fa-minus\'></i> Source</h2><ul>";}
			obj = resource._embedded.source;
            for (var key in obj) {
				var href = "";
				var href2= "";
				var title = obj[key].title;
				var url = obj[key]._links;
				
				
				 
				html+= '<li>' + href+ title + href2 + '</li>'; 
			}
			html+="</ul>";
			
			//if(resource.hubNote!=""){html+="<p>"+resource.hubNote+"</p>";}
			 	 $('#json_hal_response').html(html);
				 		 $(".toggle:not(:first)").nextUntil('.toggle').toggleClass("hidden");
 $(".toggle:not(:first)").children().toggleClass("fa-plus fa-minus");
		 });
			
			 
			       
    	/***Agent person embedded in an event***/
			 var obj2 = resource._embedded.agentPerson;
			 
			
			 
			 
			 /***Places embedded in an event***/
			 var obj2 = resource._embedded.place;
						/*******************************/
            /****Sources****/
		

		}/****End of events****/
        
		
        
          	 $('#json_hal_response').html(html); 

        });
		
		
		
	
    }

	function parse(str) {
 str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    return str;
}

	

function parseA(str) {
 str = str.replace(/([|])/g, '<br />');
    return str;
}

    //End of function
function date(obj, key) {
var html;
   		
	
	return html;
}

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

$('.original').tinyLightbox();
	function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
})();


