// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
  
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {

			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
  
      }
 
	  }
    
	}
	return letterPoints;
 }
 

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
console.log("Let's play some scrabble!");
let playerResponse = ""; 

function initialPrompt() {
  playerResponse = input.question("\nEnter a word to score: ")
  console.log(playerResponse);
  console.log(typeof playerResponse);
  
   while (playerResponse < String.fromCharCode(65) || playerResponse > String.fromCharCode(90) && playerResponse < String.fromCharCode(97) ||playerResponse > String.fromCharCode(122)) {
  console.log("I'm sorry. That is an invalid response.") 

  initialPrompt();
 
   }
   return playerResponse;
}
        
let simpleScore = function (word) {
  word = word.toUpperCase(); 
  let score = word.length;
  return score; 
};


let vowelBonusScore = function (word) {
     word = word.toUpperCase(); 
      let score = 0;
       for (let i = 0; i < word.length; i++) {
         let letter = word[i]; 
         if (letter.includes('A') || letter.includes('E') || letter.includes('I') || letter.includes('O') || letter.includes('U'))  {
           score += 3; 

         } else    {

           score += 1;  
         }
          
           }  return score; 
};

function transform(obj) {
  let newObjectKey = "";
  let newObj = {};
     for (keys in obj) {
       for (let i = 0; i < obj[keys].length; i++) {
       if ([keys].includes('1')) {
           newObjectKey = obj[keys][i].toLowerCase(); 
           newObj[newObjectKey] = 1;  
       } 
        else if ([keys].includes('2')) {
           newObjectKey = obj[keys][i].toLowerCase(); 
           newObj[newObjectKey] = 2;
        }  
        else if ([keys].includes('3'))  {
           newObjectKey = obj[keys][i].toLowerCase(); 
           newObj[newObjectKey] = 3;
       }
        else if ([keys].includes('4')) {
          newObjectKey = obj[keys][i].toLowerCase(); 
           newObj[newObjectKey] = 4;
        }
        else if ([keys].includes('5')) {
          newObjectKey = obj[keys][i].toLowerCase(); 
           newObj[newObjectKey] = 5;
        }
        else if ([keys].includes('8')) {
            newObjectKey = obj[keys][i].toLowerCase();
           newObj[newObjectKey] = 8;
        }
      else if ([keys].includes('10'))  {
           newObjectKey = obj[keys][i].toLowerCase(); 
           newObj[newObjectKey] = 10;
      }
        }
       
     }
      return newObj; 
     }

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;

let scrabbleScore = function (word) {
 word = word.toLowerCase(); 
  let score = 0;
     for (letter in newPointStructure) {
       for (let i = 0; i < word.length; i++) {
         if (word[i].includes(letter)) {
           score += newPointStructure[letter];
         }
       }
     }
     return score; 
}


let simplyScore = {
      name: "Simple Score", 
      description: "Each letter is worth 1 point",
      scoringFunction: simpleScore
};

let bonusVowelsScore = {
      name: "Bonus Vowels", 
      description: "Vowels are 3 pts, consonants are 1 pt", 
    scoringFunction: vowelBonusScore

};

let scrabble = {
       name: "Scrabble",
       description: "The traditional scoring algorithm",
       scoringFunction: scrabbleScore

};

const scoringAlgorithms = [simplyScore, bonusVowelsScore, scrabble];

function scorerPrompt() {
  console.log("Which algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points \n2 - Scrabble: Uses scrabble point system");
     let algorithmChoice = input.question("Enter 0, 1, or 2: ");
     

      if (algorithmChoice > 2)  {
           console.log("I'm sorry. That is not a valid option.");
            scorerPrompt(); 
       } 

     if (algorithmChoice.includes('0')) {
     console.log(`Score for '${playerResponse}':`,scoringAlgorithms[0].scoringFunction(playerResponse));  }

     else if (algorithmChoice.includes('1')) {
console.log(`Score for '${playerResponse}':`,scoringAlgorithms[1].scoringFunction(playerResponse));  }
     else if (algorithmChoice.includes('2')) {
console.log(`Score for '${playerResponse}':`,scoringAlgorithms[2].scoringFunction(playerResponse));
     }
  }


function runProgram() {
 initialPrompt();
 scorerPrompt();
   
} 

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

