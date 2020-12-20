
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
	
	$('#tipoBuscador').val("RS");

	for (var i = 0; i < subtipoRSS.length; i++) {
		$('#subtipoBuscador').append(new Option(subtipoRSS[i], subtipoRSS[i]))
	}	
	setTimeout(function(){ comentarios.init_datatable($('#tabla_comentarios'), null); }, 900);
	setTimeout(function(){ comentarios.init_datatable($('#tabla_comentarios_incidencias'), null); }, 900);
	
	var myVar = '<div class="col-lg-9"><h3 class="col-lg-2" >Comentarios</h3>'+
						'<div class="col-lg-2 form-group">'+
							'<button type="button" class="btn btn-w-m btn-success btn-sm"'+
								'style="margin-left: 0px !important; min-width: 90px !important"'+
								'onclick="comentarios.buscarIncidencias(\'null\')">Buscar</button>'+
						'</div>'+
						'<div class="col-lg-4 form-group">'+
							'<button type="button" class="btn btn-w-m btn-success btn-sm"'+
								'style="margin-left: 0px !important; min-width: 90px !important"'+
								'onclick="comentarios.annadirIncidencias(\'null\')">Añadir'+
								 '</button>'+
						'</div>'+
				'</div>';
	
	var myVar2 = '<div class="col-lg-9"><h3 class="col-lg-2" >Incidencias</h3>'+
					'<div class="col-lg-2 form-group">'+
						'<button type="button" class="btn btn-w-m btn-success btn-sm"'+
								'style="margin-left: 0px !important; min-width: 90px !important"'+
								'onclick="comentarios.buscarComentariosIncidencias(\'null\')">Buscar</button>'+
					'</div>'+
					'<div class="col-lg-4 form-group">'+
						'<button type="button" class="btn btn-w-m btn-success btn-sm"'+
							'style="margin-left: 0px !important; min-width: 90px !important"'+
							'onclick="comentarios.annadirComentariosIncidencias(\'null\')">Añadir'+
							'</button>'+
					'</div>'+
				 '</div>';
	
	
	
	$('#tabla_comentarios').append('<caption style="caption-side:top-right">'+myVar+'</caption>');
	$('#tabla_comentarios_incidencias').append('<caption style="caption-side:top-right">'+myVar2+'</caption>');
	$(".dataTables_wrapper").css('padding-bottom','0px !important');
	$('head').append('<style> .dataTables_wrapper{padding-bottom:0px !important} </style>');
	//$(".filtroVistas").css('t','0px !important');
	$(".filtroVistas").css('font-size','10px !important');
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
 function getDateOfISOMounth(m, y) {
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

var comentarios = {
		
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
			//Se mete en sesion los datos de los select generales para que al refrescar se mantengan los valores
			sessionStorage.setItem("numSemana", $('#idsemana').val());
			sessionStorage.setItem("tipoBusqueda", $('#tipoBusqueda').val());
			sessionStorage.setItem("annioBusqueda", $('#annioBusqueda').val());
			var table = $('#tabla_comentarios').DataTable().clear().draw();			
			table.ajax.reload();
				//window.location = path+"/incidencias.buscar.action?tipoBusqueda="+tipoBusqueda+"&numSemanaMes="+numSemanaMes+"&numIncidencia="
				//+numIncidencia+"&tipoIncidencia="+tipoIncidencia+"&annioBusqueda="+annioBusqueda;
					
		},
		buscarComentariosIncidencias: function(path){	
			var tipoBusqueda = $('#tipoBusqueda').val();
			var numSemanaMes =$('#idsemana').val();
			var id =$('#id').val();
			var tipoIncidencia = $('#tipoBuscador').val();
			var annioBusqueda =  $('#annioBusqueda').val();	
			//Se mete en sesion los datos de los select generales para que al refrescar se mantengan los valores
			sessionStorage.setItem("numSemana", $('#idsemana').val());
			sessionStorage.setItem("tipoBusqueda", $('#tipoBusqueda').val());
			sessionStorage.setItem("annioBusqueda", $('#annioBusqueda').val());
			var table = $('#tabla_comentarios_incidencias').DataTable().clear().draw();			
			table.ajax.reload();
				//window.location = path+"/incidencias.buscar.action?tipoBusqueda="+tipoBusqueda+"&numSemanaMes="+numSemanaMes+"&numIncidencia="
				//+numIncidencia+"&tipoIncidencia="+tipoIncidencia+"&annioBusqueda="+annioBusqueda;
					
		},
		annadirComentariosIncidencias(ruta){
			
			$("#botonAnnadirc").show();
			$("#botonActualizarc").hide();
			$("#botonBorrarRegistroc").hide();
			
			$("#enlacePestana3").text("Insertar/Añadir nueva incidencia destada");
			$("#tituloTabDetallec").text("Insertar/Añadir nueva incidencia destacada");
			
			$("#capaIdc").hide();
			$("#num_periodoc").hide();
			$("#tipo_periodoc").hide();
			$("#fechac").hide();
			$("#autorc").hide();
			$("#timestampc").hide();
			
			$('#id_incidenciac').val("");			
			$('#aliasC').val("");
			$('#descripcionMnanualc').val("");
					
			$("#pestana1").removeClass("active");
			$("#pestana3").addClass("active");
			$("#tab-2").removeClass("active");
			$("#tab-1").removeClass("active");
			$("#tab-3").addClass("active");
			
			$("#enlacePestana2").text("Insertar/Añadir nueva incidencia");
			$("#tituloTabDetalle3").text("Insertar/Añadir nueva incidencia");
		},
		annadirIncidencias:function(ruta){
			
			$("#botonAnnadir").show();
			$("#botonActualizar").hide();
			$("#botonBorrarRegistro").hide();
			
			$("#id_comentario").val("");		
			$("#capaId").hide();
			$("#idvista").hide();
			$("#timestamp").hide();
			$("#capaTipoPeriodo").hide();
			$("#capafechaSemanaVer").hide();
			$("#tipoComentario").hide();
			$("#autor").hide();
			$("#ipo_periodo").hide();
			$("#fecha").hide();
			$("#pestana2").css("display","block");
			
			$("#tipoBuscador2").val("RSS");
			$("#botonAnnadir").css("display","visible");
			$("#botonActualizar").css("display","none");
			$("#botonBorrarRegistro").css("display","none");
			
			//AIM se borran los campos por si hubieramos seleccionado algua accion antes
			
			$('#id_accion').val("");
			$('#tipoBuscador2').val("RS");
			
			comentarios.cambioSelectorTipo2();

			$('#verEditarVistas').val("");			
			$('#verEditarkpi').val("");
			$('#comentario_1').val("");
			$('#comentario_2').val("");
			$('#comentario_3').val("");
			
			
			$("#enlacePestana2").text("Insertar/Añadir nuevo comentario");
			$("#tituloTabDetalle").text("Insertar/Añadir nuevo comentario");
			
			$("#pestana1").removeClass("active");
			$("#pestana2").addClass("active");
			
			$("#tab-1").removeClass("active");
			$("#tab-3").removeClass("active");
			$("#tab-2").addClass("active");
			
			
			//Se pone un valor por defecto en los seleccionables
			$("#verEditarVistas option[id = '1']").attr('selected',true);
			$("#verEditarVistas").val("Resumen Redes");	
			
			var outherthis = $('#verEditarVistas option:selected').attr('id');
			$('#verEditarkpi option').each(function() {
				if($(this).attr('id') == outherthis){
					$(this).show();
				}else{
					$(this).hide();
				}			    	
			}); 
		},
		actualizarInfo: function(numRow,fila){
					
			//Actualizamos por lo que no es necesario el boton añadir
			$("#botonAnnadir").hide();
			$("#botonActualizar").show();
			$("#botonBorrarRegistro").show();
			$("#capaId").show();
			$("#capaInforme").show();			
			$("#capafechaSemanaVer").show();
			
			$("#capaId").show();
			$("#idvista").show();
			$("#timestamp").show();
			$("#capaTipoPeriodo").show();
			$("#capafechaSemanaVer").show();
			$("#tipoComentario").show();
			$("#autor").show();
			$("#ipo_periodo").show();
			$("#fecha").show();
			$("#pestana2").css("display","block");
			filaCompleta = fila.split("*");
			
//			if(filaCompleta[7].indexOf('-')==-1){
//				filaCompleta[7] = comentarios.formateoFechaJsonDatatables(filaCompleta[3]);
//			}
//			
//			if(filaCompleta[4].indexOf('-')==-1){
//				filaCompleta[4] = comentarios.formateoFechaJsonDatatables(filaCompleta[4]);
//			}
			
//			0row["id"]+"*"
//        	1+row["informe"]+"*"
//        	2+row["sub_capitulo"]+"*"
//        	3+row["item"]+"*"
//        	4+row["comentario"]+"*"
//        	5+row["contacto"]+"*"
//        	6+row["area"]+"*"
//        	7+row["fecha_semana"]+"*"
			
			
			$('#id_comentario').val(filaCompleta[0]);
			$('#id_vistaa').val(filaCompleta[3]);
			$('#times').val(filaCompleta[11]);
			$('#tipoC').val(filaCompleta[5]);			
			$('#autorr').val(filaCompleta[6]);
			$('#tipop').val(filaCompleta[1]);
			$('#fech').val(filaCompleta[10].substring(0, filaCompleta[10].indexOf(" ")));
			$('#comentario_1').val(filaCompleta[7].replaceAll('</br>','\n'));
			$('#comentario_2').val(filaCompleta[8].replaceAll('</br>','\n'));
			$('#comentario_3').val(filaCompleta[9].replaceAll('</br>','\n'));
			
			$('#verEditarVistas').val(filaCompleta[2]);
			$('#verEditarkpi').val(filaCompleta[4]);
			$('#fechaSemanaVer').find("input").val(filaCompleta[7]);
			$('#hiddenNumFila').val(numRow);
			
			
			
			//AIM se actualiza la informacion de la pestaña y del titulo de la caja
			$("#pestana2").css("display","block");
			$("#enlacePestana2").text("Ver/Actualizar comentario ["+filaCompleta[0]+"]");
			$("#tituloTabDetalle").text("Ver/Actualizar comentario ["+filaCompleta[0]+"]");

			
			//Se prepara el selecionable subtipo en funcion del tipo
			$('#subtipoBuscador2').val(filaCompleta[2]);
			$("#pestana1").removeClass("active");
			$("#pestana2").addClass("active");
			$("#pestana3").addClass("active");
			$("#tab-1").removeClass("active");
			$("#tab-2").addClass("active");
			$("#tab-3").removeClass("active");

			
			
		},
		actualizarInfoIncidencia: function(numRow,fila){
			
			//Actualizamos por lo que no es necesario el boton añadir
			$("#botonAnnadirc").hide();
			$("#botonActualizarc").show();
			$("#botonBorrarRegistroc").show();
			
			
			$("#capaIdc").show();
			$("#num_periodoc").show();
			$("#tipo_periodoc").show();
			$("#fechac").show();
			$("#autorc").show();
			$("#timestampc").show()
			
			
			$("#pestana3").css("display","block");
			filaCompleta = fila.split("*");
			
		
			
			$('#id_comitec').val(filaCompleta[0]);
			$('#id_incidenciac').val(filaCompleta[4]);
			$('#num_peric').val(filaCompleta[2]);
			$('#tipopc').val(filaCompleta[1]);			
			$('#autorr').val(filaCompleta[6]);
			$('#fechacc').val(filaCompleta[3].substring(0, filaCompleta[3].indexOf(" ")));
			$('#aliasC').val(filaCompleta[5].replaceAll('</br>','\n'));
			$('#descripcionMnanualc').val(filaCompleta[6].replaceAll('</br>','\n'));
			$('#autorrc').val(filaCompleta[7]);
			$('#timesc').val(filaCompleta[8]);

			
			
			//AIM se actualiza la informacion de la pestaña y del titulo de la caja
			$("#pestana3").css("display","block");
			$("#enlacePestana3").text("Ver/Actualizar incidencia ["+filaCompleta[0]+"]");
			$("#tituloTabDetallec").text("Ver/Actualizar incidencia ["+filaCompleta[0]+"]");

			
			//Se prepara el selecionable subtipo en funcion del tipo
			$('#subtipoBuscador2').val(filaCompleta[2]);
			$("#pestana1").removeClass("active");
			$("#pestana2").removeClass("active");
			$("#pestana3").addClass("active");
			
			$("#tab-1").removeClass("active");
			$("#tab-3").addClass("active");
			$("#tab-2").removeClass("active");
		},
		insertarActualizarAccionRelevante : function(){
			var check = false;
			var titulo;
			if($('#id_comentario').val()==""){
				titulo = "Insertar nuevo comentario";
				if($('#fechaSemanaVer').find("input").val()=='')
					BootstrapDialog.confirm({
						title: titulo,
						message: "No se puede insertar sin fecha",
						type: BootstrapDialog.TYPE_DANGER,
						btnOKLabel: "Aceptar", 
						callback: function(result) {
							if (result) {
								check = false;
								return null;	
							} else {
								
							}
						}
					});	
				else
					check = true;
			}else{
				titulo = "Actualizar informacion del comentario ["+$('#id_comentario').val()+"]";		
					check = true;	
			}
			if(check){
				BootstrapDialog.confirm({
					title: titulo,
					message: "Confirme que desea grabar los datos",
					type: BootstrapDialog.TYPE_WARNING,
					btnCancelLabel: "Cancelar", 
					btnOKLabel: "Aceptar", 
					callback: function(result) {
						if (result) {
							comentarios.insertarActualizarAccionRelevante_1();
						} else {
						}
					}
				});	
			}


		},
		
		insertarActualizarAccionRelevanteIncidencia : function(){
			var check = false;
			var titulo;
			if($('#id_comitec').val()==""){
				titulo = "Insertar nuevo incidencia destacada";
				if($('#fechaSemanaVer').find("input").val()==''){
					BootstrapDialog.confirm({
						title: titulo,
						message: "No se puede insertar sin fecha",
						type: BootstrapDialog.TYPE_DANGER,
						btnOKLabel: "Aceptar", 
						callback: function(result) {
							if (result) {
								check = false;
								return null;	
							} else {
								
							}
						}
					});
				
				
				} else if ($('#id_incidenciac').val().includes('INC')==false&&$('#id_incidenciac').val().includes('BTP-Sec')==false){
					BootstrapDialog.confirm({
						title: titulo,
						message: "El número de incidencia no tiene el formato correcto",
						type: BootstrapDialog.TYPE_DANGER,
						btnOKLabel: "Aceptar", 
						callback: function(result) {
							if (result) {
								check = false;
								return null;	
							} else {
								
							}
						}
					});
					
					
					
					
				
				}else
					check = true;
			}else{
				titulo = "Actualizar informacion de la incidencia ["+$('#id_comitec').val()+"]";		
					check = true;	
			}
			if(check){
				BootstrapDialog.confirm({
					title: titulo,
					message: "Confirme que desea grabar los datos",
					type: BootstrapDialog.TYPE_WARNING,
					btnCancelLabel: "Cancelar", 
					btnOKLabel: "Aceptar", 
					callback: function(result) {
						if (result) {
							comentarios.insertarActualizarAccionRelevanteIncidencia_1();
						} else {
						}
					}
				});	
			}


		},
		volverAlistado:function(path){
			
			$('#tipoBuscador').val($('#tipoBuscador2').val());		
			comentarios.cambioSelectorTipo();			
			$('#subtipoBuscador').val($('#subtipoBuscador2').val());
			
			
			$("#botonAnnadir").show();
			$("#botonActualizar").show()
			$("#botonBorrarRegistro").show();
			
			$("#pestana3").removeClass("active");
			$("#pestana2").removeClass("active");
			$("#pestana1").addClass("active");
			
			$("#tab-2").removeClass("active");
			$("#tab-3").removeClass("active");
			$("#tab-1").addClass("active");
			
			$("#pestana2").css("display","none");
			
			

			
		},
		borrarAccion:function(idloc,timestamp){
			
			
			BootstrapDialog.confirm({
				title: "Borrado de comentario",
				message: "¿Quiere borrar este registro?",
				type: BootstrapDialog.TYPE_DANGER,
				btnOKLabel: "Aceptar", 
				callback: function(result) {
					if (result) {
						comentarios.borrarAccion_1(idloc,timestamp);	
					} else {
					}
				}
			});	
			
		},
		borrarAccion_1:function(idloc,timestamp){
			
			if(idloc == null||idloc == ''){
				idloc = $('#id_comentario').val();
				timestamp = $('#times').val()
			}
			var comentarios = {
					id_comite		 			 			     : idloc , 
					timestamp									 : timestamp
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
					url: "comentarios/borrar",
					contentType : 'application/json; charset=utf-8',
					dataType : 'json',
					//data: ...vistasProv..., //URL: https://datatables.net/reference/option/ajax.data
					data:  JSON.stringify(comentarios)	   
					//dataSrc: "data", //"data" es un objeto json //URL: https://datatables.net/manual/ajax
				}).done(function( data, textStatus, jqXHR ) {
					
						$("#pestana3").removeClass("active");
						$("#pestana2").removeClass("active");
						$("#pestana1").addClass("active");
						$("#tab-3").removeClass("active");
						$("#tab-2").removeClass("active");
						$("#tab-1").addClass("active");
						
						$("#pestana2").css("display","none");
						var table = $('#tabla_comentarios').DataTable().clear().draw();			
						table.ajax.reload();
						
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
		borrarAccionIncidencia:function(idloc,timestamp){
			
			
			BootstrapDialog.confirm({
				title: "Borrado de incidencia",
				message: "¿Quiere borrar este registro?",
				type: BootstrapDialog.TYPE_DANGER,
				btnOKLabel: "Aceptar", 
				callback: function(result) {
					if (result) {
						comentarios.borrarAccionIncidencia_1(idloc,timestamp);	
					} else {
					}
				}
			});	
			
		},
		borrarAccionIncidencia_1:function(idloc,timestamp){
			
			if(idloc == null||idloc == ''){
				idloc = $('#id_comitec').val();
				timestamp = $('#timesc').val()
			}
			var aComentariosIncidencias = {
					id_comite		 			 			     : idloc , 
					timestamp									 : timestamp
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
					url: "comentarios/borrarIncidencias",
					contentType : 'application/json; charset=utf-8',
					dataType : 'json',
					//data: ...vistasProv..., //URL: https://datatables.net/reference/option/ajax.data
					data:  JSON.stringify(aComentariosIncidencias)	   
					//dataSrc: "data", //"data" es un objeto json //URL: https://datatables.net/manual/ajax
				}).done(function( data, textStatus, jqXHR ) {
					
						$("#pestana3").removeClass("active");
						$("#pestana2").removeClass("active");
						$("#pestana1").addClass("active");
						
						$("#tab-3").removeClass("active");
						$("#tab-2").removeClass("active");
						$("#tab-1").addClass("active");
						
						$("#pestana2").css("display","none");
						var table = $('#tabla_comentarios_incidencias').DataTable().clear().draw();			
						table.ajax.reload();
						
						var s_message = "Borrado llevado a cabo correctamente";
						
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
					$('#verEditarVistas').val("");			
					$('#verEditarkpi').val("");
					$('#comentario_1').val("");
					$('#comentario_2').val("");
					$('#comentario_3').val("");
				}
			});	
		},
		borrarCamposEditablesIncidencia:function(url){
			
			BootstrapDialog.confirm({
				title: "Borrar campos",
				message: "¿Quiere borrar los campos?",
				type: BootstrapDialog.TYPE_WARNING,
				btnCancelLabel: "Cancelar", 
				btnOKLabel: "Aceptar", 
				callback: function(result) {
					$('#id_incidenciac').val("");			
					$('#aliasC').val("");
					$('#descripcionMnanualc').val("");
					
				}
			});	
		},
		insertarActualizarAccionRelevante_1:function(){
			var idObten;
			
			if($('#id_comentario').val()==''){
				idObten = "";

			
			
			
			var aComentarios = {
					id_comite		 			 : idObten,
					tipo_periodo		 		 : $('#tipoBusqueda').val(), 
					vista	 		 			 : $('#verEditarVistas option:selected').val(), 
					kpi	  	  	 	     	 	 : $('#verEditarkpi option:selected').val(), 
					autor  		 			 	 : $('#autor').val(), 
					comentario_1				 : $('#comentario_1').val().trim(),
					comentario_2				 : $('#comentario_2').val().trim(),
					comentario_3				 : $('#comentario_3').val().trim(),
					n_periodo					 : $('#idsemana').val(),
					annio_sel					 : $('#annioBusqueda').val(),
					fecha						 : ""
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
					url: "comentarios/insertOrUpdate",
					contentType :'application/json; charset=utf-8',
					dataType : 'json',
					data:JSON.stringify(aComentarios)	   
					}).done(function( data, textStatus, jqXHR ) {

							//Se obtiene el id despues de insertar
							$('#id').val(data);
							
							//Se vuelve a la pestaña 1 y se refresca la tabla
							$("#pestana2").removeClass("active");
							$("#pestana1").addClass("active");
							
							$("#tab-2").removeClass("active");
							$("#tab-1").addClass("active");
							
							$("#pestana2").css("display","none");					
							var table = $('#tabla_comentarios').DataTable();			 
							table.ajax.reload();
						//	comentarios.volverAlistado(null);
							var s_message = "Inserción llevada a cabo correctamente";
							dycec_js.alert("Guardar datos", s_message, BootstrapDialog.TYPE_DANGER);
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
							
							var aComentarios = {
									id_comite							 : $('#id_comentario').val(),
									tipo_periodo		 			 	 : $('#tipoBusqueda').val(), 
									vista	 		 			         : $('#verEditarVistas option:selected').val(), 
									kpi	 	  	  	 		 		     : $('#verEditarkpi option:selected').val(), 
									tipo_comentario  		 			 : $('#tipoC').val(), 
									comentario_1 						 : $('#comentario_1').val().trim(),
									comentario_2						 : $('#comentario_2').val().trim(),
									comentario_3						 : $('#comentario_3').val().trim(),
									n_periodo							 : $('#idsemana').val(),
									annio_sel							 : $('#annioBusqueda').val(),
									timestamp							 : $('#times').val()
							};	
							
							$.ajax({
								type: "POST", 
								timeout: 50000,
								url: "comentarios/insertOrUpdate",
								contentType :'application/json; charset=utf-8',
								dataType : 'json',
								data:JSON.stringify(aComentarios)	   
								}).done(function( data, textStatus, jqXHR ) {
							
							
							//AIM fecha semana no se actualiza y al insertar se coje el valor mas alto de incidencias
							var aComentarios = {
									id_comite							 : idObten,
									tipo_periodo		 			 	 : $('#tipoBusqueda').val(), 
									vista	 		 			         : $('#verEditarVistas option:selected').val(), 
									kpi	 	  	  	 		 		     : $('#verEditarkpi option:selected').val(), 
									tipo_comentario  		 			 : $('#tipoC').val(), 
									comentario_1 						 : $('#comentario_1').val().trim(),
									comentario_2						 : $('#comentario_2').val().trim(),
									comentario_3						 : $('#comentario_3').val().trim(),
									n_periodo							 : $('#idsemana').val(),
									annio_sel							 : $('#annioBusqueda').val(),
									timestamp							 : $('#times').val()
							};	
							//$('#tabla_acciones').DataTable().row($('#hiddenNumFila').val()).data(datosFila).draw();
							//$('tr',$('#tabla_acciones').DataTable().row($('#hiddenNumFila').val())).css("background-color", "#eeeeee");
							$('#id_comentario').val("");
							var table = $('#tabla_comentarios').DataTable();			 
							table.ajax.reload();		
							comentarios.volverAlistado(null);
							var s_message = "Actualizacion llevada a cabo correctamente";
							dycec_js.alert("Guardar datos", s_message, BootstrapDialog.TYPE_DANGER);
						 //if ( (data && data.newPlan) ) {
					}) //.done(function( data, textStatus, jqXHR ) {
					.fail(function( jqXHR, textStatus, errorThrown ) {
						// Error
						dycec_js.ajax_post_fail(jqXHR, textStatus, errorThrown);
					}) //.fail(function( jqXHR, textStatus, errorThrown ) {
					.always(function( jqXHR, textStatus, errorThrown ) {
						// Fin. Proceso completado (se ejecuta después de ".done"/".fail"
					//	o_waitDialog.close();
					});	
							
				}
		},
		insertarActualizarAccionRelevanteIncidencia_1:function(){
			var idObten;
			
			if($('#id_comitec').val()==''){
				idObten = "";

			var aComentariosIncidencias = {
					id_comite		 			 : idObten,
					tipo_periodo		 		 : $('#tipoBusqueda').val(), 
					n_periodo	 		 		 : $('#idsemana').val(), 
					id_incidencia	  	  	 	 : $('#id_incidenciac').val(), 
					alias  		 			 	 : $('#aliasC').val().trim(), 
					descripcion_manual			 : $('#descripcionMnanualc').val().trim(),
					autor				 		 : $('#autorrc').val().trim(),
					annio_sel					 : $('#annioBusqueda').val()
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
					url: "comentarios/insertOrUpdateIncidencias",
					contentType :'application/json; charset=utf-8',
					dataType : 'json',
					data:JSON.stringify(aComentariosIncidencias)	   
					}).done(function( data, textStatus, jqXHR ) {

							//Se obtiene el id despues de insertar
							$('#id').val(data);
							
							//Se vuelve a la pestaña 1 y se refresca la tabla
							$("#pestana3").removeClass("active");
							$("#pestana2").removeClass("active");
							$("#pestana1").addClass("active");
							
							$("#tab-2").removeClass("active");
							$("#tab-3").removeClass("active");
							$("#tab-1").addClass("active");
							
							$("#pestana2").css("display","none");					
							var table = $('#tabla_comentarios_incidencias').DataTable();			 
							table.ajax.reload();
						//	comentarios.volverAlistado(null);
							var s_message = "Inserción llevada a cabo correctamente";
							dycec_js.alert("Guardar datos", s_message, BootstrapDialog.TYPE_DANGER);
							
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
							
							var aComentariosIncidencias = {
									id_comite		 			 : $('#id_comitec').val(),
									tipo_periodo		 		 : $('#tipoBusqueda').val(), 
									n_periodo	 		 		 : $('#idsemana').val(), 
									id_incidencia	  	  	 	 : $('#id_incidenciac').val(), 
									alias  		 			 	 : $('#aliasC').val().trim(), 
									descripcion_manual			 : $('#descripcionMnanualc').val().trim(),
									autor				 		 : $('#autorrc').val().trim(),
									fecha				 		 : $('#fechac').val().trim(),
									timestamp					 : $('#timesc').val().trim(),
									timestampString				 : "",
									annio_sel					 : $('#annioBusqueda').val()
							};	
							
							$.ajax({
								type: "POST", 
								timeout: 50000,
								url: "comentarios/insertOrUpdateIncidencias",
								contentType :'application/json; charset=utf-8',
								dataType : 'json',
								data:JSON.stringify(aComentariosIncidencias)	   
								}).done(function( data, textStatus, jqXHR ) {
							
							
							//AIM fecha semana no se actualiza y al insertar se coje el valor mas alto de incidencias
							var aComentariosIncidencias = {
									id_comite							 : idObten,
									tipo_periodo		 			 	 : $('#tipoBusqueda').val(), 
									vista	 		 			         : $('#verEditarVistas option:selected').val(), 
									kpi	 	  	  	 		 		     : $('#verEditarkpi option:selected').val(), 
									tipo_comentario  		 			 : $('#tipoC').val(), 
									comentario_1 						 : $('#comentario_1').val().trim(),
									comentario_2						 : $('#comentario_2').val().trim(),
									comentario_3						 : $('#comentario_3').val().trim(),
									n_periodo							 : $('#idsemana').val(),
									annio_sel							 : $('#annioBusqueda').val(),
									timestamp							 : $('#times').val()
							};	
							//$('#tabla_acciones').DataTable().row($('#hiddenNumFila').val()).data(datosFila).draw();
							//$('tr',$('#tabla_acciones').DataTable().row($('#hiddenNumFila').val())).css("background-color", "#eeeeee");
							$('#id_comitec').val("");
							var table = $('#tabla_comentarios_incidencias').DataTable();			 
							table.ajax.reload();		
							comentarios.volverAlistado(null);
							var s_message = "Actualizacion llevada a cabo correctamente";
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
							
				}
		},
		
		
		init_datatable: function(o_html_table, json_datos) {
			// 1) Configuramos el dataTable
			this.o_html_table = o_html_table;
			this.json_datos   = json_datos;
			if(o_html_table.attr('id') == 'tabla_comentarios')
				this.datatable_setConfig(o_html_table, json_datos);
			else
				this.datatable_setConfig_incidencias(o_html_table, json_datos);
	
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
				pageLength: 10, //filas por defecto paginadas en la tabla
				responsive: true,
				processing: true,
				info: false,
				searching: true,
			
				//dom: "lfrtip", //URL: https://datatables.net/reference/option/dom
				//dom: '<"html5buttons"B>lfrtip', //URL: https://datatables.net/reference/option/dom
				 //URL: https://datatables.net/reference/option/dom
				buttons: [ //https://datatables.net/reference/button/

				],
				language: { //textos en español, coño, no en guiri
					//url: "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json",
					//url: "<%=request.getContextPath()%>" + "/inspinia_admin-v2.7.1/js/plugins/dataTables/i18n/Spanish.json",
					//url: "${pageContext.request.contextPath}/inspinia_admin-v2.7.1/js/plugins/dataTables/i18n/Spanish.json",
					url: this.s_contextPath + "/gdm/inspinia_admin-v2.7.1/js/plugins/dataTables/i18n/Spanish.json",
		            processing: '<span class="fa fa-refresh fa-spin fa-3x fa-fw datatable-spinner"></span><div class="loading-text">Loading</div>',

					decimal: ",",  //coma como separador decimal
					thousands: ".", //punto para los millares
					//infoEmpty: "No hay datos disponibles, para buscar aplica un filtro y pulsa en buscar"

				},
				scrollY: "auto", //scroll vertical. //URL: https://datatables.net/examples/basic_init/scroll_y_dynamic.html
				scrollX: true, //scroll horizontal. //URL: https://www.datatables.net/examples/basic_init/scroll_x.html
				colReorder: true, //mover columnas
				deferRender: true,
				dom: '<"float-left"B>rt<"row"<"col-sm-4"l><"col-sm-4"i><"col-sm-4"p>>',//deferred rendering enabled. Los objetos HTML (TR, TD) se crean cuando se muestran
				//ordering: false, //no permitimos ordenar por ninguna columna
				//orderMulti: false, //no permitimos ordenar por varias columnas, solo por una
				//colFilter. //URL: https://datatables.net/extensions/colreorder/examples/initialisation/col_filter
				//order: [[4, "desc"]], //0..(totalCols-1). ordenamos por la 5ª columna "F.apertura" descendente
				columnDefs: [
					{
						targets: [0,1,2,3,4,5],
						createdCell: function (td, cellData, rowData, row, col) {
					        $(td).attr('title', cellData)
						}   
					},
					{
						targets: [0,1,3,4,6],
						width: "5%",
						
					},
					{
					targets: [2,3],
					render: function (data, type, row, meta ) {	
	   	                
	                	var datos = "";
	                	if(data!=null&&data.length>30){
	                		datos = data.substring(0,30)+"...";
	                	}else if(data==null){
	                	}else{
	                		datos = data;
	                	}
	                	
	                	return datos;
	                	}
					
					
					},
					{
	                targets: [5],
	                render: function (data, type, row, meta ) {	
	   	                
	                	var datos = "";
	                	if(data!=null&&data.length>50){
	                		datos = data.substring(0,40)+"...";
	                	}else if(data==null){
	                	}else{
	                		datos = data;
	                	}
	                	
	                	return datos.replace('\\n','</br>');
	                	}
	               
					},
	                {
	            	targets: [6],
	                render: function (data, type, row, meta ) {	
	                	
	                	var filaCompleta =
	                	row["id_comite"]+"*"
	                	+row["tipo_periodo"]+"*"
	                	+row["vista"]+"*"
	                	+row["id_vista"]+"*"
	                	+row["kpi"]+"*"
	                	+row["tipo_comentario"]+"*"
	                	+row["autor"]+"*"
	                	+row["comentario_1"]+"*"
	                	+row["comentario_2"]+"*"
	                	+row["comentario_3"]+"*"
	                	+row["fecha"]+"*"
	                	+row["timestamp"]+"*"
	                	var datos = '<button type="button" class="btn btn-success btn-xs dropdown-toggle" onclick="comentarios.actualizarInfo('+meta.row+',\''+filaCompleta+'\')" >Ver</button>'+
	                	'<button type="button" style="margin-left:5px" class="btn btn-danger btn-xs dropdown-toggle" onclick="comentarios.borrarAccion(\''+row["id_comite"]+'\',\''+row["timestamp"]+'\')" ><i class="fa fa-times-rectangle" aria-hidden="true"></button></i>';     	
	                return datos;
	                }
	            }],	
				columns: [
					 {title: "Id comite", data: "id_comite"}
					 ,{title: "Fecha", data: "fecha" ,render : function (data, type, row) {//data
					        return data.substring(0, data.indexOf(" "));
					    }}
				//	,{title: "Tipo periodo", data: "tipo_periodo"}
					,{title: "Vista", data: "vista"}
					//,{title: "id_vista", data: "id_vista"} 
					,{title: "KPI", data: "kpi"}
					,{title: "Tipo comen.", data: "tipo_comentario"}
					//,{title: "Autor", data: "autor"}
					,{title: "Comentario 1", data: "comentario_1"}
					//,{title: "Comentario_2", data: "comentario_2"}
					//,{title: "Comentario_3", data: "comentario_3"}
					
				//	,{title: "Timestamp", data: "timestamp"  }
	
		        ],
		        
				// Damos formato a algunas filas en función de sus datos ==========================
		       /* createdRow: function( row, data, dataIndex ) {
					//URL: https://datatables.net/reference/option/createdRow
		        	_this.datatable_createdRow(row, data, dataIndex);
				},*/		        
				ajax: {
					type: "POST", 
					timeout: 50000,
					url: "comentarios/buscar",
					contentType : 'application/json; charset=utf-8',
				    dataType : 'json',	
					data:  function (inComentarios) {
						inComentarios.numSemanaMes = $('#idsemana').val();	
						inComentarios.tipoBusqueda = $('#tipoBusqueda').val();	
						inComentarios.annioBusqueda = $('#annioBusqueda').val();
						inComentarios.vista = $('#filtroVistas option:selected').text().trim();
						inComentarios.kpi= $('#filtrokpi option:selected').text().trim();

						//console.log("parametro: " + JSON.stringify(params));
					return JSON.stringify(inComentarios)
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
		datatable_setConfig_incidencias: function(o_html_table, json_datos) {
			var _this = this; //URL: https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
			//$('#id_datatable').DataTable(); //  llamada a dataTables
			//var o_datatable = $('#id_datatable').DataTable({
			this.o_datatable = o_html_table.DataTable({
				
				//lengthMenu: [10, 25, 50, 75, 100],
				lengthMenu: [[10, 20, 100, -1], [10, 20, 100, "Todos"]],
				pageLength: 10, //filas por defecto paginadas en la tabla
				responsive: true,
				processing: true,
				searching: true,
				info: false,
				//dom: "lfrtip", //URL: https://datatables.net/reference/option/dom
				//dom: '<"html5buttons"B>lfrtip', //URL: https://datatables.net/reference/option/dom
				buttons: [ //https://datatables.net/reference/button/

				],
				language: { //textos en español, coño, no en guiri
					//url: "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json",
					//url: "<%=request.getContextPath()%>" + "/inspinia_admin-v2.7.1/js/plugins/dataTables/i18n/Spanish.json",
					//url: "${pageContext.request.contextPath}/inspinia_admin-v2.7.1/js/plugins/dataTables/i18n/Spanish.json",
					url: this.s_contextPath + "/gdm/inspinia_admin-v2.7.1/js/plugins/dataTables/i18n/Spanish.json",
		            processing: '<span class="fa fa-refresh fa-spin fa-3x fa-fw datatable-spinner"></span><div class="loading-text">Loading</div>',

					decimal: ",",  //coma como separador decimal
					thousands: ".", //punto para los millares
					//infoEmpty: "No hay datos disponibles, para buscar aplica un filtro y pulsa en buscar"

				},
				scrollY: "auto", //scroll vertical. //URL: https://datatables.net/examples/basic_init/scroll_y_dynamic.html
				scrollX: true, //scroll horizontal. //URL: https://www.datatables.net/examples/basic_init/scroll_x.html
				colReorder: true, //mover columnas
				deferRender: true,
				dom: '<"float-left"B>rt<"row"<"col-sm-4"l><"col-sm-4"i><"col-sm-4"p>>',//deferred rendering enabled. Los objetos HTML (TR, TD) se crean cuando se muestran
				//ordering: false, //no permitimos ordenar por ninguna columna
				//orderMulti: false, //no permitimos ordenar por varias columnas, solo por una
				//colFilter. //URL: https://datatables.net/extensions/colreorder/examples/initialisation/col_filter
				//order: [[4, "desc"]], //0..(totalCols-1). ordenamos por la 5ª columna "F.apertura" descendente
				columnDefs: [
					{
						targets: [0,1,2,3,4,5],
						createdCell: function (td, cellData, rowData, row, col) {
					        $(td).attr('title', cellData)
						}   
					},
					{
						targets: [0,1,2,3,6],
						width: "5%",
					},
					{	
	                targets: [5],
	                render: function (data, type, row, meta ) {	
	   	                
	                	var datos = "";
	                	if(data!=null&&data.length>90){
	                		datos = data.substring(0,90)+"...";
	                	}else if(data==null){
	                	}else{
	                		datos = data;
	                	}
	                	
	                	return datos;
	                	}
					},
	                {
	            	targets: [6],
	                render: function (data, type, row, meta ) {	
	                	
	                	var filaCompleta =
	                	row["id_comite"]+"*"
	                	+row["tipo_periodo"]+"*"
	                	+row["n_periodo"]+"*"
	                	+row["fecha"]+"*"
	                	+row["id_incidencia"]+"*"
	                	+row["alias"]+"*"
	                	+row["descripcion_manual"]+"*"
	                	+row["autor"]+"*"
	                	+row["timestamp"]+"*"
	                	var datos = '<button type="button" class="btn btn-success btn-xs dropdown-toggle" onclick="comentarios.actualizarInfoIncidencia('+meta.row+',\''+filaCompleta+'\')" >Ver</button>'+
	                	'<button type="button" style="margin-left:5px" class="btn btn-danger btn-xs dropdown-toggle" onclick="comentarios.borrarAccionIncidencia(\''+row["id_comite"]+'\',\''+row["timestamp"]+'\')" ><i class="fa fa-times-rectangle" aria-hidden="true"></button></i>';     	
	                return datos;
	                }
	            }],				
				columns: [
					 {title: "Id comite", data: "id_comite"}
					//,{title: "Tipo_periodo", data: "tipo_periodo"}
					,{title: "Periodo", data: "n_periodo"}
					,{title: "Fecha", data: "fecha" ,render : function (data, type, row) {//data
				        return data.substring(0, data.indexOf(" "));
				    }}
					,{title: "Id incidencia", data: "id_incidencia"}
					,{title: "Alias", data: "alias"}
					,{title: "Descripción", data: "descripcion_manual"}
					//,{title: "Autor", data: "autor"}
					//,{title: "Timestamp", data: "timestamp"}
	
		        ],
		        
				// Damos formato a algunas filas en función de sus datos ==========================
		       /* createdRow: function( row, data, dataIndex ) {
					//URL: https://datatables.net/reference/option/createdRow
		        	_this.datatable_createdRow(row, data, dataIndex);
				},*/		        
				ajax: {
					type: "POST", 
					timeout: 50000,
					url: "comentarios/buscar_comentarios_incidencias",
					contentType : 'application/json; charset=utf-8',
				    dataType : 'json',	
					data:  function (inComentarios) {
						inComentarios.numSemanaMes = $('#idsemana').val();	
						inComentarios.tipoBusqueda = $('#tipoBusqueda').val();	
						inComentarios.annioBusqueda = $('#annioBusqueda').val();						
						//console.log("parametro: " + JSON.stringify(params));
					return JSON.stringify(inComentarios)
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
		selects: function(){
		
			var outherthis = $('#filtroVistas option:selected').attr('id');
	    	$('#filtrokpi option').each(function() {
	    		if($(this).attr('id') == outherthis){
    				$(this).show();
	    		}else{
	    			$(this).hide();
	    		}			    	
		}); 
	  
	    	$('#filtrokpi option[id =0]').prop('selected','selected');
			
		},
		selectsVerEditar: function(){
			
			var outherthis = $('#verEditarVistas option:selected').attr('id');
	    	$('#verEditarkpi option').each(function() {
	    		if($(this).attr('id') == outherthis){
    				$(this).show();
	    		}else{
	    			$(this).hide();
	    		}			    	
		}); 
	  
	    	$('#verEditarkpi option[id =0]').prop('selected','selected');
			
		}
}