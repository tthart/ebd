(function() {

    /* global TraversonJsonHalAdapter */
    'use strict';

    // register HAL adapter in Traverson's media type registry
    traverson.registerMediaType(TraversonJsonHalAdapter.mediaType,
        TraversonJsonHalAdapter);


    var uri = getParameterByName('id');
	if(uri!="")
	{
    place('http://54.72.154.243/' + uri);
	} else {
	var html="<p>No value selected.</p>"
	 $('#json_hal_response').html(html);
	}

    /*****************************************************************************************************************************************************
    	Exhibitions
    ************/
    function place(uri) {
        var url = "http://54.72.154.243/" + uri;
        var href;
        var html;
        var name;
        var api = traverson
            .from(uri) // set root URL
            .jsonHal();


       // $('#json_hal_response').html('<div class="row"><div class="small-6 large-centered columns"><i class="fa fa-cog fa-spin text-center" style="font-size:20pt;"></i> Loading</div></div>');
		
        api.newRequest().getResource(function(error, resource, traversal) {
			
            var obj;
			var note;
			var decodeU;
	
	/***Create map****/
	if(resource.lat && resource.long){createMap(resource.lat, resource.long);}
	else {
	$('#map-canvas').css("display","none");	
	}
	console.log(resource.lat, resource.long);
	
    	if(resource.label) {html="<h1>" + resource.label + "</h1>";}
		/**Events that happened**/
		if(resource._embedded.event){
		obj = resource._embedded.event;
		html+="<h2>Events held here</h2>";	
	
		for(var key in obj)
		{
			console.log(obj[key]);
			var date;
				if(obj[key].date) {date= convertDate(obj[key].date);}
			   if (obj[key].dateFrom) {date= convertDate(obj[key].dateFrom);}
			if (obj[key].dateTo) {date+= " - " + convertDate(obj[key].dateTo);}
				if(obj[key].label) {html+= "<h3 class=toggle><i class=\'fa fa-minus\'></i> " + date + " " + obj[key].label + "</h3>";}
				
				
			
		
		
			
		
           
    	/***Agent Corp embedded in an event***/
			 var obj2 = obj[key]._embedded.agentCorp;
			 
			 if(obj[key]._embedded.agentCorp!="") {html+="<div class='large-12 columns'><h4>Related Organisations</h4></div>"; }
			 for(var key2 in obj2)
			 {
				
			if(obj2[key2].displayName) {
				decodeU = encodeURIComponent(obj2[key2]._links.self.href);
			html+='<div class="large-12 columns"><dl><dd><a href="http://54.76.94.166/organisation/?id='+decodeU+'">' + obj2[key2].displayName + "</a></dd></dl>"
			
							if(obj2[key2]._links.hubRec){html+=" <span class='label success'>Featured</span>"}
			html+="</div>"	
			
			}
			 }
			 
			       
    	/***Agent person embedded in an event***/
			 var obj2 = obj[key]._embedded.agentPerson;
			 
			 if(obj[key]._embedded.agentPerson.length!=0) {html+="<div class='large-12 columns'><h4>Participants</h4></div>"; }
			 for(var key2 in obj2)
			 {
				
			if(obj2[key2].displayName) {
				decodeU = encodeURIComponent(obj2[key2]._links.self.href);
			html+='<dl>';
				html+='<dd><a href="http://54.76.94.166/person/?id='+decodeU+'">' + obj2[key2].displayName;
							if(obj2[key2]._links.hubRec){html+=" <span class='label success'>Featured</span>"}
			html+= '</a></dd>';
				html+='</dl></div>';
		if(obj2[key2]._embedded)
		{	
	
		if(obj2[key2]._embedded.image){
		var obj3 = obj2[key2]._embedded.image;
			for(var key3 in obj3)
			{
				console.log(obj3[key3]._links);
				var details = "";
				var image = "";
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
			
				  
			image+='<dl><dd><a href="#"  data-featherlight="'+obj3[key3]._links.self.href+'">';
			image+='<div class=small-thumb><img src="' + obj3[key3]._links.thumbnail.href + '" /></div></a>';
			image+='<br /><a data-featherlight="'+details+'"><i class="fa fa-info-circle"></i> Details</a></dd></dl>';
				html+=image;
			}
				
		}
	
		}
			
			}
			 }
			 
		
			 
			
		}}/****End of events****/
        
        
            $('#json_hal_response').html(html);
			 $(".toggle:not(:first)").nextUntil('.toggle').toggleClass("hidden");
 $(".toggle:not(:first)").children('i').toggleClass("fa-plus fa-minus");			
        });
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


/*****Maps*****/
	/**Single point only**/
function createMap(Lat, Long) {
  var myLatlng = new google.maps.LatLng(Lat,Long);
  var mapOptions = {
    zoom: 10,
    center: myLatlng
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var contentString = '<div id="content">'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: ''
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
}


	
})();


