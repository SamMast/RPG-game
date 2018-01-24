$(document).ready(function() {

//Global Variables

//objects
	var obi = {
		var: "obi",
		name:"Obi-Wan Kenobi", 
		attack: "20",
		healthPoints:"175",
		counterAttack:"20",
		src:"https://www.hasbro.com/common/productimages/en_AU/80520fda50569047f523b6138dd58048/8057953D50569047F527CFD4A4CAF309.jpg"
	}
		
	var luke = {
		var: "luke",
		name:"Luke Skywalker", 
		attack: "40",
		healthPoints:"125",
		counterAttack:"10",
		src:"http://moziru.com/images/luke-skywalker-clipart-3.jpg"
	}	
		
	var darth = {
		var: "darth",
		name:"Darth Vader", 
		attack: "30",
		healthPoints:"150",
		counterAttack:"30",
		src:"https://cdn.shopify.com/s/files/1/0732/4767/products/Darth_Vader_New_Hope_Star_Wars_SHFiguarts_Bandai_Tamashii_Nations_Woozy_Moo.jpg?v=1512413304"
	}	

	var jabba = {
		var: "jabba",
		name:"Jabba the Hut", 
		attack: "10",
		healthPoints:"200",
		counterAttack:"40",
		src:"https://vignette.wikia.nocookie.net/starwars/images/6/6a/Jabba_the_Hutt_NEGTC2.jpg/revision/latest/scale-to-width-down/200?cb=20110127014208"
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


	userCharacterPicked = false;
	enemyCharacterPicked = false;

	$("#pickText").show();
	$("#userCharacter").html("");
	$("#enemiesLeft").html("");
	$("#currentEnemy").html("");

}

//Start Here

	//initial button create
	createButton();



// On Click events

	
	$(".character").on("click", function() {

		//if you havent picked a character yet
	   	if (userCharacterPicked === false) {

	   		alert("working...");

		    $("#pickText").hide();

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

		    $(".character").each(function () {
		       	if ($(this).attr("character-name") != userCharacterName && $(this).attr("character-name") != enemyCharacterName) {
		        	$("#enemiesLeft").append(this);
		     

		        	//trying to change the color of the enemies left to red in next 3 lines, but not working
		        	// if ($("#" + userCharacterVar) <= 0) {
		        	// 	$(".character").css("background-color", "red");
		        	// }
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
			alert(userCharacterName + " attacked " + enemyCharacterName + " for " + userCharacterAttack + " damage.");
			alert(userCharacterName + " took " + enemyCharacterCounter + " damage from " + enemyCharacterName);
			alert(userCharacterName + ": " + userCharacterHp + " ; " + enemyCharacterName + ": " + enemyCharacterHp);

			userCharacterAttack *= 2;



			//to change the hp values on the page to update to match above values
			$("#" + userCharacterVar).text(userCharacterHp);

			$("#" + enemyCharacterVar).text(enemyCharacterHp);



			//if enemy dies
			if (enemyCharacterHp <=0) {
				alert("enemy dies");

				//want to make the enemy who died button hidden (or maybe unclickable and change css to have X through it). 
				//maybe add a class to the button div that can be styled to hide?
					//then if all are hidden, say win game and reset

				//$().addClass("dead")



				//allows me to pick a new enemy and moves the old enemy back up
				enemyCharacterPicked = false;


			}

			//if character dies
			if (userCharacterHp <= 0) {
				alert("You lost");

				//game reset


				//this almost works, but I am unable to click a new character on the second round for some reason...?

				reset();
				createButton();


			}
	

		} else {
			alert("Please pick your character and enemy first")
		}


    });






});






