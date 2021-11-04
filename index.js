// List of playing words.
const words = [
    "house",
    "train",
    "hotel",
    "window",
    "computer",
    "laptop",
    "forest",
    "telephone",
    "apple",
    "orange",
    "banana",
    "cum",
    "do"

];

// Contains an array of characters from the selected word.
var wordArray;
// Contains an array of correct characters entered by user.
var inputArray;
var attempts;

start();
showWordBar();

process.stdin.setEncoding("utf8");
process.stdin.on("data", (data) => {

    let input = data.trim();

    // Check input, only one character allowed.
    if(input == "" || input.length > 1){
        console.log("Please enter a single character.");
    }else{
        // Does input char exist in selected word array?
        if(wordArray.includes(input)){
            // Find all input chars.
            findAll(input);
        }else{
            // Increment failed attempt.
            attempts +=1 ;

            // 10 failed attempts? I guess you lost.
            if(attempts === 10){
                console.log("Opps, you lost.");
                // Start a new word game.
                start();
            }else{
                // Not many attempts left. Yikes.
                console.log("Incorrect. You have", (10 - attempts), "attempts left.");
            }
        }
    }
    // Show the ----- bar
    showWordBar();

    // Does the input character array contain "-" (dash).
    // No dashes? Well I guess you won.
    if(!inputArray.includes("-")){
        console.log("You win. Well done.");
        start();
        showWordBar();
    }
});

function start(){
    console.log("Generating a new word.");
    wordArray = getWordArray();
    inputArray = getInputArray();
    attempts = 0; 
}

function getWordArray(){
    let rand = parseInt(Math.random() * words.length);
    return words[rand].split("");
}

function getInputArray(){
    return "-".repeat(wordArray.length).split("");
}

function findAll(input){
    wordArray.forEach((v, i) => {
        if(input === v){
            inputArray[i] = input;
        }
    });
}

function showWordBar(){
    console.log(inputArray.join(""));
}