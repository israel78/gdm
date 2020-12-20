/*
 * "app.js", app.js de apoyo a toda la app
 * 
 * LINT. Online javascript code check.
 * URL: http://www.javascriptlint.com/online_lint.php
 */


//------------------------------------------------------------------------------------------
// Esto se ejecuta una vez se cargue completamente la página HTML que incluye este ".js"
$(function () {
	// inicializamos esta librería. Esto se debe hacer desde la página.jsp que incluye este.js
	//app.init_lib();
}); //$(function () {
//------------------------------------------------------------------------------------------


//******************************************************************************************
//vars *************************************************************************************
//******************************************************************************************



//******************************************************************************************
//app object *******************************************************************************
//******************************************************************************************

/**
* objeto "app", con funciones de apoyo al jsp
*/
var app = {
	property_1: "",
	function_1: function() {
		//...
	},

	// ******************************************************************************************
	// properties/vars **************************************************************************
	// ******************************************************************************************
	//s_contextPath: "", //app.s_contextPath ="${pageContext.request.contextPath}" en .jsp  

 
	// ******************************************************************************************
	// functions ********************************************************************************
	// ******************************************************************************************
	/* inicializamos esta librería */
	init_lib: function() {
		//...
	}, 
	
	
	zzz: null // último método/propiedad
}; //var app = {

