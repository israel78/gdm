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
import com.telefonica.entity.InBusquedaAcciones;
import com.telefonica.entity.Usuario;
import com.telefonica.mapper.cdm.DB_Mapper;
import com.telefonica.util.Constantes;

@Controller
@RequestMapping("/acciones_relevantes")
public class AccionesController {
	@Autowired
	@Qualifier("DB_Mapper")
	public  DB_Mapper db_Mapper;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(IncidenciasController.class);

	@RequestMapping("")
	public String inicio(Model model,HttpSession session) {
		
		Usuario usuario = new Usuario();		
		usuario.setMatricula(session.getAttribute(Constantes.MATRICULA).toString()+"/"+session.getAttribute(Constantes.SESSION_USERNAME_STR).toString());
		usuario.setId_usuario(Integer.parseInt(session.getAttribute(Constantes.SESSION_USERNAME_ID_STR).toString()));
		model.addAttribute("usuario",usuario);
		
		return "acciones_relevantes";
	}
	@PostMapping("/buscar" )
	public ResponseEntity<?> buscar(@RequestBody InBusquedaAcciones inBusquedaAcciones, Model model) {	
		ArrayList<AccionesRelevantes> listAccionesRelevantes = db_Mapper.buscarAccionesByFilters(inBusquedaAcciones);		
		Gson gson = new GsonBuilder().setDateFormat("dd-MM-yyyy HH:mm:ss").create();
		return ResponseEntity.ok(gson.toJson(listAccionesRelevantes));
	}
	@PostMapping("/insertOrUpdate" )
	public ResponseEntity<?> insertorupdate(@RequestBody AccionesRelevantes aRelevantes, Model model,HttpSession session) {	
		int idGenerado;
		Gson gson = new Gson();
		String respuesta = "Registro modificado correctamente";
		
		 aRelevantes.setAutor(session.getAttribute(Constantes.MATRICULA).toString()+"/"+session.getAttribute(Constantes.SESSION_USERNAME_STR).toString());
		
		String patron = "yyyy-MM-dd HH:mm:ss";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat (patron);
		if(aRelevantes.getTimestamp()!=null)
			aRelevantes.setTimestampString(simpleDateFormat.format(aRelevantes.getTimestamp()));
		try {
			aRelevantes.setTitulo(aRelevantes.getTitulo().replace("\n", "</br>"));
			aRelevantes.setMotivo(aRelevantes.getMotivo().replace("\n", "</br>"));
			aRelevantes.setCodigo_BTP_CRQ(aRelevantes.getCodigo_BTP_CRQ().replace("\n", "</br>"));
			aRelevantes.setDescripcion(aRelevantes.getDescripcion().replace("\n", "</br>"));
			
			idGenerado = db_Mapper.insertOrUpdateAccionesRelevantes(aRelevantes);
			}catch(Exception e) {
				respuesta = "No se ha podio realizar la operacion"+e;
				return ResponseEntity.ok(gson.toJson(respuesta));
			}
			respuesta = idGenerado+"";
		return ResponseEntity.ok(gson.toJson(respuesta));
	}
	@PostMapping("/borrar" )
	public ResponseEntity<?> borrar(@RequestBody AccionesRelevantes aRelevantes, Model model) {	
		String resultado = "borrado correcto";
		try {
				db_Mapper.deleteAccionesRelevantes(aRelevantes);
			}catch(Exception e) {	
				resultado="No se ha podio realizar la operacion"+e;				
			}
		Gson gson = new Gson();
		return ResponseEntity.ok(gson.toJson(resultado));
	}

}
