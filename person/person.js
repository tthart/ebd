(function() {

    /* global TraversonJsonHalAdapter */
    'use strict';

    // register HAL adapter in Traverson's media type registry
    traverson.registerMediaType(TraversonJsonHalAdapter.mediaType,
        TraversonJsonHalAdapter);

    var uri = getParameterByName('id');
	if(uri!="")
	{
    person('http://54.72.154.243/' + uri);
	} else {
	var html="<p>No value selected.</p>"
	 $('#json_hal_response').html(html);
	}

    /*****************************************************************************************************************************************************
    	Person
    ************/
    function person(uri) {
        var url = "http://54.72.154.243/" + uri;
        var href;
        var html;
        var name;
        var api = traverson
            .from(uri) // set root URL
            .jsonHal();

        /***Initial person****/
        api.newRequest().getResource(function(error, resource, traversal) {
            var obj;
			var note;
			var decodeU;
	
    	if(resource.displayNote) {
		if(resource._links.hubRec)	{ 
		if(resource._links.hubRec.href){	
		
		html+='<dd>' + resource._links.hubRec.href + '</dd>';
		html = '<hr/><h1 class="featured">' + resource.displayName +' <small>' + resource.displayNote + '</small> <span class="label success">Featured</span> </h1><hr />'; 
		} }
		
			else {html = '<hr/><h1>' + resource.displayName +' <small>' + resource.displayNote + '</small></h1><hr />';}
		}
          else {
			html= '<hr/><h1>' + resource.displayName + '</h1><hr />';  
		  }
		 /**Image***/ 
		 if(resource._embedded.image)
		  {
			  //html+='   <a href="#" data-featherlight="#mylightbox">Open element in lightbox</a><div id="mylightbox">This div will be opened in a lightbox</div>';
			  html+='<div class="large-3 columns">';
			  /**Image**/
			  var obj = resource._embedded.image;
			  for(var key in obj) {
				  var details;
				  if(obj[key]._links.page) {
					  details = '<p><strong>Title: </strong><a href='+obj[key]._links.page.href+'>'+obj[key].title+'</a></p>';  
				  } else 
				  {
					    details = '<p><strong>Title: </strong>'+obj[key].title+'</p>'
				  }
				
				  if(obj[key].identifier){details+= '<p><strong>Identifier: </strong>'+obj[key].identifier+'</p>'}
				    if(obj[key].collection){details+='<p><strong>Collection: </strong>'+obj[key].collection+'</p>';}
					if(obj[key].repository){details+= '<p><strong>Repository: </strong>'+obj[key].repository+'</p>'}
				  if(obj[key].rightsHolder){details+= '<p><strong>Rights holder:</strong> '+obj[key].rightsHolder+'</p>';}
				  if(obj[key].licence){details+= '<p><strong>Licence: </strong><a href='+obj[key]._links.licence.href+'>'+obj[key].licence+'</a></p>'}

				
			
				  
			html+='<a href="#"  data-featherlight="<img src='+obj[key]._links.self.href+'/><p>'+resource.displayName +'</p>">';
			html+='<div class="thumb"><img src="' + obj[key]._links.thumbnail.href + '" ' + + '" title="Rights Holder: '+  obj[key].rightsHolder + ' Licence: ' + obj[key].licence +'"/></div></a><a data-featherlight="'+details+'"><i class="fa fa-info-circle"></i> Details</a>';
			
					html+='</div>'
			  } 
			  html+='<div class="large-9 columns">';
			   /**Alternative Names **/
			if(resource.names){
				
            html += '<dl><dt>Names</dt>';
            obj = resource.names
            for (var key in obj) {
                html += "<dd>" + obj[key].name + " <span class='label'>" + obj[key].status + "</span> <span class='label secondary'>" + obj[key].source + "</span></dd> ";

            }
		
			html+='</dl>';
			}
            /***end***/
		//	console.log(new Date().format('dddd, mmmm dd, yyyy.'));
	
		if(resource.nationality || resource.dateFrom){ html+='<div class="panel"><div class="row">'};
		var dateFromType;
		var dateToType;
		var dateType;
			if(resource.nationality){html+= '<div class="large-4 columns"><dl><dt>Nationality</dt><dd>' + resource.nationality + '</dd></dl></div>';}
      		if(resource.dateFromType){dateFromType=resource.dateFromType + " "} else {dateFromType=""}
			if(resource.dateToType){dateToType=resource.dateToType + " "} else {dateToType=""}
			if(resource.dateType){dateType=resource.dateType + " "} else {dateType = ""}
            if (resource.dateFrom) {html += "<div class='large-4 columns'><dl><dt>From</dt><dd>" + dateFromType + convertDate(resource.dateFrom) + "</dd></dl></div>";}
			if (resource.dateTo) {html+="<div class='large-4 columns'><dl><dt>To</dt><dd>" + dateToType  + convertDate(resource.dateTo) + "</dd></dl></div>";}
			if (resource.date) {html+="<div class='large-4 columns'><dl><dt>Date</dt><dd>" + dateType  + convertDate(resource.date) + "</dd></dl></div>";}
			if(resource.nationality || resource.dateFrom){ html+='</div></div>';};
           /****Biography***/
            if (resource._embedded.biography!="") {
				 html+='</div>';
				html += '<div class="row"><div class="large-12 columns"><h2 class=toggle><i class=\'fa fa-minus\'></i> Biography</h2><span class="content">';
				  obj = resource._embedded.biography;
				var string = resource._embedded.biography.text;
				
				for(var key in obj) {
					html +="<p>" + parse(obj[key].text) + "</p>";
					
					obj2 = obj[key]._embedded;
					html+="<dl><dt>Source</dt>";
					//for(var key2 in obj2)
					//{
					html+="<dd><a href='" + obj[key]._embedded.source._links.self.href + "'>" + obj[key]._embedded.source.title + "</a></dd></dl>"
				//	}
				}
			html+="</span>";
            } else {  html+='</div></div>';}
		 
		  } else {
		var dateFromType;
		var dateToType;
		var dateType;
		   /**Alternative Names **/
		   if(resource.dateFromType){dateFromType=resource.dateFromType + " "} else {dateFromType=""}
			if(resource.dateToType){dateToType=resource.dateToType + " "} else {dateToType=""}
			if(resource.dateType){dateType=resource.dateType + " "} else {dateType = ""}
			if(resource.names){
            html += '<dl><dt>Names</dt>';
            obj = resource.names
            for (var key in obj) {
                html += "<dd>" + obj[key].name + " <span class='label'>" + obj[key].status + "</span> <span class='label secondary'>" + obj[key].source + "</span></dd> ";

            }
			html+='</dl>';
			}
            /***end***/
			
		if(resource.nationality || resource.dateFrom){ html+='<div class="panel"><div class="row">'};
		
			if(resource.nationality){html+= '<div class="large-4 columns"><dl><dt>Nationality</dt><dd>' + resource.nationality + '</dd></dl></div>';}
        
            if (resource.dateFrom) {html += "<div class='large-4 columns'><dl><dt>From</dt><dd>" + dateFromType + convertDate(resource.dateFrom) + "</dd></dl></div>";}
			if (resource.dateTo) {html+="<div class='large-4 columns'><dl><dt>To</dt><dd>" + dateToType + convertDate(resource.dateTo) + "</dd></dl></div>";}
			if (resource.date) {html+="<div class='large-4 columns'><dl><dt>Date</dt><dd>" + dateType + convertDate(resource.date) + "</dd></dl></div>";}
			if(resource.nationality || resource.dateFrom){ html+='</div></div>';};
           /****Biography***/
            if (resource._embedded.biography!="") {
				html += "<h2 class=toggle><i class=\'fa fa-minus\'></i> Biography</h2><div class='row'><div class='large-12 columns'>";
				  obj = resource._embedded.biography;
				var string = resource._embedded.biography.text;
				
				for(var key in obj) {
					html +="<p>" + parse(obj[key].text) + "</p>";
					
					obj2 = obj[key]._embedded;
					html+="<dl><dt>Source</dt>";
					//for(var key2 in obj2)
					//{
					html+="<dd><a href='" + obj[key]._embedded.source._links.self.href + "'>" + obj[key]._embedded.source.title + "</a></dd></dl>"
				//	}
				
				}
html+="</div></div></div>";
            }
			
		  }
	html+="<hr class='hr' />";	
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
			            /****Agent in exhibition**/
			if(resource._embedded.agentInExhibition!="")
			{
            obj = resource._embedded.agentInExhibition;
                html += "<h2 class=toggle><i class=\'fa fa-minus\'></i> Participated in exhibitions</h2>"
            for (var key in obj) {

			decodeU = encodeURIComponent(obj[key]._links.self.href);
			if(obj[key].dateFromType){dateFromType=obj[key].dateFromType + " "} else {dateFromType=""}
			if(obj[key].dateToType){dateToType=obj[key].dateToType + " "} else {dateToType=""}
			if(obj[key].dateType){dateType=obj[key].dateType + " "} else {dateType = ""}
                html += '<dl><dt><a href="http://54.76.94.166/exhibition/?id=' + decodeU + '">' + obj[key].label + '</a></dt>';
                if (obj[key].dateFrom) {
                 
                    html += "<dd>" + dateFromType + convertDate(obj[key].dateFrom)+ " - " + dateToType + convertDate(obj[key].dateTo) + "</dd>";
                }
                if (obj[key].date) {
                    html += "<dd>" + dateType + convertDate(obj[key].date) + "</dd>";
                }
				html+='</dl>';
            }
			}

         
            /***Agent in room ***/
			if(resource._embedded.agentInRoom!="")
			{
            obj = resource._embedded.agentInRoom;
            html += '<h2 class=toggle><i class=\'fa fa-minus\'></i> Participation in the "Things in Their Home Setting" section of Britain Can Make It </h2><div class="row"><div class="large-12 columns">';
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
				
				  if(obj3[key3].collection){details+='<p><strong>Collection: </strong>'+obj3[key3].collection+'</p>';}
				  		    if(obj3[key3].repository){details+= '<p><strong>Repository: </strong>'+obj3[key3].repository+'</p>'}
				  if(obj3[key3].rightsHolder){details+= '<p><strong>Rights holder:</strong> '+obj3[key3].rightsHolder+'</p>';}
				    if(obj3[key3].licence){details+= '<p><strong>Licence: </strong><a href='+obj3[key3]._links.licence.href+'>'+obj3[key3].licence+'</a></p>'}
			
				  
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
					
					
				/**If the title has a link to the item**/	
			for(var key2 in obj2) {
				html+= '<dl>';
				html+= '<dd>'+obj2[key2].title+'</dd>';
				 html+= '</dl>';
			}
				
				html+="<dl>";
				if(obj[key].dateFromType){dateFromType=obj[key].dateFromType + " "} else {dateFromType=""}
			if(obj[key].dateToType){dateToType=obj[key].dateToType + " "} else {dateToType=""}
			if(obj[key].dateType){dateType=obj[key].dateType + " "} else {dateType = ""}
					 if (obj[key].date) {html += '<dd>' + convertDate(obj[key].date) + '</dd>'; }
   if (obj[key].dateFrom) {       
					html += '<dd>' + dateFromType + convertDate(obj[key].dateFrom);
					if(obj[key].dateTo){html+=" - " + dateToType + convertDate(obj[key].dateTo)}
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
                      
						if(obj2[key2][0].label){label = obj2[key2][0].label + "<br />"}
						if(obj2[key2][0].address){address = parseA(obj2[key2][0].address);}
                        if(obj2[key2][0].postcode){address+="<br/>";postcode = obj2[key2][0].postcode}
						if(obj2[key2][0]._links.self){decodeU = encodeURIComponent(obj2[key2][0]._links.self.href);
						html += '<p><a href="http://54.76.94.166/place/?id=' + decodeU + '">'+ label + address + postcode + '</a></p>';
						}
						else {
						html += '<p>'+ label + address + postcode + '</p>';	
						}
                          
					

                    }
				
                }
				
				if(obj[key].dateFromType){dateFromType=obj[key].dateFromType + " "} else {dateFromType=""}
			if(obj[key].dateToType){dateToType=obj[key].dateToType + " "} else {dateToType=""}
			if(obj[key].dateType){dateType=obj[key].dateType + " "} else {dateType = ""}
					 
					
				 if (obj[key].date) {
					
                    html += '<span class="cd-date">' + dateType + convertDate(obj[key].date)  + '</span>';
					
				
                }
                if (obj[key].dateFrom) {
                    html += '<span class="cd-date">' + dateFromType + convertDate(obj[key].dateFrom);
					
                }
                if (obj[key].dateTo) {
                    html += ' - ' + dateToType + convertDate(obj[key].dateTo) + '</span>';
                }
               
				html+='</div></div>';
            }
			html+="</dl></section>";
			}
   /*******/
if(resource._links.networkGrouped!="")
			{
			html+= '<h2 class=toggle><i class=\'fa fa-minus\'></i> Visualise relationships</h2>';
			html+= '<p><a href="/chart/?id=' + encodeURIComponent(resource._links.networkGrouped.href) + '&name=' + encodeURIComponent(resource.displayName) + '&link=' + uri + '">Show a chart for the relationships in this network</a>';
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
			html+="</ul>";
				if(!isEmpty(resource.hubNote)){html+="<h3>Attribution</h3><p>"+resource.hubNote+"</p>";}
            $('#json_hal_response').html(html);
	
 $(".toggle:not(:first)").nextUntil('.toggle').toggleClass("hidden");
 $(".toggle:not(:first)").children().toggleClass("fa-plus fa-minus");

        });
    }



    //End of function
	
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



    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

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


