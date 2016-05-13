(function(){
	function $(selector){
		return document.querySelector(selector);
	}
	function $$(selector){
		return document.querySelectorAll(selector);	
	}
	function build_cat(){
		for (var i = 0; i < 9; i++) {
			var item = build_item(i);
			$("#cat").innerHTML += item;
		}
		bind_elements();
	}
	function bind_elements(){
		var els = $$(".cat-el");
		for (var i = els.length - 1; i >= 0; i--) {
			var el = els[i];
			el.addEventListener("click",function(){
				if(socket.can_play){
					socket.play(this.id.split("-")[1]);
					$("#message").innerHTML = "Es el turno de tu oponente";	
					socket.can_play = !socket.can_play;
				}else{
					sweetAlert("Aún no","Tu contrincante tiene el movimiento");
				}				
			});
		}
	}
	function build_item(i){
		return "<div class='cat-el col-xs-4' id='el-"+i+"'></div>";
	}
	function get_figure(bandera){
		return (bandera) ? "X" : "O";
	}

	function reset(){
		var els = $$(".cat-el");
		for (var i = els.length - 1; i >= 0; i--) {
			els[i].innerHTML = "";
		}
		$("#message").innerHTML = "";
	}

	function won(figure){
		$("#message").innerHTML =  figure+" ganó la partida";
		sweetAlert(figure +" ganó la partida");
	}

	function movement(figure,position){
		if(socket.can_play){
			$("#message").innerHTML = "";
		}
		$("#el-"+position).innerHTML = get_figure(figure);
	}

	var socket  = new Socket(movement,won,reset);
	build_cat();
})();
