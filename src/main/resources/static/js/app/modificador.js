
/**
* objeto "telco_incidencias", con funciones de apoyo al jsp
*/
var objModificador = {
	property_1: "",
	function_1: function() {
		//...
	},
	listaVistas: null,
	getVistas: function (idPuestoTrabajo) {
		
		// obtenemos las vistas - llamada Ajax
		var _this = this;	// variable que hace referencia al objeto de fuera
  	 	$.ajax({
			methord: "post",
			async: false,
			data: "idPuestoTrabajo="+ idPuestoTrabajo,
			contentType: "application/json; charset=ISO-8859-1",
			url: "obtener-vistas",
			dataType: "json",
			success: function (respuesta) {
				//alert("Todo Ok: " + respuesta);
				//console.log(JSON.stringify(respuesta))
				console.log(respuesta.listaVistas);
				_this.listaVistas = respuesta.listaVistas;	// no se puede usar this porque se refiere al propio objeto Ajax. Se usa el "_"para que coja la propiedad del objeto de fuera.
								
			},
			error: function (xhr,textStatus,err) {
				alert ("Error inesperado: " + err.msg + "\n No se pueden recuperar los datos de las vistas actualmente")
				console.log(err.msg);
			}
		}); // fin ajax 
		
		
	},
	anadirVistas: function (idPuestoTrabajo) {

		// obtenemos vistas
		console.log("INFO: Llamamos a getVistas"); // traza
		this.getVistas(idPuestoTrabajo);

		// añadimos las vistas
		console.log("INFO: Lista de vistas:" + this.listaVistas);	// traza
		//this.modificarMenu();
		
	},
	modificarMenu: function() {
		
		console.log("INFO: Modificamos el menú");	// traza
		
		// muestra las vistas en el menú
		var menuVistas = "";
			
			for(i=0; i < this.listaVistas.length; i++){
				menuVistas+="<li><a href='" + this.listaVistas[i].accion + "?idVista=" + this.listaVistas[i].idVista + "'>" + this.listaVistas[i].nombreVista + "</a></li>";
			}

		$('#idSubmenuVistas').empty();
		$('#idSubmenuVistas').append(menuVistas);
		
	},
	zzz: null // último método/propiedad
}; //var telco_incidencias = {

