package com.telefonica.controller;

import java.text.SimpleDateFormat; 
import java.util.ArrayList;
import javax.servlet.http.HttpSession;
import org.slf4j.Logger; 
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.telefonica.entity.AccionesRelevantes;
import com.telefonica.entity.InBusquedaIncidencias;
import com.telefonica.entity.IncidenciasRelevantes_oldd;
import com.telefonica.entity.IncidenciasRelevantes;
import com.telefonica.entity.Params;
import com.telefonica.entity.Usuario;
import com.telefonica.mapper.cdm.DB_Mapper;
import com.telefonica.util.Constantes;	

@Controller
@RequestMapping("/incidencias")
public class IncidenciasController {

	@Autowired
	@Qualifier("DB_Mapper")
	public  DB_Mapper db_Mapper;
	private static final Logger LOGGER = LoggerFactory.getLogger(IncidenciasController.class);
	@RequestMapping("")
	public String inicio(Model model,HttpSession session) {
		
		Usuario usuario = new Usuario();
		
		
		usuario.setMatricula(session.getAttribute(Constantes.SESSION_USERNAME_STR).toString());
		usuario.setId_usuario(Integer.parseInt(session.getAttribute(Constantes.SESSION_USERNAME_ID_STR).toString()));
		model.addAttribute("usuario",usuario);
		
		return "incidencias_relevantes";
	}	
	@PostMapping("/buscar" )
	public ResponseEntity<?> buscar(@RequestBody IncidenciasRelevantes params, Model model) {	
		
		IncidenciasRelevantes in = new IncidenciasRelevantes();
		in.setN_incidencia(params.getN_incidencia());
		//in.setTipo(params.getTipoBusqueda());
		in.setSemana(params.getSemana());
		in.setTipo(params.getTipo());
		in.setSubtipo(params.getSubtipo());
		in.setFecha_inicio(params.getFecha_inicio());
		in.setFecha_fin(params.getFecha_fin());
		in.setId(params.getId());
		in.setAnno_cdm(params.getAnno_cdm());
					
		ArrayList<IncidenciasRelevantes> listIncidenciasRelevantes = db_Mapper.buscarIncidenciasRelevantesByFilters(in);
		//SimpleDateFormat df = new SimpleDateFormat("dd-MM-yyyy HH:mm");
		/*for (IncidenciasRelevantes incidenciasRelevantes : listIncidenciasRelevantes) {
			
			
			incidenciasRelevantes.setFecha_texto(df.format(incidenciasRelevantes.getFecha()));
			incidenciasRelevantes.setFecha_inicio_texto(df.format(incidenciasRelevantes.getFecha_inicio()));
			incidenciasRelevantes.setFecha_fin_texto(df.format(incidenciasRelevantes.getFecha_fin()));
			 horas =	incidenciasRelevantes.getIndisponibilidad()/60;
			 minutos =  incidenciasRelevantes.getIndisponibilidad()%60;
			incidenciasRelevantes.setIndisponibilidad_texto((int)horas+":"+(int)minutos);	
		}*/
		Gson gson = new GsonBuilder().setDateFormat("dd-MM-yyyy HH:mm:ss").create();;
		
		
		
		return  ResponseEntity.ok(gson.toJson(listIncidenciasRelevantes));
	}
	
	@PostMapping("/insertOrUpdate" )
	public ResponseEntity<?> insertOrUpdate(@RequestBody IncidenciasRelevantes incidenciasRelevante, Model model,HttpSession session) {
		
		int idGenerado;
		Gson gson = new Gson();
		String respuesta = "Registro modificado correctamente";
		
		incidenciasRelevante.setAutor(session.getAttribute(Constantes.MATRICULA).toString()+"/"+session.getAttribute(Constantes.SESSION_USERNAME_STR).toString());
		
		String patron = "yyyy-MM-dd HH:mm:ss";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat (patron);
		if(incidenciasRelevante.getTimestamp()!=null)
			incidenciasRelevante.setTimestampString(simpleDateFormat.format(incidenciasRelevante.getTimestamp()));
		try {
			incidenciasRelevante.setIndisponibilidad(incidenciasRelevante.getIndisponibilidad().replace("\n", "</br>"));
			incidenciasRelevante.setDescripcion(incidenciasRelevante.getDescripcion().replace("\n", "</br>"));
			incidenciasRelevante.setAcciones_recuperacion(incidenciasRelevante.getAcciones_recuperacion().replace("\n", "</br>"));
			incidenciasRelevante.setAcciones_mejora_responsables(incidenciasRelevante.getAcciones_mejora_responsables().replace("\n", "</br>"));
			incidenciasRelevante.setCausa(incidenciasRelevante.getCausa().replace("\n", "</br>"));
			incidenciasRelevante.setServicio_afectado(incidenciasRelevante.getServicio_afectado().replace("\n", "</br>"));



			idGenerado = db_Mapper.insertOrUpdateIncidenciasRelevantes(incidenciasRelevante);
			}catch(Exception e) {
				respuesta = "No se ha podio realizar la operacion"+e;
				return ResponseEntity.ok(gson.toJson(0));
			}
			respuesta = idGenerado+"";
		return ResponseEntity.ok(gson.toJson(respuesta));
	}
	@PostMapping("/borrar" )
	public ResponseEntity<?> borrar(@RequestBody IncidenciasRelevantes incidenciaRelevante, Model model) {	
		String resultado = "borrado correcto";
		try {
				db_Mapper.deleteIncidenciaRelevante(incidenciaRelevante);
			}catch(Exception e) {	
				resultado="No se ha podio realizar la operacion"+e;				
			}
		Gson gson = new Gson();
		return ResponseEntity.ok(gson.toJson(resultado));
	}
}

