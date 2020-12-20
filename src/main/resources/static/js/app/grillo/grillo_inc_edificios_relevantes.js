/*
 * "grillo_inc_edificios_relevantes.js", fichero.js de apoyo al jsp "grillo_inc_edificios_relevantes.jsp"
 * 
 * LINT. Online javascript code check.
 * URL: http://www.javascriptlint.com/online_lint.php
 * 
 * URL_autoFilter: https://datatables.net/examples/api/multi_filter.html (básico)
 *                 https://github.com/vedmack/yadcf  (parece muy bueno!!!)
 *
 * URL: https://github.com/vedmack/yadcf  (autoFilter dataTable)
 *      https://datatables.net/examples/api/multi_filter.html  (multiFilter dataTable)
 *      https://datatables.net/extensions/fixedcolumns/examples/styling/col_filter.html  (multiFilter dataTable)
 *      https://datatables.net/examples/api/multi_filter_select.html  (multiFilter_select dataTable)
 */


//------------------------------------------------------------------------------------------
// Esto se ejecuta una vez se cargue completamente la página HTML que incluye este ".js"
$(function () {
	// inicializamos esta librería. Esto se debe hacer desde la página.jsp que incluye este.js
	//grillo_inc_edificios_relevantes.init_lib();
}); //$(function () {
//------------------------------------------------------------------------------------------


//******************************************************************************************
//vars *************************************************************************************
//******************************************************************************************



//******************************************************************************************
//grillo_inc_edificios_relevantes object **************************************************************************
//******************************************************************************************

/**
* objeto "grillo_inc_edificios_relevantes", con funciones de apoyo al jsp
*/
var grillo_inc_edificios_relevantes = {
	property_1: "",
	function_1: function() {
		//...
	},

	// ******************************************************************************************
	// properties/vars **************************************************************************
	// ******************************************************************************************
	s_contextPath: "", //grillo_inc_edificios_relevantes.s_contextPath ="${pageContext.request.contextPath}" en .jsp  

 
	// ******************************************************************************************
	// functions ********************************************************************************
	// ******************************************************************************************
	/* inicializamos esta librería */
	init_lib: function() {
		//...
	}, 
	//init_lib: function() {
	idVista: 0,
	// 1) Inicializamos la dataTable: grillo_inc_edificios_relevantes.init_datatable($("#id_table_planes"));
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
	
	// autoFiltro en todas las columnas
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
		o_autoFilter[2].filter_type = "auto_complete"; //unidad_responsable
		o_autoFilter[3].filter_type = "range_number"; //severidad
		o_autoFilter[7].filter_type = "select"; //nom_provincia
		/*
		o_autoFilter[7] = {
			column_number: 7,
			filter_reset_button_text: false, //no mostramos el botón 'x' (borrar autoFilter)
			filter_type: "select",
			select_type: "chosen"
		}
		//*/
		o_autoFilter[12].filter_type = "select"; //repercusion
		o_autoFilter[14].filter_type = "select"; //categoria_edificio
		o_autoFilter[15].filter_type = "select"; //clase
		yadcf.init(o_datatable, o_autoFilter);
		// Establecemos filtro col_0 = "texto_pruebas"
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
			autoWidth: false, //URL: https://stackoverflow.com/questions/39666677/jquery-datatable-set-column-width-and-wrap-text
			scrollY: "70vh", //scroll vertical. //URL: https://datatables.net/examples/basic_init/scroll_y_dynamic.html
			scrollX: true, //scroll horizontal. //URL: https://www.datatables.net/examples/basic_init/scroll_x.html
			colReorder: true, //mover columnas
			deferRender: true, //deferred rendering enabled. Los objetos HTML (TR, TD) se crean cuando se muestran
			//ordering: false, //no permitimos ordenar por ninguna columna
			//orderMulti: false, //no permitimos ordenar por varias columnas, solo por una
			//colFilter. //URL: https://datatables.net/extensions/colreorder/examples/initialisation/col_filter
			order: [[0, "desc"]], //0..(totalCols-1). ordenamos por la 1ª columna "Secuencia" descendente
	        columns: [
	  			//INCs edificios relevantes
				//*
				{title: "Secuencia", data: "secuencia", render: this.col_render_SecuenciaGRI} //0
                									  //render: $.fn.dataTable.render.number( ',', '.', 2, '$' )
				,{title: "F.presentacion", data: "fecha_presentacion"}
				,{title: "Responsable", data: "unidad_responsable"} //render: this.col_render_Pruebas_width_200
				,{title: "Severidad", data: "severidad"}
				,{title: "Estado SAF", data: "estado_saf"}
				,{title: "Orden SAF", data: "orden_saf"} //5
				,{title: "Cod prov.", data: "provincia"}
				,{title: "Provincia", data: "nom_provincia"}
				,{title: "Tipo síntoma", data: "tipo_sintoma", render: $.fn.dataTable.render.ellipsis(20)} //restringimos a 20 caracteres, el texto es muyyyy largo
				,{title: "Síntoma", data: "sintoma", render: $.fn.dataTable.render.ellipsis(20)} //restringimos a 20 caracteres, el texto es muyyyy largo
				,{title: "Estado act.", data: "estado_actuacion"} //10
				,{title: "Sec. raíz", data: "sec_raiz", render: this.col_render_SecuenciaGRI}
				,{title: "T.Especial", data: "repercusion"}
				,{title: "Elemento", data: "elemento"}
				,{title: "Cat.Edif.", data: "categoria_edificio"}
				,{title: "Clase Edif.", data: "clase"} //15
				,{title: "GAOM", data: "codactuacion", render: this.col_render_ActuacionGAOM}
				,{title: "Temperatura", data: "temperatura"}
				,{title: "Observaciones", data: "observaciones", render: $.fn.dataTable.render.ellipsis(20)} //restringimos a 20 caracteres, el texto es muyyyy largo
				//,{title: "F.modificacion", data: "fecha_modificacion", orderSequence: ["desc"]}
				,{title: "F.modificación", data: "fecha_modificacion"} //19
				//*/
				/* Create an edit button in the last column. //URL: https://datatables.net/reference/option/columns.defaultContent
				,{data: null, defaultContent: "<button>Edit</button>"}
				*/
	        ],
			// Damos formato a algunas filas en función de sus datos ==========================
	        createdRow: function( row, data, dataIndex ) {
				//URL: https://datatables.net/reference/option/createdRow
	        	_this.datatable_createdRow(row, data, dataIndex);
			},
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
			//ajax: "telco_rt_ajax_data.action",
			ajax: {
				type: "POST", 
				url: "grillo.inc_edificios_relevantes.ajax_data.action",
				//data: ...filtrosProv..., //URL: https://datatables.net/reference/option/ajax.data
				data:  function (params) {
					/* //MABarracus
					params.idVista = _this.idVista;
					*/
					//console.log("parametro: " + JSON.stringify(params));
				    return params;
			    },
		        //dataSrc: "data", //"data" es un objeto json //URL: https://datatables.net/manual/ajax
				dataSrc: function ( json ) { //URL: https://stackoverflow.com/questions/15786572/call-a-function-in-success-of-datatable-ajax-call
		            // Make your callback here.
					
					//console.log(json);	// traza
					
					return _this.ajax_dataSrc(json); //URL: https://datatables.net/manual/ajax
		        },
		        error: function (xhr, error, thrown) { //URL: https://stackoverflow.com/questions/35475964/datatables-ajax-call-error-handle
		            // Make your callback here.
		        	_this.ajax_error(xhr, error, thrown);
		        }	            
			},
			//ajax: {
			
			// Initialisation complete callback, when the table has fully loaded. //URL: https://datatables.net/reference/option/initComplete
			initComplete_: function () {
				/* 1) Individual column searching (text inputs. Filter en todas las columnas)
				   URL: https://datatables.net/examples/api/multi_filter.html
				   2) Individual column searching (select inputs. autoFilter en todas las columnas)
				   URL: https://datatables.net/examples/api/multi_filter_select.html
				*/
			    // Setup - add a text input to each footer cell
			    $('#id_datatable thead th').each( function () {
			        var title = $(this).text();
			        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
			    } );
				
				/*
			    var r = $('#id_datatable tfoot tr');
				r.find('th').each(function(){
					$(this).css('padding', 8);
				});
				$('#id_datatable thead').append(r);
				$('#search_0').css('text-align', 'center');
				*/
			},
			//initComplete: function () {
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
		}, 5*60*1000 ); //refresh cada 60 segundos
		
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
		// 1) cambiamos el color del fondo de la fila si se actualizó (fecha_modificacion) hace menos de 60 minutos
		var d_now = new Date();
		var d_min_update = new Date(d_now.getTime() - (2*60*60*1000)); //2 hora menos (hora*min*sg*1000)
		// fecha en formato "yyyy/MM/dd HH:mm:ss"
		//var s_fecha_min_update = dateFormat("yyyy/mm/dd HH:MM:ss"); //lib js "date.format.js"
		var s_fecha_min_update = d_min_update.format("yyyy/mm/dd HH:MM:ss"); //lib js "date.format.js"
		//if ( data[index_col_fecha_modificacion] <= "60 minutos") {
		if (data.fecha_modificacion >= s_fecha_min_update) {
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
		//$(this.o_datatable.column(0).nodes()).addClass("gri_column"); //URL: https://datatables.net/examples/api/highlight.html
		$(this.o_datatable.column(col).nodes()).addClass("gri_column"); //URL: https://datatables.net/examples/api/highlight.html
		*/
	},
	//datatable_createdCell: function (td, cellData, rowData, row, col) {
	//
	col_render_SecuenciaGRI: function (data, type, row, meta) {
    	//URL: https://datatables.net/manual/data/renderers#Functions
		// type === 'display'. //URL: https://datatables.net/forums/discussion/12063/mdata-mrender-and-ordering. //URL: https://datatables.net/blog/2012-07-09
		if ( (type != 'display') ) {
			return data;
		}
		if (!data) { //!data (data==null)
			return data;
		}
		
		// URL para abrir la INC en iGRI. 
		//https://gri.sdr.tesa/iGRI/abrirBoletinINC.do?secuencia=INC-0007272673&origenConsulta=0
		//-------------------------------------------------------------------------------------
		var s_href = "https://gri.sdr.tesa/iGRI/abrirBoletinINC.do?secuencia=" + data;
		//var s_href = "https://gri.sdr.tesa/iGRI/abrirBoletinINC.do?secuencia=" + row.secuencia;
		var s_return =  "<a href='" + s_href + "'" +
			/*
			// ponemos "; return false;" al final del "onclick" para que no se llame al link de "href" !!!!!
			//" onclick='swal(\"Abrir INC en iGRI\", \"...http://url_igri?inc=...\"); return false;'" +
			" onclick='ui.alert(\"Abrir INC en iGRI\", \"...http://url_igri?inc=...\"); return false;'" +
			*/
			" title='Haga click aquí para abrir esta INC en iGRI.'" +
			" target='_blank'>" + data +
		"</a>";
		return s_return;						
	},
	//col_render_SecuenciaGRI: function (data, type, row, meta) {
	col_render_ActuacionGAOM: function (data, type, row, meta) {
    	//URL: https://datatables.net/manual/data/renderers#Functions
		// type === 'display'. //URL: https://datatables.net/forums/discussion/12063/mdata-mrender-and-ordering. //URL: https://datatables.net/blog/2012-07-09
		if ( (type != 'display') ) {
			return data;
		}
		if (!data) { ////!data (data==null)
			return data;
		}
		
		// URL para ver la Actuación en GAOM. 
		//URL_GAOM: http://gaomsdr.cnso:5757/IFDespachoGenericServlet?_operation_id=consultarDetalle&codActuacion=000000115786586
		// URL para ver la actuación resumida en iGRI (no coincide de cod_actuacion_gaom con el id_actuacion_igri !!!). 
		//URL_GRI: https://gri.sdr.tesa/iGRI/verActuacion.do?idActuacion=0003219782&accion=Ver%20Actuacion
		//-------------------------------------------------------------------------------------
		var s_href = "http://gaomsdr.cnso:5757/IFDespachoGenericServlet?_operation_id=consultarDetalle&codActuacion=" + data;
		//var s_href = "http://gaomsdr.cnso:5757/IFDespachoGenericServlet?_operation_id=consultarDetalle&codActuacion=" + row.codactuacion;
		var s_return =  "<a href='" + s_href + "'" +
			" title='Haga click aquí para abrir esta Actuación en GAOM.'" +
			" target='_blank'>" + data +
		"</a>";
		return s_return;						
	},
	//col_render_ActuacionGAOM: function (data, type, row, meta) {
	//
	col_render_Pruebas_width_200: function (data, type, row, meta) {
    	//URL: https://stackoverflow.com/questions/39666677/jquery-datatable-set-column-width-and-wrap-text
    	//URL: https://jsfiddle.net/Vimalan/2koex0bt/6/
		// type === 'display'. //URL: https://datatables.net/forums/discussion/12063/mdata-mrender-and-ordering. //URL: https://datatables.net/blog/2012-07-09
		if ( (type != 'display') ) {
			return data;
		}
		/*
		if (row.secuencia=="INC-0014022053") {
			console.log(meta);
		}
		*/
		//URL: https://stackoverflow.com/questions/39666677/jquery-datatable-set-column-width-and-wrap-text
    	//URL: https://jsfiddle.net/Vimalan/2koex0bt/6/
		return "<div style='width: 200px'>_" + data + "</div>";
		//return "<span style='width: 200px'>_" + data + "</span>"; 
		//URL: https://stackoverflow.com/questions/183532/what-is-the-difference-between-html-tags-div-and-span
		//     https://www.w3schools.com/html/html_blocks.asp
	},
	//col_render_Pruebas_width_200: function (data, type, row, meta) {
	// Damos formato a algunas columnas en función de sus datos. End. **************************
	// 
	ajax_dataSrc: function(json) {
        // Make your callback here.
        /*
		//alert("ajax Done!");
        console.log("ajax Done!");	                
        console.log(json);
        //*/
		
		// Actualizamos div con la jpra de actualización
		this.ultimaActualizacion (json.data.horaActualizacion);
		
        return json.data.lista; //"data" es el objeto json para la tabla //URL: https://datatables.net/manual/ajax
        //return json.staff; //"staff" es el objeto json para la tabla //URL: https://datatables.net/manual/ajax
	},
	//ajax_dataSrc: function(json) {
	//
	ajax_error: function(xhr, error, thrown) {
        // Make your callback here.
        /*
        //alert("grillo_inc_edificios_relevantes.ajax_error(): AJAX ERROR!!!");	                
        console.log("grillo_inc_edificios_relevantes.ajax_error(): AJAX ERROR!!!");	                
        console.log(xhr);	                
        console.log(error);	                
        console.log(thrown);
        */
        console.error("grillo_inc_edificios_relevantes.ajax_error(): AJAX ERROR!!!");	                
        console.error("ERROR: " + error);
        console.error("SyntaxError.message: " + thrown.message);
	},
	//ajax_error: function(xhr, error, thrown) {
	
	/* 1) Individual column searching (text inputs)
	   URL: https://datatables.net/examples/api/multi_filter.html
	   2) Individual column searching (select inputs)
	   URL: https://datatables.net/examples/api/multi_filter_select.html
	*/
	
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
}; //var grillo_inc_edificios_relevantes = {

