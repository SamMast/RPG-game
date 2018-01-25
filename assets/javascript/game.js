$(document).ready(function() {

//Global Variables

//objects
	var obi = {
		var: "obi",
		name:"Obi-Wan Kenobi", 
		attack: "20",
		healthPoints:"175",
		counterAttack:"20",
		src:"https://www.hasbro.com/common/productimages/en_AU/80520fda50569047f523b6138dd58048/8057953D50569047F527CFD4A4CAF309.jpg",
		dead: false
	}
		
	var luke = {
		var: "luke",
		name:"Luke Skywalker", 
		attack: "40",
		healthPoints:"125",
		counterAttack:"10",
		src:"http://moziru.com/images/luke-skywalker-clipart-3.jpg",
		dead: false
	}	
		
	var darth = {
		var: "darth",
		name:"Darth Vader", 
		attack: "30",
		healthPoints:"150",
		counterAttack:"30",
		src:"https://cdn.shopify.com/s/files/1/0732/4767/products/Darth_Vader_New_Hope_Star_Wars_SHFiguarts_Bandai_Tamashii_Nations_Woozy_Moo.jpg?v=1512413304",
		dead: false
	}	

	var jabba = {
		var: "jabba",
		name:"Jabba the Hut", 
		attack: "10",
		healthPoints:"200",
		counterAttack:"40",
		src:"https://vignette.wikia.nocookie.net/starwars/images/6/6a/Jabba_the_Hutt_NEGTC2.jpg/revision/latest/scale-to-width-down/200?cb=20110127014208",
		dead: false
	}

	var characters = [obi, luke, darth, jabba];
	var userCharacter = [];
	var userCharacterName = "";
	var enemyCharacterName = "";
	var userCharacterAttack = "";
	var enemyCharacterAttack = "";
	var userCharacterHp = "";
	var enemyCharacterHp = "";	
	var userCharacterAttack = "";
	var enemyCharacterCounter = "";	
	var userCharacterVar = "";
	var enemyCharacterVar = "";

	var enemiesLeft = [];
	var currentEnemy = [];


	var userCharacterPicked = false;
	var enemyCharacterPicked = false;

	var winCount = 0;

//Functions

function createButton() {
	for (var i = 0; i < characters.length; i++) {
	    var characterBtn = $("<div>");

        characterBtn.attr("character-name", characters[i].name);
        characterBtn.attr("character-hp", characters[i].healthPoints);
        characterBtn.attr("character-attack", characters[i].attack);
        characterBtn.attr("character-counter", characters[i].counterAttack);
        characterBtn.attr("character-var", characters[i].var);
        characterBtn.addClass("character");
        characterBtn.addClass(characters[i].var);



        characterBtn.html("<img src='" + characters[i].src + "' class='image'/><br><div id='" + characters[i].var + "'>" + characters[i].healthPoints + "</div>"); 

        characterBtn.prepend(characters[i].name);

        $("#pickCharacter").append(characterBtn);

      }
}

	
function reset() {
	
	characters = [obi, luke, darth, jabba];
	userCharacter = [];
	userCharacterName = "";
	enemyCharacterName = "";
	userCharacterAttack = "";
	enemyCharacterAttack = "";
	userCharacterHp = "";
	enemyCharacterHp = "";	
	userCharacterAttack = "";
	enemyCharacterCounter = "";	
	userCharacterVar = "";
	enemyCharacterVar = "";

	enemiesLeft = [];
	currentEnemy = [];

	winCount = 0;


	userCharacterPicked = false;
	enemyCharacterPicked = false;

	$("#pickText").show();
	$("#userCharacter").html("");
	$("#enemiesLeft").html("");
	$("#currentEnemy").html("");

	$(".midText").hide();
	$("#attack").hide();

	$("#textScreen1").text("");
	$("#textScreen2").text("");
	$("#textScreen3").text("");
	$("#textScreen3").attr("font-size", "100%");

}



	//initial button create
	createButton();
	$(".midText").hide();
	$("#attack").hide();


// On Click events

	
	$("body").on("click", ".character", function() {

		//if you havent picked a character yet
	   	if (userCharacterPicked === false) {

		    $("#pickText").hide();
		    $(".midText").show();

		    userCharacter = $(this).append(characters);
		    $("#userCharacter").append(userCharacter);

		    userCharacterName = $(this).attr("character-name");
		    userCharacterHp = $(this).attr("character-hp");
		    userCharacterAttack = $(this).attr("character-attack");
		    userCharacterVar = $(this).attr("character-var");


		    userCharacterPicked = true;

		    $(".character").each(function () {
		       	if ($(this).attr("character-name") != userCharacterName) {
		        	$("#enemiesLeft").append(this);
		        
		        };

		    });

		//else if you havent picked an enemy yet
	   	} else if (enemyCharacterPicked === false) {

		   	currentEnemy = $(this).append(characters);
		    $("#currentEnemy").append(currentEnemy);

		    enemyCharacterName = $(this).attr("character-name");
		    enemyCharacterHp = $(this).attr("character-hp");
		    enemyCharacterCounter = $(this).attr("character-counter");
		    enemyCharacterVar = $(this).attr("character-var");


		    enemyCharacterPicked = true;
			$("#attack").show();

		    $(".character").each(function () {
		       	if ($(this).attr("character-name") != userCharacterName && $(this).attr("character-name") != enemyCharacterName) {
		        	$("#enemiesLeft").append(this);		
		        }

		    });
		}

	});

	//attack button click
	$("#attackButton").on("click", function() {

		//only works if both characters picked
		if (enemyCharacterPicked === true && userCharacterPicked === true) {
			
			//attack funtion
			function attack() {
				userCharacterHp -= enemyCharacterCounter;
				enemyCharacterHp -= userCharacterAttack;
	
			}

			attack();


			//alerts to check values are adding correctly
			$("#textScreen1").text("You attacked " + enemyCharacterName + " for " + userCharacterAttack + " damage.");
			$("#textScreen2").text(enemyCharacterName + " attacked you back for " + enemyCharacterCounter + " damage.");
			$("#textScreen3").text("");

			console.log(userCharacterName + ": " + userCharacterHp + " ; " + enemyCharacterName + ": " + enemyCharacterHp);

			userCharacterAttack *= 2;


			//to change the hp values on the page to update to match above values
			$("#" + userCharacterVar).text(userCharacterHp);

			$("#" + enemyCharacterVar).text(enemyCharacterHp);


			//if character dies
			if (userCharacterHp <= 0) {
				$("#textScreen3").text("You were killed by " + enemyCharacterName + ". Game will reset in 5 sec . . . ");
				$("#attack").hide();

				// delayed 5 sec reset?
				setTimeout(function(){
      			  reset();
      			  createButton();

      			}, 5000);

			}

			//if enemy dies
			if (enemyCharacterHp <=0 && userCharacterHp > 0) {
				$("#textScreen3").text(enemyCharacterName + " died!  Pick your next enemy");
				winCount++;
				$("." + enemyCharacterVar).hide();			


				

				//allows me to pick a new enemy and moves the old enemy back up, but want to change the css style first
				enemyCharacterPicked = false;


			}

			//if enemy characters all dead
			if (winCount === 3) {
				$("#attack").hide();

				$("#textScreen3").text("You Win!!!  Game will reset in 5 sec...");
				
				// delayed 5 sec reset?
				setTimeout(function(){
      			  reset();
      			  createButton();

      			}, 5000);

			}
	

		} else if (userCharacterPicked === true && enemyCharacterPicked ===false) {
			alert("Please pick an Enemy");
		}


    });






});






