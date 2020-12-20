/*
 * "telco-incidencias.js", fichero.js de apoyo al jsp "telco-incidencias.jsp"
 * 
 * LINT. Online javascript code check.
 * URL: http://www.javascriptlint.com/online_lint.php
 */


//------------------------------------------------------------------------------------------
// Esto se ejecuta una vez se cargue completamente la página HTML que incluye este ".js"
$(function () {
	// inicializamos esta librería. Esto se debe hacer desde la página.jsp que incluye este.js
	//telco_incidencias.init_lib();
}); //$(function () {
//------------------------------------------------------------------------------------------


//******************************************************************************************
//vars *************************************************************************************
//******************************************************************************************



//******************************************************************************************
//telco_incidencias object **************************************************************************
//******************************************************************************************

/**
* objeto "telco_incidencias", con funciones de apoyo al jsp
*/
var telco_udo = {
	property_1: "",
	function_1: function() {
		//...
	},

	// ******************************************************************************************
	// properties/vars **************************************************************************
	// ******************************************************************************************
	s_contextPath: "", //telco_incidencias.s_contextPath ="${pageContext.request.contextPath}" en .jsp  

 
	// ******************************************************************************************
	// functions ********************************************************************************
	// ******************************************************************************************
	/* inicializamos esta librería */
	init_lib: function() {
		//...
	}, 
	//init_lib: function() {
	idVista: 0,
	// 1) Inicializamos la dataTable: telco_incidencias.init_datatable($("#id_table_planes"));
	o_html_table: null, //o_html_table = $("#id_table_planes"). objeto "tag table html"
	json_datos  : null, //datos json para el dataTable
	init_datatable: function(o_html_table, json_datos) {
		// 1) Configuramos el dataTable
		this.o_html_table = o_html_table;
		this.json_datos   = json_datos;
		this.datatable_setConfig(o_html_table, json_datos);
		//o_html_table.dataTable().fnSettings().oLanguage.sEmptyTable = "No existe ningún boletín para este plan especial";
	},
	o_datatable: null,
	datatable_setConfig: function(o_html_table, json_datos) {
		var _this = this; //URL: https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
		//$('#id_datatable').DataTable(); //  llamada a dataTables
		//var o_datatable = $('#id_datatable').DataTable({
		this.o_datatable = o_html_table.DataTable({
			//lengthMenu: [10, 25, 50, 75, 100],
			lengthMenu: [[10, 20, 100, -1], [10, 20, 100, "All"]],
			pageLength: 100, //filas por defecto paginadas en la tabla
			responsive: true,
			//dom: "lfrtip", //URL: https://datatables.net/reference/option/dom
			//dom: '<"html5buttons"B>lfrtip', //URL: https://datatables.net/reference/option/dom
			dom: '<"html5buttons"B>frtlip', //URL: https://datatables.net/reference/option/dom
			buttons: [ //https://datatables.net/reference/button/
				{extend: 'colvis', text: "Ocultar Col."}, //URL: https://datatables.net/extensions/responsive/examples/column-control/column-visibility.html
			    {extend: 'copy', text: "Copiar"}, //URL: https://datatables.net/reference/button/copy
				{extend: 'csv'}, //URL: https://datatables.net/reference/button/csv
				{extend: 'excel'}
			],
			language: { //textos en español, coño, no en guiri
				//url: "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json",
				//url: "<%=request.getContextPath()%>" + "/inspinia_admin-v2.7.1/js/plugins/dataTables/i18n/Spanish.json",
				//url: "${pageContext.request.contextPath}/inspinia_admin-v2.7.1/js/plugins/dataTables/i18n/Spanish.json",
				url: this.s_contextPath + "/inspinia_admin-v2.7.1/js/plugins/dataTables/i18n/Spanish.json",
				decimal: ",",  //coma como separador decimal
				thousands: "." //punto para los millares
			},
			scrollY: "70vh", //scroll vertical. //URL: https://datatables.net/examples/basic_init/scroll_y_dynamic.html
			scrollX: true, //scroll horizontal. //URL: https://www.datatables.net/examples/basic_init/scroll_x.html
			colReorder: true, //mover columnas
			deferRender: true, //deferred rendering enabled. Los objetos HTML (TR, TD) se crean cuando se muestran
			//ordering: false, //no permitimos ordenar por ninguna columna
			//orderMulti: false, //no permitimos ordenar por varias columnas, solo por una
			//colFilter. //URL: https://datatables.net/extensions/colreorder/examples/initialisation/col_filter
			order: [[4, "desc"]], //0..(totalCols-1). ordenamos por la 5ª columna "F.apertura" descendente
	        columns: [
				{title: "TELCO_TICKET", data: "telcoTicket"}
				,{title: "TELCO_F_ALTA_TICKET", data: "telcoFechaAltaTicket"} 
				,{title: "TELCO_ELEMENTO_AFECTADO", data: "telcoElementoAfectado"}
				,{title: "TELCO_SINTOMA", data: "telcoSintoma"}
				,{title: "TELCO_ESTADO", data: "telcoEstado"}
				,{title: "TELCO_ESTADOSP", data: "telcoEstadoSP"}
				,{title: "TELCO_F_REGISTRO", data: "telcoFechaRegistro"}
				,{title: "IGRI_DELEGACION_AUTOMATICA", data: "igriDelegacionAutomatica"}
				,{title: "SECUENCIA_GRI", data: "secuenciaGri"}
				,{title: "IGRI_SEVERIDAD", data: "igriSeveridad"}
				,{title: "IGRI_UNIDAD_RESPONSABLE", data: "igriUnidadResponsable"}
				,{title: "IGRI_F_CREACION", data: "igriFechaCreacion"}
				,{title: "IGRI_INFO_CREACION", data: "igriInfoCreacion"}
				,{title: "UDO_ID_TICKET", data: "udoIdTicket"}
				,{title: "UDO_TICKET", data: "udoTicket"}
				,{title: "UDO_F_CREACION_TICKET", data: "udoFechaCreacionTicket"}
				,{title: "UDO_INFO_CREACION", data: "udoInfoCreacion"}
				,{title: "UDO_ULTIMA_ACCION", data: "udoUltimaAccion"}
				,{title: "UNIDAD_FUNCIONAL", data: "unidadFuncional"}
	        ],
			// Damos formato a algunas filas en función de sus datos ==========================
	        createdRow: function( row, data, dataIndex ) {
				//URL: https://datatables.net/reference/option/createdRow
	        	_this.datatable_createdRow(row, data, dataIndex);
			},
			ajax: {
				type: "POST", 
				url: "telco.udo.ajax-data.action",
				//data: ...vistasProv..., //URL: https://datatables.net/reference/option/ajax.data
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

		// autoFilter. //URL: https://github.com/vedmack/yadcf
		this.init_autoFilter(this.o_datatable); 
		
		// Refresh por ajax. //URL: https://datatables.net/reference/api/ajax.reload()
		//URL: https://stackoverflow.com/questions/12934144/how-to-reload-refresh-jquery-datatable
		setInterval( function () {
			_this.o_datatable.ajax.reload();
		    //v_datatable.ajax.reload( null, false ); // user paging is not reset on reload
			//v_datatable.ajax.reload( callback, resetPaging );
		    //v_datatable.ajax.reload( callback_ajax_reload, true ); // user paging is not reset on reload
		}, 1*60*1000 ); //refresh cada 2 minutos
	},
	//datatable_setConfig: function(o_html_table) {
	//
	//
	// Damos formato a algunas filas en función de sus datos ================================
    datatable_createdRow: function( row, data, dataIndex ) {
		//URL: https://datatables.net/reference/option/createdRow
		/*
    	if (dataIndex < 2) { //2 primeras filas
			console.log(row, data, dataIndex);
			$(row).addClass( "row_updated" );
		}
		//*/
		// 1) cambiamos el color del fondo de la fila si se actualizó hace menos de 60 minutos
		var d_now = new Date();
		var d_min_update = new Date(d_now.getTime() - (60*60*1000)); //60 minutos menos (min*sg*1000)
		// fecha en formato "yyyy/MM/dd HH:mm:ss"
		//var s_fecha_min_update = dateFormat("yyyy/mm/dd HH:MM:ss"); //lib js "date.format.js"
		var s_fecha_min_update = d_min_update.format("yyyy/mm/dd HH:MM:ss"); //lib js "date.format.js"
		//if ( data[index_col_F_update] <= "60 minutos") {
		if (data.f_update_rt >= s_fecha_min_update) {
			$(row).addClass( "row_updated" );
		}
	},
	//datatable_createdRow: function( row, data, dataIndex ) {
	// End. Damos formato a algunas filas en función de sus datos =============================
	//
	// Damos formato a algunas columnas en función de sus datos *******************************
	datatable_createdCell: function (td, cellData, rowData, row, col) {
		//URL: https://datatables.net/reference/option/columns.createdCell
		/*
		if (row < 2) { //2 primeras filas
			console.log(td, cellData, rowData, row, col);
		}
		*/
		/*
		// Cambiamos el color de la celda "ID TroubleTicket" si...
		if ( cellData == "TT1711AHPXO5WJ" ) {
			$(td).css('color', 'red')
		}
		*/
		/*
		//$(telco_incidencias.o_datatable.column(0).nodes()).addClass("gri_column"); //URL: https://datatables.net/examples/api/highlight.html
		$(telco_incidencias.o_datatable.column(col).nodes()).addClass("gri_column"); //URL: https://datatables.net/examples/api/highlight.html
		*/
	},
	ajax_dataSrc: function(json) {
        /*
        console.log("ajax Done!");	                
        console.log(json);
        //*/
		
		// Actualizamos div con la jpra de actualización
		this.ultimaActualizacion (json.data.horaActualizacion);
		
		// 1) datos para el datatable con las notificaciones.
        //console.log(json.notificaciones);
		//telco_udo_notif.setJsonData(json.notificaciones);
		
		// 2) Datos para este datatable
        //console.log(json.data);
        return json.data.lista; //"data" es el objeto json para la tabla //URL: https://datatables.net/manual/ajax
        //return json.staff; //"staff" es el objeto json para la tabla //URL: https://datatables.net/manual/ajax
	},
	//ajax_dataSrc: function(json) {
	//
	ajax_error: function(xhr, error, thrown) {
        // Make your callback here.
        /*
        //alert("telco_incidencias.ajax_error(): AJAX ERROR!!!");	                
        console.log("telco_incidencias.ajax_error(): AJAX ERROR!!!");	                
        console.log(xhr);	                
        console.log(error);	                
        console.log(thrown);
        */
        console.error("telco_udo.ajax_error(): AJAX ERROR!!!");	                
        console.error("ERROR: " + error);
        console.error("SyntaxError.message: " + thrown.message);
	},
	//ajax_error: function(xhr, error, thrown) {
	
	setVista: function (idVista) {
		this.idVista = idVista;
		if (this.o_datatable != null) {
			this.o_datatable.ajax.reload();
		}
	},
	ultimaActualizacion: function (horaActualizacion){
		$('#idActualización').text("ULTIMA ACTUALIZACIÓN: " + horaActualizacion);
	},
	actualizarTabla: function (){
		if (this.o_datatable != null) {
			this.o_datatable.ajax.reload();
		}
	},
	zzz: null // último método/propiedad
}; //var telco_incidencias = {

