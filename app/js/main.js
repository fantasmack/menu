window.addEventListener("load", function(event) {
	// Acá va lo que se va a hacer despuésn de que se cargue la página
	TweenMax.to("#preloader", 3, {
		ease: Power2.easeOut,
		delay: 1, //Este atributo retarda la animacion
		opacity: 0, //Le da transparencia al elemento
		scaleY: "5", // Escala en Y
		scaleX: "5", // Escala en X
		display: "none" //Este atributo sirve para ocultar el elemento
	});
});

var button = document.getElementById('toggle-menu');  //Los parentesis invocan una funcion REGLA DIORO
	button.addEventListener("click", function(event){
	document.getElementById("menu").classList.toggle('active');

});




