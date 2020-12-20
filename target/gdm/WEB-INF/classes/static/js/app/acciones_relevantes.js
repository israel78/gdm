
var contador = 0;
var subtipoRSS = ['Todos los subtipos',
	'Servicio banda ancha fija'
	,'Servicio TV'
	,'Servicio Voz Fija'
	,'Servicio IP MFE'
	,'Red NGN'
	,'Red transporte'
	,'Red N2'
	,'Red Fusion'
	,'Red IP'
	,'Red acceso banda ancha'
	,'Red conmutacion'
	,'Red movil']	

var subtipoTI = ['Todos los subtipos'
	,'TI Global'
	,'Plataforma masivas'
	,'Plataforma unitarias'
	,'Telco'
	,'TI Interna']

$( document ).ready(function() {
	
	$('#tipoBuscador').val('');

	/*for (var i = 0; i < subtipoRSS.length; i++) {
		$('#subtipoBuscador').append(new Option(subtipoRSS[i], subtipoRSS[i]))
	}	*/
	setTimeout(function(){ accionesRelevantes.init_datatable($('#tabla_acciones'), null); }, 900);

	$("#pestana2").css("display","none");
	
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":00Z";
	
	//2020-01-01T00:00:00Z
	$('#fechaInicio').attr('data-date',date+'T'+time);
	$('#fechaFin').attr('data-date',date+'T'+time);
	$('#fechaInicioVer').attr('data-date',date+'T'+time);
	$('#fechaFinVer').attr('data-date',date+'T'+time);
	
	

});

/*hoy=new Date();
//Milisegundos de 3 días mas
suma3dias= 3*24*60*60*1000; (días * 24 horas * 60 minutos * 60 segundos * 1000 milésimas de segundo)
//Sumamos a la fecha de hoy en milisegundos, los 3 días más en milisegundos
//Tendremos una nueva variable en milisegundos de la fecha actual + 3 días
fechacontresdiasmas=hoy.getTime()+(3*24*60*60*1000);
//Si la queremos en formato fecha
fechacontresdiasmasformatada= new Date(fechacontresdiasmas);*/


 function getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    //a la fecha final le sumo 6 dias para que  devuelva el domingo de cada semana    
    var suma6dias= 6*24*60*60*1000;
    
    var fechaconseisdiasmas=ISOweekStart.getTime()+(6*24*60*60*1000);
    

    return new Date(fechaconseisdiasmas);
}


function ISO8601_week_no(dt) 
{
   var tdt = new Date(dt.valueOf());
   var dayn = (dt.getDay() + 6) % 7;
   tdt.setDate(tdt.getDate() - dayn + 3);
   var firstThursday = tdt.valueOf();
   tdt.setMonth(0, 1);
   if (tdt.getDay() !== 4) 
     {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
      }
   return 1 + Math.ceil((firstThursday - tdt) / 604800000);
      }

var accionesRelevantes = {
		
s_contextPath:"",
		
		formateoFechaJson: function(fecha){
			var fechaHora = fecha.split(" ");	
			var arrayfecha = fechaHora[0].split("/");
			var hora = fechaHora[1];
			return  arrayfecha[0]+"-"+arrayfecha[1]+"-"+arrayfecha[2]+" "+hora;
		
			
		},
		formateoFechaJsonDatePicker: function(fecha){
			var fechaHora = fecha.split(" ");	
			var arrayfecha = fechaHora[0].split("-");
			var hora = fechaHora[1];
			return  arrayfecha[0]+"-"+arrayfecha[1]+"-"+arrayfecha[2]+" "+hora;
		
			
		},
		formateoFechaJsonDatatables: function(fecha){
			var fechaHora = fecha.split(" ");	
			var arrayfecha = fechaHora[0].split("/");
			var hora = fechaHora[1];
			return  arrayfecha[2]+"-"+arrayfecha[1]+"-"+arrayfecha[0]+" "+hora;
		
			
		},
		cambioSelectorTipo: function(){
			
			for (var i = 0; i < subtipoTI.length; i++) {
				$("#subtipoBuscador option[value='"+subtipoTI[i]+"']").remove();
			}
			for (var i = 0; i < subtipoRSS.length; i++) {
				$("#subtipoBuscador option[value='"+subtipoRSS[i]+"']").remove();
			}
			
			if($('#tipoBuscador').val()=='RS'){				
								
				for (var i = 0; i < subtipoRSS.length; i++) {
					$('#subtipoBuscador').append(new Option(subtipoRSS[i], subtipoRSS[i]))
				}								
			}else if ($('#tipoBuscador').val()==''){				
				
							
			}else{
				for (var i = 0; i < subtipoTI.length; i++) {
					$('#subtipoBuscador').append(new Option(subtipoTI[i], subtipoTI[i]))
				}	
				
			}
			
		},
		cambioSelectorTipo2: function(){
			
			for (var i = 0; i < subtipoTI.length; i++) {
				$("#subtipoBuscador2 option[value='"+subtipoTI[i]+"']").remove();
			}
			
			for (var i = 0; i < subtipoRSS.length; i++) {
				$("#subtipoBuscador2 option[value='"+subtipoRSS[i]+"']").remove();
			}
			
			if($('#tipoBuscador2').val()=='RS'){				
								
				for (var i = 0; i < subtipoRSS.length; i++) {
					$('#subtipoBuscador2').append(new Option(subtipoRSS[i], subtipoRSS[i]))
				}								
			}else{				
				
				for (var i = 0; i < subtipoTI.length; i++) {
					$('#subtipoBuscador2').append(new Option(subtipoTI[i], subtipoTI[i]))
				}				
			}
			
		},
				
		buscarIncidencias: function(path){	
			var tipoBusqueda = $('#tipoBusqueda').val();
			var numSemanaMes =$('#idsemana').val();
			var id =$('#id').val();
			var tipoIncidencia = $('#tipoBuscador').val();
			var annioBusqueda =  $('#annioBusqueda').val();
			var fechainicio = $('#fechaInicio').find("input").val();
			var fechafin = $('#fechaFin').find("input").val();
			
			//Se mete en sesion los datos de los select generales para que al refrescar se mantengan los valores
			sessionStorage.setItem("numSemana", $('#idsemana').val());
			sessionStorage.setItem("tipoBusqueda", $('#tipoBusqueda').val());
			sessionStorage.setItem("annioBusqueda", $('#annioBusqueda').val());
			
			if(tipoBusqueda=="MENSUAL"&&(fechainicio ==''&& fechafin =='')){
				
				BootstrapDialog.confirm({
					title: "Informacion Importante",
					message: "Has seleccionado tipo de busqueda mensual, por favor selecciona tipo semanal",
					type: BootstrapDialog.TYPE_WARNING,
					btnOKLabel: "Aceptar", 
					callback: function(result) {
						if (result) {
							
						} else {
						}
					}
				});	
				
			}else if(fechainicio>fechafin){
				BootstrapDialog.confirm({
					title: "Informacion Importante",
					message: "No se puede buscar con una fecha inicial mayor que la final",
					type: BootstrapDialog.TYPE_WARNING,
					btnOKLabel: "Aceptar", 
					callback: function(result) {
						if (result) {
							
						} else {
						}
					}
				});	
			}else{
				var table = $('#tabla_acciones').DataTable().clear().draw();			
				table.ajax.reload();
				//window.location = path+"/incidencias.buscar.action?tipoBusqueda="+tipoBusqueda+"&numSemanaMes="+numSemanaMes+"&numIncidencia="
				//+numIncidencia+"&tipoIncidencia="+tipoIncidencia+"&annioBusqueda="+annioBusqueda;
			}		
		},
		annadirIncidencias:function(ruta){
			
			$("#botonAnnadir").show();
			$("#botonActualizar").hide();
			$("#botonBorrarRegistro").hide();
			
			$("#id_accion").val("-1");		
			$("#capaId").hide();
			$("#capaIdcomite").hide();
			$("#capaindex").hide();
			$("#capaaniocdm").hide();
			$("#capasemana").hide();
			$("#capafechacdm").hide();
			$("#capaautor").hide();
			$("#capatimestamp").hide();
			$('#idcomite').val("");
			$("#pestana2").css("display","block");
			
			$("#tipoBuscador2").val("RSS");
			$("#botonAnnadir").css("display","visible");
			$("#botonActualizar").css("display","none");
			$("#botonBorrarRegistro").css("display","none");
			
			//AIM se borran los campos por si hubieramos seleccionado algua accion antes
			
			$('#id_accion').val("");
			$('#tipoBuscador2').val("RS");
			
			accionesRelevantes.cambioSelectorTipo2();

			$('#subtipoBuscador2').val(subtipoRSS[0]);
			$('#titulo').val("");			
			$('#fechaInicioVer').find("input").val("");
			$('#fechaFinVer').find("input").val("");	
			$('#impacto').val("NO");
			$('#motivo').val("");
			$('#promotor').val("");
			$('#unidad_ejecutora').val("");
			$('#contacto').val(matricula+"/"+userName);
			cargo!=""?$('#area').val(cargo):$('#area').val("Gerencia");
			$('#codigo').val("");
			$('#descripcion').val("");
			
			
			$("#enlacePestana2").text("Insertar/Añadir nueva accion relevante");
			$("#tituloTabDetalle").text("Insertar/Añadir nueva accion relevante");
			
			$("#pestana1").removeClass("active");
			$("#pestana2").addClass("active");
			
			$("#tab-1").removeClass("active");
			$("#tab-2").addClass("active");
			
			
		},
		
		actualizarInfo: function(numRow,fila){
			
			
			
			//Actualizamos por lo que no es necesario el boton añadir
			$("#botonAnnadir").hide();
			$("#botonActualizar").show();
			$("#botonBorrarRegistro").show();
			$("#capaId").show();
			$("#capaIdcomite").show();
			$("#capaindex").show();
			$("#capaaniocdm").show();
			$("#capasemana").show();
			$("#capafechacdm").show();
			$("#capaautor").show();
			$("#capatimestamp").show();
		
			filaCompleta = fila.split("*");
			
			if(filaCompleta[3].indexOf('-')==-1){
				filaCompleta[3] = accionesRelevantes.formateoFechaJsonDatatables(filaCompleta[3]);
			}
			
			if(filaCompleta[4].indexOf('-')==-1){
				filaCompleta[4] = accionesRelevantes.formateoFechaJsonDatatables(filaCompleta[4]);
			}
			
			$('#id_accion').val(filaCompleta[0]);
			$('#tipoBuscador2').val(filaCompleta[1]);
			$('#titulo').val(filaCompleta[5].replaceAll('</br>','\n'));			
			$('#fechaInicioVer').find("input").val(filaCompleta[3])
			$('#fechaFinVer').find("input").val(filaCompleta[4])	
			$('#impacto').val(filaCompleta[8]);
			$('#motivo').val(filaCompleta[9].replaceAll('</br>','\n'));
			$('#promotor').val(filaCompleta[10]);
			$('#unidad_ejecutora').val(filaCompleta[11]);
			$('#contacto').val(filaCompleta[12]);
			$('#area').val(filaCompleta[13]);
			$('#codigo').val(filaCompleta[6].replaceAll('</br>','\n'));
			$('#descripcion').val(filaCompleta[7].replaceAll('</br>','\n'));
			$('#fechacdm').val(filaCompleta[14].substring(0, filaCompleta[14].indexOf(" ")));
			$('#idcomite').val(filaCompleta[15]);
			$('#index').val(filaCompleta[16]);
			$('#semana').val(filaCompleta[18]);
			$('#anocdm').val(filaCompleta[17]);
			$('#autor').val(filaCompleta[19]);
			$('#titamp').val(filaCompleta[20]);

			
			$('#hiddenNumFila').val(numRow);
			
			
			//AIM se actualiza la informacion de la pestaña y del titulo de la caja
			$("#pestana2").css("display","block");
			$("#enlacePestana2").text("Ver/Actualizar Accion Relevante ["+filaCompleta[0]+"]");
			$("#tituloTabDetalle").text("Ver/Actualizar Accion Relevante ["+filaCompleta[0]+"]");

			
			//Se prepara el selecionable subtipo en funcion del tipo
			accionesRelevantes.cambioSelectorTipo2()
			$('#subtipoBuscador2').val(filaCompleta[2]);
			$("#pestana1").removeClass("active");
			$("#pestana2").addClass("active");
			
			$("#tab-1").removeClass("active");
			$("#tab-2").addClass("active");
			
			
			
		},
		insertarActualizarAccionRelevante : function(){
			var titulo;
			if($('#id_accion').val()==""){
				titulo = "Insertar nueva accion relevante";
				
			}else{
				titulo = "Actualizar informacion de la accion ["+$('#id_accion').val()+"]";
			}
			//AIM no se dejan meter fechas vacias
			if($('#fechaInicioVer').find("input").val()==''||$('#fechaFinVer').find("input").val()==''){
				BootstrapDialog.confirm({
					title: titulo,
					message: "No se puede insertar o actualizar sin fechas de inicio y fin",
					type: BootstrapDialog.TYPE_DANGER,
					btnOKLabel: "Aceptar", 
					callback: function(result) {
						if (result) {
							return null;	
						} else {
						}
					}
				});	
			} else if($('#id_accion').val()==""&&$('#tipoBusqueda').val()=='MENSUAL'){
				BootstrapDialog.confirm({
					title: titulo,
					message: "Si tienes el tipo de busqueda en mes no se puede insertar registro, cambia a semanal",
					type: BootstrapDialog.TYPE_DANGER,
					btnOKLabel: "Aceptar", 
					callback: function(result) {
						if (result) {
							return null;	
						} else {
						}
					}
				});			
			}else if($('#fechaInicioVer').find("input").val()>$('#fechaFinVer').find("input").val()){
					BootstrapDialog.confirm({
						title: "Informacion Importante",
						message: "No se puede guardar el registro con una fecha inicial mayor que la final",
						type: BootstrapDialog.TYPE_WARNING,
						btnOKLabel: "Aceptar", 
						callback: function(result) {
							if (result) {
								
							} else {
							}
						}
					});	
				}else{
				
				BootstrapDialog.confirm({
					title: titulo,
					message: "Confirme que desea grabar los datos",
					type: BootstrapDialog.TYPE_WARNING,
					btnCancelLabel: "Cancelar", 
					btnOKLabel: "Aceptar", 
					callback: function(result) {
						if (result) {
								accionesRelevantes.insertarActualizarAccionRelevante_1();
						} else {
						}
					}
				});	
			}
		},
		volverAlistado:function(path){
			
			$('#tipoBuscador').val($('#tipoBuscador2').val());		
			accionesRelevantes.cambioSelectorTipo();			
			$('#subtipoBuscador').val($('#subtipoBuscador2').val());
			
			
			$("#botonAnnadir").show();
			$("#botonActualizar").show()
			$("#botonBorrarRegistro").show();
			
			$("#pestana2").removeClass("active");
			$("#pestana1").addClass("active");
			
			$("#tab-2").removeClass("active");
			$("#tab-1").addClass("active");
			
			$("#pestana2").css("display","none");
			
			

			
		},
		borrarAccion:function(idloc){
			
			
			BootstrapDialog.confirm({
				title: "Borrado de accion relevante",
				message: "¿Quiere borrar este registro?",
				type: BootstrapDialog.TYPE_DANGER,
				btnOKLabel: "Aceptar", 
				callback: function(result) {
					if (result) {
						accionesRelevantes.borrarAccion_1(idloc);	
					} else {
					}
				}
			});	
			
		},
		borrarAccion_1:function(idloc){
			
			if(idloc == null||idloc == ''){
				idloc = $('#id_accion').val();
			}
			var aRelevantes = {
					id		 			 			     : idloc ,  	
				};	
				//......................................................................................
				//$.post. URL: https://api.jquery.com/jquery.post/
				//......................................................................................
				var o_waitDialog = dycec_js.waitDialog("Esperando grabar la informacion ");
				o_waitDialog.setSize(BootstrapDialog.SIZE_WIDE);
				//
				$.ajax({
					type: "POST", 
					timeout: 5000,
					url: "acciones_relevantes/borrar",
					contentType : 'application/json; charset=utf-8',
					dataType : 'json',
					//data: ...vistasProv..., //URL: https://datatables.net/reference/option/ajax.data
					data:  JSON.stringify(aRelevantes)	   
					//dataSrc: "data", //"data" es un objeto json //URL: https://datatables.net/manual/ajax
				}).done(function( data, textStatus, jqXHR ) {
					
					
						$("#pestana2").removeClass("active");
						$("#pestana1").addClass("active");
						
						$("#tab-2").removeClass("active");
						$("#tab-1").addClass("active");
						
						$("#pestana2").css("display","none");
					
						accionesRelevantes.buscarIncidencias(null);
						
						var s_message = "borrado llevado a cabo correctamente";
						
						dycec_js.alert("Borrado de datos", s_message, BootstrapDialog.TYPE_DANGER);
					 //if ( (data && data.newPlan) ) {
				}) //.done(function( data, textStatus, jqXHR ) {
				.fail(function( jqXHR, textStatus, errorThrown ) {
					// Error
					dycec_js.ajax_post_fail(jqXHR, textStatus, errorThrown);
				}) //.fail(function( jqXHR, textStatus, errorThrown ) {
				.always(function( jqXHR, textStatus, errorThrown ) {
					// Fin. Proceso completado (se ejecuta después de ".done"/".fail"
					o_waitDialog.close();
				});	
		
			
			
		},
		borrarCamposEditables:function(url){
			
			BootstrapDialog.confirm({
				title: "Borrar campos",
				message: "¿Quiere borrar los campos?",
				type: BootstrapDialog.TYPE_WARNING,
				btnCancelLabel: "Cancelar", 
				btnOKLabel: "Aceptar", 
				callback: function(result) {
					if (result) {
						$('#tipo').val("RSS");
						for (var i = 0; i < subtipoRSS.length; i++) {
							$('#subtipoBuscador2').append(new Option(subtipoRSS[i], subtipoRSS[i]))
						}
						$('#subtipoBuscador2').val(subtipoRSS[0]);
						$('#titulo').val("");			
						$('#fechaInicioVer').find("input").val("");
						$('#fechaFinVer').find("input").val("");	
						$('#impacto').val("NO");
						$('#motivo').val("");
						$('#promotor').val("");
						$('#unidad_ejecutora').val("");
						$('#descripcion').val("");
						$('#contacto').val("");
						$('#area').val("");
						$('#codigo').val("");
						
						
					} else {
					}
				}
			});	
		},
		insertarActualizarAccionRelevante_1:function(){
			var idObten;
			if($('#id_accion').val()==''){
				idObten = -1			
			var aRelevantes = {
					
					id		 			 			     : idObten ,  
					tipo		 			 		     : $('#tipoBuscador2').val(), 
					titulo	 		 			 		 : $('#titulo').val(), 
					fecha_inicio	 	  	  	 		 : $('#fechaInicioVer').find("input").val(), 
					fecha_fin  		 			 		 : $('#fechaFinVer').find("input").val(), 
					impacto		    		 			 : $('#impacto').val(),
					motivo	 			 				 : $('#motivo').val(), 
					promotor		 					 : $('#promotor').val(), 
					unidad_ejecutora	 				 : $('#unidad_ejecutora').val(), 
					area 							 	 : $('#area').val() ,
					codigo_BTP_CRQ                       : $('#codigo').val(),
					subtipo 					 		 : $('#subtipoBuscador2').val(),
					descripcion							 : $('#descripcion').val(),
					usuario_contacto					 : $('#contacto').val(),
					semana						 		 : $('#idsemana').val(),
					anno_cdm							 : $('#annioBusqueda').val(),
					id_comite							 : ""

				};	
				//......................................................................................
				//$.post. URL: https://api.jquery.com/jquery.post/
				//......................................................................................
				var o_waitDialog = dycec_js.waitDialog("Esperando grabar la informacion ");
				o_waitDialog.setSize(BootstrapDialog.SIZE_WIDE);
				//
				$.ajax({
					type: "POST", 
					timeout: 50000,
					url: "acciones_relevantes/insertOrUpdate",
					contentType : 'application/json; charset=utf-8',
					dataType : 'json',
					//data: ...vistasProv..., //URL: https://datatables.net/reference/option/ajax.data
					data:  JSON.stringify(aRelevantes)	   
					//dataSrc: "data", //"data" es un objeto json //URL: https://datatables.net/manual/ajax
				}).done(function( data, textStatus, jqXHR ) {

						//Se obtiene el id despues de insertar
						$('#id').val(data);
						
						//Se vuelve a la pestaña 1 y se refresca la tabla
						$("#pestana2").removeClass("active");
						$("#pestana1").addClass("active");
						
						$("#tab-2").removeClass("active");
						$("#tab-1").addClass("active");
						
						$("#pestana2").css("display","none");					
						var table = $('#tabla_acciones').DataTable();			 
						table.ajax.reload();
						accionesRelevantes.volverAlistado();
	
						//$('#tabla_acciones').DataTable().row($('#hiddenNumFila').val()).data(datosFila).draw();
						//$('tr',$('#tabla_acciones').DataTable().row($('#hiddenNumFila').val())).css("background-color", "#eeeeee");
						$('#id_accion').val("");
						var table = $('#tabla_acciones').DataTable();			 
						table.ajax.reload();		
						accionesRelevantes.volverAlistado();
										
						var s_message = "Inserción llevada a cabo correctamente";
						
						dycec_js.alert("Guardar datos", s_message, BootstrapDialog.TYPE_DANGER);
					 //if ( (data && data.newPlan) ) {
				}) //.done(function( data, textStatus, jqXHR ) {
				.fail(function( jqXHR, textStatus, errorThrown ) {
					// Error
					dycec_js.ajax_post_fail(jqXHR, textStatus, errorThrown);
				}) //.fail(function( jqXHR, textStatus, errorThrown ) {
				.always(function( jqXHR, textStatus, errorThrown ) {
					// Fin. Proceso completado (se ejecuta después de ".done"/".fail"
					o_waitDialog.close();
				});	
				
			}else{				
				//AIM fecha semana no se actualiza y al insertar se coje el valor mas alto de incidencias
				var aRelevantes = {
					
					id		 			 			     : $('#id_accion').val() ,  
					tipo		 			 		     : $('#tipoBuscador2').val(), 
					titulo	 		 			 		 : $('#titulo').val(), 
					fecha_inicio	 	  	  	 		 : $('#fechaInicioVer').find("input").val(), 
					fecha_fin  		 			 		 : $('#fechaFinVer').find("input").val(), 
					impacto		    		 			 : $('#impacto').val(),
					motivo	 			 				 : $('#motivo').val(), 
					promotor		 					 : $('#promotor').val(), 
					unidad_ejecutora	 				 : $('#unidad_ejecutora').val(), 
					area 							 	 : $('#area').val() ,
					codigo_BTP_CRQ                       : $('#codigo').val(),
					subtipo 					 		 : $('#subtipoBuscador2').val(),
					usuario_contacto					 : $('#contacto').val(),
					descripcion							 : $('#descripcion').val(),
					fecha_cdm 						     : $('#fechacdm').val(),
					timestamp                            : $('#titamp').val(),
					autor								 : $('#autor').val(),
					semana								 : $('#idsemana').val(),
					anno_cdm							 : $('#annioBusqueda').val(),
					index    							 : $('#index').val(),
					id_comite							 : $('#idcomite').val()

				};	
			
				$.ajax({
					type: "POST", 
					timeout: 50000,
					url: "acciones_relevantes/insertOrUpdate",
					contentType : 'application/json; charset=utf-8',
					dataType : 'json',
					//data: ...vistasProv..., //URL: https://datatables.net/reference/option/ajax.data
					data:  JSON.stringify(aRelevantes)	   
					//dataSrc: "data", //"data" es un objeto json //URL: https://datatables.net/manual/ajax
				}).done(function( data, textStatus, jqXHR ) {

					
					
						//Se obtiene el id despues de insertar
						$('#id').val(data);
						
						//Se vuelve a la pestaña 1 y se refresca la tabla
						$("#pestana2").removeClass("active");
						$("#pestana1").addClass("active");
						
						$("#tab-2").removeClass("active");
						$("#tab-1").addClass("active");
						
						$("#pestana2").css("display","none");					
						var table = $('#tabla_acciones').DataTable();			 
						table.ajax.reload();
						accionesRelevantes.volverAlistado();
	
						//$('#tabla_acciones').DataTable().row($('#hiddenNumFila').val()).data(datosFila).draw();
						//$('tr',$('#tabla_acciones').DataTable().row($('#hiddenNumFila').val())).css("background-color", "#eeeeee");
						$('#id_accion').val("");
						var table = $('#tabla_acciones').DataTable();			 
						table.ajax.reload();		
						accionesRelevantes.volverAlistado();
										
						var s_message = "Actualización llevada a cabo correctamente";
						
						dycec_js.alert("Guardar datos", s_message, BootstrapDialog.TYPE_DANGER);
					 //if ( (data && data.newPlan) ) {
				}) //.done(function( data, textStatus, jqXHR ) {
				.fail(function( jqXHR, textStatus, errorThrown ) {
					// Error
					dycec_js.ajax_post_fail(jqXHR, textStatus, errorThrown);
				}) //.fail(function( jqXHR, textStatus, errorThrown ) {
				.always(function( jqXHR, textStatus, errorThrown ) {
					// Fin. Proceso completado (se ejecuta después de ".done"/".fail"
					//o_waitDialog.close();
				});	
				
				
			}
		},
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
				lengthMenu: [[10, 20, 100, -1], [10, 20, 100, "Todos"]],
				pageLength: 100, //filas por defecto paginadas en la tabla
				responsive: true,
				processing: true,
				searching: true,
				//dom: "lfrtip", //URL: https://datatables.net/reference/option/dom
				//dom: '<"html5buttons"B>lfrtip', //URL: https://datatables.net/reference/option/dom
				dom: '<"html5buttons"B>frtlip', //URL: https://datatables.net/reference/option/dom
				buttons: [ //https://datatables.net/reference/button/

				],
				language: { //textos en español, coño, no en guiri
					//url: "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json",
					//url: "<%=request.getContextPath()%>" + "/inspinia_admin-v2.7.1/js/plugins/dataTables/i18n/Spanish.json",
					//url: "${pageContext.request.contextPath}/inspinia_admin-v2.7.1/js/plugins/dataTables/i18n/Spanish.json",
					url: "/gdm/inspinia_admin-v2.7.1/js/plugins/dataTables/i18n/Spanish.json",
		            processing: '<span class="fa fa-refresh fa-spin fa-3x fa-fw datatable-spinner"></span><div class="loading-text">Loading</div>',

					decimal: ",",  //coma como separador decimal
					thousands: ".", //punto para los millares
					//infoEmpty: "No hay datos disponibles, para buscar aplica un filtro y pulsa en buscar"

				},
				scrollY: "70vh", //scroll vertical. //URL: https://datatables.net/examples/basic_init/scroll_y_dynamic.html
				scrollX: true, //scroll horizontal. //URL: https://www.datatables.net/examples/basic_init/scroll_x.html
				colReorder: true, //mover columnas
				deferRender: true,
				dom: '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',//deferred rendering enabled. Los objetos HTML (TR, TD) se crean cuando se muestran
				//ordering: false, //no permitimos ordenar por ninguna columna
				//orderMulti: false, //no permitimos ordenar por varias columnas, solo por una
				//colFilter. //URL: https://datatables.net/extensions/colreorder/examples/initialisation/col_filter
				//order: [[4, "desc"]], //0..(totalCols-1). ordenamos por la 5ª columna "F.apertura" descendente
				columnDefs: [
					{
						targets: [0,1,2,3,4,5,6],
						createdCell: function (td, cellData, rowData, row, col) {
					        $(td).attr('title', cellData)
					    
						},
						render: function (data, type, row, meta ) {	
	   	                
	                	var datos = "";
	                	if( data!=null && data.length>20){
	                		
	                		datos = data.substring(0,20)+"...";
	                	}else{
	                		if(data != null){
	                			datos = data;
	                		}else{
	                			datos = "";
	                		}
	                	}
	                	
	                	return datos;
	                	}
				
					},
					
					{
						targets: [0,1,2,4,6,7],
						width: "5%",
					},    
					{
	                targets: [3,5],
	                render: function (data, type, row, meta ) {	
	   	                
	                	var datos = "";
	                	if(data.length>30){
	                		datos = data.substring(0,30)+"...";
	                	}else{
	                		datos = data;
	                	}
	                	
	                	return datos;
	                	}
					},
	                {
	            	targets: [7],
	                render: function (data, type, row, meta ) {	
	                	
	                	var filaCompleta =
	                	row["id"]+"*"
	                	+row["tipo"]+"*"
	                	+row["subtipo"]+"*"
	                	+row["fecha_inicio"]+"*"
	                	+row["fecha_fin"]+"*"
	                	+row["titulo"]+"*"
	                	+row["codigo_BTP_CRQ"]+"*"
	                	+row["descripcion"]+"*"
	                	+row["impacto"]+"*"
	                	+row["motivo"]+"*"
	                	+row["promotor"]+"*"
	                	+row["unidad_ejecutora"]+"*"
	                	+row["usuario_contacto"]+"*"
	                	+row["area"]+"*"
	                	+row["fecha_cdm"]+"*"
	                	+row["id_comite"]+"*"
	                	+row["index"]+"*"
	                	+row["anno_cdm"]+"*"
	                	+row["semana"]+"*"
	                	+row["autor"]+"*"
	                	+row["timestamp"]+"*"
	                	var datos = '<button type="button" class="btn btn-success btn-xs dropdown-toggle" onclick="accionesRelevantes.actualizarInfo('+meta.row+',\''+filaCompleta+'\')" >Ver</button>'+
	                	'<button type="button" style="margin-left:5px" class="btn btn-danger btn-xs dropdown-toggle" onclick="accionesRelevantes.borrarAccion('+row["id"]+')" ><i class="fa fa-times-rectangle" aria-hidden="true"></button></i>';     	
	                return datos;
	                }
	            }],				
				columns: [
					{title: "Id comité", data: "id_comite"}						
					,{title: "Tipo", data: "tipo"} 
					,{title: "Subtipo", data: "subtipo" }
					,{title: "Título", data: "titulo"}
					,{title: "Codigo_BTP_CRQ", data: "codigo_BTP_CRQ"}
					,{title: "Descripción", data: "descripcion"}
					,{title: "Impacto", data: "impacto"}
		        ],
		        
				// Damos formato a algunas filas en función de sus datos ==========================
		       /* createdRow: function( row, data, dataIndex ) {
					//URL: https://datatables.net/reference/option/createdRow
		        	_this.datatable_createdRow(row, data, dataIndex);
				},*/		        
				ajax: {
					type: "POST", 
					timeout: 50000,
					url: "acciones_relevantes/buscar",
					contentType : 'application/json; charset=utf-8',
				    dataType : 'json',	
					data:  function (inBusquedaAcciones) {
						inBusquedaAcciones.id = $('#id').val();
						inBusquedaAcciones.tipo = $('#tipoBuscador').val();	
						//AIM si se introducen fechas no se busca por semana
						if(($("#fechaInicio").find("input").val()!=null&&!$("#fechaInicio").find("input").val()=="")||
								($('#fechaFin').find("input").val()!=null&&!$('#fechaFin').find("input").val()=="")){
									
								if($('#fechaInicio').find("input").val()==""){
									var fin = accionesRelevantes.formateoFechaJsonDatePicker($('#fechaFin').find("input").val());
									var inicio = "";
								}else if ($('#fechaFin').find("input").val()=="") {
									var inicio = accionesRelevantes.formateoFechaJsonDatePicker($('#fechaInicio').find("input").val());
									var fin = "";

								}else{
									var fin = accionesRelevantes.formateoFechaJsonDatePicker($('#fechaFin').find("input").val());
									var inicio = accionesRelevantes.formateoFechaJsonDatePicker($('#fechaInicio').find("input").val());
								}	
								inBusquedaAcciones.fecha_inicio = inicio;
								inBusquedaAcciones.fecha_fin = fin;
								inBusquedaAcciones.numSemanaMes = "";
								}else{
									inBusquedaAcciones.fecha_inicio =  "";
									inBusquedaAcciones.fecha_fin = "";
									inBusquedaAcciones.numSemanaMes = $('#idsemana').val();
								}
						
						inBusquedaAcciones.subtipo = $('#subtipoBuscador').val();
						inBusquedaAcciones.annioBusqueda = $('#annioBusqueda').val();
						//console.log("parametro: " + JSON.stringify(params));
					return JSON.stringify(inBusquedaAcciones)
				    },
			        //dataSrc: "data", //"data" es un objeto json //URL: https://datatables.net/manual/ajax
					dataSrc: function ( json ) { //URL: https://stackoverflow.com/questions/15786572/call-a-function-in-success-of-datatable-ajax-call
			            // Make your callback here.
						return json; //URL: https://datatables.net/manual/ajax
			        },
			        error: function (xhr, error, thrown) { //URL: https://stackoverflow.com/questions/35475964/datatables-ajax-call-error-handle
			            // Make your callback here.
			        	//_this.ajax_error(xhr, error, thrown);
			        	
			        }	            
				}
		    }); //var o_datatable = o_html_table.DataTable({

			// autoFilter. //URL: https://github.com/vedmack/yadcf
			//this.init_autoFilter(this.o_datatable); 
			
			// Refresh por ajax. //URL: https://datatables.net/reference/api/ajax.reload()
			//URL: https://stackoverflow.com/questions/12934144/how-to-reload-refresh-jquery-datatable
			/*setInterval( function () {
				_this.o_datatable.ajax.reload();
			    //v_datatable.ajax.reload( null, false ); // user paging is not reset on reload
				//v_datatable.ajax.reload( callback, resetPaging );
			    //v_datatable.ajax.reload( callback_ajax_reload, true ); // user paging is not reset on reload
			}, 1*60*1000 );*/ //refresh cada 2 minutos
		},
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
			//this.ultimaActualizacion (json.data.horaActualizacion);
			
			// 1) datos para el datatable con las notificaciones.
	        //console.log(json.notificaciones);
			//telco_udo_notif.setJsonData(json.notificaciones);
			
			// 2) Datos para este datatable
	        //console.log(json.data);
	        return json.data; //"data" es el objeto json para la tabla //URL: https://datatables.net/manual/ajax
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
	       // console.error("incidencias.ajax_error(): AJAX ERROR!!!");	                
	       // console.error("ERROR: " + error);
	       // console.error("SyntaxError.message: " + thrown.message);
		},
}