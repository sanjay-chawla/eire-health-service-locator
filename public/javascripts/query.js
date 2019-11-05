$(document).ready(function(){
	var txUrl = "http://localhost:7474/db/data/transaction/commit";
	var queryFromPage = function() {
		console.log('call received!');
		var query="MATCH (n) RETURN n LIMIT {limit}"
		var params={limit: 10}
		var cb=function(data) { console.log(JSON.stringify(data)) }
		$.ajax({url:txUrl,
				type: 'POST',
				beforeSend: function (xhr) {
					xhr.setRequestHeader("Authorization", "Basic " + btoa("neo4j" + ":" + "password"));
					xhr.setRequestHeader("Accept", "application/json; charset=UTF-8");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				data:JSON.stringify({statements:[{statement:query,parameters:params}]}),
				success: function(res) { cb(res)}
		});
	}
	$("#submit").click(queryFromPage);
})
