package com.telefonica.controller;



import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.stream.Collectors;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.telefonica.entity.AccionesRelevantes;
import com.telefonica.entity.Comentarios;
import com.telefonica.entity.ComentariosIncidencias;
import com.telefonica.entity.InComentarios;
import com.telefonica.entity.KPIVistas;
import com.telefonica.entity.Usuario;
import com.telefonica.entity.Vista;
import com.telefonica.mapper.cdm.DB_Mapper;
import com.telefonica.util.Constantes;

@Controller
@RequestMapping("/comentarios")
public class ComentariosController {

	@Autowired
	@Qualifier("DB_Mapper")
	public  DB_Mapper db_Mapper;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ComentariosController.class);


	@RequestMapping("")
	public String inicio(Model model,HttpSession session) {	
		
			Usuario usuario = new Usuario();		
			usuario.setMatricula(session.getAttribute(Constantes.SESSION_USERNAME_STR).toString());
			usuario.setId_usuario(Integer.parseInt(session.getAttribute(Constantes.SESSION_USERNAME_ID_STR).toString()));
			
			ArrayList <KPIVistas> kpisVistas = db_Mapper.buscarKPIS();
			ArrayList <Vista> vistas = db_Mapper.buscarVistas();
			model.addAttribute("usuario",usuario);
			model.addAttribute("kpisVistas",kpisVistas);
			model.addAttribute("vistas",vistas);
			
			vistas = (ArrayList<Vista>) vistas.stream().filter(Vista -> !Vista.getId_titulo().equals("0")).collect(Collectors.toList());
			
			model.addAttribute("vistas2",vistas);
			
		return "comentarios";
	}
	@PostMapping("/buscar" )
	public ResponseEntity<?> buscar(@RequestBody InComentarios inComentarios, Model model) {	
		ArrayList<Comentarios> listComentarios = db_Mapper.buscarComentariosByFilters(inComentarios);		
		Gson gson = new GsonBuilder().setDateFormat("dd-MM-yyyy HH:mm:ss").create();
		return ResponseEntity.ok(gson.toJson(listComentarios));
	}
	@PostMapping("/buscar_comentarios_incidencias" )
	public ResponseEntity<?> buscarComentariosIncidencias(@RequestBody InComentarios inComentarios, Model model) {	
		ArrayList<ComentariosIncidencias> listComentariosIncidencias = db_Mapper.buscarComentariosIncidenciasByFilters(inComentarios);		
		Gson gson = new GsonBuilder().setDateFormat("dd-MM-yyyy HH:mm:ss").create();
		return ResponseEntity.ok(gson.toJson(listComentariosIncidencias));
	}
	@PostMapping("/insertOrUpdate" )
	public ResponseEntity<?> insertorupdate(@RequestBody Comentarios aComentarios, Model model,HttpSession session) {	
		int idGenerado;
		Gson gson = new Gson();
		String respuesta = "Registro modificado correctamente";
		try {
			if(aComentarios.getKpi()==null || aComentarios.getKpi().equals("")) {
				aComentarios.setTipo_comentario("GLOBAL");
			} else {
				aComentarios.setTipo_comentario("KPI");
			}
			aComentarios.setAutor(session.getAttribute(Constantes.MATRICULA).toString()+"/"+session.getAttribute(Constantes.SESSION_USERNAME_STR).toString());
			
			String patron = "yyyy-MM-dd HH:mm:ss";
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat (patron);
			if(aComentarios.getTimestamp()!=null)
				aComentarios.setTimestampString(simpleDateFormat.format(aComentarios.getTimestamp()));
			
			aComentarios.setComentario_1(aComentarios.getComentario_1().replace("\n", "</br>"));
			aComentarios.setComentario_2(aComentarios.getComentario_2().replace("\n", "</br>"));
			aComentarios.setComentario_3(aComentarios.getComentario_3().replace("\n", "</br>"));
			
			idGenerado = db_Mapper.insertOrUpdateComentarios(aComentarios);
			}catch(Exception e) {
				respuesta = "No se ha podio realizar la operacion"+e;
				return ResponseEntity.ok(gson.toJson(respuesta));
			}
			respuesta = idGenerado+"";
		return ResponseEntity.ok(gson.toJson(respuesta));
	}
	
	@PostMapping("/insertOrUpdateIncidencias" )
	public ResponseEntity<?> insertorupdateIncidencias(@RequestBody ComentariosIncidencias aComentariosIncidencias, Model model,HttpSession session) {	
		int idGenerado;
		Gson gson = new Gson();
		String respuesta = "Registro modificado correctamente";
		try {
			
			aComentariosIncidencias.setAutor(session.getAttribute(Constantes.MATRICULA).toString()+"/"+session.getAttribute(Constantes.SESSION_USERNAME_STR).toString());
			String patron = "yyyy-MM-dd HH:mm:ss";
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat (patron);
			if(aComentariosIncidencias.getTimestamp()!=null)
				aComentariosIncidencias.setTimestampString(simpleDateFormat.format(aComentariosIncidencias.getTimestamp()));
			
			aComentariosIncidencias.setAlias(aComentariosIncidencias.getAlias().replace("\n", "</br>"));
			aComentariosIncidencias.setDescripcion_manual(aComentariosIncidencias.getDescripcion_manual().replace("\n", "</br>"));

			idGenerado = db_Mapper.insertOrUpdateComentariosIncidencias(aComentariosIncidencias);
			}catch(Exception e) {
				respuesta = "No se ha podio realizar la operacion"+e;
				return ResponseEntity.ok(gson.toJson(respuesta));
			}
			respuesta = idGenerado+"";
		return ResponseEntity.ok(gson.toJson(respuesta));
	}
	
	
	@PostMapping("/borrar" )
	public ResponseEntity<?> borrar(@RequestBody Comentarios aComentarios, Model model) {	
		String resultado = "borrado correcto";
		try {
				String patron = "yyyy-MM-dd HH:mm:ss";
				SimpleDateFormat simpleDateFormat = new SimpleDateFormat (patron);
				aComentarios.setTimestampString(simpleDateFormat.format(aComentarios.getTimestamp()));
				
				db_Mapper.deleteComentarios(aComentarios);
			}catch(Exception e) {	
				resultado="No se ha podio realizar la operacion"+e;				
			}
		Gson gson = new Gson();
		return ResponseEntity.ok(gson.toJson(resultado));
	}
	@PostMapping("/borrarIncidencias" )
	public ResponseEntity<?> borrarIncidencias(@RequestBody ComentariosIncidencias aComentariosIncidencias, Model model) {	
		String resultado = "borrado correcto";
		try {
				String patron = "yyyy-MM-dd HH:mm:ss";
				SimpleDateFormat simpleDateFormat = new SimpleDateFormat (patron);
				
				aComentariosIncidencias.setTimestampString(simpleDateFormat.format(aComentariosIncidencias.getTimestamp()));
				db_Mapper.deleteComentariosIncidencias(aComentariosIncidencias);
			}catch(Exception e) {	
				resultado="No se ha podio realizar la operacion"+e;				
			}
		Gson gson = new Gson();
		return ResponseEntity.ok(gson.toJson(resultado));
	}	

}
	
	
