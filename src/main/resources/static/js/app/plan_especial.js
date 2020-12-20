/*
 * "plan_especial.js", fichero.js de apoyo al jsp "plan_especial,jsp"
 * 
 * LINT. Online javascript code check.
 * URL: http://www.javascriptlint.com/online_lint.php
 */


//------------------------------------------------------------------------------------------
// Esto se ejecuta una vez se cargue completamente la página HTML que incluye este ".js"
$(function () {
	// inicializamos esta librería. Esto se debe hacer desde la página.jsp que incluye este.js
	//plan_especial.init_lib();
}); //$(function () {
//------------------------------------------------------------------------------------------


//******************************************************************************************
//vars *************************************************************************************
//******************************************************************************************



//******************************************************************************************
//plan_especial object **************************************************************************
//******************************************************************************************

/**
* objeto "plan_especial", con funciones de apoyo al jsp
*/
var plan_especial = {
	property_1: "",
	function_1: function() {
		//...
	},

	// ******************************************************************************************
	// properties/vars **************************************************************************
	// ******************************************************************************************
 

 
	// ******************************************************************************************
	// functions ********************************************************************************
	// ******************************************************************************************
	/* inicializamos esta librería */
	init_lib: function() {
		//...
	}, 
	//init_lib: function() {
	
	//----------------------------------------------------------------------------------------------------
	// Datos boletines....................................................................................
	// 0) Configuramos la tabla, por si necesitamos algo que se salga de lo genérico
	/**
	 * Configuramos la dataTable, algo que se salga de lo genérico.
	 * o_html_table = $("#id_table_planes"). objeto "tag table html"
	 */
	datatable_setConfig: function(o_html_table) {
		var oSettings_dataTable = includes_datatables.datatable_defaultConfig;

		//oSettings_dataTable.oLanguage.sEmptyTable = "Ningún dato disponible en esta tabla"; //original
		oSettings_dataTable.oLanguage.sEmptyTable = "No existe ningún boletín para este plan especial"; 
		
		// Motramoslos datos de 25 en 25. Paginación.
		/*
		oSettings_dataTable.aLengthMenu = [[15, 25, 50, 100, -1], [15, 25, 50, 100, "Todo"]]; // Por defecto estaba a "[[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todo"]]" en "include_datatables.jsp"
		//oSettings_dataTable.iDisplayLength = 15; //15 filas por página. Por defecto estaba a 25 en "include_datatables.js" ("iDisplayLength": 25)
		*/
		oSettings_dataTable.aLengthMenu = [[15, 20, 50, 100, -1], [15, 20, 50, 100, "Todo"]]; // Por defecto estaba a "[[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todo"]]" en "include_datatables.jsp"
		oSettings_dataTable.iDisplayLength = 20; //20 filas por página. Por defecto estaba a 25 en "include_datatables.js" ("iDisplayLength": 25)
		/* Columnas ...
		--------------------------------------------------------------------------------------------------
		Secuencia, Estado, ¿Activo?, F. presentación, ...
		0          1       2         3                4
		*/
		oSettings_dataTable.aoColumnDefs = [
			{ //Columna "Secuencia". col_index = 0.
				"aTargets": [ 0 ], 
				//"mData": var_mData, //ejemplo render con mData. //URL: https://datatables.net/blog/2012-07-09
				"mRender": function ( data, type, full ) {
					// type === 'display'. //URL: https://datatables.net/forums/discussion/12063/mdata-mrender-and-ordering. //URL: https://datatables.net/blog/2012-07-09
					if ( (type != 'display') ) {
						return data;
					}
					
					//'full' is the row's data object, and 'data' is this column's data
					//ejemplo: full[4]: el valor de la celda con col_index=4 para esta fila, en este caso "ID (Plan Especial)"
					//         data   : valor de la celda con col_index=0 ("aTargets": [ 0 ], //col_index = 0)
					//
					//var s_href = "http://grilloweb.sdr.tesa/boletin/consultaBoletin.do?id=INC-0010311568";
					var s_secuencia = data; //SIRIOYCT029 ó BOL-04615509 ó INC-0011628386 
					if (s_secuencia.startsWith("SIRIO")) {
						//s_secuencia = "SIRIOYCT029"
						if (!s_secuencia.startsWith("SIRIO-")) {
							//s_secuencia = "SIRIO-YCT029", para que se busque correctamente
							//s_secuencia = "SIRIO-" + s_secuencia.substr(5, (s_secuencia.length - 5));
							s_secuencia = "SIRIO-" + s_secuencia.substr(5);
						}
					}
					var s_href = "http://grilloweb.sdr.tesa/boletin/consultaBoletin.do?id=" + s_secuencia;
					var s_return =  "<a href='" + s_href + "'" + 
						" title='Haga click aquí para ver el detalle de este boletín.' " +
						//"onclick='onClick_labelElemento(event);return false;' >" +
						" target='_blank'>" + data +
					"</a>";
					//OJO: "onclick='onClick_labelElemento(event);return false;'" -.-> IMPORTANTE el ";return false;" al final, para que no se llame al enlace del "href" !!!!!!!
					return s_return;
					//return data;
				}
			},
			{ //Columna "Estado". col_index = 1.
				"aTargets": [ 1 ], 
				"sClass": "text-center" //text-left, text-center, text-right
			},
			{ //Columna "¿Activo?". col_index = 2.
				"aTargets": [ 2 ], 
				"sClass": "text-center", //text-left, text-center, text-right
				//"mData": var_mData, //ejemplo render con mData. //URL: https://datatables.net/blog/2012-07-09
				"mRender": function ( data, type, full ) {
					// type === 'display'. //URL: https://datatables.net/forums/discussion/12063/mdata-mrender-and-ordering. //URL: https://datatables.net/blog/2012-07-09
					if ( (type != 'display') ) {
						return data;
					}
					
					//-------------------------------------------------------------------------------------
					//'full' is the row's data object, and 'data' is this column's data
					//ejemplo: full[0]: el valor de la celda con col_index=0 para esta fila
					//         data   : valor de la celda con col_index=1 ("aTargets": [ 1 ], //col_index = 1)
					//
					var s_secuencia = full[0]; //Secuencia
					var s_activo = "No";
					var s_accion = "activar";
					var i_estado_new = 1;
					var s_class_activo = "activo_no"; //clase para pintar color rojo/gris, ya que aquí se pierde lo configurado en "fnRowCallback" 
					if ( data == "1" ) {
						s_activo = "Sí";
						s_accion = "desactivar";
						i_estado_new = 0;
						s_class_activo = "activo_si"; 
					}
					// Si no tenemos permisos, no mostramos opción de cambiar valor "¿Activo?"
					if ( ($("#id_var_permisos").text() != 1) ) { //$("#id_var_permisos").html()
						return s_activo;
					}
					var s_href = "boletines.activar.action?secuencia=" + s_secuencia + "&activo=" + i_estado_new;
					//return "<a href=\"" + s_href + "\" target=\"_blank\">" + data + "</a>";
					//return "<a href='" + s_href + "' target='_blank'>" + data + "</a>";
					var s_return =  "<a href='" + s_href + "'" +
						" class='" + s_class_activo + "'" +
						// ponemos "; return false;" al final del "onclick" para que no se llame al link de "href" !!!!!
						//" onclick='plan_especial.boletines_activar(s_secuencia, i_estado_new); return false;'" +
						" onclick='plan_especial.boletines_activar(\"" + s_secuencia + "\"," + i_estado_new + "); return false;'" +
						" title='Haga click aquí para " + s_accion + " el boletin [" + s_secuencia + "].'" +
						" target='_blank'>" + s_activo +
					"</a>";
					return s_return;						
					//return data;
					//-------------------------------------------------------------------------------------
				}
			}
		]; //oSettings_dataTable.aoColumnDefs = [
		// --------------------------------------------------------------------------------------------------

		// Filas ...
		// --------------------------------------------------------------------------------------------------
		/* Color de las filas en función de su contenido...
		   URL: http://stackoverflow.com/questions/16353455/how-to-set-color-for-table-rows-based-on-column-value-in-jquery-data-table
				http://stackoverflow.com/questions/25186921/change-row-background-color-based-on-cell-value-datatable
		*/
		oSettings_dataTable.fnRowCallback = function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
			/* Color de fondo del estado en función de su color. El color se define en DB para cada estado.
			   Hemos guardado el color en la columna "hide_estado_color". col_index: 1. Ver "oSettings_dataTable.aoColumnDefs" 
			*/
			/*
			$(nRow).css('color', 'blue');
			$(nRow).css("background-color", aData[6]); //"aData[6]": hide_estado_color
			alert("color: " + aData[1]);
			$('td:eq(1)', nRow).addClass("customCSS-" + aData[1]); //"td:eq(1)": Estado. "aData[1]": Estado
			*/ 
			// Columnas - Datos, aData[...]
			// --------------------------------------------------------------------------------------------------
			//Secuencia, Estado, ¿Activo?, F. presentación, ...
			//0          1       2         3                4
			/*
			// Estado = "Activo" (INC activa en iGRI): lo marcamos en rojo ------------------------
			if ( aData[1] == "Activo" ) {
				$("td:eq(1)", nRow).addClass("label"); 
				//$("td:eq(1)", nRow).css("display" , "table-cell"); //class "label" lo pone en "display: inline-block"
				$("td:eq(1)", nRow).css("background-color", "red");
			}
			// ¿Activo? = "1": lo marcamos en azúl ------------------------------------------------
			$("td:eq(2)", nRow).addClass("label"); 
			//$("td:eq(2)", nRow).css("display" , "table-cell"); //class "label" lo pone en "display: inline-block"
			if ( aData[2] == "1" ) {
				$("td:eq(2)", nRow).css("background-color", "dodgerblue"); //lightskyblue
			} else {
				$("td:eq(2)", nRow).css("background-color", "grey");
			}	
			*/
			// Estado = "Activo" (BOL, INC activa en iGRI): lo marcamos en rojo ------------------------
			// Estado = "Arrancado" (SIRIO activo): lo marcamos en rojo ------------------------
			if ( (aData[1] == "Activo") || (aData[1] == "Arrancado") || (aData[1] == "Pospuesto") ) {
				$("td:eq(1)", nRow).addClass("activo_si"); 
			}
			// ¿Activo? = "1" (activo en planes_especiales): lo marcamos en rojo ------------------
			if ( aData[2] == 1 ) {
				$("td:eq(2)", nRow).addClass("activo_si"); 
			} else {
				$("td:eq(2)", nRow).addClass("activo_no"); 
			}
		}; //oSettings_dataTable.fnRowCallback = function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {

		//$("#id_table_planes").dataTable(oSettings_dataTable);
		o_html_table.dataTable(oSettings_dataTable);
		//alert("datatable_setConfig(): o_html_table.dataTable().fnSettings()\n" + JSON.stringify(o_html_table.dataTable().fnSettings()));
	},
	//datatable_setConfig: function() {

	// 1) Inicializamos la dataTable: plan_especial.init_datatable($("#id_table_planes"));
	o_html_table: null, //o_html_table = $("#id_table_planes"). objeto "tag table html"
	init_datatable: function(o_html_table) {
		// 1) Configuramos el dataTable
		this.o_html_table = o_html_table;
		this.datatable_setConfig(o_html_table);
		//o_html_table.dataTable().fnSettings().oLanguage.sEmptyTable = "No existe ningún boletín para este plan especial"; 
	},
	//init_datatable: function(o_html_table) {

	// 2) Cargamos los datos en la dataTable y mostramos la tabla
	aa_datos: null, //array de datos para el dataTable
	show_dataTable: function(aa_datos) {
		this.aa_datos = aa_datos;
		// Cargamos los datos en la tabla y la mostramos
		//show_dataTable_1(o_html_table); //... la llamamos con retardo > 200 milisegundos, para que los objetos este bien inicializados 
		window.setTimeout(this.show_dataTable_1, 300); //> 200 milisegundos, por línea "setTimeout( function(){ _fnInitialise( oSettings ); }, 200 );" en fichero "jquery.dataTables.js"
		/* Comentado. NOTA: con "window.setTimeout" no podemos pasar parámetros en la función llamada por el timer
		window.setTimeout(this.show_dataTable_1(o_html_table), 300); 
		*/
		
		/* esto se debe de hacer si el el style de la tabla es style="display:none", para que se muestre
		// URL: http://stackoverflow.com/questions/7630780/jquery-datatables-slow-initiation-normal-html-table-shown-in-the-beginning
		// URL: http://stackoverflow.com/questions/11646377/jquery-datatables-plugin-too-slow-need-a-replacement
		$("#id_table_planes").show(); //por el style de <table id="id_table_planes" style="display:none">
		*/
	},
	//show_dataTable: function () {
	
	// Mostramos la tabla. o_html_table = $("#id_table_boletines")
	show_dataTable_1: function(o_html_table, aa_datos) {
		if ( o_html_table === undefined ) {
			o_html_table = plan_especial.o_html_table; //OJOoooo "plan_especial.o_html_table" no "this.o_html_table", ya que la función es llamada desde un timer y el "this" es el object "window" que hace el timer
		}
		if ( aa_datos === undefined ) {
			aa_datos = plan_especial.aa_datos; //OJOoooo "plan_especial.o_html_table" no "this.o_html_table", ya que la función es llamada desde un timer y el "this" es el object "window" que hace el timer
		}
		
		//if ( !location.search ) {  //http://prueba?s_filtro_1=Madrid  --> location.search = "?s_filtro_1=Madrid"
		if (false) {
			o_html_table.dataTable().fnSettings().oLanguage.sEmptyTable = "(Sin datos, todavía no se ha establecido ningún filtro)";
		} //if ( !location.search ) {
		o_html_table.dataTable().fnClearTable(false); //true: redraw the table
		o_html_table.dataTable().fnAddData(aa_datos);
		o_html_table.dataTable().fnAdjustColumnSizing();
		
		/*
		// Ordenamos por la 1ª, 2ª Columna (index_col: 0, 1, ...)  
		//function _fnRender( oSettings, iRow, iCol )
		var oSettings = o_html_table.dataTable().fnSettings();
		oSettings.aaSorting = [[0,'asc'], [1,'asc']];
		
		// Forzamos la recarga de los cambios en "oSettings": .fnDraw( oSettings )
		o_html_table.dataTable().fnDraw( oSettings ); //.fnReDraw( oSettings );
		*/
	},
	//show_dataTable_1: function () {
	//
	// Datos boletines. End...............................................................................
	//----------------------------------------------------------------------------------------------------

	
	//----------------------------------------------------------------------------------------------------
	// Datos inventario...................................................................................
	// Configuramos la tabla, por si necesitamos algo que se salga de lo genérico
	datatables_inventario_getConfig: function() {
		var oSettings_dataTable = includes_datatables.datatable_defaultConfig;

		//oSettings_dataTable.oLanguage.sEmptyTable = "Ningún dato disponible en esta tabla"; //original
		oSettings_dataTable.oLanguage.sEmptyTable = "No existen datos para esta lista"; 
		
		// Motramoslos datos de 10 en 10. Paginación.
		oSettings_dataTable.aLengthMenu = [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todo"]]; // Por defecto estaba a "[[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todo"]]" en "include_datatables.jsp"
		oSettings_dataTable.iDisplayLength = 10; //10 filas por página. Por defecto estaba a 25 en "include_datatables.js" ("iDisplayLength": 25)
		// Quitamos los botones de copiar/exportar
		//oSettings_dataTable.sDom = "lfrtip"; //oSettings_dataTable.sDom = "Tlfrtip";
		
		/* Columnas ...
		--------------------------------------------------------------------------------------------------
		Administrativo, ¿Activo?, Valor2=Cliente/Ruta/Elemento, ...
		0               1         2
		*/
		//oSettings_dataTable.aoColumnDefs = null;
		oSettings_dataTable.aoColumnDefs = [
			{ //Columna "Administrativo". col_index = 0.
				"aTargets": [ 0 ], 
				//"mData": var_mData, //ejemplo render con mData. //URL: https://datatables.net/blog/2012-07-09
				"mRender": function ( data, type, full ) {
					// type === 'display'. //URL: https://datatables.net/forums/discussion/12063/mdata-mrender-and-ordering. //URL: https://datatables.net/blog/2012-07-09
					if ( (type != 'display') ) {
						return data;
					}
					
					// Si no tenemos permisos, no mostramos opción de eliminar elemento
					if ( ($("#id_var_permisos").text() != 1) ) { //$("#id_var_permisos").html()
						return data;
					}
					
					//-------------------------------------------------------------------------------------
					//'full' is the row's data object, and 'data' is this column's data
					//ejemplo: full[0]: el valor de la celda con col_index=0 para esta fila
					//         data   : valor de la celda con col_index=1 ("aTargets": [ 1 ], //col_index = 1)
					//
					var s_valor1 = full[0]; //administrativo, cod_emplazamiento, cod_equipo, numeracion_inicial, cod_provincia
					var i_id_parametro = full[6]; 
					var s_href = "inventario.parametros.delete.action?valor1=" + s_valor1 + "&id_parametro=" + i_id_parametro;
					//return "<a href=\"" + s_href + "\" target=\"_blank\">" + data + "</a>";
					//return "<a href='" + s_href + "' target='_blank'>" + data + "</a>";
					var s_return =  "<a href='" + s_href + "'" +
						// ponemos "; return false;" al final del "onclick" para que no se llame al link de "href" !!!!!
						//" onclick='plan_especial.inventario_parametros_delete(s_tipo_lista, i_id_lista, s_valor1, i_id_parametro); return false;'" +
						" onclick='plan_especial.inventario_parametros_delete(null, null, \"" + s_valor1 + "\"," + i_id_parametro + "); return false;'" +
						" title='Haga click aquí para borrar de la lista el elemento [" + s_valor1 + "].'" +
						" target='_blank'>" + data +
					"</a>";
					return s_return;						
					//return data;
					//-------------------------------------------------------------------------------------
				}
			},
			{ //Columna "¿Activo?". col_index = 1.
				"aTargets": [ 1 ], 
				"sClass": "text-center", //text-left, text-center, text-right
				//"mData": var_mData, //ejemplo render con mData. //URL: https://datatables.net/blog/2012-07-09
				"mRender": function ( data, type, full ) {
					// type === 'display'. //URL: https://datatables.net/forums/discussion/12063/mdata-mrender-and-ordering. //URL: https://datatables.net/blog/2012-07-09
					if ( (type != 'display') ) {
						return data;
					}
					
					//-------------------------------------------------------------------------------------
					//'full' is the row's data object, and 'data' is this column's data
					//ejemplo: full[0]: el valor de la celda con col_index=0 para esta fila
					//         data   : valor de la celda con col_index=1 ("aTargets": [ 1 ], //col_index = 1)
					//
					var s_valor1 = full[0]; //administrativo, cod_emplazamiento, cod_equipo, numeracion_inicial, cod_provincia
					var i_id_parametro = full[6]; 
					var s_activo = "No";
					var s_activar = "activar";
					var i_estado_new = 1;
					var s_class_activo = "activo_no"; //clase para pintar color rojo/gris, ya que aquí se pierde lo configurado en "fnRowCallback" 
					if ( data == "1" ) {
						s_activo = "Sí";
						s_activar = "desactivar";
						i_estado_new = 0;
						s_class_activo = "activo_si"; 
					}
					// Si no tenemos permisos, no mostramos opción de cambiar valor "¿Activo?"
					if ( ($("#id_var_permisos").text() != 1) ) { //$("#id_var_permisos").html()
						return s_activo;
					}
					var s_href = "inventario.parametros.activar.action?valor1=" + s_valor1 + "&estado=" + i_estado_new;
					//return "<a href=\"" + s_href + "\" target=\"_blank\">" + data + "</a>";
					//return "<a href='" + s_href + "' target='_blank'>" + data + "</a>";
					var s_return =  "<a href='" + s_href + "'" +
						" class='" + s_class_activo + "'" +
						// ponemos "; return false;" al final del "onclick" para que no se llame al link de "href" !!!!!
						//" onclick='plan_especial.inventario_parametros_activar(s_valor1, i_id_parametro, i_estado_new); return false;'" +
						" onclick='plan_especial.inventario_parametros_activar(\"" + s_valor1 + "\"," + i_id_parametro + "," + i_estado_new + "); return false;'" +
						" title='Haga click aquí para " + s_activar + " el elemento [" + s_valor1 + "].'" +
						" target='_blank'>" + s_activo +
					"</a>";
					return s_return;						
					//return data;
					//-------------------------------------------------------------------------------------
				}
			},
			{ //Columnas invisibles: "id_parametro". col_index: 6
				"aTargets": [ 6 ],
				"bVisible": false,   //ocultamos esta columna
				"bSearchable": false //estas columnas no se buscan por el textBox "Buscar"
			}
		]; //oSettings_dataTable.aoColumnDefs = [
		
		// Filas ...
		// --------------------------------------------------------------------------------------------------
		/* Color de las filas en función de su contenido...
		   URL: http://stackoverflow.com/questions/16353455/how-to-set-color-for-table-rows-based-on-column-value-in-jquery-data-table
				http://stackoverflow.com/questions/25186921/change-row-background-color-based-on-cell-value-datatable
		--------------------------------------------------------------------------------------------------
		Administrativo, ¿Activo?, Valor2=Cliente/Ruta/Elemento, ...
		0               1         2
		*/
		oSettings_dataTable.fnRowCallback = function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
			/*
			// Ejemplo con segunda columna (index = 1)
			$(nRow).css('color', 'blue');
			$(nRow).css("background-color", aData[6]); //"aData[6]": hide_estado_color
			alert("color: " + aData[1]);
			$('td:eq(1)', nRow).addClass("customCSS-" + aData[1]); //"td:eq(1)": Estado. "aData[1]": Estado
			*/
			
			// Color del texto de la primera columna (index = 0), que es clave en azul
			/* Columnas - Datos, aData[...]
			--------------------------------------------------------------------------------------------------
			Administrativo, ¿Activo?, Valor2=Cliente/Ruta/Elemento, ...
			0               1         2
			*/         
			$("td:eq(0)", nRow).css("color", "blue");
			
			/*
			// ¿Activo? = "1": lo marcamos en rojo ------------------------------------------------
			$("td:eq(1)", nRow).addClass("label"); 
			//$("td:eq(1)", nRow).css("display" , "table-cell"); //class "label" lo pone en "display: inline-block"
			if ( aData[1] == "1" ) {
				$("td:eq(1)", nRow).css("background-color", "red"); 
			} else {
				$("td:eq(1)", nRow).css("background-color", "grey");
			}	
			*/
			// ¿Activo? = "1": lo marcamos en rojo ------------------------------------------------
			if ( aData[1] == 1 ) {
				$("td:eq(1)", nRow).addClass("activo_si"); 
			} else {
				$("td:eq(1)", nRow).addClass("activo_no"); 
			}
		}; //oSettings_dataTable.fnRowCallback = function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
		
		/* Comentado, esta es otra alternativa a "oSettings_dataTable.fnRowCallback"
		oSettings_dataTable.fnCreatedRow = function( nRow, aData, iDataIndex ) {
			if ( aData[1] == 1 ) {
				$("td:eq(1)", nRow).css("color", "red");
				//$("td:eq(1)", nRow).css("font-weight", "bold");
			} else {
				$("td:eq(1)", nRow).css("color", "grey");
			}
		} //oSettings_dataTable.fnCreatedRow = function( nRow, aData, iDataIndex ) {
		*/
		
		return oSettings_dataTable;
	},
	//datatables_inventario_getConfig: function() {
	
	init_datatables_inventario: function() {
		var oSettings_dataTable = this.datatables_inventario_getConfig();

		$("#id_table_administrativos").dataTable(oSettings_dataTable);
		$("#id_table_emplazamientos").dataTable(oSettings_dataTable);
		$("#id_table_equipos").dataTable(oSettings_dataTable);
		$("#id_table_numeraciones").dataTable(oSettings_dataTable);
		$("#id_table_provincias").dataTable(oSettings_dataTable);
	},
	//init_datatables_inventario: function() {
	
	show_dataTables_inventario: function() {
		// Cargamos los datos en la tabla y la mostramos
		//... la llamamos con retardo > 200 milisegundos, para que los objetos este bien inicializados 
		window.setTimeout(this.show_dataTables_inventario_1, 300); //> 200 milisegundos, por línea "setTimeout( function(){ _fnInitialise( oSettings ); }, 200 );" en fichero "jquery.dataTables.js"
		/* Comentado. NOTA: con "window.setTimeout" no podemos pasar parámetros en la función llamada por el timer
		window.setTimeout(this.show_dataTables_inventario_1($("#id_table_administrativos")), 300); 
		*/
		
		/* esto se debe de hacer si el el style de la tabla es style="display:none", para que se muestre
		// URL: http://stackoverflow.com/questions/7630780/jquery-datatables-slow-initiation-normal-html-table-shown-in-the-beginning
		// URL: http://stackoverflow.com/questions/11646377/jquery-datatables-plugin-too-slow-need-a-replacement
		$("#id_table_administrativos").show(); //por el style de <table id="id_table_planes" style="display:none">
		*/
	},
	// Mostramos los datos en las tablas
	show_dataTables_inventario_1: function() {
		//if ( !location.search ) {  //http://prueba?s_filtro_1=Madrid  --> location.search = "?s_filtro_1=Madrid"
		if (false) {
			$("#id_table_administrativos").dataTable().fnSettings().oLanguage.sEmptyTable = "(Sin datos, todavía no se ha establecido ningún filtro)";
			$("#id_table_emplazamientos").dataTable().fnSettings().oLanguage.sEmptyTable = "(Sin datos, todavía no se ha establecido ningún filtro)";
			//...
		} //if ( !location.search ) {
		$("#id_table_administrativos").dataTable().fnClearTable(false); //true: redraw the table
		$("#id_table_administrativos").dataTable().fnAddData(aa_data_administrativos);
		$("#id_table_administrativos").dataTable().fnAdjustColumnSizing();
		/* Ojoooooo, "this." aquí no se refiere al objeto "plan_especial", sino al objeto "window", 
		 * ya que esta función se llamó con un "window.setTimeout(...)"
		this.show_NumTotal_inList($("#id_h5_list_administrativos"), aa_data_administrativos, "administrativos");
		*/
		plan_especial.show_NumTotal_inList($("#id_h5_list_administrativos"), aa_data_administrativos);
		//
		$("#id_table_emplazamientos").dataTable().fnClearTable(false); //true: redraw the table
		$("#id_table_emplazamientos").dataTable().fnAddData(aa_data_emplazamientos);
		$("#id_table_emplazamientos").dataTable().fnAdjustColumnSizing();
		plan_especial.show_NumTotal_inList($("#id_h5_list_emplazamientos"), aa_data_emplazamientos);
		//
		$("#id_table_equipos").dataTable().fnClearTable(false); //true: redraw the table
		$("#id_table_equipos").dataTable().fnAddData(aa_data_equipos);
		$("#id_table_equipos").dataTable().fnAdjustColumnSizing();
		plan_especial.show_NumTotal_inList($("#id_h5_list_equipos"), aa_data_equipos);
		//
		$("#id_table_numeraciones").dataTable().fnClearTable(false); //true: redraw the table
		$("#id_table_numeraciones").dataTable().fnAddData(aa_data_numeraciones);
		$("#id_table_numeraciones").dataTable().fnAdjustColumnSizing();
		plan_especial.show_NumTotal_inList($("#id_h5_list_numeraciones"), aa_data_numeraciones);
		//
		$("#id_table_provincias").dataTable().fnClearTable(false); //true: redraw the table
		$("#id_table_provincias").dataTable().fnAddData(aa_data_provincias);
		$("#id_table_provincias").dataTable().fnAdjustColumnSizing();
		plan_especial.show_NumTotal_inList($("#id_h5_list_provincias"), aa_data_provincias);
		
	},
	//show_dataTables_inventario_1: function () {
	
	// Mostramos el total de elementos en la lista de administrativos, emplazamientos, ... 
	show_NumTotal_inList: function(o_element_html, aa_data) {
		/*
		if (aa_data.length <= 0) {
			return;
		}
		*/
		var s_html_small = "<small>(Total: " + aa_data.length + ")</small>";
		//var o_element_html = $(".fc-header-center:first");
		o_element_html.append(s_html_small);
	}, 
	//show_NumTotal_inList: function(o_element_html, aa_data) {
	//
	// Datos inventario. End..............................................................................
	//----------------------------------------------------------------------------------------------------
	
	
	//----------------------------------------------------------------------------------------------------
	// Datos comunicación.................................................................................
	// Configuramos la tabla, por si necesitamos algo que se salga de lo genérico
	datatable_comunicaciones_getConfig: function() {
		var oSettings_dataTable = includes_datatables.datatable_defaultConfig;

		//oSettings_dataTable.oLanguage.sEmptyTable = "Ningún dato disponible en esta tabla"; //original
		oSettings_dataTable.oLanguage.sEmptyTable = "No existen destinatarios para este plan"; 
		
		// Motramoslos datos de 10 en 10. Paginación.
		oSettings_dataTable.aLengthMenu = [[15, 20, 50, 100, -1], [15, 20, 50, 100, "Todo"]]; // Por defecto estaba a "[[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todo"]]" en "include_datatables.jsp"
		oSettings_dataTable.iDisplayLength = 20; //20 filas por página. Por defecto estaba a 25 en "include_datatables.js" ("iDisplayLength": 25)
		// Quitamos los botones de copiar/exportar
		//oSettings_dataTable.sDom = "lfrtip"; //oSettings_dataTable.sDom = "Tlfrtip";
		
		/* Columnas ...
		--------------------------------------------------------------------------------------------------
		Matrícula, Nombre + Apellidos, Móvil, email, INC, Evol., INC, Evol., Infor., id_usuario
		0          1                   2      3      4    5      6    7      8       9
		*/
		//oSettings_dataTable.aoColumnDefs = null;
		oSettings_dataTable.aoColumnDefs = [
			{ //Columnas "Matrícula", "Móvil", "email". col_index = 0, 2, 3.
				"aTargets": [ 0, 2, 3 ], 
				//"mData": var_mData, //ejemplo render con mData. //URL: https://datatables.net/blog/2012-07-09
				"mRender": function ( data, type, full ) {
					// type === 'display'. //URL: https://datatables.net/forums/discussion/12063/mdata-mrender-and-ordering. //URL: https://datatables.net/blog/2012-07-09
					if ( (type != 'display') ) {
						return data;
					}
					
					// Si no tenemos permisos, no mostramos opción de eliminar elemento
					if ( ($("#id_var_permisos").text() != 1) ) { //$("#id_var_permisos").html()
						return data;
					}
					
					//-------------------------------------------------------------------------------------
					//'full' is the row's data object, and 'data' is this column's data
					//ejemplo: full[1]: el valor de la celda con col_index=1 para esta fila
					//         data   : valor de la celda con col_index=1 ("aTargets": [ 0 ], //col_index = 0)
					//
					var i_id_usuario = full[9];  //"id_usuario", col_index = 9
					var s_destinatario = data; //Matrícula, móvil, email
					// Estos dos if son para no poner links en móvil/email si existe matrícula
					/*
					if ( full[0] && (data != full[0]) ) {
						return data;
					}
					if ( full[1] && (data != full[1]) ) {
						return data;
					}
					*/
					var s_href = "comunicaciones.delete.action?id_usuario=" + i_id_usuario;
					//return "<a href=\"" + s_href + "\" target=\"_blank\">" + data + "</a>";
					//return "<a href='" + s_href + "' target='_blank'>" + data + "</a>";
					var s_return =  "<a href='" + s_href + "'" +
						// ponemos "; return false;" al final del "onclick" para que no se llame al link de "href" !!!!!
						//" onclick='plan_especial.comunicaciones_delete(i_id_usuario, s_destinatario); return false;'" +
						" onclick='plan_especial.comunicaciones_delete(" + i_id_usuario + "," + "\""+s_destinatario+"\"" + "); return false;'" +
						" title='Haga click aquí para borrar este destinatario de este plan.'" +
						" target='_blank'>" + data +
					"</a>";
					return s_return;						
					//return data;
					//-------------------------------------------------------------------------------------
				}
			},
			{ //Columnas "¿INC?", ¿Evol.?,... col_index = 4..8.
				"aTargets": [ 4, 5, 6, 7, 8 ], 
				"sClass": "text-center", //text-left, text-center, text-right
				//"mData": var_mData, //ejemplo render con mData. //URL: https://datatables.net/blog/2012-07-09
				"mRender": function ( data, type, full ) {
					// type === 'display'. //URL: https://datatables.net/forums/discussion/12063/mdata-mrender-and-ordering. //URL: https://datatables.net/blog/2012-07-09
					if ( (type != 'display') ) {
						return data;
					}
					
					//-------------------------------------------------------------------------------------
					//'full' is the row's data object, and 'data' is this column's data
					//ejemplo: full[0]: el valor de la celda con col_index=0 para esta fila
					//         data   : valor de la celda con col_index=1 ("aTargets": [ 1 ], //col_index = 1)
					//
					var i_id_usuario = full[9];  //"id_usuario", col_index = 9
					var s_destinatario = full[0]; //Matrícula
					if (!s_destinatario) {
						s_destinatario = full[2]; //Móvil
					}
					if (!s_destinatario) {
						s_destinatario = full[3]; //e-mail
					}
					var a_cell = data.split(":"); //data="3:0". 3: es id_comunicacion, 0: es desactivado (1: activado)
					var i_id_comunicacion = a_cell[0];  //1: SMS-INC, 2:SMS-Evol., ..., 5:email-Infor.
					//var i_estado = a_cell[1];
					// 
					var s_activo = "No";
					var s_activar = "activar";
					var i_estado_new = 1;
					var s_class_activo = "activo_no"; //clase para pintar color rojo/gris, ya que aquí se pierde lo configurado en "fnRowCallback" 
					//if ( data == "1" ) {
					if ( data.endsWith("1") ) { //data="3:0". 3: es id_comunicacion, 0: es desactivado (1: activado)
						s_activo = "Sí";
						s_activar = "desactivar";
						i_estado_new = 0;
						s_class_activo = "activo_si"; 
					}
					// Si no tenemos permisos, no mostramos opción de cambiar valor "¿Activo?"
					if ( ($("#id_var_permisos").text() != 1) ) { //$("#id_var_permisos").html()
						return s_activo;
					}
					var s_href = "comunicaciones.activar.action?id_usuario=" + s_destinatario+","+data + "&estado=" + i_estado_new;
					//return "<a href=\"" + s_href + "\" target=\"_blank\">" + data + "</a>";
					//return "<a href='" + s_href + "' target='_blank'>" + data + "</a>";
					var s_return =  "<a href='" + s_href + "'" +
						" class='" + s_class_activo + "'" +
						// ponemos "; return false;" al final del "onclick" para que no se llame al link de "href" !!!!!
						//" onclick='plan_especial.comunicacion_activar(i_id_usuario, i_id_comunicacion, i_estado_new, s_destinatario); return false;'" +
						" onclick='plan_especial.comunicaciones_activar(" + i_id_usuario + "," + i_id_comunicacion + "," + i_estado_new + "," + "\""+s_destinatario+"\"" + "); return false;'" +
						" title='Haga click aquí para " + s_activar + " esta comunicación.'" +
						" target='_blank'>" + s_activo +
					"</a>";
					return s_return;						
					//return data;
					//-------------------------------------------------------------------------------------
				}
			},
			{ //Columnas invisibles: "id_usuario". col_index: 9
				"aTargets": [ 9 ],
				"bVisible": false,   //ocultamos esta columna
				"bSearchable": false //estas columnas no se buscan por el textBox "Buscar"
			}
		]; //oSettings_dataTable.aoColumnDefs = [
		
		// Filas ...
		// --------------------------------------------------------------------------------------------------
		/* Color de las filas en función de su contenido...
		   URL: http://stackoverflow.com/questions/16353455/how-to-set-color-for-table-rows-based-on-column-value-in-jquery-data-table
				http://stackoverflow.com/questions/25186921/change-row-background-color-based-on-cell-value-datatable
		--------------------------------------------------------------------------------------------------
		Matrícula, Nombre + Apellidos, Móvil, email, INC, Evol., INC, Evol., Infor., id_usuario
		0          1                   2      3      4    5      6    7      8       9
		*/
		oSettings_dataTable.fnRowCallback = function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
			/*
			// Ejemplo con segunda columna (index = 1)
			$(nRow).css('color', 'blue');
			$(nRow).css("background-color", aData[6]); //"aData[6]": hide_estado_color
			alert("color: " + aData[1]);
			$('td:eq(1)', nRow).addClass("customCSS-" + aData[1]); //"td:eq(1)": Estado. "aData[1]": Estado
			*/
			
			// Color del texto de la primera columna (index = 0), que es clave en azul
			/* Columnas - Datos, aData[...]
			--------------------------------------------------------------------------------------------------
			Matrícula, Nombre + Apellidos, Móvil, email, INC, Evol., INC, Evol., Infor.
			0          1                   2      3      4    5      6    7      8
			*/         
			$("td:eq(0)", nRow).css("color", "blue");
			//if ( !aData[0] ) {
				// Si no existe la matrícula, marcamos en azúl en móvil y el email
				$("td:eq(2)", nRow).css("color", "blue"); 
				$("td:eq(3)", nRow).css("color", "blue"); 
			//}
			
			/*
			// ¿INC? = "1": lo marcamos en rojo ------------------------------------------------
			$("td:eq(1)", nRow).addClass("label"); 
			//$("td:eq(1)", nRow).css("display" , "table-cell"); //class "label" lo pone en "display: inline-block"
			if ( aData[1] == "1" ) {
				$("td:eq(1)", nRow).css("background-color", "red"); 
			} else {
				$("td:eq(1)", nRow).css("background-color", "grey");
			}	
			*/
			// ¿INC?...¿Infor.? = "1": lo marcamos en rojo ------------------------------------------------
			//if ( aData[4] == 1 ) {
			if ( aData[4].endsWith("1") ) { //aData[4]="1:0". 3: es id_comunicacion, 0: es desactivado (1: activado)	
				$("td:eq(4)", nRow).addClass("activo_si"); 
			} else {
				$("td:eq(4)", nRow).addClass("activo_no"); 
			}
			if ( aData[5].endsWith("1") ) { //aData[5]="2:0". 2: es id_comunicacion, 0: es desactivado (1: activado)
				$("td:eq(5)", nRow).addClass("activo_si"); 
			} else {
				$("td:eq(5)", nRow).addClass("activo_no"); 
			}
			if ( aData[6].endsWith("1") ) { //aData[6]="3:0". 3: es id_comunicacion, 0: es desactivado (1: activado)
				$("td:eq(6)", nRow).addClass("activo_si"); 
			} else {
				$("td:eq(6)", nRow).addClass("activo_no"); 
			}
			if ( aData[7].endsWith("1") ) {
				$("td:eq(7)", nRow).addClass("activo_si"); 
			} else {
				$("td:eq(7)", nRow).addClass("activo_no"); 
			}
			if ( aData[8].endsWith("1") ) {
				$("td:eq(8)", nRow).addClass("activo_si"); 
			} else {
				$("td:eq(8)", nRow).addClass("activo_no"); 
			}
		}; //oSettings_dataTable.fnRowCallback = function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
		
		/* Comentado, esta es otra alternativa a "oSettings_dataTable.fnRowCallback"
		oSettings_dataTable.fnCreatedRow = function( nRow, aData, iDataIndex ) {
			if ( aData[1] == 1 ) {
				$("td:eq(1)", nRow).css("color", "red");
				//$("td:eq(1)", nRow).css("font-weight", "bold");
			} else {
				$("td:eq(1)", nRow).css("color", "grey");
			}
		} //oSettings_dataTable.fnCreatedRow = function( nRow, aData, iDataIndex ) {
		*/
		
		return oSettings_dataTable;
	},
	//datatable_comunicaciones_getConfig: function() {
	
	init_datatables_comunicaciones: function() {
		var oSettings_dataTable = this.datatable_comunicaciones_getConfig();

		$("#id_table_comunicaciones").dataTable(oSettings_dataTable);
	},
	//init_datatables_comunicaciones: function() {
	
	show_dataTables_comunicaciones: function() {
		// Cargamos los datos en la tabla y la mostramos
		//... la llamamos con retardo > 200 milisegundos, para que los objetos este bien inicializados 
		window.setTimeout(this.show_dataTables_comunicaciones_1, 300); //> 200 milisegundos, por línea "setTimeout( function(){ _fnInitialise( oSettings ); }, 200 );" en fichero "jquery.dataTables.js"
		/* Comentado. NOTA: con "window.setTimeout" no podemos pasar parámetros en la función llamada por el timer
		window.setTimeout(this.show_dataTables_comunicaciones_1($("#id_table_administrativos")), 300); 
		*/
		
		/* esto se debe de hacer si el el style de la tabla es style="display:none", para que se muestre
		// URL: http://stackoverflow.com/questions/7630780/jquery-datatables-slow-initiation-normal-html-table-shown-in-the-beginning
		// URL: http://stackoverflow.com/questions/11646377/jquery-datatables-plugin-too-slow-need-a-replacement
		$("#id_table_comunicaciones").show(); //por el style de <table id="id_table_planes" style="display:none">
		*/
	},
	// Mostramos los datos en las tablas
	show_dataTables_comunicaciones_1: function() {
		//if ( !location.search ) {  //http://prueba?s_filtro_1=Madrid  --> location.search = "?s_filtro_1=Madrid"
		if (false) {
			$("#id_table_comunicaciones").dataTable().fnSettings().oLanguage.sEmptyTable = "(Sin datos, todavía no se ha establecido ningún filtro)";
		} //if ( !location.search ) {
		$("#id_table_comunicaciones").dataTable().fnClearTable(false); //true: redraw the table
		$("#id_table_comunicaciones").dataTable().fnAddData(aa_data_comunicaciones);
		$("#id_table_comunicaciones").dataTable().fnAdjustColumnSizing();
		/* Ojoooooo, "this." aquí no se refiere al objeto "plan_especial", sino al objeto "window", 
		 * ya que esta función se llamó con un "window.setTimeout(...)"
		*/
	},
	//show_dataTables_comunicaciones_1: function () {
	//
	// Datos comunicación. End............................................................................
	//----------------------------------------------------------------------------------------------------

	
	
	// Crear nuevo Plan Especial
	crear_plan: function() {
		// Si los datos son inconsistentes, no hacemos nada
		if ( !this.checkDetalle() ) {
			return;
		}
		
		// Preguntamos al usuario si quiere dar de alta el plan...
		BootstrapDialog.confirm({
			title: "Crear Plan Especial",
			message: "¿Quiere crear el Plan Especial [" + $("#id_input_plan").val() + "]?",
			type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
			//closable: true, // <-- Default value is false
			//draggable: true, // <-- Default value is false
			btnCancelLabel: "Cancelar", // <-- Default value is 'Cancel',
			btnOKLabel: "Aceptar", // <-- Default value is 'OK',
			//btnOKClass: "btn-warning", // <-- CSS class para botón "Aceptar". If you didn't specify it, dialog type will be used,
			callback: function(result) {
				// result will be true if button was click, while it will be false if users close the dialog directly.
				if (result) {
					// Aceptar: Creamos el plan
					plan_especial.crear_plan_1();
				} else {
					// Cancelar: No hacemos nada. "BootstrapDialog.confirm" ya cierra este diálogo.
				}
			}
		});	//BootstrapDialog.confirm({	
	},
	//crear_plan: funcion() {
	//
	crear_plan_1: function() {
		// Datos a enviar por POST
		var v_data = {
			//URL: https://www.formget.com/jquery-get-value-of-input/
			//id_plan		 : $("#id_input_id_plan").val().trim(), 
			id_plan		 : -1, //-1: crear plan 
			plan		 : $("#id_input_plan").val().trim(), 
			descripcion	 : $("#id_input_descripcion").val().trim(), 
			//estado	 : $("#id_select_estado option:selected").text(), //tomamos el "text". <option value='2'>dos</option> --> "dos"
			//estado		 : $("#id_select_estado").val(), 
			estado		 : -3, //-3: en Especificación 
			f_inicio	 : $("#id_input_f_inicio").val().trim(), 
			f_final		 : $("#id_input_f_final").val().trim(), 
			objetivo	 : $("#id_text_objetivo").val().trim(), 
			observaciones: $("#id_text_observaciones").val().trim() 
		};
		
		//......................................................................................
		//$.post. URL: https://api.jquery.com/jquery.post/
		//......................................................................................
		var o_waitDialog = dycec_js.waitDialog("Esperando a que se cree el Plan especial [" + $("#id_input_plan").val() + "]");
		o_waitDialog.setSize(BootstrapDialog.SIZE_WIDE);
		//
		$.post( "plan.crear_plan.action", v_data) 
		.done(function( data, textStatus, jqXHR ) {
			//console.log("crear_plan_1(). $.post('plan.crear_plan.action').done. data_JSON: \n" + JSON.stringify(data));
			var s_message;
			if ( (data && data.newPlan) ) {
				var o_newPlan = data.newPlan;
				if (o_newPlan.i_error > 0) {
					// Error al crear plan
					s_message = "No se ha podido crear el Plan Especial [" + $("#id_input_plan").val() + "]." +
						"\nMOTIVO: " + o_newPlan.s_result; 
					dycec_js.alert("Crear Plan", s_message, BootstrapDialog.TYPE_DANGER);
				} else {
					// Ok, se ha creado el plan ---------------------------------------------------
					/*
					s_message = "Se ha creado el Plan Especial [" + $("#id_input_plan").val() + "] con éxito."; 
					dycec_js.alert(s_message);
					*/
					plan_especial.crear_plan_2_ok(o_newPlan.id_plan);
				}
			} else {
				s_message = "No se ha podido crear el Plan Especial [" + $("#id_input_plan").val() + "]." +
				"\nMOTIVO: Se ha producido un error inesperado." +
				"\n" +
				"\nDatos recibidos: " + JSON.stringify(jqXHR); 
				dycec_js.alert("Crear Plan", s_message, BootstrapDialog.TYPE_DANGER);
			} //if ( (data && data.newPlan) ) {
		}) //.done(function( data, textStatus, jqXHR ) {
		.fail(function( jqXHR, textStatus, errorThrown ) {
			// Error
			dycec_js.ajax_post_fail(jqXHR, textStatus, errorThrown);
		}) //.fail(function( jqXHR, textStatus, errorThrown ) {
		.always(function( jqXHR, textStatus, errorThrown ) {
			// Fin. Proceso completado (se ejecuta después de ".done"/".fail"
			o_waitDialog.close();
			
			/*//FALTA. Falta hacer esto como en Masivar_TV ó mejor, en java !!!!!
			// En todas la peticiones AJAX comprobamos si la session ha caducado
			checkIfSessionTimeout(jqXHR);
			*/
		}); //$.post( "volumenes.detalle_actuacion.action", {
		//......................................................................................
	},
	//crear_plan_1: funcion() {
	//
	// Ok. Se ha creado con éxito el plan. Recargamos la página con este id_plan
	crear_plan_2_ok: function(id_plan) {
		// Pedimos al usuario que pulse "Aceptar" para recargar el plan...
		BootstrapDialog.alert({
			title: "Crear Plan Especial",
			message: "Se ha creado con éxito el Plan Especial [" + $("#id_input_plan").val() + "]." +
				"\n" + 
				"\nPulse el botón [Aceptar] para cargar los datos de este Plan.", 
			type: BootstrapDialog.TYPE_PRIMARY, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
			//closable: true, // <-- Default value is false
			//draggable: true, // <-- Default value is false
			buttonLabel: "Aceptar", // <-- Default value is 'OK',
			callback: function(result) {
				// result will be true if button was click, while it will be false if users close the dialog directly.
				if (result) {
					// Aceptar: Cargamos los datos del plan
					var s_url = "plan.action?id_plan=" + id_plan;
					var o_window = window.open(s_url, "_self"); //en misma solapa
					//window.location.ref = s_url; //en misma solapa
				} else {
					// Pulsamos [x] en el dialog: No hacemos nada. "BootstrapDialog.alert" ya cierra este diálogo.
				}
			}
		});	//BootstrapDialog.confirm({	
	},
	//crear_plan_2_ok: function() {
	
	// Cargamos la página con este id_plan y mostramos la solapa con ese "id_tab"
	load_plan_: function(id_plan, s_id_tab, s_title_1, s_message_1) {
		var s_title = s_title_1;
		var s_message = s_message_1;
		if ( !s_title_1 ) {
			s_title = "Plan Especial [" + id_plan + "]";
		}
		if ( !s_message_1 ) {
			s_message = "Pulse el botón [Aceptar] para cargar los datos de este Plan.";
		}
		
		// Pedimos al usuario que pulse "Aceptar" para recargar el plan...
		BootstrapDialog.alert({
			title: s_title,
			message: s_message, 
			type: BootstrapDialog.TYPE_PRIMARY, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
			//closable: true, // <-- Default value is false
			//draggable: true, // <-- Default value is false
			buttonLabel: "Aceptar", // <-- Default value is 'OK',
			callback: function(result) {
				// result will be true if button was click, while it will be false if users close the dialog directly.
				if (result) {
					// Aceptar: Cargamos los datos del plan
					var s_url = "plan.action?id_plan=" + id_plan + "&tab=" + s_id_tab;
					var o_window = window.open(s_url, "_self"); //en misma solapa
					//window.location.ref = s_url; //en misma solapa
				} else {
					// Pulsamos [x] en el dialog: No hacemos nada. "BootstrapDialog.alert" ya cierra este diálogo.
				}
			}
		});	//BootstrapDialog.confirm({	
	},
	//load_plan_: function(id_plan, s_id_tab, s_title_1, s_message_1) {
	//
	s_id_tab: "id_tab_detalle", //tab a mostrar al cargar el plan. (id_tab_detalle, id_tab_boletines, id_tab_inventario)
	callback_load_plan: function() {
	//callback_load_plan: function(id_plan, s_id_tab) {
		// Cargamos los datos del plan y mostramos el tab "s_id_tab" (id_tab_detalle, id_tab_boletines, id_tab_inventario)
		var s_url = "plan.action?id_plan=" + $("#id_input_id_plan").val() + "&tab=" + plan_especial.s_id_tab;
		var o_window = window.open(s_url, "_self"); //en misma solapa del navegador web
	},
	//callback_load_plan: function() {
	
	
	modificar_plan: function() {
		// Si los datos son inconsistentes, no hacemos nada
		if ( !this.checkDetalle() ) {
			return;
		}
		
		// Preguntamos al usuario si quiere modificar el plan...
		BootstrapDialog.confirm({
			title: "Modificar Plan Especial",
			//message: "¿Quiere modificar el Plan Especial [" + $("#id_input_plan").val() + "], ID_Plan = [" + $("#id_input_id_plan").val() + "]?",
			message: "¿Quiere modificar el Plan Especial [" + $("#id_var_plan").html() + "], ID_Plan = [" + $("#id_input_id_plan").val() + "]?",
			type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
			//closable: true, // <-- Default value is false
			//draggable: true, // <-- Default value is false
			btnCancelLabel: "Cancelar", // <-- Default value is 'Cancel',
			btnOKLabel: "Aceptar", // <-- Default value is 'OK',
			//btnOKClass: "btn-warning", // <-- CSS class para botón "Aceptar". If you didn't specify it, dialog type will be used,
			callback: function(result) {
				// result will be true if button was click, while it will be false if users close the dialog directly.
				if (result) {
					// Aceptar: Modificamos el plan
					plan_especial.modificar_plan_1();
				} else {
					// Cancelar: No hacemos nada. "BootstrapDialog.confirm" ya cierra este diálogo.
				}
			}
		});	//BootstrapDialog.confirm({	
	}, 
	//modificar_plan: funcion() {
	//
	modificar_plan_1: function() {
		// Datos a enviar por POST
		var v_data = {
			//URL: https://www.formget.com/jquery-get-value-of-input/
			id_plan		 : $("#id_input_id_plan").val().trim(), 
			plan		 : $("#id_input_plan").val().trim(), 
			descripcion	 : $("#id_input_descripcion").val().trim(), 
			//estado	 : $("#id_select_estado option:selected").text(), //tomamos el "text". <option value='2'>dos</option> --> "dos"
			estado		 : $("#id_select_estado").val(), 
			f_inicio	 : $("#id_input_f_inicio").val().trim(), 
			f_final		 : $("#id_input_f_final").val().trim(), 
			objetivo	 : $("#id_text_objetivo").val().trim(), 
			observaciones: $("#id_text_observaciones").val().trim() 
		};
		
		//......................................................................................
		//$.post. URL: https://api.jquery.com/jquery.post/
		//......................................................................................
		//var o_waitDialog = dycec_js.waitDialog("Esperando a que se modifique el Plan especial [" + $("#id_input_plan").val() + "]");
		var o_waitDialog = dycec_js.waitDialog("Esperando a que se modifique el Plan especial [" + $("#id_var_plan").html() + "]");
		o_waitDialog.setSize(BootstrapDialog.SIZE_WIDE);
		//
		plan_especial.s_id_tab = "id_tab_detalle"; //tab a mostrar al recargar la página
		$.post( "plan.modificar_plan.action", v_data) 
		.done(function( data, textStatus, jqXHR ) {
			//console.log("crear_plan_1(). $.post('plan.modificar_plan.action').done. data_JSON: \n" + JSON.stringify(data));
			var s_message;
			if ( (data && data.newPlan) ) {
				var o_newPlan = data.newPlan;
				if (o_newPlan.i_error > 0) {
					// Error al modificar plan
					//s_message = "No se ha podido modificar el Plan Especial [" + $("#id_input_plan").val() + "]." +
					s_message = "No se ha podido modificar el Plan Especial [" + $("#id_var_plan").html() + "]." +
						"\nMOTIVO: " + o_newPlan.s_result; 
					dycec_js.alert("Modificar Plan", s_message, BootstrapDialog.TYPE_DANGER);
				} else {
					// Ok, se ha modificado el plan ---------------------------------------------------
					s_message = "Se ha modificado con éxito el Plan Especial [" + $("#id_input_plan").val() + "]."; 
					//dycec_js.alert(s_message);
					dycec_js.alert("Modificar Plan", s_message, BootstrapDialog.TYPE_INFO, plan_especial.callback_load_plan);
				}
			} else {
				s_message = "No se ha podido modificar el Plan Especial [" + $("#id_input_plan").val() + "]." +
				"\nMOTIVO: Se ha producido un error inesperado." +
				"\n" +
				"\nDatos recibidos: " + JSON.stringify(jqXHR); 
				dycec_js.alert("Modificar Plan", s_message, BootstrapDialog.TYPE_DANGER);
			} //if ( (data && data.newPlan) ) {
		}) //.done(function( data, textStatus, jqXHR ) {
		.fail(function( jqXHR, textStatus, errorThrown ) {
			// Error
			dycec_js.ajax_post_fail(jqXHR, textStatus, errorThrown);
		}) //.fail(function( jqXHR, textStatus, errorThrown ) {
		.always(function( jqXHR, textStatus, errorThrown ) {
			// Fin. Proceso completado (se ejecuta después de ".done"/".fail"
			o_waitDialog.close();
			
			/*//FALTA. Falta hacer esto como en Masivar_TV ó mejor, en java !!!!!
			// En todas la peticiones AJAX comprobamos si la session ha caducado
			checkIfSessionTimeout(jqXHR);
			*/
		}); //$.post( "plan.modificar_plan.action", {
		//......................................................................................
	}, 
	//modificar_plan_1: funcion() {
	
	/*
	 * Comprueba los datos del detalle del Plan: campos obligatorios rellenos, fechas, ...
	 * return true: ok,    datos consistentes, se puede dar_de_alta/modificar plan
	 *              false, datos inconsistentes, no se puede dar_de_alta/modificar plan
	 */
	checkDetalle: function() {
		// 1) Comprobamos campos obligatorios rellenos. Campos en azul.
		if ( ($("#id_input_plan").val().trim() == "") || ($("#id_input_descripcion").val().trim() == "") || 
			($("#id_input_f_inicio").val().trim() == "") || ($("#id_input_f_final").val().trim() == "") ) {
    		dycec_js.alertError("ERROR: debe rellenar todos los campos obligatorios. \n\nLos campos obligatorios están resaltados en azul.");
			return false;
		}
		
		// 2) Fechas correctas.
    	// 2.1) f_inicio
		var o_moment = moment($("#id_input_f_inicio").val().trim(), "YYYY/MM/DD HH:mm", true); //moment("2015/06/03 14:00", "YYYY/MM/DD HH:mm", true);
    	// Comprobamos que se escribió una fecha/hora válida
    	if ( !o_moment.isValid() ) {
    		dycec_js.alertError("ERROR: debe escribir una fecha/hora inicio correcta." 
    				+ "\n\nFormato fecha: yyyy/MM/dd. Ejemplo: 2015/12/31"
    				+ "\nFormato hora: HH:mm. Ejemplo: 23:59"
    				+ "\nFormato fecha/hora completo: yyyy/MM/dd HH:mm. Ejemplo: 2015/12/31 23:59");
    		return false;
    	}
    	// 2.2) f_final
		o_moment = moment($("#id_input_f_final").val().trim(), "YYYY/MM/DD HH:mm", true); //moment("2015/06/03 14:00", "YYYY/MM/DD HH:mm", true);
    	// Comprobamos que se escribió una fecha/hora válida
    	if ( !o_moment.isValid() ) {
    		dycec_js.alertError("ERROR: debe escribir una fecha/hora final correcta." 
    				+ "\n\nFormato fecha: yyyy/MM/dd. Ejemplo: 2015/12/31"
    				+ "\nFormato hora: HH:mm. Ejemplo: 23:59"
    				+ "\nFormato fecha/hora completo: yyyy/MM/dd HH:mm. Ejemplo: 2015/12/31 23:59");
    		return false;
    	}
    	
    	return true;
	},
	//checkDetalle: function() {
	
	// Activa el tab cuyo "id_tab" es pasado como parámetro: "id_tab_detalle", "id_tab_botelines", "id_tab_inventario" 
	showTab: function(s_id_tab) {
		if ( s_id_tab )  {
			$('.nav-tabs a[href="#' + s_id_tab + '"]').tab('show');
			//$('#id_ul_tabs a[href="#' + s_id_tab + '"]').tab('show');
		}
	},
	//showTab: function(s_id_tab) {
	
	
	boletines_activar: function(s_secuencia, i_activar) {
		// Preguntamos al usuario si quiere activar esta boletín...
		var s_title = "DESACTIVAR boletín";
		var s_message = "¿Quiere desactivar el boletín [" + s_secuencia + "]?"; 
		if (i_activar == 1) {
			s_title = "ACTIVAR boletín";
			s_message = "¿Quiere activar el boletín [" + s_secuencia + "]?"; 
		}
		BootstrapDialog.confirm({
			title: s_title,
			message: s_message,
			type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
			//closable: true, // <-- Default value is false
			//draggable: true, // <-- Default value is false
			btnCancelLabel: "Cancelar", // <-- Default value is 'Cancel',
			btnOKLabel: "Aceptar", // <-- Default value is 'OK',
			//btnOKClass: "btn-warning", // <-- CSS class para botón "Aceptar". If you didn't specify it, dialog type will be used,
			callback: function(result) {
				// result will be true if button was click, while it will be false if users close the dialog directly.
				if (result) {
					// Aceptar: Activar/Desactivar boletín
					plan_especial.boletines_activar_1(s_secuencia, i_activar);
				} else {
					// Cancelar: No hacemos nada. "BootstrapDialog.confirm" ya cierra este diálogo.
				}
			}
		});	//BootstrapDialog.confirm({	
	},
	//boletines_activar: function(s_secuencia, i_activar) {
	//
	boletines_activar_1: function(s_secuencia, i_activar) {
		// Datos a enviar por POST
		var v_data = {
			//URL: https://www.formget.com/jquery-get-value-of-input/
			id_plan : $("#id_input_id_plan").val().trim(), //el id_plan no es necesario
			secuencia: s_secuencia,
			activo: i_activar
		};
		
		//......................................................................................
		//$.post. URL: https://api.jquery.com/jquery.post/
		//......................................................................................
		var s_active = "desactive";
		var s_activar = "desactivar";
		var s_activado = "desactivado";
		if ( i_activar == 1 ) {
			s_active = "active";
			s_activar = "activar";
			s_activado = "activado";
		}
		var o_waitDialog = dycec_js.waitDialog("Esperando a que se " + s_active + " el boletín = [" + s_secuencia + "]");
		o_waitDialog.setSize(BootstrapDialog.SIZE_WIDE);
		//
		plan_especial.s_id_tab = "id_tab_boletines"; //tab a mostrar al recargar la página
		$.post( "boletines.activar.action", v_data) 
		.done(function( data, textStatus, jqXHR ) {
			//console.log("$.post('boletines.activar.action').done. data_JSON: \n" + JSON.stringify(data));
			var s_message;
			if ( (data && data.resultPeticion) ) {
				var o_result = data.resultPeticion;
				if (o_result.error > 0) {
					// Error
					s_message = "No se ha podido " + s_activar + " el boletín = [" + s_secuencia + "]."
						+ "\nMOTIVO: " + o_result.descripcion; 
					dycec_js.alert("Activar/Desactivar boletín", s_message, BootstrapDialog.TYPE_DANGER);
				} else {
					// Ok, se ha activado/desactivado la lista ---------------------------------------------------
					s_message = "Se ha " + s_activado + " el boletín = [" + s_secuencia + "].";
					dycec_js.alert("Activar/Desactivar boletín", s_message, BootstrapDialog.TYPE_INFO, plan_especial.callback_load_plan);
				}
			} else {
				s_message = "No se ha podido " + s_activar + " el boletín = [" + s_secuencia + "].";
					+ "\nMOTIVO: Se ha producido un error inesperado."
					+ "\n"
					+ "\nDatos recibidos: " + JSON.stringify(jqXHR); 
				dycec_js.alert("Activar/Desactivar boletín", s_message, BootstrapDialog.TYPE_DANGER);
			} //if ( (data && data.resultPeticion) ) {
		}) //.done(function( data, textStatus, jqXHR ) {
		.fail(function( jqXHR, textStatus, errorThrown ) {
			// Error
			dycec_js.ajax_post_fail(jqXHR, textStatus, errorThrown);
		}) //.fail(function( jqXHR, textStatus, errorThrown ) {
		.always(function( jqXHR, textStatus, errorThrown ) {
			// Fin. Proceso completado (se ejecuta después de ".done"/".fail"
			o_waitDialog.close();
			
			/*//FALTA. Falta hacer esto como en Masivar_TV ó mejor, en java !!!!!
			// En todas la peticiones AJAX comprobamos si la session ha caducado
			checkIfSessionTimeout(jqXHR);
			*/
		}); //$.post( "boletines.activar.action", {
		//......................................................................................
	},
	//boletines_activar_1: function(s_secuencia, i_activar) {
	
	
	inventario_lista_activar: function(s_tipo_lista, i_id_lista, i_activar) {
		// Preguntamos al usuario si quiere activar esta lista...
		var s_title = "DESACTIVAR lista de " + s_tipo_lista;
		var s_message = "¿Quiere desactivar la lista de " + s_tipo_lista + " de este plan?"; 
		if (i_activar == 1) {
			s_title = "ACTIVAR lista de " + s_tipo_lista;
			s_message = "¿Quiere activar la lista de " + s_tipo_lista + " de este plan?"; 
		}
		BootstrapDialog.confirm({
			title: s_title,
			message: s_message,
			type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
			//closable: true, // <-- Default value is false
			//draggable: true, // <-- Default value is false
			btnCancelLabel: "Cancelar", // <-- Default value is 'Cancel',
			btnOKLabel: "Aceptar", // <-- Default value is 'OK',
			//btnOKClass: "btn-warning", // <-- CSS class para botón "Aceptar". If you didn't specify it, dialog type will be used,
			callback: function(result) {
				// result will be true if button was click, while it will be false if users close the dialog directly.
				if (result) {
					// Aceptar: Activar/Desactivar lista
					plan_especial.inventario_lista_activar_1(s_tipo_lista, i_id_lista, i_activar);
				} else {
					// Cancelar: No hacemos nada. "BootstrapDialog.confirm" ya cierra este diálogo.
				}
			}
		});	//BootstrapDialog.confirm({	
	},
	//inventario_lista_activar: function(s_tipo_lista, i_id_lista, i_activar) {
	//
	inventario_lista_activar_1: function(s_tipo_lista, i_id_lista, i_activar) {
		// Datos a enviar por POST
		var v_data = {
			//URL: https://www.formget.com/jquery-get-value-of-input/
			id_plan : $("#id_input_id_plan").val().trim(), //el id_plan no es necesario
			id_lista: i_id_lista,
			estado: i_activar
		};
		
		//......................................................................................
		//$.post. URL: https://api.jquery.com/jquery.post/
		//......................................................................................
		var s_active = "desactive";
		var s_activar = "desactivar";
		var s_activado = "desactivado";
		if ( i_activar == 1 ) {
			s_active = "active";
			s_activar = "activar";
			s_activado = "activado";
		}
		var o_waitDialog = dycec_js.waitDialog("Esperando a que se " + s_active + " la lista con id_lista = [" + i_id_lista + "]");
		o_waitDialog.setSize(BootstrapDialog.SIZE_WIDE);
		//
		plan_especial.s_id_tab = "id_tab_inventario"; //tab a mostrar al recargar la página
		$.post( "inventario.lista.activar.action", v_data) 
		.done(function( data, textStatus, jqXHR ) {
			//console.log("$.post('inventario.lista.activar.action').done. data_JSON: \n" + JSON.stringify(data));
			var s_message;
			if ( (data && data.resultPeticion) ) {
				var o_result = data.resultPeticion;
				if (o_result.error > 0) {
					// Error
					s_message = "No se ha podido " + s_activar + " la lista con id_lista = [" + i_id_lista + "]."
						+ "\nMOTIVO: " + o_result.descripcion; 
					dycec_js.alert("Activar/Desactivar lista", s_message, BootstrapDialog.TYPE_DANGER);
				} else {
					// Ok, se ha activado/desactivado la lista ---------------------------------------------------
					s_message = "Se ha " + s_activado + " la lista con id_lista = [" + i_id_lista + "].";
					dycec_js.alert("Activar/Desactivar lista", s_message, BootstrapDialog.TYPE_INFO, plan_especial.callback_load_plan);
				}
			} else {
				s_message = "No se ha podido " + s_activar + " la lista con id_lista = [" + i_id_lista + "]."
					+ "\nMOTIVO: Se ha producido un error inesperado."
					+ "\n"
					+ "\nDatos recibidos: " + JSON.stringify(jqXHR); 
				dycec_js.alert("Activar/Desactivar lista", s_message, BootstrapDialog.TYPE_DANGER);
			} //if ( (data && data.resultPeticion) ) {
		}) //.done(function( data, textStatus, jqXHR ) {
		.fail(function( jqXHR, textStatus, errorThrown ) {
			// Error
			dycec_js.ajax_post_fail(jqXHR, textStatus, errorThrown);
		}) //.fail(function( jqXHR, textStatus, errorThrown ) {
		.always(function( jqXHR, textStatus, errorThrown ) {
			// Fin. Proceso completado (se ejecuta después de ".done"/".fail"
			o_waitDialog.close();
			
			/*//FALTA. Falta hacer esto como en Masivar_TV ó mejor, en java !!!!!
			// En todas la peticiones AJAX comprobamos si la session ha caducado
			checkIfSessionTimeout(jqXHR);
			*/
		}); //$.post( "inventario.lista.activar.action", {
		//......................................................................................
	},
	//inventario_lista_activar_1: function(s_tipo_lista, i_id_lista, i_activar) {
	

	inventario_parametros_activar: function(s_valor1, i_id_parametro, i_activar) {
		// Preguntamos al usuario si quiere activar este elemento...
		var s_title = "DESACTIVAR elemento";
		var s_message = "¿Quiere desactivar el elemento [" + s_valor1 + "] de este plan?"; 
		if (i_activar == 1) {
			s_title = "ACTIVAR elemento";
			s_message = "¿Quiere activar el elemento [" + s_valor1 + "] de este plan?"; 
		}
		BootstrapDialog.confirm({
			title: s_title,
			message: s_message,
			type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
			//closable: true, // <-- Default value is false
			//draggable: true, // <-- Default value is false
			btnCancelLabel: "Cancelar", // <-- Default value is 'Cancel',
			btnOKLabel: "Aceptar", // <-- Default value is 'OK',
			//btnOKClass: "btn-warning", // <-- CSS class para botón "Aceptar". If you didn't specify it, dialog type will be used,
			callback: function(result) {
				// result will be true if button was click, while it will be false if users close the dialog directly.
				if (result) {
					// Aceptar: Activar/Desactivar lista
					plan_especial.inventario_parametros_activar_1(s_valor1, i_id_parametro, i_activar);
				} else {
					// Cancelar: No hacemos nada. "BootstrapDialog.confirm" ya cierra este diálogo.
				}
			}
		});	//BootstrapDialog.confirm({	
	},
	//inventario_parametros_activar: function(s_valor1, i_id_parametro, i_activar) {
	//
	inventario_parametros_activar_1: function(s_valor1, i_id_parametro, i_activar) {
		// Datos a enviar por POST
		var v_data = {
			//URL: https://www.formget.com/jquery-get-value-of-input/
			id_plan : $("#id_input_id_plan").val().trim(), //el id_plan no es necesario
			id_parametro: i_id_parametro,
			estado: i_activar
		};
		
		//......................................................................................
		//$.post. URL: https://api.jquery.com/jquery.post/
		//......................................................................................
		var s_active = "desactive";
		var s_activar = "desactivar";
		var s_activado = "desactivado";
		if ( i_activar == 1 ) {
			s_active = "active";
			s_activar = "activar";
			s_activado = "activado";
		}
		var o_waitDialog = dycec_js.waitDialog("Esperando a que se " + s_active + " el elemento = [" + s_valor1 + "]");
		o_waitDialog.setSize(BootstrapDialog.SIZE_WIDE);
		//
		plan_especial.s_id_tab = "id_tab_inventario"; //tab a mostrar al recargar la página
		$.post( "inventario.parametros.activar.action", v_data) 
		.done(function( data, textStatus, jqXHR ) {
			//console.log("$.post('inventario.parametros.activar.action').done. data_JSON: \n" + JSON.stringify(data));
			var s_message;
			if ( (data && data.resultPeticion) ) {
				var o_result = data.resultPeticion;
				if (o_result.error > 0) {
					// Error
					s_message = "No se ha podido " + s_activar + " el elemento = [" + s_valor1 + "]."
						+ "\nMOTIVO: " + o_result.descripcion; 
					dycec_js.alert("Activar/Desactivar elemento", s_message, BootstrapDialog.TYPE_DANGER);
				} else {
					// Ok, se ha activado/desactivado el elemento ---------------------------------------------------
					s_message = "Se ha " + s_activado + " el elemento = [" + s_valor1 + "].";
					dycec_js.alert("Activar/Desactivar elemento", s_message, BootstrapDialog.TYPE_INFO, plan_especial.callback_load_plan);
				}
			} else {
				s_message = "No se ha podido " + s_activar + " el elemento = [" + s_valor1 + "]."
					+ "\nMOTIVO: Se ha producido un error inesperado."
					+ "\n"
					+ "\nDatos recibidos: " + JSON.stringify(jqXHR); 
				dycec_js.alert("Activar/Desactivar elemento", s_message, BootstrapDialog.TYPE_DANGER);
			} //if ( (data && data.resultPeticion) ) {
		}) //.done(function( data, textStatus, jqXHR ) {
		.fail(function( jqXHR, textStatus, errorThrown ) {
			// Error
			dycec_js.ajax_post_fail(jqXHR, textStatus, errorThrown);
		}) //.fail(function( jqXHR, textStatus, errorThrown ) {
		.always(function( jqXHR, textStatus, errorThrown ) {
			// Fin. Proceso completado (se ejecuta después de ".done"/".fail"
			o_waitDialog.close();
			
			/*//FALTA. Falta hacer esto como en Masivar_TV ó mejor, en java !!!!!
			// En todas la peticiones AJAX comprobamos si la session ha caducado
			checkIfSessionTimeout(jqXHR);
			*/
		}); //$.post( "inventario.parametros.activar.action", {
		//......................................................................................
	},
	//inventario_parametros_activar_1: function(s_valor1, i_id_parametro, i_activar) {
	
	
	inventario_parametros_add: function(s_tipo_lista) {
		//var s_message = "<textarea id='id_textarea_parametros_add' placeholder='Pegue aquí la lista de datos a añadir...'></textarea>";
		var s_message = "<textarea id='id_textarea_parametros_add' class='message_dialog-add'"
			+ "placeholder='Pegue aquí la lista de " + s_tipo_lista + " a añadir al plan en formato CSV...'"
			+ "></textarea>";
		// Texto de ayuda con el formato CSV, para más claridad
		var s_text = "valor_1; valor_2; valor_3; valor_4; Observaciones";
		if ( s_tipo_lista.startsWith("admin") ) {
			s_text = s_text
				+ "\nAdministrativo; Cliente/Ruta/Elemento; Servicio; Info_adicional; Observaciones"
				+ "\n...";
		} else if ( s_tipo_lista.startsWith("emplaz") ) {
			s_text = s_text
				+ "\nCódigo; Emplazamiento; Info1; Info2; Observaciones"
				+ "\n...";
		} else if ( s_tipo_lista.startsWith("equipo") ) {
			s_text = s_text
				+ "\nCódigo; Tipo; Nombre; Servicio/Elemento/Red; Observaciones"
				+ "\n...";
		} else if ( s_tipo_lista.startsWith("numerac") ) {
			s_text = s_text
				+ "\nInicial; Final; Cliente; Servicio; Observaciones"
				+ "\n...";
		} else if ( s_tipo_lista.startsWith("provin") ) {
			s_text = s_text
				+ "\nCódigo; Provincia; Info1; Info2; Observaciones"
				+ "\n...";
		} else {
			s_text = s_text
				+ "\n...";
		}
		s_text = "Formato CSV (lista de valores separados por carácter punto y coma):\n" + s_text
			+ "\nNOTA: los datos no pueden contener el carácter ;";
		//
		s_message = s_message
			+ "<div class='div-linea_separadora'></div>"
			+ "<label class='hint_formato-datos'>" + s_text + "</label>"; 
		
		// Preguntamos al usuario si quiere añadir datos al inventario...
		BootstrapDialog.confirm({
			//title: "Añadir " + s_tipo_lista + "al plan [" + $("#id_input_plan").val() + "]",
			title: "Añadir " + s_tipo_lista + " al plan [" + $("#id_var_plan").html() + "]",
			message: s_message,
			type: BootstrapDialog.TYPE_PRIMARY, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
			//closable: true, // <-- Default value is false
			//draggable: true, // <-- Default value is false
			btnCancelLabel: "Cancelar", // <-- Default value is 'Cancel',
			btnOKLabel: "Aceptar", // <-- Default value is 'OK',
			//btnOKClass: "btn-warning", // <-- CSS class para botón "Aceptar". If you didn't specify it, dialog type will be used,
			callback: function(result) {
				// result will be true if button was click, while it will be false if users close the dialog directly.
				if (result) {
					// Aceptar: Enviamos esta lista al servidor web
					plan_especial.inventario_parametros_add_1(s_tipo_lista);
				} else {
					// Cancelar: No hacemos nada. "BootstrapDialog.confirm" ya cierra este diálogo.
				}
			}
		});	//BootstrapDialog.confirm({	
	},
	//inventario_parametros_add: function(s_tipo_lista) {
	//
	inventario_parametros_add_1: function(s_tipo_lista) {
		// Datos a enviar por POST
		var v_data = {
			//URL: https://www.formget.com/jquery-get-value-of-input/
			id_plan : $("#id_input_id_plan").val().trim(), //el id_plan no es necesario
			tipo_lista: s_tipo_lista,
			csv_data: $("#id_textarea_parametros_add").val(),
			csv_separator: ";"
		};
		
		//......................................................................................
		//$.post. URL: https://api.jquery.com/jquery.post/
		//......................................................................................
		//var o_waitDialog = dycec_js.waitDialog("Esperando respuesta del servidor Web...");
		var o_waitDialog = dycec_js.waitDialog("Añadiendo nuevos elementos a la lista de [" + s_tipo_lista + "]...");
		o_waitDialog.setSize(BootstrapDialog.SIZE_WIDE);
		//
		plan_especial.s_id_tab = "id_tab_inventario"; //tab a mostrar al recargar la página
		$.post( "inventario.parametros.add.action", v_data) 
		.done(function( data, textStatus, jqXHR ) {
			//console.log("$.post('inventario.parametros.add.action').done. data_JSON: \n" + JSON.stringify(data));
			var s_message;
			var s_title = "Añadir elementos a la lista de [" +  s_tipo_lista + "]";
			var i_type = BootstrapDialog.TYPE_INFO;
			if ( (data && data.resultPeticion) ) {
				var o_result = data.resultPeticion;
				if (o_result.error > 0) {
					// Error al añadir nuevos datos
					i_type = BootstrapDialog.TYPE_DANGER;
					s_message = "ERROR. No se ha podido añadir todos los elementos a la lista de [" + s_tipo_lista + "]."
						+ "\nLista de elementos no añadidos:"
						+ "\n----------------------------------------------------------------------------------"
						//+ "\n" + data.csv_data_error
						+ "\n" + data.log_import_errores
						+ "\n"
						+ "\nLista de elementos añadidos:"
						+ "\n----------------------------------------------------------------------------------"
						+ "\n" + data.csv_data_ok
						; 
				} else {
					// Ok, se han añadido todos los datos ---------------------------------------------------
					s_message = "Se han añadido todos los elementos a la lista de [" + s_tipo_lista + "].";
				}
			} else {
				i_type = BootstrapDialog.TYPE_DANGER;
				s_message = "ERROR. No se ha podido añadir los elementos a la lista de [" + s_tipo_lista + "]."
					+ "\nMOTIVO: Se ha producido un error inesperado."
					+ "\n"
					+ "\nDatos recibidos: " + JSON.stringify(jqXHR); 
			} //if ( (data && data.newPlan) ) {
			dycec_js.alert(s_title, s_message, i_type, plan_especial.callback_load_plan);
		}) //.done(function( data, textStatus, jqXHR ) {
		.fail(function( jqXHR, textStatus, errorThrown ) {
			// Error
			dycec_js.ajax_post_fail(jqXHR, textStatus, errorThrown);
		}) //.fail(function( jqXHR, textStatus, errorThrown ) {
		.always(function( jqXHR, textStatus, errorThrown ) {
			// Fin. Proceso completado (se ejecuta después de ".done"/".fail"
			o_waitDialog.close();
			
			/*//FALTA. Falta hacer esto como en Masivar_TV ó mejor, en java !!!!!
			// En todas la peticiones AJAX comprobamos si la session ha caducado
			checkIfSessionTimeout(jqXHR);
			*/
		}); //$.post( "inventario.parametros.add.action", {
		//......................................................................................
	},
	//inventario_parametros_add_1: function(s_tipo_lista) {
	
	
	inventario_parametros_delete: function(s_tipo_lista, i_id_lista, s_valor1, i_id_parametro) {
		// Preguntamos al usuario si quiere borrar datos del inventario...
		var s_title = "Borrar todos los elementos de la lista de " + s_tipo_lista;
		var s_message = "¿Desea borrar todos los elementos de la lista de " + s_tipo_lista 
			+ " con id_lista = [" + i_id_lista + "]?";
		if (s_valor1 && (s_valor1.trim() != "") ) {
			s_title = "Borrar el parámetro [" + s_valor1 + "]";
			s_message = "¿Desea borrar el parámetro [" + s_valor1 + "] de la lista?";
		}
		BootstrapDialog.confirm({
			//title: "Añadir " + s_tipo_lista + "al plan [" + $("#id_input_plan").html() + "]",
			title: s_title,
			message: s_message,
			type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
			//closable: true, // <-- Default value is false
			//draggable: true, // <-- Default value is false
			btnCancelLabel: "Cancelar", // <-- Default value is 'Cancel',
			btnOKLabel: "Aceptar", // <-- Default value is 'OK',
			//btnOKClass: "btn-warning", // <-- CSS class para botón "Aceptar". If you didn't specify it, dialog type will be used,
			callback: function(result) {
				// result will be true if button was click, while it will be false if users close the dialog directly.
				if (result) {
					// Aceptar: Borramos el parámetro(s)
					plan_especial.inventario_parametros_delete_1(s_tipo_lista, i_id_lista, s_valor1, i_id_parametro);
				} else {
					// Cancelar: No hacemos nada. "BootstrapDialog.confirm" ya cierra este diálogo.
				}
			}
		});	//BootstrapDialog.confirm({	
	},
	//inventario_parametros_delete: function(s_tipo_lista, i_id_lista, s_valor1, i_id_parametro) {
	//
	inventario_parametros_delete_1: function(s_tipo_lista, i_id_lista, s_valor1, i_id_parametro) {
		// Datos a enviar por POST
		var v_data = {
			//URL: https://www.formget.com/jquery-get-value-of-input/
			id_plan : $("#id_input_id_plan").val().trim(), //el id_plan no es necesario
			id_lista: i_id_lista,
			id_parametro: i_id_parametro,
			valor1: s_valor1
		};
		
		//......................................................................................
		//$.post. URL: https://api.jquery.com/jquery.post/
		//......................................................................................
		var s_message = "Esperando el borrado de todos los elementos de la lista de [" + s_tipo_lista + "] con id_lista= [" + i_id_lista + "]...";
		if ( s_valor1 ) {
			s_message = "Esperando el borrado del elemento [" + s_valor1 + "] de la lista...";
		}
		var o_waitDialog = dycec_js.waitDialog(s_message);
		o_waitDialog.setSize(BootstrapDialog.SIZE_WIDE);
		//
		plan_especial.s_id_tab = "id_tab_inventario"; //tab a mostrar al recargar la página
		$.post( "inventario.parametros.delete.action", v_data) 
		.done(function( data, textStatus, jqXHR ) {
			//console.log("$.post('inventario.parametros.delete.action').done. data_JSON: \n" + JSON.stringify(data));
			var s_message;
			var s_error = "No se ha podido realizar el borrado de los elementos de la lista de [" + s_tipo_lista + "] con id_lista= [" + i_id_lista + "].";
			if ( s_valor1 ) {
				s_error = "No se ha podido realizar el borrado del elemento [" + s_valor1 + "] de la lista.";
			}
			if ( (data && data.resultPeticion) ) {
				var o_result = data.resultPeticion;
				if (o_result.error > 0) {
					// Error al crear plan
					s_message = "ERROR."
						+ "\n" + s_error
						+ "\nMOTIVO: " + o_result.descripcion; 
					dycec_js.alert("Borrar", s_message, BootstrapDialog.TYPE_DANGER);
				} else {
					// Ok, se ha activado/desactivado la lista ---------------------------------------------------
					s_message = "Ok."
						+ "\nBorrado realizado con éxito."
						+ "\n" + o_result.descripcion;
					dycec_js.alert("Borrar", s_message, BootstrapDialog.TYPE_INFO, plan_especial.callback_load_plan);
				}
			} else {
				s_message = s_error
					+ "\nMOTIVO: Se ha producido un error inesperado."
					+ "\n"
					+ "\nDatos recibidos: " + JSON.stringify(jqXHR); 
				dycec_js.alert("Borrar", s_message, BootstrapDialog.TYPE_DANGER);
			} //if ( (data && data.newPlan) ) {
		}) //.done(function( data, textStatus, jqXHR ) {
		.fail(function( jqXHR, textStatus, errorThrown ) {
			// Error
			dycec_js.ajax_post_fail(jqXHR, textStatus, errorThrown);
		}) //.fail(function( jqXHR, textStatus, errorThrown ) {
		.always(function( jqXHR, textStatus, errorThrown ) {
			// Fin. Proceso completado (se ejecuta después de ".done"/".fail"
			o_waitDialog.close();
			
			/*//FALTA. Falta hacer esto como en Masivar_TV ó mejor, en java !!!!!
			// En todas la peticiones AJAX comprobamos si la session ha caducado
			checkIfSessionTimeout(jqXHR);
			*/
		}); //$.post( "inventario.parametros.delete.action", {
		//......................................................................................
	},
	//inventario_parametros_delete_1: function(s_tipo_lista, i_id_lista, s_valor1, i_id_parametro) {
	
	
	comunicaciones_activar: function(i_id_usuario, i_id_comunicacion, i_activar, s_usuario) {
		// Preguntamos al usuario si quiere activar esta comunicación...
		var s_comunicacion = "envío desconocido !!!";
		if ( i_id_comunicacion == 1 ) {
			s_comunicacion = "SMS-INC";
		} else if ( i_id_comunicacion == 2 ) {
			s_comunicacion = "SMS-Evol.";
		} else if ( i_id_comunicacion == 3 ) {
			s_comunicacion = "e-mail-INC";
		} else if ( i_id_comunicacion == 4 ) {
			s_comunicacion = "e-mail-Evol.";
		} else if ( i_id_comunicacion == 5 ) {
			s_comunicacion = "e-mail-Infor.";
		}
		var s_title = "DESACTIVAR comunicación";
		var s_message = "¿Quiere desactivar la comunicación [" + s_comunicacion + "]" 
			+ " del usuario [" + s_usuario + "] para este plan?"; 
		if (i_activar == 1) {
			s_title = "ACTIVAR comunicación";
			s_message = "¿Quiere activar la comunicación [" + s_comunicacion + "]" 
				+ " del usuario [" + s_usuario + "] para este plan?"; 
		}
		BootstrapDialog.confirm({
			title: s_title,
			message: s_message,
			type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
			//closable: true, // <-- Default value is false
			//draggable: true, // <-- Default value is false
			btnCancelLabel: "Cancelar", // <-- Default value is 'Cancel',
			btnOKLabel: "Aceptar", // <-- Default value is 'OK',
			//btnOKClass: "btn-warning", // <-- CSS class para botón "Aceptar". If you didn't specify it, dialog type will be used,
			callback: function(result) {
				// result will be true if button was click, while it will be false if users close the dialog directly.
				if (result) {
					// Aceptar: Activar/Desactivar lista
					plan_especial.comunicaciones_activar_1(i_id_usuario, i_id_comunicacion, i_activar, s_comunicacion);
				} else {
					// Cancelar: No hacemos nada. "BootstrapDialog.confirm" ya cierra este diálogo.
				}
			}
		});	//BootstrapDialog.confirm({	
	},
	//comunicaciones_activar: function(i_id_usuario, i_id_comunicacion, i_activar, s_usuario) {
	//
	comunicaciones_activar_1: function(i_id_usuario, i_id_comunicacion, i_activar, s_comunicacion) {
		// Datos a enviar por POST
		var v_data = {
			//URL: https://www.formget.com/jquery-get-value-of-input/
			id_plan : $("#id_input_id_plan").val().trim(), //el id_plan no es necesario
			id_usuario: i_id_usuario,
			id_comunicacion: i_id_comunicacion,
			estado: i_activar
		};
		
		//......................................................................................
		//$.post. URL: https://api.jquery.com/jquery.post/
		//......................................................................................
		var s_active = "desactive";
		var s_activar = "desactivar";
		var s_activado = "desactivado";
		if ( i_activar == 1 ) {
			s_active = "active";
			s_activar = "activar";
			s_activado = "activado";
		}
		var o_waitDialog = dycec_js.waitDialog("Esperando a que se " + s_active + " la comunicación = [" + s_comunicacion + "]...");
		o_waitDialog.setSize(BootstrapDialog.SIZE_WIDE);
		//
		plan_especial.s_id_tab = "id_tab_comunicaciones"; //tab a mostrar al recargar la página
		$.post( "comunicaciones.activar.action", v_data) 
		.done(function( data, textStatus, jqXHR ) {
			//console.log("$.post('inventario.parametros.activar.action').done. data_JSON: \n" + JSON.stringify(data));
			var s_title = "Activar/Desactivar comunicación";
			var s_message;
			if ( (data && data.resultPeticion) ) {
				var o_result = data.resultPeticion;
				if (o_result.error > 0) {
					// Error
					s_message = "No se ha podido " + s_activar + " la comunicación = [" + s_comunicacion + "]."
						+ "\nMOTIVO: " + o_result.descripcion; 
					dycec_js.alert(s_title, s_message, BootstrapDialog.TYPE_DANGER);
				} else {
					// Ok, se ha activado/desactivado el elemento ---------------------------------------------------
					s_message = "Se ha " + s_activado + " la comunicación = [" + s_comunicacion + "].";
					dycec_js.alert(s_title, s_message, BootstrapDialog.TYPE_INFO, plan_especial.callback_load_plan);
				}
			} else {
				s_message = "No se ha podido " + s_activar + " la comunicación = [" + s_comunicacion + "]."
					+ "\nMOTIVO: Se ha producido un error inesperado."
					+ "\n"
					+ "\nDatos recibidos: " + JSON.stringify(jqXHR); 
				dycec_js.alert(s_title, s_message, BootstrapDialog.TYPE_DANGER);
			} //if ( (data && data.resultPeticion) ) {
		}) //.done(function( data, textStatus, jqXHR ) {
		.fail(function( jqXHR, textStatus, errorThrown ) {
			// Error
			dycec_js.ajax_post_fail(jqXHR, textStatus, errorThrown);
		}) //.fail(function( jqXHR, textStatus, errorThrown ) {
		.always(function( jqXHR, textStatus, errorThrown ) {
			// Fin. Proceso completado (se ejecuta después de ".done"/".fail"
			o_waitDialog.close();
			
			/*//FALTA. Falta hacer esto como en Masivar_TV ó mejor, en java !!!!!
			// En todas la peticiones AJAX comprobamos si la session ha caducado
			checkIfSessionTimeout(jqXHR);
			*/
		}); //$.post( "comunicaciones.activar.action", {
		//......................................................................................
	},
	//comunicaciones_activar_1: function(i_id_usuario, i_id_comunicacion, i_activar, s_comunicacion) {
	
	comunicaciones_delete: function(i_id_usuario, s_destinatario) {
		// Preguntamos al usuario si quiere borrar datos de comunicaciones...
		var s_title = "Borrar todos los destinatarios";
		var s_message = "¿Desea borrar todos los destinatarios de este plan?";
		if (i_id_usuario) {
			s_title = "Borrar el destinatario [" + s_destinatario + "]";
			s_message = "¿Desea borrar el destinatario [" + s_destinatario + "] de este plan?";
		}
		BootstrapDialog.confirm({
			title: s_title,
			message: s_message,
			type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
			//closable: true, // <-- Default value is false
			//draggable: true, // <-- Default value is false
			btnCancelLabel: "Cancelar", // <-- Default value is 'Cancel',
			btnOKLabel: "Aceptar", // <-- Default value is 'OK',
			//btnOKClass: "btn-warning", // <-- CSS class para botón "Aceptar". If you didn't specify it, dialog type will be used,
			callback: function(result) {
				// result will be true if button was click, while it will be false if users close the dialog directly.
				if (result) {
					// Aceptar: Borramos el destinatario(s)
					plan_especial.comunicaciones_delete_1(i_id_usuario, s_destinatario);
				} else {
					// Cancelar: No hacemos nada. "BootstrapDialog.confirm" ya cierra este diálogo.
				}
			}
		});	//BootstrapDialog.confirm({	
	},
	// comunicaciones_delete: function(i_id_usuario, s_matricula, s_movil, s_email) {
	//
	comunicaciones_delete_1: function(i_id_usuario, s_destinatario) {
		// Datos a enviar por POST
		var v_data = {
			//URL: https://www.formget.com/jquery-get-value-of-input/
			id_plan : $("#id_input_id_plan").val().trim(), //el id_plan no es necesario
			id_usuario: i_id_usuario
		};
		
		//......................................................................................
		//$.post. URL: https://api.jquery.com/jquery.post/
		//......................................................................................
		var s_message = "Esperando el borrado de todos los destinatarios de este plan...";
		if ( i_id_usuario ) {
			s_message = "Esperando el borrado del destinatario [" + s_destinatario + "] de este plan...";
		}
		var o_waitDialog = dycec_js.waitDialog(s_message);
		o_waitDialog.setSize(BootstrapDialog.SIZE_WIDE);
		//
		plan_especial.s_id_tab = "id_tab_comunicaciones"; //tab a mostrar al recargar la página
		$.post( "comunicaciones.delete.action", v_data) 
		.done(function( data, textStatus, jqXHR ) {
			//console.log("$.post('comunicaciones.delete.action').done. data_JSON: \n" + JSON.stringify(data));
			var s_message;
			var s_error = "No se ha podido realizar el borrado de los destinatarios de este plan.";
			if ( s_destinatario ) {
				s_error = "No se ha podido realizar el borrado del destinatario [" + s_destinatario + "] de este plan.";
			}
			if ( (data && data.resultPeticion) ) {
				var o_result = data.resultPeticion;
				if (o_result.error > 0) {
					// Error al crear plan
					s_message = "ERROR."
						+ "\n" + s_error
						+ "\nMOTIVO: " + o_result.descripcion; 
					dycec_js.alert("Borrar", s_message, BootstrapDialog.TYPE_DANGER);
				} else {
					// Ok, se ha activado/desactivado la lista ---------------------------------------------------
					s_message = "Ok."
						+ "\nBorrado realizado con éxito."
						+ "\n" + o_result.descripcion;
					dycec_js.alert("Borrar", s_message, BootstrapDialog.TYPE_INFO, plan_especial.callback_load_plan);
				}
			} else {
				s_message = s_error
					+ "\nMOTIVO: Se ha producido un error inesperado."
					+ "\n"
					+ "\nDatos recibidos: " + JSON.stringify(jqXHR); 
				dycec_js.alert("Borrar", s_message, BootstrapDialog.TYPE_DANGER);
			} //if ( (data && data.resultPeticion) ) {
		}) //.done(function( data, textStatus, jqXHR ) {
		.fail(function( jqXHR, textStatus, errorThrown ) {
			// Error
			dycec_js.ajax_post_fail(jqXHR, textStatus, errorThrown);
		}) //.fail(function( jqXHR, textStatus, errorThrown ) {
		.always(function( jqXHR, textStatus, errorThrown ) {
			// Fin. Proceso completado (se ejecuta después de ".done"/".fail"
			o_waitDialog.close();
			
			/*//FALTA. Falta hacer esto como en Masivar_TV ó mejor, en java !!!!!
			// En todas la peticiones AJAX comprobamos si la session ha caducado
			checkIfSessionTimeout(jqXHR);
			*/
		}); //$.post( "comunicaciones.delete.action", {
		//......................................................................................
	},
	//comunicaciones_delete_1: function(i_id_usuario, s_destinatario) {
	
	comunicaciones_add: function() {
		//var s_message = "<textarea id='id_textarea_destinatarios_add' placeholder='Pegue aquí la lista de destinatarios a añadir...'></textarea>";
		// Mostramos un "textarea" + msg de ayuda en su parte de abajo. Es un msg ya creado en "plan_especial_tab_comunicaciones.jsp"
		var s_message = $("#id_div_msg_destinatarios_add").html();
		// 1.1) Quitamos todos los "\n", para que BootstrapDialog no añada <br/> por cada "\n"
		/* //URL: http://stackoverflow.com/questions/784539/how-do-i-replace-all-line-breaks-in-a-string-with-br-tags
		   //URL: http://www.regular-expressions.info/characters.html
		*/
		s_message = s_message.replace(/(?:\r\n|\r|\n)/g, '');
		// 1.2) Renombramoslos "id": "id_..." a "id_m_..." , para que no estén duplicados y podamos recuperar sus valores
		s_message = s_message.replace(/id="id_/g, 'id="id_m_');

		
		// Preguntamos al usuario si quiere añadir datos al inventario...
		BootstrapDialog.confirm({
			//title: "Añadir " + s_tipo_lista + "al plan [" + $("#id_input_plan").val() + "]",
			title: "Añadir destinatarios al plan [" + $("#id_var_plan").html() + "]",
			message: s_message,
			type: BootstrapDialog.TYPE_PRIMARY, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
			//closable: true, // <-- Default value is false
			//draggable: true, // <-- Default value is false
			btnCancelLabel: "Cancelar", // <-- Default value is 'Cancel',
			btnOKLabel: "Aceptar", // <-- Default value is 'OK',
			//btnOKClass: "btn-warning", // <-- CSS class para botón "Aceptar". If you didn't specify it, dialog type will be used,
			callback: function(result) {
				// result will be true if button was click, while it will be false if users close the dialog directly.
				if (result) {
					// Aceptar: Enviamos esta lista al servidor web
					plan_especial.comunicaciones_add_1();
				} else {
					// Cancelar: No hacemos nada. "BootstrapDialog.confirm" ya cierra este diálogo.
				}
			}
		});	//BootstrapDialog.confirm({	
	},
	//comunicaciones_add: function() {
	//
	comunicaciones_add_1: function() {
		// Datos a enviar por POST
		var v_data = {
			//URL: https://www.formget.com/jquery-get-value-of-input/
			id_plan : $("#id_input_id_plan").val().trim(),
			comunicaciones: plan_especial.getComunicaciones(), //"0;1;0;1;1". ¿Activado?   
			//csv_data: $("div.bootstrap-dialog-message > #id_textarea_destinatarios_add").val(),
			csv_data: $("#id_m_textarea_destinatarios_add").val(),
			csv_separator: ";"
		};
		/* NOTA: al final no hace falta todo los explicado abajo, lo hacemos mucho más fácil
				renombrando los "id" del msgBox: "id_..." a "id_m_...":
				$("#id_textarea_destinatarios_add")
				renombrado en el msgBox a
				$("#id_m_textarea_destinatarios_add")
		 * NOTA: ponemos 
				csv_data: $("div.bootstrap-dialog-message > #id_textarea_destinatarios_add").val()
				en lugar de 
				$("#id_textarea_destinatarios_add").val()
				ya que hemos copiado el contenido del div hidden al div del BootstrapDialog y
				tenemos dos "#id_textarea_destinatarios_add" y $("#id_textarea_destinatarios_add")
				devuelve el primero que encuentra !!!!!!
		 * $("div.bootstrap-dialog-message > #id_textarea_destinatarios_add") selector
		   jquery que selecciona "#id_textarea_destinatarios_add" que está dentro de
		   un "div" con clase "bootstrap-dialog-message".
		   //URL: https://api.jquery.com/child-selector/
		*/
		/* Copiamos contenido del textarea del BootstrapDialog al textarea del div hidden,
		   por si queremos conservar el mismo dato para otras peticiones
		 */
		/*
		//$("#id_div_msg_destinatarios_add > #id_textarea_destinatarios_add").val(
		//	$("div.bootstrap-dialog-message > #id_textarea_destinatarios_add").val()
		//);
		$(" #id_textarea_destinatarios_add").val(
			$("#id_m_textarea_destinatarios_add").val()
		);
		*/
		
		//......................................................................................
		//$.post. URL: https://api.jquery.com/jquery.post/
		//......................................................................................
		//var o_waitDialog = dycec_js.waitDialog("Esperando respuesta del servidor Web...");
		var o_waitDialog = dycec_js.waitDialog("Añadiendo nuevos destinatarios al plan...");
		o_waitDialog.setSize(BootstrapDialog.SIZE_WIDE);
		//
		plan_especial.s_id_tab = "id_tab_comunicaciones"; //tab a mostrar al recargar la página
		$.post( "comunicaciones.add.action", v_data) 
		.done(function( data, textStatus, jqXHR ) {
			//console.log("$.post('inventario.parametros.add.action').done. data_JSON: \n" + JSON.stringify(data));
			var s_message;
			var s_title = "Añadir destinatarios al plan";
			var i_type = BootstrapDialog.TYPE_INFO;
			if ( (data && data.resultPeticion) ) {
				var o_result = data.resultPeticion;
				if (o_result.error > 0) {
					// Error al añadir nuevos datos
					i_type = BootstrapDialog.TYPE_DANGER;
					s_message = "ERROR. No se ha podido añadir todos los destinatarios al plan."
						+ "\nLista de usarios que no existe en GRILLO:"
						+ "\n----------------------------------------------------------------------------------"
						+ "\n" + data.csv_data_error_no_existe
						+ "\n"
						+ "\nLista de elementos no añadidos:"
						+ "\n----------------------------------------------------------------------------------"
						//+ "\n" + data.csv_data_error
						+ "\n" + data.log_import_errores
						+ "\n"
						+ "\nLista de elementos añadidos:"
						+ "\n----------------------------------------------------------------------------------"
						+ "\n" + data.csv_data_ok
						; 
				} else {
					// Ok, se han añadido todos los datos ---------------------------------------------------
					s_message = "Se han añadido todos los destinatarios al plan.";
				}
			} else {
				i_type = BootstrapDialog.TYPE_DANGER;
				s_message = "ERROR. No se ha podido añadir los destinatarios al plan."
					+ "\nMOTIVO: Se ha producido un error inesperado."
					+ "\n"
					+ "\nDatos recibidos: " + JSON.stringify(jqXHR); 
			} //if ( (data && data.newPlan) ) {
			dycec_js.alert(s_title, s_message, i_type, plan_especial.callback_load_plan);
		}) //.done(function( data, textStatus, jqXHR ) {
		.fail(function( jqXHR, textStatus, errorThrown ) {
			// Error
			dycec_js.ajax_post_fail(jqXHR, textStatus, errorThrown);
		}) //.fail(function( jqXHR, textStatus, errorThrown ) {
		.always(function( jqXHR, textStatus, errorThrown ) {
			// Fin. Proceso completado (se ejecuta después de ".done"/".fail"
			o_waitDialog.close();
			
			/*//FALTA. Falta hacer esto como en Masivar_TV ó mejor, en java !!!!!
			// En todas la peticiones AJAX comprobamos si la session ha caducado
			checkIfSessionTimeout(jqXHR);
			*/
		}); //$.post( "inventario.parametros.add.action", {
		//......................................................................................
	},
	//comunicaciones_add_1: function() {
	//
	// return "0;1;0;1;1". ¿Activado? "SMS-INC;SMS-Evol;email-INC;email-Evol.;email-Infor." 
	getComunicaciones: function() {
		var s_comunicaciones; //"0;1;0;1;1"
		
		// Tomamos las comunicaciones activadas de los checkBox del diálogo
		/* OJOooooo, en el msgBox, hemos renombrado "id_cb_c1" a "id_m_cb_c1"
		s_comunicaciones = this.getChecked_asByte("#id_cb_c1") + ";" +
		*/
		s_comunicaciones = this.getChecked_asByte("#id_m_cb_c1") + ";" +
			this.getChecked_asByte("#id_m_cb_c2") + ";" +
			this.getChecked_asByte("#id_m_cb_c3") + ";" +
			this.getChecked_asByte("#id_m_cb_c4") + ";" +
			this.getChecked_asByte("#id_m_cb_c5");
		
		return s_comunicaciones;
	},
	getChecked_asByte: function(s_id_cb) {
		//if ($("#id_m_cb_c1")[0].checked) {
		if ($(s_id_cb)[0].checked) {
			return 1;
		}
		return 0;
	},
	//getComunicaciones: function() {
	

	comunicaciones_add_user_grillo: function() {
		// Mostramos "input's" + msg de ayuda en su parte de abajo. Es un msg ya creado en "plan_especial_tab_comunicaciones.jsp"
		var s_message = $("#id_div_msg_add_user_grillo").html();
		// 1.1) Quitamos todos los "\n", para que BootstrapDialog no añada <br/> por cada "\n"
		/* //URL: http://stackoverflow.com/questions/784539/how-do-i-replace-all-line-breaks-in-a-string-with-br-tags
		   //URL: http://www.regular-expressions.info/characters.html
		*/
		s_message = s_message.replace(/(?:\r\n|\r|\n)/g, '');
		// 1.2) Renombramoslos "id": "id_..." a "id_m_..." , para que no estén duplicados y podamos recuperar sus valores
		s_message = s_message.replace(/id="id_/g, 'id="id_m_');

		
		// Preguntamos al usuario si quiere añadir datos al inventario...
		BootstrapDialog.confirm({
			//title: "Añadir " + s_tipo_lista + "al plan [" + $("#id_input_plan").val() + "]",
			title: "Añadir usuarios a GRILLO que no existen en eDOMUS.",
			message: s_message,
			type: BootstrapDialog.TYPE_PRIMARY, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
			//closable: true, // <-- Default value is false
			//draggable: true, // <-- Default value is false
			btnCancelLabel: "Cancelar", // <-- Default value is 'Cancel',
			btnOKLabel: "Aceptar", // <-- Default value is 'OK',
			//btnOKClass: "btn-warning", // <-- CSS class para botón "Aceptar". If you didn't specify it, dialog type will be used,
			callback: function(result) {
				// result will be true if button was click, while it will be false if users close the dialog directly.
				if (result) {
					// Aceptar: Enviamos esta lista al servidor web
					plan_especial.comunicaciones_add_user_grillo_1();
				} else {
					// Cancelar: No hacemos nada. "BootstrapDialog.confirm" ya cierra este diálogo.
				}
			}
		});	//BootstrapDialog.confirm({	
	},
	//comunicaciones_add_user_grillo: function() {
	//
	comunicaciones_add_user_grillo_1: function() {
		// Datos JSON a enviar por POST. Un único objeto "com.dycec.bd.modelo.Usuario_GRILLO". 
		/* URL: http://stackoverflow.com/questions/11429828/struts-2-send-a-json-string-with-jquery-ajax-submit-to-be-mapped-into-a-list-of
		 *      http://stackoverflow.com/questions/19566700/how-to-use-jquery-to-post-json-data-to-a-struts2-action-class
		// Datos a enviar por POST. Un único objeto "com.dycec.bd.modelo.Usuario_GRILLO".
		var v_data = { 
			{nombre:"Pedro", apellido1:"Gómez", apellido2:"Santos", movil:"", email:"pgs@c.com"}
		};
		$.post( "comunicaciones.add_user_grillo.action", {jsonUserGrillo: JSON.stringify(v_data)}, null, "json")		 
		// Datos JSON a enviar por POST. Una lista de objetos "com.dycec.bd.modelo.Usuario_GRILLO".
		var v_data = { 
			[
				{nombre:"Pedro", apellido1:"Gómez", apellido2:"Santos", movil:"", email:"pgs@c.com"},
				{nombre:"José",  apellido1:"Núñez", apellido2:"Pérez",  movil:"", email:"jnp@c.com"},
				{nombre:"Juan",  apellido1:"Sanz",  apellido2:"Marcos", movil:"", email:"jsm@c.com"}
			]
		};		 
		$.post( "comunicaciones.add_user_grillo.action", {jsonListUserGrillo: JSON.stringify(v_data)}, null, "json")		 
		*/
		/* Código JAVA para recoger estos datos ----------------------------------
		private String jsonUserGrillo;
		...
		// Recuperamos el objeto enviado por JSON ------------------------------------ 
		// Pasamos los datos JSON recibidos al objeto JAVA. jsonUserGrillo = "{"nombre":"Pedro","apellido1":"Pérez","apellido2":"Martín","movil":"619123456","email":"e@e.com"}"
		// jsonUserGrillo = "{"nombre":"Pedro","apellido1":"Pérez","apellido2":"Martín","movil":"619123456","email":"e@e.com"}"
		Usuario_GRILLO usuario_GRILLO = new Usuario_GRILLO();
		// Creamos el string JSON del objeto usuario_GRILLO
		//String jsonUserGrillo = JSONUtil.serialize(usuario_GRILLO); //org.apache.struts2.json.JSONUtil
		//usuario_GRILLO = (Usuario_GRILLO)JSONUtil.deserialize(jsonUserGrillo); --> esto no se puede hacer !!!!
		//Object o_json = JSONUtil.deserialize(jsonUserGrillo);
		Map mapJSON = (Map)JSONUtil.deserialize(jsonUserGrillo); //org.apache.struts2.json.JSONUtil
		JSONPopulator jsonPopulator = new JSONPopulator(); //org.apache.struts2.json.JSONPopulator
		jsonPopulator.populateObject(usuario_GRILLO, mapJSON);
		*/
		// Datos JSON a enviar por POST. Un único objeto "com.dycec.bd.modelo.Usuario_GRILLO".
		// JAVA: private String jsonUserGrillo; --> JS: {jsonUserGrillo: JSON.stringify(v_data)}
		var v_data = {
			nombre: $("#id_m_input_nombre").val().trim(),
			apellido1: $("#id_m_input_apellido1").val().trim(),
			apellido2: $("#id_m_input_apellido2").val().trim(),
			movil: $("#id_m_input_movil").val().trim(),
			email: $("#id_m_input_email").val().trim()
		};
		/* NOTA: al final no hace falta todo los explicado abajo, lo hacemos mucho más fácil
				renombrando los "id" del msgBox: "id_..." a "id_m_...":
				$("#id_input_nombre")
				renombrado en el msgBox a
				$("#id_m_input_nombre")
		 * NOTA: ponemos 
				nombre: $("div.bootstrap-dialog-message > #id_input_nombre").val()
				en lugar de 
				$("#id_input_nombre").val()
				ya que hemos copiado el contenido del div hidden al div del BootstrapDialog y
				tenemos dos "#id_input_nombre" y $("#id_input_nombre")
				devuelve el primero que encuentra !!!!!!
		 * $("div.bootstrap-dialog-message > #id_input_nombre") selector
		   jquery que selecciona "#id_input_nombre" que está dentro de
		   un "div" con clase "bootstrap-dialog-message".
		   //URL: https://api.jquery.com/child-selector/
		*/
		/* Copiamos contenido del textarea del BootstrapDialog al textarea del div hidden,
		   por si queremos conservar el mismo dato para otras peticiones
		 */
		/*
		//$("#id_div_msg_add_user_grillo > #id_input_nombre").val(
		//	$("div.bootstrap-dialog-message > #id_input_nombre").val()
		//);
		$(" #id_input_nombre").val(
			$("#id_m_input_nombre").val()
		);
		*/
		
		//......................................................................................
		//$.post. URL: https://api.jquery.com/jquery.post/
		//......................................................................................
		//var o_waitDialog = dycec_js.waitDialog("Esperando respuesta del servidor Web...");
		var o_waitDialog = dycec_js.waitDialog("Añadiendo usuarios a GRILLO que no existen en eDOMUS...");
		o_waitDialog.setSize(BootstrapDialog.SIZE_WIDE);
		//
		plan_especial.s_id_tab = "id_tab_comunicaciones"; //tab a mostrar al recargar la página
		/* Comentado, tenemos que enviar datos JSON. //URL: https://api.jquery.com/jquery.post/
		//$.post( "comunicaciones.add_user_grillo.action", v_data)
		$.post( url [, data ] [, success_function ] [, dataType ] ) 
		*/
		//$.post( "comunicaciones.add_user_grillo.action", v_data)
		$.post( "comunicaciones.add_user_grillo.action", {jsonUserGrillo: JSON.stringify(v_data)}, null, "json") //datos JSON.
		.done(function( data, textStatus, jqXHR ) {
			//console.log("$.post('comunicaciones.add_user_grillo.action').done. data_JSON: \n" + JSON.stringify(data));
			var s_message;
			//var s_error = "No se ha podido añadir este nuevo usuario en GRILLO.";
			var s_error = "No se ha podido añadir este nuevo usuario a GRILLO.";
			if ( (data && data.resultPeticion) ) {
				var o_result = data.resultPeticion;
				if (o_result.error > 0) {
					// Error al crear plan
					s_message = "ERROR."
						+ "\n" + s_error
						+ "\nMOTIVO: " + o_result.descripcion; 
					dycec_js.alert("Añadir usuarios a GRILLO que no existen en eDOMUS.", s_message, BootstrapDialog.TYPE_DANGER);
				} else {
					// Ok, se ha activado/desactivado la lista ---------------------------------------------------
					s_message = "Ok."
						+ "\nUsuario añadido a GRILLO con éxito."
						+ "\n" + o_result.descripcion;
					/* Comentado, se ha añadido un nuevo usuario a GRILLO, no tenemos que recargar la página web
					dycec_js.alert("Añadir usuarios a GRILLO que no existen en eDOMUS.", s_message, BootstrapDialog.TYPE_INFO, plan_especial.callback_load_plan);
					*/
					dycec_js.alert("Añadir usuarios a GRILLO que no existen en eDOMUS.", s_message, BootstrapDialog.TYPE_INFO);
				}
			} else {
				s_message = s_error
					+ "\nMOTIVO: Se ha producido un error inesperado."
					+ "\n"
					+ "\nDatos recibidos: " + JSON.stringify(jqXHR); 
				dycec_js.alert("Borrar", s_message, BootstrapDialog.TYPE_DANGER);
			} //if ( (data && data.resultPeticion) ) {
		}) //.done(function( data, textStatus, jqXHR ) {
		.fail(function( jqXHR, textStatus, errorThrown ) {
			// Error
			dycec_js.ajax_post_fail(jqXHR, textStatus, errorThrown);
		}) //.fail(function( jqXHR, textStatus, errorThrown ) {
		.always(function( jqXHR, textStatus, errorThrown ) {
			// Fin. Proceso completado (se ejecuta después de ".done"/".fail"
			o_waitDialog.close();
			
			/*//FALTA. Falta hacer esto como en Masivar_TV ó mejor, en java !!!!!
			// En todas la peticiones AJAX comprobamos si la session ha caducado
			checkIfSessionTimeout(jqXHR);
			*/
		}); //$.post( "inventario.parametros.add.action", {
		//......................................................................................
	},
	//comunicaciones_add_user_grillo_1: function() {
	
	
	zzz: null // último método/propiedad
}; //var plan_especial = {