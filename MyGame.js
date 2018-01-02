function MyGame(graph) { //1 - plain  2 - holed
  this.graph = graph;

  this.board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  this.stockHoledPieces = 8;
  this.stockPlainPieces = 8;
  this.stockDualPieces = 8;

  this.difficulty = 1;
  this.gamemode = 1; //1 - pvp, 2 - pve, 3 - eve


}

MyGame.prototype.play = function (x, y, piece) {
  this.board[y][x] = (this.board[y][x] / 10 >> 0) * 10 + piece;
}

MyGame.prototype.getPosition = function (x, y) {

  let posZ = - 3.54 * x + 5.31;
  let posX = 3.54 * y - 5.31;
  let posY = 1.1 + (this.board[y][x] / 10 >> 0) * 0.6;

  let pos = [posX, posY, posZ];

  return pos;
}

MyGame.prototype.toString = function () {
  var returnString = "";
  for (let i = 0; i < this.board.length; i++) {
    for (let j = 0; j < this.board.length; j++) {
      console.log(this.board.length);
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

function getPrologRequest(requestString, onSuccess, onError, port, response) {
  var requestPort = port || 8081;
  var request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:' + requestPort + '/' + requestString, true);

  request.onload = onSuccess || function (data) { console.log("Request successful. Reply: " + data.target.response); response = data.target.response };
  request.onerror = onError || function () { console.log("Error waiting for response"); };

  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send();
}

MyGame.prototype.AIplay = function () {
  var sendString = "[b,";
  sendString += this.toString();
  sendString += this.difficulty - 1;
  sendString += "]";

  var response;
  getPrologRequest(sendString, "", "", 8081, response);

  return response;

}

MyGame.prototype.PersonPlay = function (x, y, piece) {
  var sendString = "[p,";
  sendString += this.toString();
  sendString += x;
  sendString += ",";
  sendString += y;
  sendString += ",";
  sendString += piece;
  sendString += "]";

  var response;
  getPrologRequest(sendString, "", "", 8081, response);

  return response;
}