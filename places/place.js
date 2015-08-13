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
        var url = "http://54.72.154.243/ebd" + uri;
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
	
    	if(resource.label) {html="<h1>" + resource.label + "</h1>";}
		/**Events that happened**/
		if(resource._embedded.event){
		obj = resource._embedded.event;
		html+="<h2>Events held here</h2>";	
	
		for(var key in obj)
		{
			console.log(obj[key]);
			
				if(obj[key].label) {html+= "<div class='large-12 columns'><h3>" + obj[key].label + "</h3></div>";}
					if(obj[key].date) {html+= "<div class='large-12 columns'><dl><dt>" + obj[key].date + "</dt></dl></div>";}
			   if (obj[key].dateFrom) {html += "<div class='large-6 columns'><dl><dt>From</dt><dd>" + obj[key].dateFrom + "</dd></dl></div>";}
			if (obj[key].dateTo) {html+="<div class='large-6 columns'><dl><dt>To</dt><dd>" + obj[key].dateTo + "</dd></dl></div>";}
				
			
		
		
			
		
           
    	/***Agent Corp embedded in an event***/
			 var obj2 = obj[key]._embedded.agentCorp;
			 
			 if(obj[key]._embedded.agentCorp!="") {html+="<div class='large-12 columns'><h4>Related Organisations</h4></div>"; }
			 for(var key2 in obj2)
			 {
				
			if(obj2[key2].displayName) {
				decodeU = encodeURIComponent(obj2[key2]._links.self.href);
			html+='<div class="large-4 columns"><dl><dd><a href="http://54.76.94.166/organisation/?id='+decodeU+'">' + obj2[key2].displayName + "</a></dd></dl></div>"	
			}
			 }
			 
			       
    	/***Agent person embedded in an event***/
			 var obj2 = obj[key]._embedded.agentPerson;
			 
			 if(obj[key]._embedded.agentCorp) {html+="<div class='large-12 columns'><h4>Participants</h4></div>"; }
			 for(var key2 in obj2)
			 {
				
			if(obj2[key2].displayName) {
				decodeU = encodeURIComponent(obj2[key2]._links.self.href);
			html+='<div class="large-4 columns"><dl><dd><a href="http://54.76.94.166/person/?id='+decodeU+'">' + obj2[key2].displayName + "</a></dd></dl></div>"	
			}
			 }
			 
		
			 
			
		}}/****End of events****/
        
        
            $('#json_hal_response').html(html);
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


	
})();


