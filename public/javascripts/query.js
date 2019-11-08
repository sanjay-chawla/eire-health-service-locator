$(document).ready(function(){
	var txUrl = "http://ec2-34-243-201-217.eu-west-1.compute.amazonaws.com:8080/hospitals/query?query=SELECT%3Fsubject%3Fpredicate%3Fobject%20WHERE%7B%3Fsubject%3Fpredicate%3Fobject%7DLIMIT25&output=json";
	var queryFromPage = function() {
		console.log('call received!');
		var query="SELECT%3Fsubject%3Fpredicate%3Fobject%20WHERE%7B%3Fsubject%3Fpredicate%3Fobject%7DLIMIT25&output=json"
		var params={limit: 10}
		var cb=function(data) { console.log(JSON.stringify(data)) }
		$.ajax({url:txUrl,
				type: 'GET',
				/*beforeSend: function (xhr) {
					xhr.setRequestHeader("Authorization", "Basic " + btoa("neo4j" + ":" + "password"));
					xhr.setRequestHeader("Accept", "application/json; charset=UTF-8");
					xhr.setRequestHeader("Content-Type", "application/json");
				}
				data:JSON.stringify({statements:[{statement:query,parameters:params}]}),*/
				success: function(res) { cb(res)}
		});
	}
	$("#submit").click(queryFromPage);
})
