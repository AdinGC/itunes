$(document).ready(function() {


    $("#search").on("click",function() {
        var input= $("#artists").val();
        console.log(input);

        $.ajax({
            url: "https://itunes.apple.com/search?term="+ input,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: function(result) {
                process(result);
            }
        });

    });



});

function process(result){
    var q=result.results;
    console.log(result);
    var number=$("#numberResults").val();

    var html="<table class='table'>"
    html+=" <th>Album</th><th>Track Name</th><th>Explicit?</th><th>Track Price</th><th>Genre</th><th>Sample</th>"
    for (var i=0; i<number; i++) {

        html += "<tr>";
        //album cover
        html += "<td> <img src="+ q[i].artworkUrl100 + '></td>';

        //track name
        html += "<td>" + q[i].trackName + "</td>";
        //explicit
        if(q[i].collectionExplicitness=="notExplicit"){
            html += "<td>" + "No" + "</td>";

        }else{
            html += "<td>" + "Yes" + "</td>";
        }
        //price
        html += "<td>" + q[i].trackPrice + "</td>";
        //genre
        html += "<td>" + q[i].primaryGenreName + "</td>";
        //audio preview
        html += "<td><audio controls='true' src="+ q[i].previewUrl + " id='audio' type='audio/m4a'></audio>" + "</td>";




        html += '</tr>'






    }
    html+="</table>"
    $('#display').html(html);
}




