const prompt = require("prompt-sync")({sigint: true});
// const prompt = require("prompt-sync");


const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field){
        this.field = field;

        this.gameEnd = false;
        this.rowLength;
        this.columnLength;
        this.xPos ;
        this.yPos ;

        this.setProperties(); // * Sets position of player
      } // * Constructor

// * ---------------------- Methods ----------------------

    setProperties(){ // * Find location of player
        this.rowLength = this.field.length; // * Sets these properties too
        this.columnLength = this.field[0].length;

        for (let row = 0; row < this.rowLength; row++ ){
            for (let column = 0; column < this.columnLength; column++  ){
                if (this.field[row][column] === "*"){ // ! For some reason this runs twice
                     // * Sets position of player
                    this.xPos = column;
                    this.yPos = row;
                    break;
                }

            }
        }
    } // * findPlayer()

    movePlayer(move){ // ! Workin
        move = move.toLowerCase();
        switch (move){
            case "w": // ! Move up
                if (this.validateMove(move)){ // * if move is valid
                    this.yPos -= 1; // * going down means going up on the array
                    break;
                }

            case "s": // ! Move down
                if (this.validateMove(move)){
                    this.yPos += 1;
                    break;
                }
            case "a": // ! Move left
                if (this.validateMove(move)){ // 
                    this.xPos -= 1;
                    break;
                }

            case "d": // ! Move right
                if (this.validateMove(move)){
                    this.xPos += 1; 
                    break;
                }
        }
        this.field[this.yPos][this.xPos] = "*"; // * replaces current location of player character
        
    } // * movePlayer

    validateMove(move){ // ! Working
        switch (move){

            // * Vertical Movement
            case "w": // ! up movement
                if (this.yPos != 0){
                    console.log("Valid up")
                    return true
                }
                console.log("Invalid up")
                return false;

            case "s": // ! down movement
                if (this.yPos != this.rowLength - 1 ){
                    console.log("Valid down")
                    return true
                }
                console.log("Invalid Down");
                return false


            // * Horizontal Movement
            case "a": // ! left movement
                if (this.xPos != 0){
                    console.log("Valid left")
                    return true
                }
                console.log("InValid left")
                return false;

            case "d": // ! right movement
                if (this.xPos != this.columnLength - 1 ){
                    console.log("Valid right")
                    return true
                }
                console.log("Invalid right");
                return false

            default:
              console.log("Invalid movement input!");
        }

        this.isGameEnd(this.field[this.rowLength][this.columnLength]);
    } // * validateMove()

    print(){ // * Prints Board
      this.field.forEach(arr=>{
          let boardLayout = ``;
          arr.forEach(character =>{
              boardLayout += ` ${character}`;
          })
          console.log(boardLayout);


      })
    } // * print()

    isGameEnd(location){
      switch (location){
        case "O":
          console.log("Game End :( ");
          this.gameEnd = true;
          break;
        case "^":
          console.log("Game Winner!");
          this.gameEnd = true;
          break;
      }
    }

    createCopy(){
      return {
        field: this.field,
        gameEnd : this.gameEnd,
        rowLength : this.rowLength,
        columnLength: this.columnLength,
        xPos : this.xPos,
        yPos: this.yPos,
      }
    } // * createCopy
}


// * ---------------------- Main ----------------------

let myField = new Field([
  ['░', '*', 'O'],
  ['░', 'O', '░'],
  ['o', '^', '░'],
]);
let copyField = myField.createCopy();
let playerMove;

while (!myField.gameEnd){
    myField.print();
    playerMove = prompt("Where do you want to move?");
    myField.movePlayer(playerMove);

}
