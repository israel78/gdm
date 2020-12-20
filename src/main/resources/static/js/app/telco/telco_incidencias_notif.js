/*
 * "telco_incidencias_notif.js", fichero.js de apoyo al jsp "telco_incidencias_notif.jsp"
 * 
 * LINT. Online javascript code check.
 * URL: http://www.javascriptlint.com/online_lint.php
 */


//------------------------------------------------------------------------------------------
// Esto se ejecuta una vez se cargue completamente la página HTML que incluye este ".js"
$(function () {
	// inicializamos esta librería. Esto se debe hacer desde la página.jsp que incluye este.js
	//telco_incidencias_notif.init_lib();
}); //$(function () {
//------------------------------------------------------------------------------------------


//******************************************************************************************
//vars *************************************************************************************
//******************************************************************************************



//******************************************************************************************
//telco_incidencias_notif object **************************************************************************
//******************************************************************************************

/**
* objeto "telco_incidencias_notif", con funciones de apoyo al jsp
*/
var telco_incidencias_notif = {
	property_1: "",
	function_1: function() {
		//...
	},

	// ******************************************************************************************
	// properties/vars **************************************************************************
	// ******************************************************************************************
	s_contextPath: "", //telco_incidencias_notif.s_contextPath ="${pageContext.request.contextPath}" en .jsp  

 
	// ******************************************************************************************
	// functions ********************************************************************************
	// ******************************************************************************************
	/* inicializamos esta librería */
	init_lib: function() {
		//...
	}, 
	//init_lib: function() {
	idVista: 0,
	// 1) Inicializamos la dataTable: telco_incidencias_notif.init_datatable($("#id_table_planes"));
	o_html_table: null, //o_html_table = $("#id_table_planes"). objeto "tag table html"
	json_datos  : null, //datos json para el dataTable
	init_datatable: function(o_html_table, json_datos) {
		// 1) Configuramos el dataTable
		this.o_html_table = o_html_table;
		this.json_datos   = json_datos;
		this.datatable_setConfig(o_html_table, json_datos);
		//o_html_table.dataTable().fnSettings().oLanguage.sEmptyTable = "No existe ningún boletín para este plan especial";
		
		// Añadimos evento onShow a este datatable para que al mostrarse se ajusten bien el ancho de las columnas
		//this.init_datatable_add_event_onShow(o_html_table);
	},
	//init_datatable: function(o_html_table) {
	//
	init_datatable_add_event_onShow: function(o_html_table) {
		/* Este datatable se muestra cuando hacemos click en la campana (icono de notificaciones)
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
		$('#id_li_notificaciones').on('shown.bs.dropdown', function () {
			_this.o_datatable.columns.adjust(); //URL: https://datatables.net/reference/api/columns.adjust()
			_this.o_datatable.draw();   //URL: https://datatables.net/reference/api/draw()
		});
		
		/*
		// Evento click sobre el icono de notificaciones
		$("#id_a_notificaciones").click(function() {
			//console.log("#id_a_notificaciones click.");
		});
		*/
	},
	//init_datatable_add_event_onShow: function(o_html_table) {
	
	
	o_datatable: null,
	datatable_setConfig: function(o_html_table, json_datos) {
		var _this = this; //URL: https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
		//$('#id_datatable').DataTable(); //  llamada a dataTables
		//var o_datatable = $('#id_datatable').DataTable({
		this.o_datatable = o_html_table.DataTable({
			//lengthMenu: [10, 25, 50, 75, 100],
			//lengthMenu: [[10, 20, 100, -1], [10, 20, 100, "All"]],
			lengthMenu: [[-1], ["All"]],
			pageLength: -1, //filas por defecto paginadas en la tabla
			responsive: true,
			//dom: "lfrtip", //URL: https://datatables.net/reference/option/dom
			//dom: '<"html5buttons"B>lfrtip', //URL: https://datatables.net/reference/option/dom
			dom: 'ft', //URL: https://datatables.net/reference/option/dom
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
			order: [[6, "asc"], [3, "desc"]], //0..(totalCols-1). ordenamos por la 6ª columna "¿Leído?" ascendente, 3ª columna "Fecha_Notificación" descendente 
	        columns: [
				//Resource Trouble. Diagnóstico/resolución problema técnico
				{title:"", data: "_num_row", defaultContent: ""} //0  //nº de fila. nº de notificación: 1..n
				,{title:"", data: "id_tipo_notificacion", render: this.col_render_TipoNotificacion} //icono tipo_notificacion (campana, reloj, ...)
				,{title: "ID_TroubleTicket", data: "secuencia"/*, render: this.col_render_TroubleTicket*/} //Trouble Ticket. Detalle TroubleTicket
                											  //render: $.fn.dataTable.render.number( ',', '.', 2, '$' )
				,{title: "Fecha_Notificación", data: "f_notificacion"}
				,{title: "Descripción", data: "txt_notificacion"}
				,{title: "Leído_por", data: "id_visto"} //5
				,{title: "¿Leído?", data: "id_visto", render: this.col_render_IdVisto} //6 //icono leído/no_leído. //Centrar cono: style="text-align: center;" 
				/* Create an edit button in the last column. //URL: https://datatables.net/reference/option/columns.defaultContent
				,{data: null, defaultContent: "<button>Edit</button>"}
				*/
	        ],
			// Damos formato a algunas filas en función de sus datos ==========================
	        /*
	        createdRow: function( row, data, dataIndex ) {
				//URL: https://datatables.net/reference/option/createdRow
	        	_this.datatable_createdRow(row, data, dataIndex);
			},
			*/
			// Fin. Damos formato a algunas filas en función de sus datos =====================
			// Damos formato a algunas columnas en función de sus datos ***********************
			/* Establecemos un background-color de la columna, color de fondo de toda la columna 
			columnDefs: [ 
			    {	targets: 0, //col_index=0
					//searchable: false
					createdCell: function (td, cellData, rowData, row, col) {
						//URL: https://datatables.net/reference/option/columns.createdCell
			        	_this.datatable_createdCell(td, cellData, rowData, row, col);
					}
				},
				{	targets: 1, //col_index=1
					//searchable: false
					"class": "gri_column"
				},
			],
			*/
			columnDefs: [ 
			    {
			    	targets: 0, //col_index=0 (data: "_num_row")
					orderable: false,
					searchable: false
				}
			],
			//
			// Datos de la tabla. Comentado, los vamos a pedir por ajax.
			//data: json_datos, //data: <s:property value="jsonDataset" escape="false" />,
	        /*
	        data: [
				{"id_tipo_notificacion":3,"secuencia":"TT1803O3OU0HA5","f_creacion":"2018/04/02 09:08:37","f_notificacion":"2018/04/02 09:08:37","txt_notificacion":"Central de VINUESA","f_visto":null,"id_visto":null,"obs_visto":null,"estado":0,"cod_provincia":"42","estado_rt":"Diagnosticando","categoria":"Central","f_apertura_rt":"2018/03/24 03:50:50"},
				{"id_tipo_notificacion":3,"secuencia":"TT1803VBSN3ENA","f_creacion":"2018/04/02 09:08:37","f_notificacion":"2018/04/02 09:08:37","txt_notificacion":"Central de VINUESA","f_visto":null,"id_visto":null,"obs_visto":null,"estado":0,"cod_provincia":"42","estado_rt":"Diagnosticando","categoria":"Central","f_apertura_rt":"2018/03/24 01:00:03"},
				{"id_tipo_notificacion":1,"secuencia":"TT1803LXA9ABRC","f_creacion":"2018/03/27 17:00:08","f_notificacion":"2018/03/27 17:00:08","txt_notificacion":"Ticket más de 15 minutos en estado Creado. EOC Energía agt_0001_VAS_INFRA_ENERGY_EOC_BuildingCommunicationFailure Equipo  TERMINAL_PLANTA_SUPERVISION_EOC SO\\RETORTILLO.TPE  Severidad: 0.09 SAF: NO  Autonomía: A2* Descripción: RTC: Fallo de comunicaciones (27/03/2018 16:40)","f_visto":null,"id_visto":null,"obs_visto":null,"estado":0,"cod_provincia":"42","estado_rt":"Creado","categoria":"Supervisión Energía","f_apertura_rt":"2018/03/27 16:40:48"},
				{"id_tipo_notificacion":2,"secuencia":"TT1803LXA9ABRC","f_creacion":"2018/03/27 16:55:09","f_notificacion":"2018/03/27 16:55:09","txt_notificacion":"Ticket sin IGRI asociado Creado. EOC Energía agt_0001_VAS_INFRA_ENERGY_EOC_BuildingCommunicationFailure Equipo  TERMINAL_PLANTA_SUPERVISION_EOC SO\\RETORTILLO.TPE  Severidad: 0.09 SAF: NO  Autonomía: A2* Descripción: RTC: Fallo de comunicaciones (27/03/2018 16:40)","f_visto":null,"id_visto":null,"obs_visto":null,"estado":0,"cod_provincia":"42","estado_rt":"Creado","categoria":"Supervisión Energía","f_apertura_rt":"2018/03/27 16:40:48"},
				{"id_tipo_notificacion":1,"secuencia":"TT1802VBHDGY6Y","f_creacion":"2018/03/16 13:57:25","f_notificacion":"2018/03/16 13:57:25","txt_notificacion":"Ticket más de 15 minutos en estado Creado. EOC Energía agt_0001_VAS_INFRA_ENERGY_EOC_BuildingCommunicationFailure Equipo  TERMINAL_PLANTA_SUPERVISION_EOC SG\\MXPNGR..TPE  Severidad: 0.09 SAF: NO  Autonomía: A2* Descripción: RTC: Fallo de comunicaciones (24/02/2018 02:26)","f_visto":"2018/03/27 14:22:24","id_visto":null,"obs_visto":null,"estado":0,"cod_provincia":"40","estado_rt":"Creado","categoria":"Central","f_apertura_rt":"2018/02/24 02:20:33"},
				{"id_tipo_notificacion":2,"secuencia":"TT1802VBHDGY6Y","f_creacion":"2018/03/16 13:57:04","f_notificacion":"2018/03/16 13:57:04","txt_notificacion":"Ticket sin IGRI asociado Creado. EOC Energía agt_0001_VAS_INFRA_ENERGY_EOC_BuildingCommunicationFailure Equipo  TERMINAL_PLANTA_SUPERVISION_EOC SG\\MXPNGR..TPE  Severidad: 0.09 SAF: NO  Autonomía: A2* Descripción: RTC: Fallo de comunicaciones (24/02/2018 02:26)","f_visto":"2018/03/27 18:01:53","id_visto":null,"obs_visto":null,"estado":0,"cod_provincia":"40","estado_rt":"Creado","categoria":"Central","f_apertura_rt":"2018/02/24 02:20:33"},
			],
			*/
			/* Solicitamos los datos por ajax. //URL: https://datatables.net/manual/ajax
			ajax: "${pageContext.request.contextPath}/jsp/actuaciones_telco_rt_ajax_data.txt",
			ajax: "${pageContext.request.contextPath}/telco_rt_ajax_data.action",
			ajax: this.s_contextPath + "/telco_rt_ajax_data.action",
			*/
			//ajax: "telco_rt_ajax_data.action",
			ajax_noSeUsa_sePideEn_telco_incidencias_js: {
				type: "POST", 
				url: "telco_incidencias.notificacion.ajax-data.action",
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
		
		/* Comentado, los datos  se refrescan en "this.setJsonData" y se piden por AJAX en "telco_incidencias.js"
		// Refresh por ajax. //URL: https://datatables.net/reference/api/ajax.reload()
		//URL: https://stackoverflow.com/questions/12934144/how-to-reload-refresh-jquery-datatable
		setInterval( function () {
			_this.o_datatable.ajax.reload();
		    //v_datatable.ajax.reload( null, false ); // user paging is not reset on reload
			//v_datatable.ajax.reload( callback, resetPaging );
		    //v_datatable.ajax.reload( callback_ajax_reload, true ); // user paging is not reset on reload
		}, 2*60*1000 ); //refresh cada 2 minutos
		*/
		
		/*
		// Use the callback to update an external elements. 
		// Esto solo se hace la 1ª vez que se carga la tabla con .DataTable(... ajax: ...):
		o_datatable.ajax.reload( function ( json ) {
			//$('#myInput').val( json.lastInput );
		    alert("Refresh AJAX");
		} );
		//*/
		
		// Configuración dataTable que se sale de lo común
		this.datatable_setConfig_avanzada();
	},
	//datatable_setConfig: function(o_html_table) {
	//
	datatable_setConfig_avanzada: function() {
		var _this = this; //URL: https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
		//=============================================================================
		// Mostramos el nº de fila en la primera columna (0..n-1) (data: "_num_row")
		//=============================================================================
		//URL: https://stackoverflow.com/questions/6871198/add-row-number-column-to-jquery-datatables 
		//      https://datatables.net/examples/api/counter_columns.html
		this.o_datatable.on( 'order.dt search.dt', function () {
			_this.o_datatable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
				cell.innerHTML = i + 1;
			} );
		} ).draw();

		
		//===============================================================================
		// Click event en una celda del dataTable. //URL: https://datatables.net/extensions/fixedcolumns/examples/integration/api
		//===============================================================================
		//$(this.o_datatable.table().container()).on( 'click', 'td', function(event) {
		this.o_html_table.on( 'click', 'td', function(event) {
			/*
			//URL: https://stackoverflow.com/questions/32598279/how-to-get-name-of-datatable-column
			//URL: https://datatables.net/reference/api/column().header()
			//URL: https://datatables.net/reference/type/cell-selector
			var cell = _this.o_datatable.cell(this); //celda clickeada
			var row = _this.o_datatable.row(this); //fila clickeada
			var columns = _this.o_datatable.settings().init().columns; //propiedad columns configurada en $(#id_table).DataTable(...)
			var i_column = cell.index().column; //index de la columna clickeada
			console.log("Cell data: " + cell.data());  //dato de la celda clickeada
			console.log("Row  data: " + row.data()); //datos de la fila clickeada //{id_tipo_notificacion: 3, secuencia: "TT1803VBSN3ENA", f_creacion: "2018/04/02 09:08:37", ... }
			console.log("Index col: " + cell.index()); //index fila/columna clickeada //Object { row: 0, column: 5, columnVisible: 5 }
		    //OJoooo, lo de abajo no va bien si reordenamos las columnas
		    console.log("Ojoooo, esto va mal si reordenamos columnas ----------------------"); 			
		    console.log("Column name: " + columns[i_column].name); //nombre de la columna, en este caso siempre "undefined" ya que no hemos establecido esta propiedad			
		    console.log("Column title: " + columns[i_column].title); //título de la columna, lo que se ve en el header de la tabla			
		    console.log("Column data-property_name: " + columns[i_column].data); //en este caso es el literal "secuencia" {title: "ID_TroubleTicket", data: "secuencia"}, no el valor del dato			
		    //OJoooo, esto sí funciona si reordenamos las columnas. Forma 1.
		    console.log("Ojoooo, esto sí funciona si reordenamos columnas ----------------------"); 			
			//console.log(_this.o_datatable.colReorder.order()); //array con el nuevo index de las columnas movidas. //URL: https://datatables.net/reference/api/colReorder.order()
			var i_column = cell.index().column; //index de la columna clickeada
		    var column = _this.o_datatable.column(i_column);
			var title = column.header();
			console.log("Column title: : " + $(title).html()); //otra forma de obtener el title. //URL: https://datatables.net/reference/api/column().header()
			console.log("Column data-property_name: " + column.dataSrc());
		    //OJoooo, esto sí funciona si reordenamos las columnas. Forma 2.
		    console.log("Ojoooo, esto sí funciona si reordenamos columnas ----------------------"); 			
			//console.log(_this.o_datatable.colReorder.order()); //array con el nuevo index de las columnas movidas. //URL: https://datatables.net/reference/api/colReorder.order()
			var i_column = cell.index().column; //index de la columna clickeada
			var i_index = _this.o_datatable.colReorder.order()[i_column];
			var columns = _this.o_datatable.settings().init().columns; //propiedad columns configurada en $(#id_table).DataTable(...)
			var column = columns[i_index];
			console.log("Index: " + i_index); //index fila/columna clickeada //Object { row: 0, column: 5, columnVisible: 5 }
		    console.log("Column name: " + column.name); //nombre de la columna, en este caso siempre "undefined" ya que no hemos establecido esta propiedad			
		    console.log("Column title: " + column.title); //título de la columna, lo que se ve en el header de la tabla			
		    console.log("Column data-property_name: " + column.data); //en este caso es el literal "secuencia" {title: "ID_TroubleTicket", data: "secuencia"}, no el valor del dato			
			*/
			//URL: https://stackoverflow.com/questions/32598279/how-to-get-name-of-datatable-column
			var cell = _this.o_datatable.cell(this); //celda clickeada 
			var i_column = cell.index().column; //index de la columna clickeada
			var i_index = _this.o_datatable.colReorder.order()[i_column]; //index real en "_this.o_datatable.settings().init().columns"
			var column = _this.o_datatable.settings().init().columns[i_index];
			//if (column.data == "id_visto") { //console.log(column); //{data: "id_visto", mData: "id_visto", sTitle: "¿Leído?", title: "¿Leído?"}
			if (column.title == "¿Leído?") { //console.log(column); //{data: "id_visto", mData: "id_visto", sTitle: "¿Leído?", title: "¿Leído?"}
				//click en column "¿Leído?".
				//var row = _this.o_datatable.row(this); //fila clickeada
				var row = _this.o_datatable.row(this).data(); //datos de la fila clickeada
				//console.log(row); //{id_tipo_notificacion: 3, secuencia: "TT1803VBSN3ENA", f_creacion: "2018/04/02 09:08:37", ... }
				//var s_id = "id_i_leido_" + row.id_tipo_notificacion + "_" + row.secuencia;
				_this.onclick_notificacion_leido(row, cell); //row=datos de la fila clickeada; cell=celda clickeada
			}
			//console.log(_this.o_datatable.data().toArray()); //datos de la tabla !!!
		}); 
		//this.o_html_table.on( 'click', 'td', function(event) {

		
		//===============================================================================
		/* Ajustamos ancho de las columnas del dataTable "Notificaciones" cuando se muestra,
		   ya que está siempre oculto hasta que se hace click en el icono "campana" del
		   menú superior
		 */
		//===============================================================================
		/* Este datatable se muestra cuando hacemos click en la campana (icono de notificaciones)
		 * Al estar oculta, no se ajusta bien el ancho de las columnas, por lo que forzamos a
		   recalcular su ancho una vez se muestra el datatable.
		 * Para ello capturamos el evento "shown.bs.dropdown" de su contenedor de bootstrap "dropdown-toggle"
		   (para este caso, su contenedor es un <li>, no un <div>)   
	    //URL: https://www.w3schools.com/bootstrap/bootstrap_ref_js_dropdown.asp
	    //     https://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_ref_js_dropdown_events
		//URL: https://stackoverflow.com/questions/21857779/process-for-using-show-bs-dropdown-in-bootstrap
		//     https://stackoverflow.com/questions/1225102/jquery-event-to-trigger-action-when-a-div-is-made-visible 
		//     https://getbootstrap.com/docs/3.3/javascript/ 
		*/
		
	    // OnShow en el dropdown menú -------------------------------------------------
		var _this = this; //URL: https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
		//$('#id_li_notificaciones').on('show.bs.dropdown', function () {
		$('#id_li_notificaciones').on('shown.bs.dropdown', function () {
			_this.o_datatable.columns.adjust(); //URL: https://datatables.net/reference/api/columns.adjust()
			_this.o_datatable.draw();   //URL: https://datatables.net/reference/api/draw()
		});

		/*
		// Evento click sobre el icono de notificaciones
		$("#id_a_notificaciones").click(function() {
			//console.log("#id_a_notificaciones click.");
		});
		*/
		/*
		$(".dropdown-toggle").on("click", function () {
	        alert("OnClick"); //ok, click en <a>
	    });
	    */
	},
	//datatable_setConfig_avanzada: function() {
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
		if (data.f_notificacion >= s_fecha_min_update) {
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
		//$(telco_incidencias_notif.o_datatable.column(0).nodes()).addClass("gri_column"); //URL: https://datatables.net/examples/api/highlight.html
		$(telco_incidencias_notif.o_datatable.column(col).nodes()).addClass("gri_column"); //URL: https://datatables.net/examples/api/highlight.html
		*/
	},
	//datatable_createdCell: function (td, cellData, rowData, row, col) {
	//
	col_render_TipoNotificacion: function (data, type, row, meta) {
    	//URL: https://datatables.net/manual/data/renderers#Functions
		// type === 'display'. //URL: https://datatables.net/forums/discussion/12063/mdata-mrender-and-ordering. //URL: https://datatables.net/blog/2012-07-09
		if ( (type != 'display') ) {
			return data;
		}
		if (!data) { //data!=null
			return data;
		}
		
		// Pintamos un icono con el tipo de notificacion: 1..3
		//-------------------------------------------------------------------------------------
		//'row' is the row's data object, and 'data' is this column's data
		//ejemplo: row[0]: el valor de la celda con col_index=0 para esta fila
		//         data  : valor de esta celda

		//var s_return = '<i class="fa_notificacion fa fa-clock-o fa-fw text-warning"></i>';
		var s_icon = "fa-bell"; //por defecto, campana
		switch (data) {
			case 1:
				s_icon = "fa-clock-o";
				break;
			case 2:
				s_icon = "fa-bell";
				break;
			case 3:
				s_icon = "fa-building";
				break;
			case 4:
				s_icon = "fa-ban"; //icono de prohibido estacionar
				break;
			default:
				s_icon = "fa-bell"; //por defecto, campana
		}
		var s_return = "<i class='fa_notificacion fa " + s_icon + " fa-fw text-warning'></i>";
			
		return s_return;						
		//-------------------------------------------------------------------------------------
	},
	//col_render_TipoNotificacion: function (data, type, row, meta) {
	//
	col_render_IdVisto: function (data, type, row, meta) {
		if ( (type != 'display') ) {
			return data;
		}
		
		// Pintamos un icono leído/no_leído
		//-------------------------------------------------------------------------------------
		//'row' is the row's data object, and 'data' is this column's data
		//ejemplo: row[0]: el valor de la celda con col_index=0 para esta fila
		//         data  : valor de esta celda

		//var s_return = '<i class="fa_leido fa fa-check-circle-o text-info" id="id_i_leido_1"></i>';
		var s_icon = "fa-circle-o"; //por defecto, no_leído
		if (data) {
			s_icon = "fa-check-circle-o";
		}
		//var s_return = "<i class='fa_leido fa " + s_icon + " text-info'></i>";
		// id que no cambia con las recargas de datos
		var s_id = "id_i_leido_" + row.id_tipo_notificacion + "_" + row.secuencia;
		var s_return = "<a title='Haga click aquí para [marcar/desmarcar] el estado de la notificación [leída/NO leída]'" +
			" href='#' onclick='return false;'" + //tratamos el click en "datatable_setConfig_avanzada", column index = 6
			"><i class='fa_leido fa " + s_icon + " text-info'" +
				" id='" + s_id + "'" +
			"></i>" +
		"</a>";

		return s_return;						
	},
	//col_render_IdVisto: function (data, type, row, meta) {
	// Damos formato a algunas columnas en función de sus datos. End. **************************
	// 
	ajax_dataSrc: function(json) {
        // Make your callback here.
        /*
		//alert("ajax Done!");
        console.log("ajax Done!");	                
        console.log(json);
        //*/	                
        return json.data; //"data" es el objeto json para la tabla //URL: https://datatables.net/manual/ajax
        //return json.staff; //"staff" es el objeto json para la tabla //URL: https://datatables.net/manual/ajax
	},
	//ajax_dataSrc: function(json) {
	//
	ajax_error: function(xhr, error, thrown) {
        // Make your callback here.
        /*
        //alert("telco_incidencias_notif.ajax_error(): AJAX ERROR!!!");	                
        console.log("telco_incidencias_notif.ajax_error(): AJAX ERROR!!!");	                
        console.log(xhr);	                
        console.log(error);	                
        console.log(thrown);
        */
        console.error("telco_incidencias_notif.ajax_error(): AJAX ERROR!!!");	                
        console.error("ERROR: " + error);
        console.error("SyntaxError.message: " + thrown.message);
	},
	//ajax_error: function(xhr, error, thrown) {
	
	// Establece los nuevos datos JSON a mostrar en la tabla
	setJsonData: function(jsonData) {
		/* dataTable v1.9 legacy
		o_html_table.dataTable().fnClearTable(false); //true: redraw the table
		o_html_table.dataTable().fnAddData(aa_datos);
		o_html_table.dataTable().fnAdjustColumnSizing();
		*/
		this.o_datatable.clear(); //URL: https://datatables.net/reference/api/clear()
		this.o_datatable.rows.add(jsonData); //URL: https://datatables.net/reference/api/rows.add()
		this.o_datatable.columns.adjust(); //URL: https://datatables.net/reference/api/columns.adjust()
		this.o_datatable.draw();   //URL: https://datatables.net/reference/api/draw()
		
		// Mostramos el total de notificaciones no leídas
		this.updateTotalNotificacionesNoLeidas(jsonData);
	},
	//
	// Muestra en el icono de la campana del menú superior el total de notificaciones no leídas
	updateTotalNotificacionesNoLeidas: function(jsonData) {
		//URL: http://www.forosdelweb.com/f13/recorrer-array-json-javascript-1066977/
		//     http://www.forosdelweb.com/f13/sacar-valores-array-formato-json-javascript-1066515/
		//     https://stackoverflow.com/questions/684672/how-do-i-loop-through-or-enumerate-a-javascript-object
		var i_total_no_leidas = 0;
		for (var i=0, len=jsonData.length; (i < len); i++) {
			var notificacion = jsonData[i];
			if (!notificacion.id_visto) { //si no tiene "id_visto"(=usu_que_marco_leida)...
			//if (!notificacion.f_visto) { //si no tiene "f_visto"(=fecha en la que usu_que_marco_leida)...
				i_total_no_leidas++;
			}
		}
		
		$("#id_span_total_notificaciones").text(i_total_no_leidas);
	},
	
	//onclick_notificacion_leido: function(s_id_i, s_id_tipo_notificacion, s_secuencia) {
	onclick_notificacion_leido: function(row, cell) { //row=datos de la fila clickeada; cell=celda clickeada
		//console.log(row); //{estado: 1, f_creacion: "2018/06/07 ...", f_notificar: "2018/06/07 ...", f_visto: null, id: 6605068, id_destino: "CT100004", id_key: "NGRS _5_180...", id_notificacion: "POBLACIONES", id_visto: null, ....}
		var _this = this;
		var s_secuencia = row.secuencia;
		var s_id_visto_old = row.id_visto; //usu que marcó la notificación como leída
		// ... cambiamos el estado de notificación leida/no_leida --> matricula_usu/(vacío ó "")
		var s_id_visto_new = null;
		if (!s_id_visto_old) {
			// ... ahora la marcamos como leída --> la ponemos leída por este usuario
			//<div id="div1"><a>texto</a></div> --> $("#div1").html()="<a>texto</a>" ; $("#div1").text()="texto". //URL: https://stackoverflow.com/questions/1910794/what-is-the-difference-between-jquery-text-and-html
			s_id_visto_new = $("#id_var_user_matricula").text();
		}
		
		// Preguntamos si queremos marcar/desmarcar ¿Leído?
		var  s_msg = "¿ Quiere marcar la notificación [" + s_secuencia +  "] como NO leída ?"
		if (s_id_visto_new) {
			var s_msg = "¿ Quiere marcar la notificación [" + s_secuencia +  "] como leída ?"
		}
		//ui.alert("Notificaciones", s_msg);
		BootstrapDialog.confirm({
			title: "Notificaciones",
			message: s_msg,
			type: BootstrapDialog.TYPE_WARNING, //Default value is BootstrapDialog.TYPE_PRIMARY
			//closable: true, //Default value is false
			//draggable: true, //Default value is false
			btnCancelLabel: "Cancelar", //Default value is 'Cancel',
			btnOKLabel: "Aceptar", //Default value is 'OK',
			//btnOKClass: "btn-warning", //CSS class para botón "Aceptar". If you didn't specify it, dialog type will be used,
			callback: function(result) {
				// result will be true if button was click, while it will be false if users close the dialog directly.
				if (result) {
					// Enviamos al servidor
					_this.onclick_notificacion_leido_1(_this.o_datatable, row, cell, s_id_visto_new);
				} else {
					// Cancelar: No hacemos nada. "BootstrapDialog.confirm" ya cierra este diálogo.
				}
			}
		});	//BootstrapDialog.confirm({	
		
	}, 
	//onclick_notificacion_leido: function(row, cell) { 
	//
	//onclick_notificacion_leido_1: function(s_id_i, s_id_tipo_notificacion, s_secuencia, s_id_visto) {
	onclick_notificacion_leido_1: function(o_datatable, row, cell, s_id_visto) {
		// Datos JSON a enviar por POST. Un único objeto "com.bd.modelo.TelcoNotificacion". 
		
		// Datos a enviar por POST
		var s_secuencia = row.secuencia; 
		var s_id_tipo_notificacion = row.id_tipo_notificacion; 
		var v_data = {
			//URL: https://www.formget.com/jquery-get-value-of-input/
			secuencia: s_secuencia,
			id_tipo_notificacion: s_id_tipo_notificacion, 
			id_visto: s_id_visto //si s_id_visto!="" --> marcamos como leída; s_id_visto=="" --> marcamos como NO leída
		};
		
		//......................................................................................
		//$.post. URL: https://api.jquery.com/jquery.post/
		//......................................................................................
		var o_waitDialog = ui.waitDialog("Esperando a que se modifique el estado de la notificación [" + s_secuencia + "]...");
		o_waitDialog.setSize(BootstrapDialog.SIZE_WIDE);
		//
		/* Comentado, tenemos que enviar datos JSON. //URL: https://api.jquery.com/jquery.post/
		//$.post( "notificacion.marcar.leido.action", v_data)
		$.post( url [, data ] [, success_function ] [, dataType ] ) 
		*/
		var s_action = "telco_incidencias.notificacion.marcar.leido.action";
		//$.post( "notificacion.marcar.leido.action", v_data)
		$.post( s_action, {jsonAJAX: JSON.stringify(v_data)}, null, "json") //datos JSON.
		.done(function( data, textStatus, jqXHR ) {
			//console.log("onchange_estado_1(). $.post('notificacion.marcar.leido.action').done. data_JSON: \n" + JSON.stringify(data));
			var s_message;
			var s_error = "No se ha podido modificar el estado de la  notificación [" + s_secuencia + "].";
			if ( (data && data.resultPeticion) ) {
				var o_result = data.resultPeticion;
				if (o_result.error > 0) {
					// Error al crear evento
					s_message = "ERROR."
						+ "\n" + s_error
						+ "\nMOTIVO: " + o_result.descripcion; 
					ui.alert("Modificar estado de la notificación", s_message, BootstrapDialog.TYPE_DANGER);
				} else {
					// Ok, se ha modificado el estado notificación ---------------------------------------------------
					/*
					s_message = "Ok."
						+ "\nSe ha modificado el estado de la notificación.";
						//+ "\n" + o_result.descripcion;
					ui.alert("Modificar estado de la notificación.", s_message, BootstrapDialog.TYPE_INFO, evento.callback_load_evento);
					*/
					// Marcamos/desmarcamos ¿Leído? y actualizamos columna "Leído_por"
					// Cambiamos el valor de la celda "¿Leído?"(=cell) y "Leído_por"(=cell.column-1)
					//this.o_datatable.cell(row, col).data("_nuevo-texto_").draw();
					cell.data(s_id_visto).draw(); //col "¿Leído?"
					o_datatable.cell(cell.index().row, (cell.index().column - 1)).data(s_id_visto).draw(); //col "Leído_por"
					//$("#id_...").removeClass("myClass noClass").addClass("yourClass");
					//$(s_id).removeClass("fa-circle-o").addClass("fa-check-circle-o");
					//
					// Mostramos el total de notificaciones no leídas
					//grillo_notif.updateTotalNotificacionesNoLeidas(grillo_notif.o_datatable.data().toArray());
					var i_total_no_leidas = 0 + $("#id_span_total_notificaciones").text();
					if (s_id_visto) { 
						i_total_no_leidas--; //tenemos una no_leída menos 
					} else  {
						i_total_no_leidas++; //tenemos una no_leída más
					}
					$("#id_span_total_notificaciones").text(i_total_no_leidas);
				}
			} else {
				s_message = "No se ha podido modificar el estado de la notificación [" + s_secuencia + "]." +
				"\nMOTIVO: Se ha producido un error inesperado." +
				"\n" +
				"\nDatos recibidos: " + JSON.stringify(jqXHR); 
				ui.alert("Modificar estado de la notificación", s_message, BootstrapDialog.TYPE_DANGER);
			} //if ( (data && data.resultPeticion) ) {
		}) //.done(function( data, textStatus, jqXHR ) {
		.fail(function( jqXHR, textStatus, errorThrown ) {
			// Error
			ui.ajax_post_fail(jqXHR, textStatus, errorThrown);
		}) //.fail(function( jqXHR, textStatus, errorThrown ) {
		.always(function( jqXHR, textStatus, errorThrown ) {
			// Fin. Proceso completado (se ejecuta después de ".done"/".fail"
			o_waitDialog.close();
			
			/*//FALTA. Falta hacer esto como en Masivar_TV ó mejor, en java !!!!!
			// En todas la peticiones AJAX comprobamos si la session ha caducado
			checkIfSessionTimeout(jqXHR);
			*/
		}); //$.post( "notificacion.marcar.leido.action", {
		//......................................................................................
	},
	//onclick_notificacion_leido_1: function(o_datatable, row, cell, s_id_visto) {
	
	
	setVista: function (idVista) {
		this.idVista = idVista;
		if (this.o_datatable != null) {
			this.o_datatable.ajax.reload();
		}
	},
	zzz: null // último método/propiedad
}; //var telco_incidencias_notif = {

