$(document).ready(function(){
	var topics = ["basketball", "swimming", "soccer", "handball", "football", 
				"running", "tennis","baseball", "hockey", "boxing"];

				

    function makeButtons() {

        // Deleting the gif prior to adding new one
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // This will create all the buttons.
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each gif in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("sport");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          //console.log(topics[i]);
          $("#buttons-view").append(a);
          
        }
      }
      makeButtons();

      $("#addSport").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var input = $("#sport-input").val().trim();
        console.log(input);
        // Adding  from the textbox to our array
        topics.push(input);

        // Calling renderButtons which handles the processing topics array
        makeButtons();
      });

     
      
//////////////////////////////////////////////////////////////////////
//on button click
  
  
    $(document).on("click", ".sport", function() {
     var sport = $(this).html(); 
      
      //var sport = $(this).attr("data-name");
      console.log(sport);
      //Constructing a queryURL using the sport.
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dc6zaTOxFJmzC&limit=10";
      
      //Making the call
      //This code uses ajax with parameter url and call method get
      $.ajax({
        url: queryURL,
        method: "GET"

      })//ajax
  	
  	 
	   
    .done(function(response) {
            // grabs the data
        var results = response.data;
        //console.log(results);
            //empties the div before adding more gifs
        $("#sportView").empty();
         //loops through the data
        for ( var j=0; j < results.length; j++) {
          //creating div to hold gif
          var imageDiv = $("<div>");
          //creating variable to store the animated gif
          var imageView = results[j].images.fixed_height.url;
          //creating variable for storage of still gif
          var still = results[j].images.fixed_height_still.url;
              //console.log(imageView);  
          //creating an element to hold the images
          var sportImage = $("<img>").attr("src", still).attr("data-animate", imageView).attr("data-still", still);
          sportImage.attr("data-state", "still");
          //append the image
          imageDiv.append(sportImage);
          //displaying gif 
          $("#sportView").prepend(sportImage);  
          // pulling the rating
          var rating = results[j].rating;
          // console.log(rating);
          var displayRated= $("<p>").text("Rating: " + rating);
          $("#sportView").prepend(displayRated);
          
      }

});//done 
          
          
      $("#sportView").on("click", "img", function() {
        var state = $(this).attr("data-state");
                    console.log(state);
                    console.log($(this));
                 if ( state ==="still"){
                     $(this).attr("src", $(this).attr("data-animate"));
                     $(this).attr("data-state", "animate");
                  } 
                 else{
                     $(this).attr("src", $(this).attr("data-still"));
                     $(this).attr("data-state", "still");
                    }

                  });
        
      
}) // document on click  

});//ready





                
    

          
            
                


                
