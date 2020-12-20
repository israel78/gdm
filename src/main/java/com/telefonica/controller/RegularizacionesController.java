package com.telefonica.controller;

import java.math.BigDecimal; 
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
import com.google.gson.JsonElement;
import com.telefonica.entity.AccionesRelevantes;
import com.telefonica.entity.DatosAdicionalesRegularizaciones;
import com.telefonica.entity.InBusquedaAcciones;
import com.telefonica.entity.ListadoIncidenciasDisponibilidadLlamadasRegularizada;
import com.telefonica.entity.ListadoIncidenciasRegularizadaNumeric;
import com.telefonica.entity.Regularizaciones;
import com.telefonica.entity.Usuario;
import com.telefonica.entity.inRegularizaciones;
import com.telefonica.entity.listadoIncidenciasRegularizada;
import com.telefonica.entity.provincias;
import com.telefonica.mapper.cdm.DB_Mapper;
import com.telefonica.util.Constantes;

@Controller
@RequestMapping("/regularizaciones")
public class RegularizacionesController {
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
		
		ArrayList<provincias> provincias = db_Mapper.buscarProvincias();
		
		model.addAttribute("provincias",provincias);
		
		return "regularizaciones";
	}
	@PostMapping("/buscar" )
	public ResponseEntity<?> buscar(@RequestBody inRegularizaciones inRegularizaciones, Model model) {
		Regularizaciones Regularizaciones = new Regularizaciones();
		if(inRegularizaciones.getTipo().equals("SEMANAL")) 
			inRegularizaciones.setTipo("Sem");
		else
			inRegularizaciones.setTipo("Mes");

		listadoIncidenciasRegularizada lir = db_Mapper.buscarIncidenciasRegularizadasByFilters(inRegularizaciones);	
		Regularizaciones.setListadoIncidenciasRegularizada(lir);
		ListadoIncidenciasDisponibilidadLlamadasRegularizada lillr = db_Mapper.buscarIncidenciasLlamadasRegularizadasByFilters(inRegularizaciones);		
		Regularizaciones.setListadoIncidenciasDisponibilidadLlamadasRegularizada(lillr);
		
		DatosAdicionalesRegularizaciones dar = db_Mapper.buscarDatosAdicionalesRegularizacionesByFilters(inRegularizaciones);	
		Regularizaciones.setDatosAdicionalesRegularizaciones(dar);
		
		Gson gson = new GsonBuilder().setDateFormat("dd-MM-yyyy HH:mm:ss").create();
		return ResponseEntity.ok(gson.toJson(Regularizaciones));
	}
	
	
	
	@PostMapping("/update" )
	public ResponseEntity<?> insertorupdate(@RequestBody Regularizaciones Regularizaciones, Model model,HttpSession session) {	
		int idGenerado;
		Gson gson = new Gson();
		String respuesta = "Registro modificado correctamente";
		
		
		
		Regularizaciones.getDatosAdicionalesRegularizaciones().setAutor(session.getAttribute(Constantes.MATRICULA).toString()+"/"+session.getAttribute(Constantes.SESSION_USERNAME_STR).toString());
		
		String patron = "yyyy-MM-dd HH:mm:ss";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat (patron);
			
			db_Mapper.updateIncidenciaDatosAdicionalesRegularizada(Regularizaciones.getDatosAdicionalesRegularizaciones());
			idGenerado = db_Mapper. getListadoincidenciasRegularizada(Regularizaciones.getListadoIncidenciasRegularizada());
			ListadoIncidenciasRegularizadaNumeric ListadoIncidenciasRegularizadaNumeric = mapeoStringANumericListadoIncidencias(Regularizaciones.getListadoIncidenciasRegularizada());

			if(idGenerado == 0) {
				
				idGenerado = db_Mapper.insertListadoincidenciasRegularizada(ListadoIncidenciasRegularizadaNumeric);
			}else{
				idGenerado = db_Mapper.insertListadoincidenciasRegularizadaHistorico(ListadoIncidenciasRegularizadaNumeric);
				idGenerado = db_Mapper.deleteListadoincidenciasRegularizada(ListadoIncidenciasRegularizadaNumeric);
				idGenerado = db_Mapper.insertListadoincidenciasRegularizada(ListadoIncidenciasRegularizadaNumeric);
			}			
			idGenerado = db_Mapper.getListadoincidenciasLlamadasRegularizada(Regularizaciones.getListadoIncidenciasDisponibilidadLlamadasRegularizada());
			
			if(idGenerado == 0) {
				db_Mapper.insertListadoincidenciasLlamadasRegularizada(Regularizaciones.getListadoIncidenciasDisponibilidadLlamadasRegularizada());
			}else{
				db_Mapper.insertListadoincidenciasLlamadasRegularizadaHistorico(Regularizaciones.getListadoIncidenciasDisponibilidadLlamadasRegularizada());
				db_Mapper.deleteListadoincidenciasLlamadasRegularizadaHistorico(Regularizaciones.getListadoIncidenciasDisponibilidadLlamadasRegularizada());
				db_Mapper.insertListadoincidenciasLlamadasRegularizada(Regularizaciones.getListadoIncidenciasDisponibilidadLlamadasRegularizada());
			}			
		return ResponseEntity.ok(gson.toJson(respuesta));
	}
	private ListadoIncidenciasRegularizadaNumeric mapeoStringANumericListadoIncidencias(
			listadoIncidenciasRegularizada l) {
		
		ListadoIncidenciasRegularizadaNumeric ln = new ListadoIncidenciasRegularizadaNumeric();
		ln.setTipo(l.getTipo());
		ln.setRed(l.getRed());
		ln.setEquipo(l.getEquipo());
		ln.setProvincia(l.getProvincia());
		ln.setId(l.getId());
		ln.setResponsable(l.getResponsable());
		ln.setFechaCreacion(l.getFechaCreacion());
		ln.setFechaReparacion(l.getFechaReparacion());
		ln.setFechaFranqueo(l.getFechaFranqueo());
		ln.setFechaCierre(l.getFechaCierre());
		ln.setBaCobreClientes(Integer.parseInt(l.getBaCobreClientes()));
		ln.setBaCobreIndisponibilidad(new BigDecimal(insertaCeroSiVacio(l.getBaCobreIndisponibilidad())));
		ln.setBaCobreIndisponibilidadPonderada(new BigDecimal(insertaCeroSiVacio(l.getBaCobreIndisponibilidadPonderada())));
		ln.setBaCobreDuracionPonderada(new BigDecimal(insertaCeroSiVacio(l.getBaCobreDuracionPonderada())));
		ln.setBaCobreDuracion(new BigDecimal(insertaCeroSiVacio(l.getBaCobreDuracion())));
		ln.setBaFibraClientes(Integer.parseInt(l.getBaFibraClientes()));
		ln.setBaFibraIndisponibilidadPonderada(new BigDecimal(insertaCeroSiVacio(l.getBaFibraIndisponibilidadPonderada())));
		ln.setBaFibraDuracionPonderada(new BigDecimal(insertaCeroSiVacio(l.getBaFibraDuracionPonderada())));
		ln.setBaFibraIndisponibilidad(new BigDecimal(insertaCeroSiVacio(l.getBaFibraIndisponibilidad())));
		ln.setBaFibraDuracion(new BigDecimal(insertaCeroSiVacio(l.getBaFibraDuracion())));
		ln.setBaClientes(Integer.parseInt(l.getBaClientes()));
		ln.setBaIndisponibilidadPonderada(new BigDecimal(insertaCeroSiVacio(l.getBaIndisponibilidadPonderada())));
		ln.setBaDuracionPonderada(new BigDecimal(insertaCeroSiVacio(l.getBaDuracionPonderada())));
		ln.setBaIndisponibilidad(new BigDecimal(insertaCeroSiVacio(l.getBaIndisponibilidad())));
		ln.setBaDuracion(new BigDecimal(insertaCeroSiVacio(l.getBaDuracion())));
		ln.setTvCobreClientes(Integer.parseInt(l.getTvCobreClientes()));
		ln.setTvCobreIndisponibilidadPonderada(new BigDecimal(insertaCeroSiVacio(l.getTvCobreIndisponibilidadPonderada())));
		ln.setTvCobreDuracionPonderada(new BigDecimal(insertaCeroSiVacio(l.getTvCobreDuracionPonderada())));
		ln.setTvCobreIndisponibilidad(new BigDecimal(insertaCeroSiVacio(l.getTvCobreIndisponibilidad())));
		ln.setTvCobreDuracion(new BigDecimal(insertaCeroSiVacio(l.getTvCobreDuracion())));
		ln.setTvFibraClientes(Integer.parseInt(l.getTvFibraClientes()));
		ln.setTvFibraIndisponibilidadPonderada(new BigDecimal(insertaCeroSiVacio(l.getTvFibraIndisponibilidadPonderada())));
		ln.setTvFibraDuracionPonderada(new BigDecimal(insertaCeroSiVacio(l.getTvFibraDuracionPonderada())));
		ln.setTvFibraIndisponibilidad(new BigDecimal(insertaCeroSiVacio(l.getTvFibraIndisponibilidad())));
		ln.setTvFibraDuracion(new BigDecimal(insertaCeroSiVacio(l.getTvFibraDuracion())));
		ln.setTvClientes(Integer.parseInt(l.getTvClientes()));
		ln.setTvIndisponibilidadPonderada(new BigDecimal(insertaCeroSiVacio(l.getTvIndisponibilidadPonderada())));
		ln.setTvDuracionPonderada(new BigDecimal(insertaCeroSiVacio(l.getTvDuracionPonderada())));	
		ln.setTvIndisponibilidad(new BigDecimal(insertaCeroSiVacio(l.getTvIndisponibilidad())));
	    ln.setTvDuracion(new BigDecimal(insertaCeroSiVacio(l.getTvDuracion())));
	    ln.setVozCobreClientes(Integer.parseInt(insertaCeroSiVacio(l.getVozCobreClientes())));
	    ln.setVozCobreIndisponibilidadPonderada(new BigDecimal(insertaCeroSiVacio(l.getVozCobreIndisponibilidadPonderada())));
	    ln.setVozCobreDuracionPonderada(new BigDecimal(insertaCeroSiVacio(l.getVozCobreDuracionPonderada())));
	    ln.setVozCobreIndisponibilidad(new BigDecimal(insertaCeroSiVacio(l.getVozCobreIndisponibilidad())));
	    ln.setVozCobreDuracion(new BigDecimal(insertaCeroSiVacio(l.getVozCobreDuracion())));
	    ln.setVozFibraClientes(Integer.parseInt(insertaCeroSiVacio(l.getVozFibraClientes())));
	    ln.setVozFibraIndisponibilidadPonderada(new BigDecimal(insertaCeroSiVacio(l.getVozFibraIndisponibilidadPonderada())));
	    ln.setVozFibraDuracionPonderada(new BigDecimal(insertaCeroSiVacio(l.getVozFibraDuracionPonderada())));
	    ln.setVozFibraIndisponibilidad(new BigDecimal(insertaCeroSiVacio(l.getVozFibraIndisponibilidad())));
	    ln.setVozFibraDuracion(new BigDecimal(insertaCeroSiVacio(l.getVozFibraDuracion())));
	    ln.setVozClientes(Integer.parseInt( insertaCeroSiVacio(l.getVozClientes())));
	    ln.setVozIndisponibilidadPonderada(new BigDecimal(insertaCeroSiVacio(l.getVozIndisponibilidadPonderada())));
	    ln.setVozDuracionPonderada(new BigDecimal(insertaCeroSiVacio(l.getVozDuracionPonderada())));
	    ln.setVozIndisponibilidad(new BigDecimal(insertaCeroSiVacio(l.getVozIndisponibilidad())));
	    ln.setVozDuracion (new BigDecimal(insertaCeroSiVacio(l.getVozDuracion())));
	    ln.setMfeClientes (new BigDecimal(insertaCeroSiVacio(l.getMfeClientes())));
	    ln.setMfeIndisponibilidadPonderada(new BigDecimal(insertaCeroSiVacio(l.getMfeIndisponibilidadPonderada())));
	    ln.setMfeDuracionPonderada(new BigDecimal(insertaCeroSiVacio(l.getMfeDuracionPonderada())));
	    ln.setMfeIndisponibilidad(new BigDecimal(insertaCeroSiVacio(l.getMfeIndisponibilidad())));
	    ln.setMfeDuracion(new BigDecimal(insertaCeroSiVacio(l.getMfeDuracion())));
	    ln.setFq1(l.getFq1());
	    ln.setFq2(l.getFq2());
	    ln.setFq3(l.getFq3());
	    ln.setFq4(l.getFq4());
	    ln.setFq5(l.getFq5());
	    ln.setFq6(l.getFq6());
	    ln.setSuministrador(l.getSuministrador());
	    ln.setTecnologia(l.getTecnologia());
	    ln.setModelo(l.getModelo());
	    ln.setTipoDeSintoma(l.getTipoDeSintoma());
	    ln.setFaltaRepuesto(l.getFaltaRepuesto());
	    ln.setTiempoMetereologico(ln.getTiempoMetereologico());
	    ln.setFecha (l.getFecha());
	    ln.setCausa (l.getCausa());
	    ln.setCausaIgri(l.getCausaIgri());
	    ln.setSubcausaIgri(l.getSubcausaIgri());
	    ln.setSeveridad (new BigDecimal(insertaCeroSiVacio(l.getSeveridad())));
	    ln.setAciFInicio(l.getAciFInicio());
	    ln.setAciFFin (l.getAciFFin());
	    ln.setAciDescripcion(l.getAciDescripcion());
	    ln.setAciCausa (l.getAciCausa());
	    ln.setAciSaf(l.getAciSaf());
	    ln.setAciAnalisis(l.getAciAnalisis());
	    ln.setAciSeveridad(Integer.parseInt(insertaCeroSiVacio(l.getAciSeveridad())));
	    ln.setAciLocalizacion(l.getAciLocalizacion());
	    ln.setIdProblema(l.getIdProblema());
	    ln.setConcatInc1(l.getConcatInc1());
	    ln.setConcatIncAvePla(l.getConcatIncAvePla());
	    ln.setConcatIncAvePla2(l.getConcatIncAvePla2());
	    ln.setRedIncidencia(l.getRedIncidencia());
	    ln.setEdificioDslam(l.getEdificioDslam());
	    ln.setSupermasivas(l.getSupermasivas()!=null?Boolean.parseBoolean(l.getSupermasivas()):null);
	    ln.setEstadoGestion(l.getEstadoGestion());
	    ln.setNebaFibraClientes(Integer.parseInt(insertaCeroSiVacio(l.getNebaFibraClientes())));
	    ln.setNebaFibraIndisponibilidad(Integer.parseInt(insertaCeroSiVacio(l.getNebaFibraIndisponibilidad())));
	    ln.setNebaLocalClientes(Integer.parseInt(insertaCeroSiVacio(l.getNebaLocalClientes())));
	    ln.setNebaLocalIndisponibilidad(Integer.parseInt(insertaCeroSiVacio(l.getNebaLocalIndisponibilidad())));
	    ln.setNebaCobreClientes(Integer.parseInt(insertaCeroSiVacio(l.getNebaCobreClientes())));
	    ln.setNebaCobreIndisponibilidad(Long.parseLong(insertaCeroSiVacio(l.getNebaCobreIndisponibilidad())));
	    ln.setNebaFibraDuracion(Integer.parseInt(insertaCeroSiVacio(l.getNebaFibraDuracion())));
	    ln.setNebaLocalDuracion(Integer.parseInt(insertaCeroSiVacio(l.getNebaLocalDuracion())));
	    ln.setNebaCobreDuracion(Integer.parseInt(insertaCeroSiVacio(l.getNebaCobreDuracion())));
		
		return ln;
	}
	private String insertaCeroSiVacio(String b) {
		if (b.equals("")) {
			return "0";
		}
		return b;
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
