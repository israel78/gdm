
var contador = 0;
var cont = 0;
var filaCompletaArray = null;
var registroIncidencia = null;
var registroIncidenciaLlamada = null;
var registrodatosAdicionales = null;

$(document).ready(function() {
	
// Para la tabla
//año_num,mes_num,dia_num
	var contador = 5;
/*	while(contador<44){
		
		$('#listado_incidencias #fila').eq(contador).children().css('background-color', '#fcfacf')
		contador++;
	}
	contador = 5;
	while(contador<35){
		$('#listado_incidencias_llamadas #fila').eq(contador).children().css('background-color', '#fcfacf')
		contador++;
	}
	
	*/
	//controlar si cambio de color al editar campo
	$(".table input").change(function(){
		if($(this).attr('title')!=$(this).val())
			$(this).css('color','red');
		else
			$(this).css('color','black');
		});
	//controla que solo se puedan meter numericos y ademas solo un punto y no al principio sin numero delante
	$(".table input").keypress(function(event){
		
		const charCode = (event.which) ? event.which : event.keyCode;
		if($(this).attr('id')!='BA_Cobre_clientes'
			&&$(this).attr('id')!='BA_Clientes'
			&&$(this).attr('id')!='Tv_Cobre_Clientes'
			&&$(this).attr('id')!='Tv_Fibra_Clientes'
			&&$(this).attr('id')!='Tv_Clientes'
			&&$(this).attr('id')!='Voz_Cobre_Clientes'
			&&$(this).attr('id')!='Voz_Clientes'
			&&$(this).attr('id')!='Voz_Clientes'
			&&$(this).attr('id')!='NEBA_FIBRA_CLIENTES'
			&&$(this).attr('id')!='NEBA_FIBRA_DISPONIBILIDAD'
			&&$(this).attr('id')!='NEBA_LOCAL_CLIENTES'
			&&$(this).attr('id')!='NEBA_LOCAL_INDISPONIBILIDAD'
			&&$(this).attr('id')!='NEBA_COBRE_CLIENTES'
			&&$(this).attr('id')!='NEBA_COBRE_INDISPONIBILIDAD'
			&&$(this).attr('id')!='NEBA_FIBRA_DURACION'
			&&$(this).attr('id')!='NEBA_LOCAL_DURACION'
			&&$(this).attr('id')!='NEBA_COBRE_DURACION'
			&&$(this).attr('id')!='Tv_Fibra_Clientes'
									
					
			){
			if (charCode > 31 &&  (charCode < 48 || charCode > 57) && charCode!=46 ) {
	          return false;
	        }
	        if(charCode==46&&$(this).val().includes('.')){
	        	return false;
	        }
	        if(charCode==46&&$(this).val()==''){
	        	return false;
	        }
        }else{
        	if ((charCode < 48 || charCode > 57) ) {
  	          return false;
  	        }
        }
        
	});

	if (registrodatosAdicionales == null){
		$('#cajaDatosAdicionales1').css('display','none');
		$('#cajaDatosAdicionales2').css('display','none');
		$('#cajaDatosAdicionales3').css('display','none');
		$('#cajaDatosAdicionales4').css('display','none');
		$('#cajaDatosAdicionales5').css('display','none');
		$('#cajaDatosAdicionales6').css('display','none');
		
		$('#tituloInci').text("Introduzca valores para realizar búsqueda")
		
	}else{
		$('#cajaDatosAdicionales1').css('display','inline');
		$('#cajaDatosAdicionales2').css('display','inline');
		$('#cajaDatosAdicionales3').css('display','inline');
		$('#cajaDatosAdicionales4').css('display','inline');
		$('#cajaDatosAdicionales5').css('display','inline');
		$('#cajaDatosAdicionales6').css('display','inline');
		
		$('#tituloInci').text("Incidencia a regularizar")
	}
});
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

var regularizaciones = {
		s_contextPath:"",
		
		formateoFechaJson: function(fecha){
			var fechaHora = fecha.split(" ");	
			var arrayfecha = fechaHora[0].split("/");
			var hora = fechaHora[1];
			return  arrayfecha[0]+"-"+arrayfecha[1]+"-"+arrayfecha[2]+" "+hora;
		
			
		},
		formateoFechaJsonDatatables: function(fecha){
			var fechaHora = fecha.split(" ");	
			var arrayfecha = fechaHora[0].split("/");
			var hora = fechaHora[1];
			return  arrayfecha[2]+"-"+arrayfecha[1]+"-"+arrayfecha[0]+" "+hora;
		
			
		},
				
		buscarregularizaciones: function(path){
			
			var tipoBusqueda = $('#tipoBusqueda').val();
			var numSemanaMes =$('#idsemana').val();
			var numIncidencia =$('#numincidenciaBuscador').val().trim();
			var tipoIncidencia = $('#tipoBusqueda').val();
			var annioBusqueda =  $('#annioBusqueda').val();
			var provincia = $('#annioBusqueda').val();
			
			if (numIncidencia == ''){
				
				BootstrapDialog.confirm({
					title: 'Falta número de incidencia',
					message: "No se puede buscar un registro sin numero de incidencia",
					type: BootstrapDialog.TYPE_DANGER,
					btnOKLabel: "Aceptar", 
					callback: function(result) {
						if (result) {
							return null;	
						} else {
						}
					}
				});	
			}
				
			
			//Se mete en sesion los datos de los select generales para que al refrescar se mantengan los valores
			sessionStorage.setItem("numSemana", $('#idsemana').val());
			sessionStorage.setItem("tipoBusqueda", $('#tipoBusqueda').val());
			sessionStorage.setItem("annioBusqueda", $('#annioBusqueda').val());
			
			//poner a null el tipo de busqueda cuando venga informado el num_incidencia	
			var inRegularizaciones = {
					id_incidencia : $('#numincidenciaBuscador').val(),
					numSemanaMes : $('#idsemana').val(),
					provincia : $('#provinciaBuscador').val(),
					annioBusqueda :  $('#annioBusqueda').val(),
					tipo: $('#tipoBusqueda').val()
			};	
			$.ajax({
					type: "POST", 
					timeout: 50000,
					url: "regularizaciones/buscar",
					contentType : 'application/json; charset=utf-8',
				    dataType : 'json',
					//data: ...vistasProv..., //URL: https://datatables.net/reference/option/ajax.data
					data: JSON.stringify(inRegularizaciones)
						
					})
				    .done(function( data, textStatus, jqXHR ) {
				    	registroIncidencia = data.listadoIncidenciasRegularizada;
				    	registroIncidenciaLlamada = data.listadoIncidenciasDisponibilidadLlamadasRegularizada;
				    	registrodatosAdicionales = data.datosAdicionalesRegularizaciones;
				    	regularizaciones.pintarDatosEnPantalla(registroIncidencia,registroIncidenciaLlamada,registrodatosAdicionales)
				    	return data;
			        }).
			        fail(function( jqXHR, textStatus, errorThrown ) { //URL: https://stackoverflow.com/questions/35475964/datatables-ajax-call-error-handle
			        	//_this.ajax_error(xhr, error, thrown);
			        })	            		
		},
		pintarDatosEnPantalla: function(registroIncidencia,registroIncidenciaLlamadaLlamada,registrodatosAdicionales){
			
			$("input").css('color','black');
			
			//primero se resetean los valores adicionales en la pantalla
			$("#tipoeliminar option[value=No]").attr("selected",true);//Dejamos no por defecto
			$('#solicitante').val("");
			$('#autorizador').val("");
			$('#descripcion').val("");
						
			if(registroIncidencia!=null){
				
				$('#cajaDatosAdicionales1').css('display','inline');
				$('#cajaDatosAdicionales2').css('display','inline');
				$('#cajaDatosAdicionales3').css('display','inline');
				$('#cajaDatosAdicionales4').css('display','inline');
				$('#cajaDatosAdicionales5').css('display','inline');
				$('#cajaDatosAdicionales6').css('display','inline');
				
				$('#tituloInci').text("Incidencia a regularizar")
				
				$('#ID').val(registroIncidencia.id);
				$('#FECHA').val(registroIncidencia.fecha);
				$('#TIPO').val(registroIncidencia.tipo);
				$('#PROVINCIA').val(registroIncidencia.provincia);
				$('#BA_Cobre_clientes').val(registroIncidencia.baCobreClientes);
				$('#BA_Cobre_Indisponibilidad').val(registroIncidencia.baCobreIndisponibilidad);
				$('#BA_Cobre_Duracion').val(registroIncidencia.baCobreDuracion);
				$('#BA_Fibra_Clientes').val(registroIncidencia.baFibraClientes);
				$('#BA_Fibra_Indisponibilidad').val(registroIncidencia.baFibraIndisponibilidad);
				$('#BA_Fibra_Duracion').val(registroIncidencia.baFibraDuracion);
				$('#BA_Clientes').val(registroIncidencia.baClientes);
				$('#BA_Indisponibilidad').val(registroIncidencia.baIndisponibilidad);
				$('#BA_Duracion').val(registroIncidencia.baDuracion);
				$('#Tv_Cobre_Clientes').val(registroIncidencia.tvCobreClientes);
				$('#Tv_Cobre_Indisponibilidad').val(registroIncidencia.tvCobreIndisponibilidad);
				$('#Tv_Cobre_Duracion').val(registroIncidencia.tvCobreDuracion);
				$('#Tv_Fibra_Clientes').val(registroIncidencia.tvFibraClientes);
				$('#Tv_Fibra_Indisponibilidad').val(registroIncidencia.tvFibraIndisponibilidad);
				$('#Tv_Fibra_Duracion').val(registroIncidencia.tvFibraDuracion);
				$('#Tv_Clientes').val(registroIncidencia.tvClientes);
				$('#Tv_Indisponibilidad').val(registroIncidencia.tvIndisponibilidad);
				$('#Tv_Duracion').val(registroIncidencia.tvDuracion);
				$('#Voz_Cobre_Clientes').val(registroIncidencia.vozCobreClientes);
				$('#Tv_Cobre_Indisponibilidadd').val(registroIncidencia.tvCobreIndisponibilidad);
				$('#Tv_Cobre_Duraciond').val(registroIncidencia.tvCobreDuracion);
				$('#Tv_Fibra_Clientesd').val(registroIncidencia.tvFibraClientes);
				$('#Voz_Fibra_Indisponibilidad').val(registroIncidencia.vozFibraIndisponibilidad);
				$('#Voz_Fibra_Duracion').val(registroIncidencia.vozFibraDuracion);
				$('#Voz_Clientes').val(registroIncidencia.vozClientes);
				$('#Voz_Indisponibilidad').val(registroIncidencia.vozIndisponibilidad);
				$('#Voz_Duracion').val(registroIncidencia.vozDuracion);
				$('#MFE_Clientes').val(registroIncidencia.mfeClientes);
				$('#MFE_Indisponibilidad').val(registroIncidencia.mfeIndisponibilidad);
				$('#MFE_Duracion').val(registroIncidencia.mfeDuracion);
				$('#NEBA_FIBRA_CLIENTESS').val(registroIncidencia.nebaFibraClientes);
				$('#nebaFibraDisponibilidad').val(registroIncidencia.nebaFibraIndisponibilidad);
				$('#NEBA_LOCAL_CLIENTES').val(registroIncidencia.nebaLocalClientes);
				$('#NEBA_LOCAL_INDISPONIBILIDAD').val(registroIncidencia.nebaLocalClientes);
				$('#NEBA_COBRE_CLIENTES').val(registroIncidencia.nebaCobreClientes);
				$('#NEBA_COBRE_INDISPONIBILIDAD').val(registroIncidencia.nebaCobreIndisponibilidad);
				$('#NEBA_FIBRA_DURACION').val(registroIncidencia.nebaFibraDuracion);
				$('#NEBA_LOCAL_DURACION').val(registroIncidencia.nebaLocalDuracion);
				$('#NEBA_COBRE_DURACION').val(registroIncidencia.nebaCobreDuracion);
				$('#Red').val(registroIncidencia.red);
				$('#Equipo').val(registroIncidencia.equipo);
				$('#RESPONSABLE').val(registroIncidencia.responsable);
				$('#Fecha_Creacion').val(registroIncidencia.fechaCreacion);
				$('#Fecha_Reparacion').val(registroIncidencia.fechaReparacion);
				$('#Fecha_Franqueo').val(registroIncidencia.fechaFranqueo);
				$('#Fecha_Cierre').val(registroIncidencia.fechaCierre);
				$('#BA_Fibra_Indisponibilidad_Ponderada').val(registroIncidencia.baFibraIndisponibilidadPonderada);
				$('#BA_Fibra_Duracion_Ponderadad').val(registroIncidencia.baFibraDuracionPonderada);
				$('#Tv_Cobre_Indisponibilidad_Ponderada').val(registroIncidencia.tvCobreIndisponibilidadPonderada);
				$('#BA_Cobre_Duracion_Ponderada').val(registroIncidencia.baCobreDuracionPonderada);
				$('#Tv_Fibra_Indisponibilidad_Ponderada').val(registroIncidencia.tvFibraIndisponibilidadPonderada);
				$('#BA_Fibra_Duracion_Ponderada').val(registroIncidencia.baFibraDuracionPonderada);
				$('#Tv_Indisponibilidad_Ponderada').val(registroIncidencia.tvIndisponibilidadPonderada);
				$('#Tv_Duracion_Ponderada').val(registroIncidencia.tvDuracionPonderada);
				$('#Voz_Cobre_Indisponibilidad_Ponderada').val(registroIncidencia.vozCobreIndisponibilidadPonderada);
				$('#Voz_Cobre_Duracion_Ponderada').val(registroIncidencia.vozCobreDuracionPonderada);
				$('#Voz_Fibra_Indisponibilidad_Ponderada').val(registroIncidencia.vozFibraIndisponibilidadPonderada);
				$('#Voz_Fibra_Duracion_Ponderada').val(registroIncidencia.vozFibraDuracionPonderada);
				$('#Voz_Indisponibilidad_Ponderada').val(registroIncidencia.vozIndisponibilidadPonderada);
				$('#Voz_Duracion_Ponderada').val(registroIncidencia.vozDuracionPonderada);
				$('#MFE_Indisponibilidad_Ponderada').val(registroIncidencia.mfeIndisponibilidadPonderada);
				$('#MFE_Duracion_Ponderada').val(registroIncidencia.mfeDuracionPonderada);
				$('#FQ1').val(registroIncidencia.fq1);
				$('#FQ2').val(registroIncidencia.fq2);
				$('#FQ3').val(registroIncidencia.fq3);
				$('#FQ4').val(registroIncidencia.fq4);
				$('#FQ5').val(registroIncidencia.fq5);
				$('#FQ6').val(registroIncidencia.fq6);
				$('#SUMINISTRADOR').val(registroIncidencia.suministrador);
				$('#TECOLOGIA').val(registroIncidencia.tecnologia);
				$('#MODELO').val(registroIncidencia.modelo);
				$('#TIPO_DE_SINTOMA').val(registroIncidencia.tipoDeSintoma);
				$('#Falta_Repuesto').val(registroIncidencia.faltaRepuesto);
				$('#Tipo_Metereologico').val(registroIncidencia.tiempoMetereologico);
				$('#Causa').val(registroIncidencia.causa);
				$('#Causa_igri').val(registroIncidencia.causaIgri);
				$('#SEVERIDAD').val(registroIncidencia.severidad);
				$('#ACI_F_INICIO').val(registroIncidencia.aciFInicio);
				$('#ACI_F_FIN').val(registroIncidencia.aciFFin);
				$('#ACI_F_DESCRIPCION').val(registroIncidencia.aciDescripcion);
				$('#ACI_F_CAUSA').val(registroIncidencia.aciFCausa);
				$('#ACI_SAF').val(registroIncidencia.aciSaf);
				$('#ACI_ANALISIS').val(registroIncidencia.aciAnalisis);
				$('#ACI_SEVERIDAD').val(registroIncidencia.aciSeveridad);
				
				var contador = 0;
				while(contador<$('#listado_incidencias #fila').length){
					
					$('#listado_incidencias #fila').eq(contador).children().eq(1).children().attr('title', $('#listado_incidencias #fila').eq(contador).children().eq(1).children().val())
				    var valor =$('#listado_incidencias #fila').eq(contador).children().eq(1).children().val()
					if(valor !=null && valor.length>33){
						$('#listado_incidencias #fila').eq(contador).children().eq(1).children().val(valor.substring(0,33)+'...')
					}
					contador++;
				}
				
				
			}
			if(registroIncidenciaLlamadaLlamada!=null){
				$('#SEC_SUPERIOR').val(registroIncidenciaLlamadaLlamada.secSuperior);
				$('#FechaLLAMADAS').val(registroIncidenciaLlamadaLlamada.fecha);	
				$('#TIPOLLAMADAS').val(registroIncidenciaLlamadaLlamada.tipo);	
				$('#PROVINCIALLAMADAS').val(registroIncidenciaLlamadaLlamada.provincia);	
				$('#DATOS_COBRE').val(registroIncidenciaLlamadaLlamada.datosCobre);	
				$('#DATOS_FIBRA').val(registroIncidenciaLlamadaLlamada.datosFibra);	
				$('#VOZ').val(registroIncidenciaLlamadaLlamada.voz);	
				$('#VOZ_IP').val(registroIncidenciaLlamada.vozIp);	
				$('#TV_COBRE').val(registroIncidenciaLlamada.tvCobre);	
				$('#TV_FIBRA').val(registroIncidenciaLlamada.tvFibra);	
				$('#TV').val(registroIncidenciaLlamada.tv);	
				$('#MFE').val(registroIncidenciaLlamada.mfe);	
				$('#DTH').val(registroIncidenciaLlamada.dth);	
				$('#OTT').val(registroIncidenciaLlamada.ott);	
				$('#CLIE_DATOS_COBRE').val(registroIncidenciaLlamada.clieDatosCobre);	
				$('#CLIE_DATOS_FIBRA').val(registroIncidenciaLlamada.clieDatosFibra);	
				$('#CLIE_VOZ').val(registroIncidenciaLlamada.clieVoz);	
				$('#CLIE_VOZ_IP').val(registroIncidenciaLlamada.clieVozIp);	
				$('#CLIE_TV_COBRE').val(registroIncidenciaLlamada.clieTvCobre);	
				$('#CLIE_TV_FIBRA').val(registroIncidenciaLlamada.clieTvFibra);	
				$('#CLIE_TV').val(registroIncidenciaLlamada.clieTv);	
				$('#CLIE_MFE').val(registroIncidenciaLlamada.clieMfe);	
				$('#CLIE_DTH').val(registroIncidenciaLlamada.clieDth);	
				$('#CLIE_OTT').val(registroIncidenciaLlamada.clieOtt);	
				$('#DURACION_DATOS_COBRE').val(registroIncidenciaLlamada.duracionDatosCobre);	
				$('#DURACION_DATOS_FIBRA').val(registroIncidenciaLlamada.duracionDatosFibra);	
				$('#DURACION_VOZ').val(registroIncidenciaLlamada.duracionVoz);	
				$('#DURACION_VOZ_IP').val(registroIncidenciaLlamada.duracionVozIp);	
				$('#DURACION_TV_COBRE').val(registroIncidenciaLlamada.duracionTvCobre);
				$('#DURACION_TV_FIBRA').val(registroIncidenciaLlamada.duracionTvFibra);	
				$('#DURACION_TV').val(registroIncidenciaLlamada.duracionTv);	
				$('#DURACION_MFE').val(registroIncidenciaLlamada.duracionMfe);
				$('#DURACION_DTH').val(registroIncidenciaLlamada.duracionDth);	
				$('#DURACION_OTT').val(registroIncidenciaLlamada.duracionOtt);	
				$('#NETFLIX').val(registroIncidenciaLlamada.netflix);	
				$('#DISNEY').val(registroIncidenciaLlamada.disney);	
				$('#CLIE_NETFLIX').val(registroIncidenciaLlamada.clieNetflix);	
				$('#CLIE_DISNEY').val(registroIncidenciaLlamada.clieDisney);	
				$('#DURACION_NETFLIX').val(registroIncidenciaLlamada.duracionNetflix);	
				$('#DURACION_DISNEY').val(registroIncidenciaLlamada.duracionDisney);	
					
				var contador = 0;
				while(contador<$('#listado_incidencias_llamadas #fila').length){
					
					$('#listado_incidencias_llamadas #fila').eq(contador).children().eq(1).children().attr('title', $('#listado_incidencias_llamadas #fila').eq(contador).children().eq(1).children().val())
					var valor =$('#listado_incidencias #fila').eq(contador).children().eq(1).children().val()
					if(valor !=null && valor.length>33){
						$('#listado_incidencias_llamadas #fila').eq(contador).children().eq(1).children().val(valor.substring(0,33)+'...')
					}							
					contador++;
				}
				
				
			}
			if(registrodatosAdicionales !=null){
				$("#tipoeliminar option[value="+registrodatosAdicionales.eliminar+"]").attr("selected",true);
				$('#solicitante').val(registrodatosAdicionales.solicitante);
				$('#autorizador').val(registrodatosAdicionales.autorizador);
				$('#descripcion').val(registrodatosAdicionales.descripcion);
			}
			
			if(registroIncidencia==null){
				
				$('#cajaDatosAdicionales1').css('display','none');
				$('#cajaDatosAdicionales2').css('display','none');
				$('#cajaDatosAdicionales3').css('display','none');
				$('#cajaDatosAdicionales4').css('display','none');
				$('#cajaDatosAdicionales5').css('display','none');
				$('#cajaDatosAdicionales6').css('display','none');
				
				$('#tituloInci').text("La búsqueda no obtuvo resultados")
			}
			
			
		},
		
		ActualizarIncidenciasRegularizadas:function (varr){

			//creacion de objeto json

			BootstrapDialog.confirm({
				title: 'Confirmación de edicion de registro',
				message: "¿Está seguro de querer modificar el registro?",
				type: BootstrapDialog.TYPE_WARNING,
				btnOKLabel: "Aceptar", 
				callback: function(result) {
					if (!result) {
						return null;	
					} else {
						var Regularizaciones = {
								datosAdicionalesRegularizaciones : {

									id          :  '',
									tipo        : $('#TIPO').val(),
									idIncidencia: $('#ID').val(),
									secSuperior : $('#SEC_SUPERIOR').val(),
									fecha       : $('#FECHA').val(),
									descripcion : $('#descripcion').val(),
									solicitante : $('#solicitante').val(),
									autorizador : $('#autorizador').val(),
									provincia   : $('#PROVINCIA').val(),
									eliminar    : $("#tipoeliminar").val(),
									fechaRegistro: '',
									autor       : ''


								},
								listadoIncidenciasDisponibilidadLlamadasRegularizada : {

									fecha        : $('#FechaLLAMADAS').val(),
									secSuperior  : $('#SEC_SUPERIOR').val(),
									provincia    : $('#PROVINCIALLAMADAS').val(),
									tipo         : $('#TIPOLLAMADAS').val(),
									datosCobre   : $('#DATOS_COBRE').val(),
									datosFibra   : $('#DATOS_FIBRA').val(),
									voz          : $('#VOZ').val(),
									vozIp        : $('#VOZ_IP').val(),
									tvCobre      : $('#TV_COBRE').val(),
									tvFibra      : $('#TV_FIBRA').val(),
									tv           : $('#TV').val(),
									mfe          : $('#MFE').val(),
									dth          : $('#DTH').val(),
									ott          : $('#OTT').val(),
									netflix      : $('#NETFLIX').val(),
									disney       : $('#DISNEY').val(),
									clieDatosCobre :$('#CLIE_DATOS_COBRE').val() ,
									clieDatosFibra :$('#CLIE_DATOS_FIBRA').val() ,
									clieVoz      : $('#CLIE_VOZ').val(),
									clieVozIp    : $('#CLIE_VOZ_IP').val(),
									clieTvCobre  : $('#CLIE_TV_COBRE').val(),
									clieTvFibra  : $('#CLIE_TV_FIBRA').val(),
									clieTv       : $('#CLIE_TV').val(),
									clieMfe      : $('#CLIE_MFE').val(),
									clieDth      : $('#CLIE_DTH').val(),
									clieOtt      : $('#CLIE_OTT').val(),
									clieNetflix  : $('#CLIE_NETFLIX').val(),
									clieDisney   : $('#CLIE_DISNEY').val(),
									duracionDatosCobre : $('#DURACION_DATOS_COBRE').val(),
									duracionDatosFibra : $('#DURACION_DATOS_FIBRA').val(),
									duracionVoz  : $('#DURACION_VOZ').val(),
									duracionVozIp : $('#DURACION_VOZ_IP').val(),
									duracionTvCobre : $('#DURACION_TV_COBRE').val(),
									duracionTvFibra : $('#DURACION_TV_FIBRA').val(),
									duracionTv   : $('#DURACION_TV').val(),
									duracionMfe  : $('#DURACION_MFE').val(),
									duracionDth  : $('#DURACION_DTH').val(),
									duracionOtt  : $('#DURACION_OTT').val(),
									duracionNetflix : $('#DURACION_NETFLIX').val(),
									duracionDisney : $('#DURACION_DISNEY').val()

								},
								listadoIncidenciasRegularizada : {

									tipo         :$('#TIPO').val(),
									red          : $('#Red').val(),
									equipo       : $('#Equipo').val(),
									provincia    :$('#PROVINCIA').val(),
									id           :$('#ID').val(),
									responsable  :$('#RESPONSABLE').val(),
									fechaCreacion :$('#Fecha_Creacion').val(),
									fechaReparacion :$('#Fecha_Reparacion').val(),
									fechaFranqueo :$('#Fecha_Franqueo').val(),
									fechaCierre  :$('#Fecha_Cierre').val(),
									baCobreClientes :$('#BA_Cobre_clientes').val(),
									baCobreIndisponibilidadPonderada :$('#Voz_Cobre_Indisponibilidad_Ponderada').val(),
									baCobreDuracionPonderada : $('#BA_Cobre_Duracion_Ponderada').val(),
									baCobreIndisponibilidad :$('#BA_Cobre_Indisponibilidad').val(),
									baCobreDuracion :$('#BA_Cobre_Duracion').val(),
									baFibraClientes :$('#BA_Fibra_Clientes').val(),
									baFibraIndisponibilidadPonderada :$('#BA_Fibra_Indisponibilidad_Ponderada').val(),
									baFibraDuracionPonderada :$('#BA_Fibra_Duracion_Ponderadad').val(),
									baFibraIndisponibilidad :$('#BA_Fibra_Indisponibilidad').val(),
									baFibraDuracion :$('#BA_Fibra_Duracion').val(),
									baClientes   :$('#BA_Clientes').val(),
									baIndisponibilidadPonderada :'',
									baDuracionPonderada :'',
									baIndisponibilidad : $('#BA_Indisponibilidad').val(),
									baDuracion   : $('#BA_Duracion').val(),
									tvCobreClientes :$('#Tv_Cobre_Clientes').val(),
									tvCobreIndisponibilidadPonderada :$('#Tv_Cobre_Indisponibilidad_Ponderada').val(),
									tvCobreDuracionPonderada :'',
									tvCobreIndisponibilidad :$('#Tv_Cobre_Indisponibilidadd').val(),
									tvCobreDuracion : $('#Tv_Cobre_Duraciond').val(),
									tvFibraClientes : $('#Tv_Fibra_Clientesd').val(),
									tvFibraIndisponibilidadPonderada : $('#Tv_Fibra_Indisponibilidad_Ponderada').val(),
									tvFibraDuracionPonderada : $('#BA_Fibra_Duracion_Ponderada').val(),
									tvFibraIndisponibilidad :$('#Tv_Fibra_Indisponibilidad').val(),
									tvFibraDuracion : $('#Tv_Fibra_Duracion').val(),
									tvClientes   : $('#Tv_Clientes').val(),
									tvIndisponibilidadPonderada :$('#Tv_Indisponibilidad_Ponderada').val(),
									tvDuracionPonderada :$('#Tv_Duracion_Ponderada').val(),
									tvIndisponibilidad : $('#Tv_Indisponibilidad').val(),
									tvDuracion   : $('#Tv_Duracion').val(),
									vozCobreClientes : $('#Voz_Cobre_Clientes').val(),
									vozCobreIndisponibilidadPonderada :'',
									vozCobreDuracionPonderada :$('#Voz_Cobre_Duracion_Ponderada').val(),
									vozCobreIndisponibilidad :'',
									vozCobreDuracion : $('#Tv_Cobre_Duracion').val(),
									vozFibraClientes :$('#Tv_Fibra_Clientes').val(),
									vozFibraIndisponibilidadPonderada :$('#Voz_Fibra_Indisponibilidad_Ponderada').val(),
									vozFibraDuracionPonderada :$('#Voz_Fibra_Duracion_Ponderada').val(),
									vozFibraIndisponibilidad : $('#Voz_Fibra_Indisponibilidad').val(),
									vozFibraDuracion : $('#Voz_Fibra_Duracion').val(),
									vozClientes  :$('#Voz_Clientes').val(),
									vozIndisponibilidadPonderada :$('#Voz_Indisponibilidad_Ponderada').val(),
									vozDuracionPonderada :$('#Voz_Duracion_Ponderada').val(),
									vozIndisponibilidad :$('#Voz_Indisponibilidad').val(),
									vozDuracion  :$('#Voz_Duracion').val(),
									mfeClientes  :$('#MFE_Clientes').val(),
									mfeIndisponibilidadPonderada :$('#MFE_Indisponibilidad_Ponderada').val(),
									mfeDuracionPonderada :$('#MFE_Duracion_Ponderada').val(),
									mfeIndisponibilidad :$('#MFE_Indisponibilidad').val(),
									mfeDuracion  :$('#MFE_Duracion').val(),
									fq1          :$('#FQ1').val(),
									fq2          :$('#FQ2').val(),
									fq3          :$('#FQ3').val(),
									fq4          :$('#FQ4').val(),
									fq5          :$('#FQ5').val(),
									fq6          :$('#FQ6').val(),
									suministrador :$('#SUMINISTRADOR').val(),
									tecnologia   :$('#TECOLOGIA').val(),
									modelo       :$('#MODELO').val(),
									tipoDeSintoma :$('#TIPO_DE_SINTOMA').val(),
									faltaRepuesto :$('#Falta_Repuesto').val(),
									tiempoMetereologico :$('#Tipo_Metereologico').val(),
									fecha        :$('#FECHA').val(),
									causa        :$('#Causa').val(),
									causaIgri    :$('#Causa_igri').val(),
									subcausaIgri :$('#SEVERIDAD').val(),
									severidad    :$('#SEVERIDAD').val(),
									aciFInicio   :$('#ACI_F_INICIO').val(),
									aciFFin      :$('#ACI_F_FIN').val(),
									aciDescripcion : $('#ACI_F_DESCRIPCION').val(),
									aciCausa     :$('#ACI_F_CAUSA').val(),
									aciSaf       :$('#ACI_SAF').val(),
									aciAnalisis  :$('#ACI_ANALISIS').val(),
									aciSeveridad :$('#ACI_SEVERIDAD').val(),
									aciLocalizacion :'',
									idProblema   :'',
									concatInc1   :'',
									concatIncAvePla :'',
									concatIncAvePla2 :'',
									redIncidencia :'',
									edificioDslam :'',
									supermasivas :'',
									estadoGestion :'',
									nebaFibraClientes :$('#NEBA_FIBRA_CLIENTESS').val(),
									nebaFibraIndisponibilidad :$('#nebaFibraDisponibilidad').val(),
									nebaLocalClientes :$('#NEBA_LOCAL_CLIENTES').val(),
									nebaLocalIndisponibilidad :$('#NEBA_LOCAL_INDISPONIBILIDAD').val(),
									nebaCobreClientes :$('#NEBA_COBRE_CLIENTES').val(),
									nebaCobreIndisponibilidad :$('#NEBA_COBRE_INDISPONIBILIDAD').val(),
									nebaFibraDuracion :$('#NEBA_FIBRA_DURACION').val(),
									nebaLocalDuracion :$('#NEBA_LOCAL_DURACION').val(),
									nebaCobreDuracion :$('#NEBA_COBRE_DURACION').val(),

								}
						}

						$.ajax({
							type: "POST", 
							timeout: 50000,
							url: "regularizaciones/update",
							contentType : 'application/json; charset=utf-8',
							dataType : 'json',
							//data: ...vistasProv..., //URL: https://datatables.net/reference/option/ajax.data
							data: JSON.stringify(Regularizaciones)

						})
						.done(function( data, textStatus, jqXHR ) {
							var s_message = data;
							dycec_js.alert("Actualización de datos", s_message, BootstrapDialog.TYPE_DANGER);
							regularizaciones.buscarregularizaciones();
							return data;
						}).
						fail(function( jqXHR, textStatus, errorThrown ) { //URL: https://stackoverflow.com/questions/35475964/datatables-ajax-call-error-handle
							//_this.ajax_error(xhr, error, thrown);
						})	         
					}
				}
			});	

		}

}