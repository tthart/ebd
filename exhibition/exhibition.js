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
    exhibition(uri);
	} else {
	var html="<p>No value selected.</p>"
	 $('#json_hal_response').html(html);
	}

    /*****************************************************************************************************************************************************
    	Exhibitions
    ************/
    function exhibition(uri) {
        var url = "http://54.72.154.243" + uri;
        var href;
        var html;
        var name;
		    var obj;
			var note;
			var decodeU;
			
		var next;
		        var api = traverson
            .from(url) // set root URL
            .jsonHal();
			
			console.log(uri);
if(uri=="/ebd/exhibition/http%3A//data.archiveshub.ac.uk/ebd/id/event/Britain%2520Can%2520Make%2520It")
{

}

       // $('#json_hal_response').html('<div class="row"><div class="small-6 large-centered columns"><i class="fa fa-cog fa-spin text-center" style="font-size:20pt;"></i> Loading</div></div>');
		
		

        api.newRequest().getResource(function(error, resource, traversal) {
        
	
    	if(resource.labels) {html="<h1>" + resource.labels[0] + "</h1>";}
		
		if(resource.dateFrom){ html+='<div class="panel"><div class="row">'};
		        
            if (resource.dateFrom) {html += "<div class='large-4 columns'><dl><dt>From</dt><dd>" + convertDate(resource.dateFrom) + "</dd></dl></div>";}
			if (resource.dateTo) {html+="<div class='large-4 columns'><dl><dt>To</dt><dd>" + convertDate(resource.dateTo) + "</dd></dl></div>";}
		
			if(resource.dateFrom){ html+='</div></div>';};
        	
			
         	/***Agent Corp***/
			 obj = resource._embedded.agentCorp;
			 console.log(obj);
			 
			/**Image***/ 
		 if(resource._embedded.image)
		  {
			  //html+='   <a href="#" data-featherlight="#mylightbox">Open element in lightbox</a><div id="mylightbox">This div will be opened in a lightbox</div>';
			  html+='<div class="large-3 columns">';
			  /**Image**/
			  var obj = resource._embedded.image;
			  for(var key in obj) {
				 
				  var details = "";
								  details = '<p><strong>Title: </strong><a href='+obj[key]._links.self.href+'>'+obj[key].title+'</a></p>'
				  if(obj[key].identifier){details+= '<p><strong>Identifier: </strong>'+obj[key].identifier+'</p>'}
				    if(obj[key].collection){details+='<p><strong>Collection: </strong>'+obj[key].collection+'</p>';}
	
				  if(obj[key].repository){details+= '<p><strong>Repository: </strong>'+obj[key].repository+'</p>'}
				  			  if(obj[key].rightsHolder){details+= '<p><strong>Rights holder:</strong> '+obj[key].rightsHolder+'</p>';}
				  if(obj[key].licence){details+= '<p><strong>Licence: </strong><a href='+obj[key]._links.licence.href+'>'+obj[key].licence+'</a></p>'}

				  
			html+='<a href="#"  data-featherlight="<img src='+obj[key]._links.self.href+'/><p>'+resource.displayName +'</p>">';
			html+='<div class="thumb"><img src="' + obj[key]._links.thumbnail.href + '" ' + + '" title="Rights Holder: '+  obj[key].rightsHolder + ' Licence: ' + obj[key].licence +'"/></div></a><a data-featherlight="'+details+'"><i class="fa fa-info-circle"></i> Details</a>';
			
					html+='</div>'
			  } 
			  if(resource.descriptions!=""){html+="<div class='large-9 columns'><p>"+parsen(resource.descriptions[0])+"</p></div></div>";}
			 } else {
				 if(resource.descriptions){html+="<div class='row'><div class='large-12 columns'><p>"+parsen(resource.descriptions[0])+"</p></div></div>";}
			 }
			 
			 html+="<hr class='hr' />";
			 /*
			 if(resource._embedded.agentCorp!="")
			 {
				html+="<h2 class=toggle><i class=\'fa fa-minus\'></i> Organisations involved</h2>"; 
				obj=resource._embedded.agentCorp;
			 
			 for(var key in obj)
			 {
			if(obj[key].displayName) {
				decodeU = encodeURIComponent(obj[key]._links.self.href);
			html+='<h3><a href="http://54.76.94.166/organisation/?id='+decodeU+'">' + obj[key].displayName + "</a></h3>"	
			}
			 }
			 
			 }
			 
			 
			 /*******/
			 /***Located at***/
			 
			 
           
         	/***Agent Corp***/
			 obj = resource._embedded.place;
			 console.log(obj);
			 if(resource._embedded.place!="")
			 {
				html+="<h2 class=toggle><i class=\'fa fa-minus\'></i> Located at</h2>"; 
			 }
			 for(var key in obj)
			 {
			if(obj[key].label) {
				decodeU = encodeURIComponent(obj[key]._links.self.href);
			html+='<h3><a href="http://54.76.94.166/place/?id='+decodeU+'">' + obj[key].label + "</a></h3>"	
			}
			 }
			 /****Related people***/
		/*	 	if(resource._embedded.agentPerson!="")
			{
				   html += '<h2 class=toggle><i class=\'fa fa-minus\'></i> Participants</h2>';
			html+='<div class="row">';
            obj = resource._embedded.agentPerson;
         
			var count;
            for (var key in obj) {
               

					html+= '<div class="large-6 columns"><dl>';
					
					var decodeU = encodeURIComponent(obj[key]._links.self.href);
					if(obj[key].relTypeLabel){html += '<dt>'+obj[key].relTypeLabel.toProperCase() + '</dt>';}
                    html += '<dd><a href="http://54.76.94.166/person/?id=' + decodeU + '">' + obj[key].displayName + '</a></dd>';
                 
                    if (obj[key].displayNote) {
                        html += '<dd>' + obj[key].displayNote + '</dd>';
                    }
                

                html += '</dl></div>';
            }
			html+= '</div></div>';
			}
			 /***Agent in room**/
			/* if(resource._embedded.room!="")
			{
            obj = resource._embedded.room;
            html += '<h2 class=toggle><i class=\'fa fa-minus\'></i> Things in Their Home Setting</h2>';
            for (var key in obj) {
                if (obj[key].label) {
                    /***Url needs encoding**/
				/*	var decodeU = encodeURIComponent(obj[key]._links.self.href);
                   
                    html += '<dl>'
                    html += "<dt><a href='http://54.76.94.166/room/?id=" + decodeU + "'>"+ obj[key].label + "</a></dt>";
                }
                var obj2 = obj[key]._embedded;
                for (var key2 in obj2) {
                    //place is array//
                    if (obj2[key2]) {
                    
                          html += '<dd><a href="http://54.76.94.166/place/?id=' + obj2[key2][0]._links.self.href + '">' + obj2[key2][0].label + '</a></dd>';

                    }

                }
           	html+='</dt>';


            }
			if(resource._links.network!="")
			{
			html+= '<h2 class=toggle><i class=\'fa fa-minus\'></i> Visualise relationships</h2>';
			html+= '<p><a href="/chart/?id=' + encodeURIComponent(resource._links.network.href) + '&name=' + encodeURIComponent(resource.labels[0]) + '&link=' + uri + '">Show a chart for the relationships in this network</a>';
			}
			} */
          
        });
		console.log(next);
		 url = "http://54.72.154.243" + next;
        
			   api.newRequest().follow('eventAsAgent').getResource(function(error, resource, traversal) {
			console.log(resource);
			  /***Related people**/
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
                      
						if(objP[key2].label){label = objP[key2].label}
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
				  if(obj3[key3].title){details = '<p><strong>Title: </strong><a href='+obj3[key3]._links.page.href+'>'+obj3[key3].title+'</a></p>'}
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
            /***Agent in room ***/
			if(resource._embedded.agentInRoom!="")
			{
            obj = resource._embedded.agentInRoom;
            html += '<h2 class=toggle><i class=\'fa fa-minus\'></i> Sections</h2><div class="row"><div class="large-12 columns">';
			
/***Britain can make it***/
if(uri=="/ebd/exhibition/http%3A//data.archiveshub.ac.uk/ebd/id/event/Britain%2520Can%2520Make%2520It")
{
	  html += '<dl>'

  if (obj[0].label) {
                    /***Url needs encoding**/
					var decodeU = encodeURIComponent(obj[0]._links.self.href);
                  
                   
                    html += "<dt><a href='http://54.76.94.166/room/?id=" + decodeU + "'>"+ obj[0].label + "</a></dt>";
                }
                var obj2 = obj[0]._embedded;
                for (var key2 in obj2) {
                    //place is array//
                    if (obj2[key2]) {
                    		decodeU = encodeURIComponent(obj2[key2][0]._links.self.href);
                          html += '<dd><a href="http://54.76.94.166/place/?id=' + decodeU + '">' + obj2[key2][0].label + '</a></dd>';

                    }

                }
				   html+='</dl></div></div>';
				   
} else {
            for (var key in obj) {
				 html += '<dl>'
                if (obj[key].label) {
                    /***Url needs encoding**/
					var decodeU = encodeURIComponent(obj[key]._links.self.href);
                   
                   
                    html += "<dt><a href='http://54.76.94.166/room/?id=" + decodeU + "'>"+ obj[key].label + "</a></dt>";
                }
                var obj2 = obj[key]._embedded;
                for (var key2 in obj2) {
                    //place is array//
                    if (obj2[key2]) {
                    		decodeU = encodeURIComponent(obj2[key2][0]._links.self.href);
                          html += '<dd><a href="http://54.76.94.166/place/?id=' + decodeU + '">' + obj2[key2][0].label + '</a></dd>';

                    }

                }
			}
           html+='</dl></div></div>';

            }
				

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
				  if(obj3[key3].licence){details+= '<p><strong>Licence: </strong><a href='+obj3[key3]._links.licence.href+'>'+obj3[key3].licence+'</a></p>'}
				  if(obj3[key3].collection){details+='<p><strong>Collection: </strong>'+obj3[key3].collection+'</p>';}
				  		    if(obj3[key3].repository){details+= '<p><strong>Repository: </strong>'+obj3[key3].repository+'</p>'}
				  if(obj3[key3].rightsHolder){details+= '<p><strong>Rights holder:</strong> '+obj3[key3].rightsHolder+'</p>';}
			
				  
			image+='<a href="#"  data-featherlight="'+obj3[key3]._links.self.href+'">';
			image+='<div class="small-thumb"><img src="' + obj3[key3]._links.thumbnail.href + '" alt="'+obj3[key3].displayName+'" /></div></a>';
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
				
				
					 if (obj[key].date) {html += '<dd>' + convertDate(obj[key].date) + '</dd>'; }

                if (obj[key].dateFrom) {       
					html += '<dd>' + convertDate(obj[key].dateFrom);
					if(obj[key].dateTo){html+=" - " + convertDate(obj[key].dateTo)}
					html += '</dd>';
                }
             

				 html+= '</dl>';
			}
				//html+="<p>" + obj[key]._embedded[0].identifier + "</p>";
				
html+='</div></div>';
				
			}
			
			
			/*******************************/
            /****Sources****/
			/*if(resource._embedded.source) 
			{obj = resource._embedded.sources;
            html += "<h2 class=toggle><i class=\'fa fa-minus\'></i> Sources</h2>";
            html += "<ul>";

            for (var key in obj) {

                if (obj[key]._links.self)
                    html += '<li>' + obj[key].title + '</li>';
            }
            html += "</ul>";

			}*/
			
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
			
			
			
			
 /***Timeline/Events attended (Agent in event)**/
			if(resource._embedded.agentInEvent!="")
			{
			
            obj = resource._embedded.agentInEvent;
            html += '<h2 class=toggle><i class=\'fa fa-minus\'></i> Timeline</h2>';
				html+='	<section id="cd-timeline" class="cd-container">';
            for (var key in obj) {
				html+='<div class="cd-timeline-block">' +
		'<div class="cd-timeline-img cd-location">' +
//'			<img src="img/cd-icon-picture.svg" alt="Picture">' +
'		</div> <!-- cd-timeline-img -->';
				html+= '<div class="cd-timeline-content">';
                html += '<h3>' + obj[key].label + '</h3>';
               
		

                var obj2 = obj[key]._embedded;
                for (var key2 in obj2) {
					var postcode="";
					var address="";
					var label="";
                    //place is array//
                    if (obj2[key2]) {
                      
						if(obj2[key2][0].label){label = obj2[key2][0].label}
						if(obj2[key2][0].address){address = parseA(obj2[key2][0].address);}
                        if(obj2[key2][0].postcode){address+="<br/>";postcode = obj2[key2][0].postcode}
						if(obj2[key2][0]._links.self.href){decodeU = encodeURIComponent(obj2[key2][0]._links.self.href);}
                          
						
                        html += '<p><a href="http://54.76.94.166/place/?id=' + decodeU + '">'+ label + address + postcode + '</a></p>';

                    }
				
                }
				 if (obj[key].date) {
                    html += '<span class="cd-date">' + obj[key].date + '</span>';
                }
                if (obj[key].dateFrom) {
                    html += '<span class="cd-date">' + obj[key].dateFrom;
                }
                if (obj[key].dateTo) {
                    html += ' - ' + obj[key].dateTo + '</span>';
                }
               
				html+='</div></div>';
            }
			html+="</dl></section>";
			}
   /*******/
if(resource._links.network!="")
			{
			html+= '<h2 class=toggle><i class=\'fa fa-minus\'></i> Visualise relationships</h2>';
			html+= '<p><a href="/chart/?id=' + encodeURIComponent(resource._links.network.href) + '&name=' + encodeURIComponent(resource.displayName) + '&link=' + uri + '">Show a chart for the relationships in this network</a>';
			}					/*******************************/
            /****Source****/
			var records = "<h2 class=toggle><i class=\'fa fa-minus\'></i> Records</h2><ul>";
			obj = resource._embedded.source;
            //html += '<h2 class=toggle><i class=\'fa fa-minus\'></i> Timeline</h2>';
				//html+='	<section id="cd-timeline" class="cd-container">';
				if(resource._embedded.source!="") {html+="<h2 class=toggle><i class=\'fa fa-minus\'></i> Source</h2><ul>";}
            for (var key in obj) {
				var href = "";
				var href2= "";
				var title = obj[key].title;
				var url = obj[key]._links;
				
				if(url) {
					href = '<a href="' + url.self.href+ '">';
					href2= '</a>'
				} else { href=""; href2="";}
				 
				html+= '<li>' + href+ title + href2 + '</li>'; 
		
				
		
			
			}
				//if(resource.hubNote!=""){html+="<h3>Attribution</h3><p>"+resource.hubNote+"</p>";}
		 $('#json_hal_response').html(html);
			 $(".toggle:not(:first)").nextUntil('.toggle').toggleClass("hidden");
 $(".toggle:not(:first)").children().toggleClass("fa-plus fa-minus");
 
			   });
		 
		 
		     }
function parse(str) {
 str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    return str;
}


function parseA(str) {
	console.log(str);
 str = str.replace(/([|])/g, '<br />');
 console.log(str);
    return str;
}


	function parsen(str) {
 str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
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

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
	
})();


