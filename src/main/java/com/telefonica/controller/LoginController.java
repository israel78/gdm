package com.telefonica.controller;



import javax.servlet.http.HttpSession; 

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.telefonica.entity.Consulta_DatosProxy;
import com.telefonica.entity.Usuario;
import com.telefonica.entity.UsuarioEDomus;
import com.telefonica.mapper.cdm.DB_Mapper;
import com.telefonica.mapper.ifsi.DB_IFSI_Mapper;
import com.telefonica.util.Constantes;

@Controller
public class LoginController {

	@Autowired
	public  DB_Mapper db_Mapper;
	@Autowired
	public  DB_IFSI_Mapper db_IFSI_Mapper;
	
	

	
	private static final Logger LOGGER = LoggerFactory.getLogger(LoginController.class);
	//private static final String NOMBRE_FICHERO = "credencialesEdomus.properties";
	private static final String AUTHORIZATION = "Authorization";
	//private static final String URL_EDOMUS = "https://edomus.tesa/lt/portal/intranet/es/BuscadorPersonas?action=es.indra.telefonica.apps.buscadorpersonas.portlet.BuscadorPersonasAction&vgnextoid=bf7f6c2bc8ebb210VgnVCM10000055d81aacRCRD";
	private static final String URL_EDOMUS = "https://edomus.tesa/lt/portal/intranet/es/BuscadorPersonas?action=es.indra.telefonica.apps.buscadorpersonas.portlet.BuscadorPersonasAction&vgnextoid=bf7f6c2bc8ebb210VgnVCM10000055d81aacRCRD";

	@RequestMapping("/")
	public String index(Model model) {
	//Usuario u =	db_Mapper.selectUsuarioByMatricula("t723072");
		model.addAttribute("usuario", new Usuario());
		return "common/logins/login-inspirina";
	}
	@RequestMapping("/login")
	public String login(Usuario usuario,Model model,HttpSession session,RedirectAttributes redirectAttributes) {	
		String resultActionStr = "common/logins/login-inspirina"; // establecemos la acción a Login por defecto
		
		// Si el username es distinto a null
		if (usuario.getMatricula() != null) {
			
			Consulta_DatosProxy consulta_DatosProxy = db_IFSI_Mapper.select_call_Consulta_DatosProxy();

			UsuarioEDomus usuarioEdomus =   new UsuarioEDomus(consulta_DatosProxy);
			try {
				usuarioEdomus.cargarUsuario(usuario.getMatricula());
			}catch(Exception e) {
				System.out.println(e.getMessage());
			}
			
			Usuario usuarioBD = db_Mapper.selectUsuarioByMatricula(usuario.getMatricula());
			// Si el usuario no está dado de alta en la BD de la aplicación mostramos página de error
			if (//(usuarioEdomus.getIdentificador()==null||("").equals(usuarioEdomus.getIdentificador()))||
					usuarioBD == null) {	
	 
			//} else if (((usuarioEdomus.getIdentificador()==null||("").equals(usuarioEdomus.getIdentificador()))||!usuarioBD.getPassword().equals(usuario.getPassword()))) {
				// si el la contraseña del usuario no coincide le llevamo al login
			} else {
				//AIM calcular el dia maximo semanal de las incidencias y mensual,			
				//meterlo como objeto de sesion
				// Ok, usuario y password correctos		
				session.setAttribute(Constantes.SESSION_USERNAME_STR, usuarioBD.getNombre()+", "+usuarioEdomus.getApellidos());
				session.setAttribute(Constantes.SESSION_USERNAME_ID_STR, usuarioBD.getId_usuario());
				session.setAttribute(Constantes.MAX_SEMANA, db_Mapper.selectMaxSemanaIncidencias());
				session.setAttribute(Constantes.MAX_MES, db_Mapper.selectMaxMesIncidencias());
				session.setAttribute(Constantes.MATRICULA, usuarioEdomus.getIdentificador());
				session.setAttribute(Constantes.AREA, usuarioEdomus.getCargo());


				//Se redirecciona al siguiente controller y el atributo pasa a traves de el sin necesidad de instanciar
				redirectAttributes.addFlashAttribute("usuario",usuarioBD);				
				resultActionStr = "redirect:/incidencias?lateral=false";
			}
		}
		return resultActionStr;

	}
	
}
