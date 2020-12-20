/*
 * "grillo.js", fichero.js de apoyo al jsp "grillo.jsp"
 * 
 * LINT. Online javascript code check.
 * URL: http://www.javascriptlint.com/online_lint.php
 */


//------------------------------------------------------------------------------------------
// Esto se ejecuta una vez se cargue completamente la página HTML que incluye este ".js"
$(function () {
	// inicializamos esta librería. Esto se debe hacer desde la página.jsp que incluye este.js
	//grillo.init_lib();
}); //$(function () {
//------------------------------------------------------------------------------------------


//******************************************************************************************
//vars *************************************************************************************
//******************************************************************************************



//******************************************************************************************
//grillo object **************************************************************************
//******************************************************************************************

/**
* objeto "grillo", con funciones de apoyo al jsp
*/
var grillo = {
	property_1: "",
	function_1: function() {
		//...
	},
	
	// ******************************************************************************************
	// properties/vars **************************************************************************
	// ******************************************************************************************
	s_contextPath: "", //grillo.s_contextPath ="${pageContext.request.contextPath}" en .jsp  
	//s_color_background_grillo_old: "#E6EAF2", //color de fondo por defecto del antiguo grillo. (indica que no debemos cambiar el color de fondo de la celda)  
	s_color_background_grillo_old: "#e6eaf2", //color de fondo por defecto del antiguo grillo. (indica que no debemos cambiar el color de fondo de la celda)  
 
	// ******************************************************************************************
	// functions ********************************************************************************
	// ******************************************************************************************
	/* inicializamos esta librería */
	init_lib: function() {
		//...
	}, 
	//init_lib: function() {
	idVista: 0,
	// 1) Inicializamos la dataTable: grillo.init_datatable($("#id_table_planes"));
	o_html_table: null, //o_html_table = $("#id_table_planes"). objeto "tag table html"
	json_datos  : null, //datos json para el dataTable
	init_datatable: function(o_html_table, json_datos) {
		// 1) Configuramos el dataTable
		this.o_html_table = o_html_table;
		this.json_datos   = json_datos;
		this.datatable_setConfig(o_html_table, json_datos);
		//o_html_table.dataTable().fnSettings().oLanguage.sEmptyTable = "No existe ningún boletín para este plan especial";
	},
	//init_datatable: function(o_html_table) {

	// autoVista en todas las columnas
	init_autoFilter: function(o_datatable) {
		// autoFilter. //URL: https://github.com/vedmack/yadcf
		/*
		yadcf.init(this.o_datatable, [{
			column_number: 0,
			filter_type: "text" //text, date, auto_complete, select, range_number, range_number_slider, ... 
	    }, {
	        column_number: 3,
	        filter_type: "range_number",
			exclude: true
	    }, {
	        column_number: 4,
	        filter_type: "auto_complete"
	    }]);
	    */
		return;
		
		// autoFilter "text" en todas las columnas
		var o_autoFilter = []; 
		var i_index = 0;
		o_datatable.columns().every(function () {
			o_autoFilter[i_index] = {
				column_number: i_index,
				filter_reset_button_text: false, //no mostramos el botón 'x' (borrar autoFilter)
				filter_type: "text" //text, date, auto_complete, select, range_number, range_number_slider, ... 
			};
			i_index++;
		});
		o_autoFilter[3].filter_type = "range_number"; //severidad_tt
		o_autoFilter[6].filter_type = "range_number"; //prioridad_rt
		o_autoFilter[7].filter_type = "select"; //estado_rt
		//Inventario Jorge Babero ------
		o_autoFilter[10].filter_type = "auto_complete"; //categoria
		o_autoFilter[11].filter_type = "select"; //plano_de_red
		o_autoFilter[16].filter_type = "select"; //provincia
		o_autoFilter[17].filter_type = "select"; //comunidad_autonoma
		//
		o_autoFilter[18].filter_type = "auto_complete"; //unidad_funcional
		//iGRI-Datos ------
		yadcf.init(o_datatable, o_autoFilter); 
		// Establecemos vista col_0 = "texto_pruebas"
		//yadcf.exFilterColumn(o_datatable, [[0, "texto_pruebas"]]);
	},
	//init_autoFilter: function(o_datatable) {
	
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
			//     ORDER BY bol.IND_1 DESC, bol.AUX6 DESC, bol.F_PRESENTACION DESC
			columns: [
				//Resource Trouble. Diagnóstico/resolución problema técnico
				// columna tuneada con checkbox
				{	title: "Seg.", 
					data: "seguimiento",
					render: this.col_seguimiento.bind(this)
				} 
				,{title: "Secuencia", data: "secuencia", render: this.col_render_SecuenciaGRI.bind(this)} //0 //color: ind_secuencia //ind_1: 00..07, tipo de ind_secuencia
				,{title: "Sev.", data: "aux6", render: this.col_render_Severidad.bind(this)} //Severidad (Inc) / Nivel de Atencion (Aci) //color: ind_aci
				,{title: "Provincia", data: "provincia"} 
				,{title: "F. Presentación", data: "f_presentacion"} 
				,{title: "Responsable", data: "responsable"}
				,{title: "Afectado", data: "aux2"} //5 //¿mismo campo que "elm_planta"?
				,{title: "Aux1", data: "aux1"} //=líneas_afectadas //,{title: "Lín.Afec.", data: "lineas_afectadas"}
				,{title: "INC Raíz", data: "inc_raiz", render: this.col_render_IncRaiz.bind(this)} //color: ind_raiz //URL: https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
				,{title: "Aux_3", data: "aux3"}
				//
				,{title: "Estado Act.", data: "estado_actuacion"}
				,{title: "Est. ACI", data: "est_aci"} //10
				,{title: "Cod_Prov", data: "cod_provincia"}
				,{title: "NdA", data: "nda"}
				,{title: "F. Reparación", data: "f_reparacion"} //13 
				/* Create an edit button in the last column. //URL: https://datatables.net/reference/option/columns.defaultContent
				,{data: null, defaultContent: "<button>Edit</button>"}
				*/
	        ],
	        // al devolver respuesta miramos si es el checkbox tiene seguimiento (ver tabién la columna de "¿Seguimiento?")
	        rowCallback: function (row, data) {
	        	
	        	$('input.seguimiento-activo', row).prop('checked', data.seguimiento == 1);
	        	
//	        	if (data.seguimiento == 1) {
//	        		$('input.seguimiento-activo').prop('checked', 'checked');
//	        		//document.getElementsByClassName('seguimiento-activo').checked = true;
//	        	}
	        	
			},
			// Damos formato a algunas filas en función de sus datos ==========================
	        createdRow: function( row, data, dataIndex ) {
				//URL: https://datatables.net/reference/option/createdRow
	        	_this.datatable_createdRow(row, data, dataIndex);
	        	
	        	
//	        	if (data.seguimiento == 1) {
//	        		$('input.seguimiento-activo').prop('checked', 'checked');
//	        	}
	        	
	        	
	        	
			},
			//serverSide: true,
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
			//
			// Datos de la tabla. Comentado, los vamos a pedir por ajax.
			//data: json_datos, //data: <s:property value="jsonDataset" escape="false" />,
			/* Solicitamos los datos por ajax. //URL: https://datatables.net/manual/ajax
			ajax: "${pageContext.request.contextPath}/jsp/actuaciones_telco_rt_ajax_data.txt",
			ajax: "${pageContext.request.contextPath}/telco_rt_ajax_data.action",
			ajax: this.s_contextPath + "/telco_rt_ajax_data.action",
			*/
			//ajax: "grillo.inc_mcn.ajax-data.action",
			ajax: {
				type: "POST", 
				url: "grillo.inc_mcn.ajax-data.action",
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
		}, 1*60*1000 ); //refresh cada 1 minuto
		
		/*
		// Use the callback to update an external elements. 
		// Esto solo se hace la 1ª vez que se carga la tabla con .DataTable(... ajax: ...):
		o_datatable.ajax.reload( function ( json ) {
			//$('#myInput').val( json.lastInput );
		    alert("Refresh AJAX");
		} );
		//*/
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
		if (data.f_presentacion >= s_fecha_min_update) {
			$(row).addClass( "row_updated" );
		}
		
		/*
		// Ejemplo de como poner el fondo de la celda de la 1ª columna en rojo si la INC="INC-0014394579"
		if ( data.secuencia_de_igri == "INC-0014394579" ) {
			//              0 --> 1a_columna; 1 --> 2a_columna, ...
			$("td", row).eq(0).css("background", "red"); //URL: https://datatables.net/release-datatables/examples/advanced_init/row_callback.html
		}
		*/
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
		/* Esto modifica toda una columna !!!!
		//$(this.o_datatable.column(0).nodes()).addClass("gri_column"); //URL: https://datatables.net/examples/api/highlight.html
		$(this.o_datatable.column(col).nodes()).addClass("gri_column"); //URL: https://datatables.net/examples/api/highlight.html
		*/
	},
	//datatable_createdCell: function (td, cellData, rowData, row, col) {
	//
	col_render_SecuenciaGRI: function (data, type, row, meta) {
		//columns.render. //URL: https://datatables.net/reference/option/columns.render
		if ( (type != 'display') ) {
			return data;
		}
		if (!data) { //data!=null
			return data;
		}
		data = this.col_render_SecuenciaGRI_color(data, type, row, meta); //bind --> //URL: https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback //URL: http://krasimirtsonev.com/blog/article/JavaScript-bind-function-setting-a-scope
		
		// URL para abrir la INC en iGRI. 
		//https://gri.sdr.tesa/iGRI/abrirBoletinINC.do?secuencia=INC-0007272673&origenConsulta=0
		//-------------------------------------------------------------------------------------
		//'row' is the row's data object, and 'data' is this column's data
		//ejemplo: row[0]: el valor de la celda con col_index=0 para esta fila
		//         data  : valor de esta celda
		var s_href = "https://gri.sdr.tesa/iGRI/abrirBoletinINC.do?secuencia=" + data;
		//var s_href = "https://gri.sdr.tesa/iGRI/abrirBoletinINC.do?secuencia=" + row.igri_secuencia;
		//return "<a href=\"" + s_href + "\" target=\"_blank\">" + data + "</a>";
		//return "<a href='" + s_href + "' target='_blank'>" + data + "</a>";
		var s_return =  "<a href='" + s_href + "'" +
			" title='Haga click aquí para abrir esta INC en iGRI.'" +
			" target='_blank'>" + data +
		"</a>";
		return s_return;					
	},
	//col_render_SecuenciaGRI: function (data, type, row, meta) {
	//
	// Color de fondo de col. secuenciaGRI en función del valor de data.ind_secuencia. En ind_1 (00..07) tenemos el tipo de ind_secuencia.
	col_render_SecuenciaGRI_color: function (data, type, row, meta) {
		//columns.render. //URL: https://datatables.net/reference/option/columns.render
		if ( (type != 'display') || (!data) ) {
			return data;
		}
		
		// Color de fondo de la secuenciaGRI en función del valor de data.ind_secuencia. En ind_1 (00..07) tenemos el tipo de ind_secuencia.
		/*
		//$(this.o_datatable.column(0).nodes()).addClass("gri_column"); //URL: https://datatables.net/examples/api/highlight.html
		//$(this.o_datatable.column(meta.col).nodes()).addClass("gri_column"); //URL: https://datatables.net/examples/api/highlight.html
		$(this.o_datatable.column(meta.col).nodes()).css("background", red); //URL: https://stackoverflow.com/questions/41053046/datatables-change-cell-color-based-on-values
		*/
		var s_color = row.ind_secuencia;
		if (s_color) {
			if ( s_color != this.s_color_background_grillo_old ) {
				/* Comentado, esto nos cambia el color de todaaaaaa la columna, no de una única celda
				// cell selector --> o_datatable.cell(meta.row, meta.col) --> //URL: https://datatables.net/reference/type/cell-selector
				$(this.o_datatable.column(meta.col).nodes()).css("background", s_color); //URL: https://stackoverflow.com/questions/41053046/datatables-change-cell-color-based-on-values
				*/
				//
				// cell selector --> o_datatable.cell(meta.row, meta.col) --> //URL: https://datatables.net/reference/type/cell-selector
				//$(this.o_datatable.cell(meta.row, meta.col).nodes()).css("background", s_color);
				this.o_datatable.cell(meta.row, meta.col).nodes().to$().css("background", s_color);
			}
		}
		return data;
	},
	//col_render_SecuenciaGRI_color: function (data, type, row, meta) {
	//
	// Color de fondo de col. severidad en función del valor de data.ind_aci: indicador_ACI.
	col_render_Severidad: function (data, type, row, meta) {
		//columns.render. //URL: https://datatables.net/reference/option/columns.render
		if ( (type != 'display') || (!data) ) {
			return data;
		}
		
		// Color de fondo de la severidad en función del valor de data.ind_aci: indicador_ACI.
		var s_color = row.ind_aci;
		if (s_color) {
			if ( s_color != this.s_color_background_grillo_old ) {
				// cell selector --> o_datatable.cell(meta.row, meta.col) --> //URL: https://datatables.net/reference/type/cell-selector
				//$(this.o_datatable.cell(meta.row, meta.col).nodes()).css("background", s_color);
				this.o_datatable.cell(meta.row, meta.col).nodes().to$().css("background", s_color);
			}
		}
		return data;
	},
	//col_render_Severidad: function (data, type, row, meta) {
	//
	// Color de fondo de col. inc_raiz en función del valor de data.ind_raiz.
	col_render_IncRaiz: function (data, type, row, meta) {
		//columns.render. //URL: https://datatables.net/reference/option/columns.render
		if ( (type != 'display') || (!data) ) {
			return data;
		}
		
		var s_color = row.ind_raiz;
		if (s_color) {
			if ( s_color != this.s_color_background_grillo_old ) {
				// cell selector --> o_datatable.cell(meta.row, meta.col) --> //URL: https://datatables.net/reference/type/cell-selector
				//$(this.o_datatable.cell(meta.row, meta.col).nodes()).css("background", s_color);
				this.o_datatable.cell(meta.row, meta.col).nodes().to$().css("background", s_color);
			}
		}
		return data;
	},
	col_seguimiento: function (data, type, row, meta) {
		
		if (type === 'display'){
			return '<input type="checkbox" class="seguimiento-activo">';
		}
		return data;
			
	},
	//col_render_IncRaiz: function (data, type, row, meta) {
	//
	// Damos formato a algunas columnas en función de sus datos. End. **************************
	// 
	ajax_dataSrc: function(json) {
        /*
        console.log("ajax Done!");	                
        console.log(json);
        //*/
		
		// Actualizamos div con la jpra de actualización
		this.ultimaActualizacion (json.data.horaActualizacion);
		
		// 1) datos para el datatable con las notificaciones.
        //console.log(json.notificaciones);
		grillo_notif.setJsonData(json.notificaciones);
		
		// notificaciones archivadas
		//console.log(json.notificacionesArchivadas);
		grilloNotifArchivadas.setJsonData(json.notificacionesArchivadas);
		
		// 2) datos para el datatable de seguimiento
 		//console.log(json.seguimiento);
		grillo_seguimiento.setJsonData(json.seguimiento);
		
		// 3) Datos para este datatable
        //console.log(json.data);
        return json.data.lista; //"data" es el objeto json para la tabla //URL: https://datatables.net/manual/ajax
        //return json.staff; //"staff" es el objeto json para la tabla //URL: https://datatables.net/manual/ajax
	},
	//ajax_dataSrc: function(json) {
	//
	ajax_error: function(xhr, error, thrown) {
        // Make your callback here.
        /*
        //alert("grillo.ajax_error(): AJAX ERROR!!!");	                
        console.log("grillo.ajax_error(): AJAX ERROR!!!");	                
        console.log(xhr);	                
        console.log(error);	                
        console.log(thrown);
        */
        console.error("grillo.ajax_error(): AJAX ERROR!!!");	                
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
		$('#idActualizacion').text("ULTIMA ACTUALIZACIÓN: " + horaActualizacion);
	},
	actualizarTabla: function (){
		if (this.o_datatable != null) {
			this.o_datatable.ajax.reload();
		}
	},
	zzz: null // último método/propiedad
}; //var grillo = {

