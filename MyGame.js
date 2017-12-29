function MyGame(graph, difficulty) { //1 - plain  2 - holed
    this.graph = graph;

    this.board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    this.stockHoledPieces = 8;
    this.stockPlainPieces = 8;
    this.stockDualPieces = 8;

    this.difficulty = difficulty;


}

MyGame.prototype.play = function(x, y, piece) {
  this.board[x][y] = (this.board[x][y] / 10) * 10 + piece;
}

MyGame.prototype.toString = function() {
  for(let i = 0; i < this.board.length; i++) {
      for(let j = 0; j < this.board.length; j++) {
        let type;
        if(this.board[i][j] % 10 == 1) {
          type = "p";
        } else if (this.board[i][j] % 10 == 2) {
          type = "h";
        } else {
          returnString += "empty,";
          break;
        }
        returnString += "n";
        returnString += this.board[i][j] / 10;
        returnString += type;
        returnString += ",";
      }
  }
  returnString += stockHoledPieces;
  returnString += ",";
  returnString += stockPlainPieces;
  returnString += ",";
  returnString += stockDualPieces;
  returnString += ",";

  return returnString;
}

function getPrologRequest(requestString, onSuccess, onError, port) {
		var requestPort = port || 8081;
		var request = new XMLHttpRequest();
		request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

		request.onload = onSuccess || function(data){console.log("Request successful. Reply: " + data.target.response);};
		request.onerror = onError || function(){console.log("Error waiting for response");};

		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		request.send();
}

MyGame.prototype.AIplay = function() {
  var sendString = "[b,";
  sendString += this.toString();
  sendString += difficulty;
  sendString += "]";

  getPrologRequest(sendString, "", "", 8081);
  return data.target.response;

}