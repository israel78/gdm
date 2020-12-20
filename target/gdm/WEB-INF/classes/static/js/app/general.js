$( document ).ready(function() {
	
	var numSemana = sessionStorage.getItem("numSemana");
	var tipoBusqueda = sessionStorage.getItem("tipoBusqueda");
	var annioBusqueda = sessionStorage.getItem("annioBusqueda");
	var fecha = new Date();
	var ano = fecha.getFullYear();
	
	//AIM al cargar el menu lateral se leen los objetos de sesion y si no existen por que se entra por primera vez, se establecen los options por defecto
	if(numSemana!=null&&numSemana!=""){
		
			
		
		if(tipoBusqueda=='MENSUAL'){
			html = '<label class="col-sm-12 col-form-label">Num. mes</label> <select'+
			' id ="idsemana" class="form-control m-b" name="account">';

			if(annioBusqueda == ano){
				for (var i = 1; i <= mesMax; i++) {
					html = html+'<option>'+i+'</option>';
				}
			}else{
				for (var i = 1; i <= 12; i++) {
					html = html+'<option>'+i+'</option>';
				}
			}



			html+='</select>';
		}else{
			
			html = '<label class="col-sm-12 col-form-label">Num. semana</label> <select'+
			' id ="idsemana" class="form-control m-b" name="account">';

			if(annioBusqueda == ano){

				for (var i = 1; i <= semMax; i++) {
					html = html+'<option>'+i+'</option>';
				}	

			}else{
				for (var i = 1; i <= 52; i++) {
					html = html+'<option>'+i+'</option>';
				}	
			}
			html+='</select>';
		}

		$('#selectMesSemana').html(html);	
		$('#tipoBusqueda').val(tipoBusqueda);
		$('#idsemana').val(numSemana);
		$('#annioBusqueda').val(annioBusqueda);
						
	}else {
		 html = '<label class="col-sm-12 col-form-label">Num. semana</label> <select'+
			' id ="idsemana" class="form-control m-b" name="account">';
			for (var i = 1; i <= semMax; i++) {
				html = html+'<option>'+i+'</option>';
			}	
		html+='</select>';
		$('#selectMesSemana').html(html);
		
		$('#tipoBusqueda').val("SEMANAL");
		$('#idsemana').val(semMax);
		$('#annioBusqueda').val(new Date().getFullYear());	
	
	}
	
	
	$('#fechaFinVer').datetimepicker({
		useCurrent: false,
		format: 'dd-mm-yyyy hh:ii:ss',
		autoclose: true,
		todayHighlight: true,
		language: 'es'
        
    });
	$('#fechaInicioVer').datetimepicker({
		useCurrent: false,
		format: 'dd-mm-yyyy hh:ii:ss',
		autoclose: true,
		todayHighlight: true,
		language: 'es'
        
    });
	$('#fechaFin').datetimepicker({
		useCurrent: false,
		format: 'dd-mm-yyyy hh:ii:ss',
		autoclose: true,
		todayHighlight: true,
		language: 'es'
        
    });
	$('#fechaInicio').datetimepicker({
		useCurrent: false,
		format: 'dd-mm-yyyy hh:ii:ss',
		autoclose: true,
		todayHighlight: true,
		language: 'es'
        
    });
	$('#fechaSemanaVer').datetimepicker({
		useCurrent: false,
		format: 'dd-mm-yyyy hh:ii:ss',
		autoclose: true,
		todayHighlight: true,
		language: 'es'
        
    });
	
	

});

var general = {
	
	conservaLateral: function(){
		
		sessionStorage.setItem("numSemana", $('#idsemana').val());
		sessionStorage.setItem("tipoBusqueda", $('#tipoBusqueda').val());
		sessionStorage.setItem("annioBusqueda", $('#annioBusqueda').val());
		
	},
	cambioSelectorMesSemana: function (mesMax,semMax){
		
		
		var fecha = new Date();
		var ano = fecha.getFullYear();
		
		tipoBusqueda = $('#tipoBusqueda').val();
		var annioBusqueda = $('#annioBusqueda').val();
		var contador = 0;
		var options = null;
		var tipoId = "";
		if(tipoBusqueda=='SEMANAL'){
			tipoId = "Num. semana";
			if(ano == annioBusqueda){
				for (var i = 1; i <= semMax; i++) {
					options = options+'<option>'+i+'</option>';
				}	
			}else{
				for (var i = 1; i <= 52; i++) {
					options = options+'<option>'+i+'</option>';
				}
			}
		}else{
			tipoId = "Num. mes";
			if(ano == annioBusqueda){
				for (var i = 1; i <= mesMax; i++) {
					options = options+'<option>'+i+'</option>';
				}
			}else{
				for (var i = 1; i <= 12; i++) {
					options = options+'<option>'+i+'</option>';
				}
			}
			
		}
		var html = '<label class="col-sm-12 col-form-label">'+tipoId+'</label> <select'+
		' id ="idsemana" id="tipoBusqueda" class="form-control m-b" name="account">'+
		''+options+''+
		'</select>';
		
		$('#selectMesSemana').empty().append(html);		
	},
	HtmlDecode: function (s) {
	    return $('<div>').html(s).text();
	},
}