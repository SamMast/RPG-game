$(document).ready(function() {

//Button Creation

	var obi = {
		name:"Obi-Wan Kenobi", 
		attack: "20",
		healthPoints:"175",
		counterAttack:"20",
		src:"https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Ben_Kenobi.png/220px-Ben_Kenobi.png"
	}
		
	var luke = {
		name:"Luke Skywalker", 
		attack: "40",
		healthPoints:"125",
		counterAttack:"10",
		src:"https://pm1.narvii.com/6009/bb9e18d9f023151491f8b9b1ea65e352737877b8_hq.jpg"
	}	
		
	var darth = {
		name:"Darth Vader", 
		attack: "30",
		healthPoints:"150",
		counterAttack:"30",
		src:"https://images.moviepilot.com/image/upload/c_fill,h_470,q_auto:good,w_620/darth-vader_6bda9114-star-wars-art-challenge-features-crazy-dark-side-redesigns-jpeg-228992.jpg"
	}	

	var jabba = {
		name:"Jabba the Hut", 
		attack: "10",
		healthPoints:"200",
		counterAttack:"40",
		src:"https://vignette.wikia.nocookie.net/starwars/images/6/6a/Jabba_the_Hutt_NEGTC2.jpg/revision/latest/scale-to-width-down/200?cb=20110127014208"
	}

	var characters = [obi, luke, darth, jabba];
	var userCharacter = [];
	var enemiesLeft = [];
	var currentEnemy = [];
	var userCharacterPicked = false;
	var enemyCharacterPicked = false;

//functions

//create button

function createButton() {
	for (var i = 0; i < characters.length; i++) {
	    var characterBtn = $("<div>");

        characterBtn.attr("character-name", characters[i].name);
        characterBtn.attr("character-hp", characters[i].healthPoints);
        characterBtn.attr("character-attack", characters[i].attack);
        characterBtn.attr("character-counter", characters[i].counterAttack);
        characterBtn.addClass("character");



        characterBtn.html("<img src='" + characters[i].src + "' class='image'/><br>"); 

        characterBtn.prepend(characters[i].name);

        characterBtn.append(characters[i].healthPoints);

        $("#pickCharacter").append(characterBtn);

      }
}


	createButton();

// On Click events


	$(".character").on("click", function() {

	   	if (userCharacterPicked === false) {

			$("#pickCharacter").hide();
		    $("#pickText").hide();

		    userCharacter = $(this).append(characters);
		    console.log(userCharacter);
		    $("#userCharacter").append(userCharacter);

		    var userCharacterName = $(this).attr("character-name");
		    
		    userCharacterPicked = true;

		    $(".character").each(function () {
		       	if ($(this).attr("character-name") != userCharacterName) {
		        	$("#enemiesLeft").append(this);
		        };

		    });

	   	} else if (userCharacterPicked === true && enemyCharacterPicked === false) {

		   	currentEnemy = $(this).append(characters);
		    console.log(currentEnemy);
		    $("#currentEnemy").append(currentEnemy);

		    var enemyCharacterName = $(this).attr("character-name");

		    enemyCharacterPicked = true;

		    $(".character").each(function () {
		       	if ($(this).attr("character-name") != userCharacterName) {
		        	$("#enemiesLeft").append(this);
		        }

		    });
		}

	});





