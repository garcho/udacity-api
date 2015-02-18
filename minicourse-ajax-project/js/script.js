
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var city, street, address, URL, imagen; 
    city = $("#city").val();
    street = $("#street").val();
    address = street + ", " + city;


    $greeting.text("So you want to live in "+address); 

    URL = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location="+address;
    imagen = '<img class="bgimg" src="'+URL+'"/>'; 
    $body.append(imagen);

    var NytURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?&q="+city+"&api-key=25270324c78c609098876595beb76b94:7:71329781";


    $.getJSON( NytURL , function(data){

        $nytHeaderElem.text("New York Times Articles About "+city+"!") ;     

        var cant = data.response.docs.length; 
    
        for  ( i = 0; i <  cant ; i++){

            var hedline = data.response.docs[i].headline.main;
            var snippet = data.response.docs[i].snippet;
            var web_url = data.response.docs[i].web_url;

            $nytElem.append('<li class="article"><a href="'+web_url+'">'+hedline+'</a><p>'+snippet+'</p></li>'); 

        }
          

        

    }).error(function(){
        $nytHeaderElem.text("New York Times articles about "+city+" could not be loaded!")

    });


    var wikiUrl = "http://en.wikipedia.org/w/api.php?callback=?&format=json&action=query&titles="+city+"&prop=revisions&prop=extlinks&rvprop=content"; 

    $.ajax({
            url: wikiUrl,
            dataType: "json",
            success: function(resultado){

                var pagina = resultado.query.pages; 
                console.log(resultado);

                for (var name in pagina){

                    console.log(name);
                    console.log(pagina[name]);
                    var titulo = pagina[name].title;  
                    console.log(titulo);
                    var wikiUrl = "http://en.wikipedia.org/wiki/"+titulo; 
                    console.log(wikiUrl);
                    //$wikiElem.append('<li><a href=""></a></li>');
                }
            

                

            }
        }); 

         













    return false;
};

$('#form-container').submit(loadData);

// loadData();
