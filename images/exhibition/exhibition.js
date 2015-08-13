(function() {

    /* global TraversonJsonHalAdapter */
    'use strict';

    // register HAL adapter in Traverson's media type registry
    traverson.registerMediaType(TraversonJsonHalAdapter.mediaType,
        TraversonJsonHalAdapter);


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
        var api = traverson
            .from(url) // set root URL
            .jsonHal();


       // $('#json_hal_response').html('<div class="row"><div class="small-6 large-centered columns"><i class="fa fa-cog fa-spin text-center" style="font-size:20pt;"></i> Loading</div></div>');
		
		

        api.newRequest().getResource(function(error, resource, traversal) {
            var obj;
			var note;
			var decodeU;
	
    	if(resource.labels) {html="<h1>" + resource.labels[0] + "</h1>";}
		
		if(resource.dateFrom){ html+='<div class="panel"><div class="row">'};
		        
            if (resource.dateFrom) {html += "<div class='large-4 columns'><dl><dt>From</dt><dd>" + resource.dateFrom + "</dd></dl></div>";}
			if (resource.dateTo) {html+="<div class='large-4 columns'><dl><dt>To</dt><dd>" + resource.dateTo + "</dd></dl></div>";}
		
			if(resource.dateFrom){ html+='</div></div>';};
        	
			
         	/***Agent Corp***/
			 obj = resource._embedded.agentCorp;
			 console.log(obj);
			 
			 if(resource._embedded.image) {
				  var obj = resource._embedded.image;
				  html+='<div class="row"><div class="large-3 columns">';
			  for(var key in obj) {
			html+='<a href="#"  data-featherlight="'+obj[key]._links.self.href+'">';
			html+='<img data-rights="'+obj[key].rightsHolder+'" data-cc="'+obj[key].licence+'" src="' + obj[key]._links.thumbnail.href + '" alt="Image of ' + resource.displayName + '" title="Rights Holder: '+  obj[key].rightsHolder + ' Licence: ' + obj[key].licence +'"/></a><p><span class="label">' + obj[key].rightsHolder + '</span></p>';
					html+='</div>';
					
			  } 
		
			  if(resource.descriptions){html+="<div class='large-9 columns'><p>"+parsen(resource.descriptions[0])+"</p></div></div>";}
			 } else {
				 if(resource.descriptions){html+="<div class='row'><div class='large-12 columns'><p>"+parsen(resource.descriptions[0])+"</p></div></div>";}
			 }
			 
			 html+="<hr class='hr' />";
			 
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
			 	if(resource._embedded.agentPerson!="")
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
			 if(resource._embedded.room!="")
			{
            obj = resource._embedded.room;
            html += '<h2 class=toggle><i class=\'fa fa-minus\'></i> Participation in the "Things in Their Home Setting" section of Britain Can Make It </h2>';
            for (var key in obj) {
                if (obj[key].label) {
                    /***Url needs encoding**/
					var decodeU = encodeURIComponent(obj[key]._links.self.href);
                   
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
			} 
        
            $('#json_hal_response').html(html);
			 $(".toggle:not(:first)").nextUntil('.toggle').toggleClass("hidden");
 $(".toggle:not(:first)").children().toggleClass("fa-plus fa-minus");
        });
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


