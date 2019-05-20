var LiveForm = require("./LiveForm.js");
var random = require("./random.js");


module.exports = class Fire extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 20;
    }
    getNewCoordinates() {
    this.directions = [ 
            [this.x - 3, this.y - 2], 
            [this.x - 2, this.y - 1],
            [this.x + 1, this.y - 2], 
            [this.x + 2, this.y - 3],
            [this.x + 2, this.y + 1], 
            [this.x + 3, this.y + 2], 
            [this.x - 3, this.y + 2], 
            [this.x - 2, this.y + 1] 
        ]; 
   } 
   chooseCell(character) {
    this.getNewCoordinates();
    return super.chooseCell(character);
} 
mul() {
    let emptyCells = this.chooseCell(0);
    let newCell = random(emptyCells);

    if (newCell) {
        let x = newCell[0];
        let y = newCell[1];
        matrix[y][x] = 5;
        let fire = new Fire(x, y);
        fireArr.push(fire);
        this.life = 15;
    }
}
eat() {
    let emptyCells = this.chooseCell(1);
    let newCell = random(emptyCells);

    if (newCell) {

        this.life++;
        let x = newCell[0];
        let y = newCell[1];

        matrix[y][x] = 5;
        matrix[this.y][this.x] = 0;
        matrix[this.y][this.x] = 1;
        for (let i in grassEaterArr) {
            if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                grassEaterArr.splice(i, 1)
            }
        }
        for (let i in grassEaterEaterArr) {
            if (grassEaterEaterArr[i].x == x && grassEaterEaterArr[i].y == y) {
                grassEaterEaterArr.splice(i, 1)
            }
        }
        for (let i in grassArr) {
            if (grassArr[i].x == x && grassArr[i].y == y) {
                grassArr.splice(i, 1)
            }
        }
        this.x = x;
        this.y = y;

        if (this.life >= 90) {
            this.mul();
        }
    }
    else {
        this.move()
    }
}
move() {
    this.life--;
    let emptyCells = this.chooseCell(0);
    let newCell = random(emptyCells);

    if (newCell) {
        let x = newCell[0];
        let y = newCell[1];
        matrix[y][x] = 5;
        matrix[this.y][this.x] = 0;
        this.y = y;
        this.x = x;
    }
    if (this.life < 0) {
        this.die();
    }
}
die() {
    matrix[this.y][this.x] = 0;

    for (let i in fireArr) {
        if (fireArr[i].x == this.x && fireArr[i].y == this.y) {
            fireArr.splice(i, 1)
        }
    }
}
}
