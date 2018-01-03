function MyGame(graph) { //1 - plain  2 - holed
  this.graph = graph;

  this.board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  this.stockHoledPieces = 8;
  this.stockPlainPieces = 8;
  this.stockDualPieces = 8;

  this.difficulty = 1;
  this.gamemode = 1; //1 - pvp, 2 - pve, 3 - eve

  this.player = -1;

  this.response = "";

  this.boardsStack = [[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]];

}

MyGame.prototype.play = function (x, y, piece) {
  this.board[y][x] = (this.board[y][x] / 10 >> 0) * 10 + piece;
  switch(piece) {
    case 11:
    this.stockPlainPieces--;
      break;
    case 12:
    this.stockHoledPieces--;
      break;
    case 21:
    case 22:
    this.stockDualPieces--;
    break;
  }
  var newBoard = this.board.map(function(arr) {
    return arr.slice();
  });
  this.boardsStack.push(newBoard);
}

MyGame.prototype.undo = function() {
  this.board = this.boardsStack[this.boardsStack.length - 2].map(function(arr) {
    return arr.slice();
  });
  this.boardsStack = this.boardsStack.slice(0,-1);
}


MyGame.prototype.getPosition = function (x, y) {

  let posZ = - 3.54 * x + 5.31;
  let posX = 3.54 * y - 5.31;
  let posY = 1.1 + (this.board[x][y] / 10 >> 0) * 0.6;

  let pos = [posX, posY, posZ];

  return pos;
}

MyGame.prototype.toString = function () {
  var returnString = "";
  for (let i = 0; i < this.board.length; i++) {
    for (let j = 0; j < this.board.length; j++) {
      //console.log(this.board.length);
      let type;
      if (this.board[i][j] % 10 == 1) {
        type = "p";
      } else if (this.board[i][j] % 10 == 2) {
        type = "h";
      } else {
        returnString += "empty,";
        continue;
      }
      returnString += "n";
      returnString += this.board[i][j] / 10 >> 0;
      returnString += type;
      returnString += ",";
    }
  }
  returnString += this.stockHoledPieces;
  returnString += ",";
  returnString += this.stockPlainPieces;
  returnString += ",";
  returnString += this.stockDualPieces;
  returnString += ",";

  return returnString;
}

function getPrologRequest(requestString, onSuccess, onError, port) {
  var requestPort = port || 8081;
  var request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:' + requestPort + '/' + requestString, true);
  request.onload = onSuccess || function (data) { console.log("Request successful. Reply: " + data.target.response); return data.target.response};
  request.onerror = onError || function () { console.log("Error waiting for response"); };

  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send();

}

MyGame.prototype.handleReplyBot = function(data) {
  let response = data.target.response.slice(1, -1).split(",");
  // console.log(response);
  let piece = parseInt(response[3][1]) * 10;
  piece += response[3][2] == "p" ? 1 : 2;
  
  let pieceToPlay = this.graph.getNextPlayablePiece(piece);
  let point1 = pieceToPlay.position;
  let point4 = this.graph.game.getPosition(response[1], response[2]);
  let point3 = [point4[0], point4[1] + 10, point4[2]];
  let point2 = [(point4[0] + point1[0]) / 2, point4[1] + 10, (point4[2] + point1[2]) / 2];

  var animation = new BezierAnimation(this.graph, 30, [point1, point2, point3, point4]);
  this.play(response[2], response[1], piece);
  pieceToPlay.animations.push(animation);
  //pieceToPlay.position = point4;
  this.graph.playsStack.push(pieceToPlay);

  pieceToPlay.played = true;
  if(piece == 21) {
    pieceToPlay.holeUp = false;
  } else if (piece == 22) {
    pieceToPlay.holeUp = true;
  }

  if (response[0] == "w") {
    this.graph.idRoot = "winMenu";
    this.graph.scene.initCameras();
  } else if (response[0] == "c") {
    this.nextTurn();
  }
}

MyGame.prototype.handleReply = function(data) {
  let response = data.target.response;
  // console.log(response);
  if (response == "win") {
    this.graph.idRoot = "winMenu";
    this.graph.scene.initCameras();
  } else {
    this.nextTurn();
  }
}

MyGame.prototype.botPlay = function () {
  var sendString = "[b,";
  sendString += this.toString();
  sendString += this.difficulty - 1;
  sendString += "]";

  getPrologRequest(sendString, this.handleReplyBot.bind(this));
}

MyGame.prototype.personPlay = function (x, y, piece) {
  
  let piecePlog = "n";
  piecePlog += piece / 10 >> 0;
  if(piece % 10 == 1) {
    piecePlog += "p";
  } else {
    piecePlog += "h";
  }
  var sendString = "[p,";
  sendString += this.toString();
  sendString += x;
  sendString += ",";
  sendString += y;
  sendString += ",";
  sendString += piecePlog;
  sendString += "]";

  getPrologRequest(sendString, this.handleReply.bind(this));

  this.play(x, y, piece); //gravar jogada no nosso jogo ainda por testar vitória com o prolog
}

MyGame.prototype.nextTurn = function () {
  this.player++;
  this.player %= 2;
  if(!this.humanPlaying()) {
    this.botPlay();
  }
}

MyGame.prototype.humanPlaying = function () {
  switch (this.gamemode) {
    case 1:
      return true;
    case 2:
      return !this.player;
    case 3:
      return false;
  }
}
