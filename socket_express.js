var express = require( "express"   );
var socket_io = require( "socket.io" );

// Express
var app = express();

// Socket.io
var io = socket_io();
app.io = io;

var figure_toggler = true;
var positions_played = {};

function get_figure(bandera){
	return (bandera) ? "X" : "O";
}

function evaluate_board(user_board){
	console.log(user_board);
	var winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
	for (var i = winningCombinations.length - 1; i >= 0; i--) {
		for (var j = winningCombinations[i].length - 1; j >= 0; j--) {
	    if (-1 == user_board.indexOf(winningCombinations[i][j])){
	    	j++; // Bug if break in last line
	      break;
	    }
	  }
	  if(j < 0){return true;}
	}
	return false;
}


io.on( "connection", function( socket ){
	positions_played = {};
  socket.figure = figure_toggler;
  figure_toggler = !figure_toggler;
  socket.user_board = [];

  socket.emit("init",socket.figure);

  socket.broadcast.emit("reset",{})

  socket.on("move",function(position){
  	if(!positions_played[position]){
  		io.emit("move",{figure: socket.figure,position:position});
  		positions_played[position] = get_figure(socket.figure);
  		socket.user_board.push(parseInt(position));
  		if(evaluate_board(socket.user_board)){
  			io.emit("won",{figure:get_figure(socket.figure)});
  		}
  	}  	
  });

});

module.exports = app;