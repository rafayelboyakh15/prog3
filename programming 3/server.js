


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
grassEaterEaterArr = [];
waterArr = [];
fireArr = [];
matrix = [];
//! Setting global arrays  -- END

// hashiv
grassHashiv = 0;
grassEaterHashiv = 0;
grassEaterEaterHashiv = 0;
waterHashiv = 0;
fireHashiv = 0;
// !hashiv



//! Creating MATRIX -- START
let random = require('./modules/random');
function matrixGenerator(matrixSize, grass, grassEater, grassEaterEater, waterArr, fireArr) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0 - 39
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < grassEaterEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < waterArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < fireArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(10, 5, 6, 4, 3, 10);
//! Creating MATRIX -- END



//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var GrassEaterEater = require("./modules/GrassEaterEater.js");
var Water = require("./modules/Water.js");
var Fire = require("./modules/Fire.js");
//! Requiring modules  --  END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3100);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var grassEaterEater = new GrassEaterEater(x, y);
                grassEaterEaterArr.push(grassEaterEater);
                grassEaterEaterHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var water = new Water(x, y);
                waterArr.push(water);
                waterHashiv++;
            }
            else if (matrix[y][x] == 5) {
                var fire = new Fire(x, y);
                fireArr.push(fire);
                fireHashiv++;
            }
        }
    }
}
creatingObjects();



function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (grassEaterEaterArr[0] !== undefined) {
        for (var i in grassEaterEaterArr) {
            grassEaterEaterArr[i].eat();
        }
    }
    if (waterArr[0] !== undefined) {
        for (var i in waterArr) {
            waterArr[i].eat();
        }
    }
    if (fireArr[0] !== undefined) {
        for (var i in fireArr) {
            fireArr[i].eat();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCount: grassHashiv,
        grassEaterCount: grassEaterHashiv,
        grassEaterEaterCount: grassEaterEaterHashiv,
        waterCount: waterHashiv,
        fireCount: fireHashiv,
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



// setInterval(game, 200)
function aragutyun() {
    for (let r = 0; r >=0; r++) {
        if ((r>=10) && (r<=50)) {return  setInterval(game, 200)}
        else if((r>=55) && (r<=60)){return  setInterval(game, 300)}
        else if((r>=60) && (r<=70)){return  setInterval(game, 600)}
        else{return  setInterval(game, 1000)}
    }
    
}
setInterval(aragutyun,1000)