/*
 * "grillo_notif.js", fichero.js de apoyo al jsp "grillo_notif.jsp"
 * 
 * LINT. Online javascript code check.
 * URL: http://www.javascriptlint.com/online_lint.php
 */


//------------------------------------------------------------------------------------------
// Esto se ejecuta una vez se cargue completamente la página HTML que incluye este ".js"
$(function () {
	// inicializamos esta librería. Esto se debe hacer desde la página.jsp que incluye este.js
	//grillo_notif.init_lib();
}); //$(function () {
//------------------------------------------------------------------------------------------


//******************************************************************************************
//vars *************************************************************************************
//******************************************************************************************



//******************************************************************************************
//grillo_notif object **************************************************************************
//******************************************************************************************

/**
* objeto "grillo_notif", con funciones de apoyo al jsp
*/
var grillo_seguimiento = {
	property_1: "",
	function_1: function() {
		//...
	},

	// ******************************************************************************************
	// properties/vars **************************************************************************
	// ******************************************************************************************
	s_contextPath: "", //grillo_notif.s_contextPath ="${pageContext.request.contextPath}" en .jsp  

 	// ******************************************************************************************
	// functions ********************************************************************************
	// ******************************************************************************************
	/* inicializamos esta librería */
	init_lib: function() {
		//...
	}, 
	//init_lib: function() {
	idVista: 0,
	// 1) Inicializamos la dataTable: grillo_notif.init_datatable($("#id_table_planes"));
	o_html_table: null, //o_html_table = $("#id_table_planes"). objeto "tag table html"
	json_datos  : null, //datos json para el dataTable
	init_datatable: function(o_html_table, json_datos) {
		// 1) Configuramos el dataTable
		this.o_html_table = o_html_table;
		this.json_datos   = json_datos;
		this.datatable_setConfig(o_html_table, json_datos);
	},
	init_datatable_add_event_onShow: function(o_html_table) {
		/* Este datatable se muestra cuando hacemos click en el icono de marca (icono de seguimiento)
		 * Al estar oculta, no se ajusta bien el ancho de las columnas, por lo que forzamos a
		   recalcular su ancho una vez se muestra el datatable.
		 * Para ello capturamos el evento "shown.bs.dropdown" de su contenedor de bootstrap "dropdown-toggle"
		   (para este caso, su contenedor es un <li>, no un <div>)   
		//URL: https://stackoverflow.com/questions/21857779/process-for-using-show-bs-dropdown-in-bootstrap
		//URL: https://stackoverflow.com/questions/1225102/jquery-event-to-trigger-action-when-a-div-is-made-visible 
		//URL: https://getbootstrap.com/docs/3.3/javascript/ 
		*/
		var _this = this; //URL: https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
		//$('#id_li_notificaciones').on('show.bs.dropdown', function () {
		$('#idModalSeguimiento').on('shown.bs.modal', function () {
			_this.o_datatable.columns.adjust(); //URL: https://datatables.net/reference/api/columns.adjust()
			_this.o_datatable.draw();   //URL: https://datatables.net/reference/api/draw()
		});
	},
	o_datatable: null,
	datatable_setConfig: function(o_html_table, json_datos) {
		var _this = this; //URL: https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
		this.o_datatable = o_html_table.DataTable({
			lengthMenu: [[-1], ["All"]],
			pageLength: 1, //filas por defecto paginadas en la tabla
			//paging: true,
			//pagingType: "simple_numbers",
			responsive: true,
			autoWidth: false,
			dom: 'ftp', //URL: https://datatables.net/reference/option/dom
			//dom: '<"html5buttons"B>ftp',
			language: { //textos en español, coño, no en guiri
				url: this.s_contextPath + "/inspinia_admin-v2.7.1/js/plugins/dataTables/i18n/Spanish.json",
				decimal: ",",  //coma como separador decimal
				thousands: "." //punto para los millares
			},
			scrollY: "70vh", //scroll vertical. //URL: https://datatables.net/examples/basic_init/scroll_y_dynamic.html
			scrollX: true, //scroll horizontal. //URL: https://www.datatables.net/examples/basic_init/scroll_x.html
			colReorder: true, //mover columnas
			deferRender: true, //deferred rendering enabled. Los objetos HTML (TR, TD) se crean cuando se muestran
	        columns: [
				//{title: "Nº", data: "_num_row", defaultContent: ""}  //0 //nº de fila. nº de notificación: 1..n
				{title: "Incidencia", data: "incidencia", render: this.col_render_secuencia}
				,{title: "Descripción", data: "descripcionSeguimiento"}
				,{title: "Descripción Cambio", data: "descripcionCambio"}, 
				{
					title: "Leído",
					render: this.col_leido.bind(this)
					
				},
				{
					title: "Quitar",
					render: this.col_no_seguir.bind(this)
				} 
	        ],
//			columnDefs: [ 
//			    {
//			    	targets: 0, //col_index=0 (data: "_num_row")
//					orderable: false,
//					searchable: false
//				}
//			],
			ajax_noSeUsa_sePideEn_grillo_js: {
				type: "POST", 
				url: "grillo.seguimiento.ajax-data.action",
				//data: ...filtrosProv..., //URL: https://datatables.net/reference/option/ajax.data
				data:  function (params) {
					params.idVista = _this.idVista;
					//console.log("parametro: " + JSON.stringify(params));
				    return params;
			    },
		        //dataSrc: "data", //"data" es un objeto json //URL: https://datatables.net/manual/ajax
				dataSrc: function ( json ) { //URL: https://stackoverflow.com/questions/15786572/call-a-function-in-success-of-datatable-ajax-call
		            // Make your callback here.
					return _this.ajax_dataSrc(json); //URL: https://datatables.net/manual/ajax
		        },
		        error: function (xhr, error, thrown) { //URL: https://stackoverflow.com/questions/35475964/datatables-ajax-call-error-handle
		            // Make your callback here.
		        	_this.ajax_error(xhr, error, thrown);
		        }	            
			}
	    }); //var o_datatable = o_html_table.DataTable({
				
		// Configuración dataTable que se sale de lo común
		this.datatable_setConfig_avanzada();
	},
	col_render_secuencia: function (data, type, row, meta){
		
		var incidenciaLink = '<a target="_blank" href="https://gri.sdr.tesa/iGRI/abrirBoletinINC.do?secuencia=' + data + '">' + data + '</a>';
		
		return incidenciaLink;
	},
	col_leido: function (data, type, row, meta) {
		return '<button type="button" onclick="seguimientoLeido(this);"><i class="fa fa-check"></i></button>';// TODO: meter el botón
	}, 
	col_no_seguir: function (data, type, row, meta) {
		return '<button type="button" onclick="noSeguir(this);"><i class="fa fa-times"></i></ button>';
	},
	datatable_setConfig_avanzada: function() {
//		var _this = this; //URL: https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
//		//=============================================================================
//		// Mostramos el nº de fila en la primera columna (0..n-1) (data: "_num_row")
//		//=============================================================================
//		//URL: https://stackoverflow.com/questions/6871198/add-row-number-column-to-jquery-datatables 
//		//      https://datatables.net/examples/api/counter_columns.html
//		this.o_datatable.on( 'order.dt search.dt', function () {
//			_this.o_datatable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
//				cell.innerHTML = i + 1;
//			} );
//		} ).draw();
//		
//	    // OnShow en el dropdown menú -------------------------------------------------
//		var _this = this; //URL: https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
//		$('#idListaSeguimiento').on('shown.bs.dropdown', function () {
//			_this.o_datatable.columns.adjust(); //URL: https://datatables.net/reference/api/columns.adjust()
//			_this.o_datatable.draw();   //URL: https://datatables.net/reference/api/draw()
//		});
	},
	ajax_dataSrc: function(json) {	                
        return json.data; //"data" es el objeto json para la tabla //URL: https://datatables.net/manual/ajax
        //return json.staff; //"staff" es el objeto json para la tabla //URL: https://datatables.net/manual/ajax
	},
	ajax_error: function(xhr, error, thrown) {
        console.error("grillo_seguimiento.ajax_error(): AJAX ERROR!!!");	                
        console.error("ERROR: " + error);
        console.error("SyntaxError.message: " + thrown.message);
	},
	// Establece los nuevos datos JSON a mostrar en la tabla
	setJsonData: function(jsonData) {
		this.o_datatable.clear(); //URL: https://datatables.net/reference/api/clear()
		this.o_datatable.rows.add(jsonData); //URL: https://datatables.net/reference/api/rows.add()
		this.o_datatable.columns.adjust(); //URL: https://datatables.net/reference/api/columns.adjust()
		this.o_datatable.draw();   //URL: https://datatables.net/reference/api/draw()
		
		// Mostramos el total de notificaciones no leídas
		this.updateTotalSeguimiento(jsonData);
	},
	// Muestra en el icono de la marca del menú superior el total en seguimiento
	updateTotalSeguimiento: function(jsonData) {
		var total_seguidas = 0;
		for (var i=0, len=jsonData.length; (i < len); i++) {
				total_seguidas++;
			}
				
		$("#idTotalSeguimiento").text(total_seguidas);
	},
	setVista: function (idVista) {
		this.idVista = idVista;
		if (this.o_datatable != null) {
			this.o_datatable.ajax.reload();
		}
	},
	zzz: null // último método/propiedad
}; 