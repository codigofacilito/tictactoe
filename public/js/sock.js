function Socket(playing,won,reset){
	var figure; // bool to define x, or o's
	var can_play = false;
	var socket = io();

	var self = this;

	self.play = function(position){
		socket.emit("move",position)
	}

	socket.on("connect",function(){
		
		socket.on("init",function(figure){
			self.can_play = figure;
			self.figure = figure;
		});

		socket.on("reset",function(){
			sweetAlert("Alguien ingresó","Reiniciaremos el tablero");
			reset();
		})

		socket.on("won",function(data){
			console.log(figure);
			won(data.figure);
		})

		socket.on("move", function(data){
			if(self.figure != data.figure){
				self.can_play = true;
			}
	    playing(data.figure,data.position);
	  });

	});

}