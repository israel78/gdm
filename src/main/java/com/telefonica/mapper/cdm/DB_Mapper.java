package com.telefonica.mapper.cdm;
import java.util.ArrayList;  
 
import java.util.Date;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.telefonica.entity.AccionesRelevantes;
import com.telefonica.entity.Comentarios;
import com.telefonica.entity.ComentariosIncidencias;
import com.telefonica.entity.DatosAdicionalesRegularizaciones;
import com.telefonica.entity.InBusquedaAcciones;
import com.telefonica.entity.InBusquedaIncidencias;
import com.telefonica.entity.InComentarios;
import com.telefonica.entity.IncidenciasRelevantes;
import com.telefonica.entity.KPIVistas;
import com.telefonica.entity.Usuario;
import com.telefonica.entity.Vista;
import com.telefonica.entity.inRegularizaciones;
import com.telefonica.entity.listadoIncidenciasRegularizada;
import com.telefonica.entity.provincias;
import com.telefonica.entity.ListadoIncidenciasDisponibilidadLlamadasRegularizada;
import com.telefonica.entity.Regularizaciones;
@Mapper
public interface DB_Mapper {

	/* ******************************************************************** */
	/* 					CRUDs GEN�RICAS A TRAV�S DE MYBATIS 				*/
	/* ******************************************************************** */
	public ArrayList<HashMap> selectBySQL(@Param("sql") String sSQL);
	public int insertBySQL(@Param("sql") String sSQL);
	public int updateBySQL(@Param("sql") String sSQL);
	public int deleteBySQL(@Param("sql") String sSQL);

	
	/* ******************************************************************** */
	/* 				CONEXI�N A BD AUTOM�TICA PARA NO PERDERLA				*/
	/* ******************************************************************** */
	
	@SuppressWarnings("rawtypes")
	public java.util.Date selectNow();

	/* ******************************************************************** */
	/* A�ADIR AQU� LOS SERVICIOS QUE CREAMOS */
	/* ******************************************************************** */
	// USUARIO
	public Usuario selectUsuarioByMatricula(@Param("matricula") String matriculaStr);
	public int altaUsuario (Usuario usuario);
	public int existeConfiUsuario (int idUsuario);
	//AIM 
	public int selectMaxSemanaIncidencias();
	public Date selectMaxFechaIncidencias();
	public int selectMaxMesIncidencias();
	public ArrayList<IncidenciasRelevantes> buscarIncidenciasByFilters(InBusquedaIncidencias in);
	public int insertOrUpdateIncidenciasRelevantes(IncidenciasRelevantes incidenciasRelevantes);
	public ArrayList<AccionesRelevantes> buscarAccionesByFilters(InBusquedaAcciones in);
	public int insertOrUpdateAccionesRelevantes(AccionesRelevantes accionesRelevantes);
	public int deleteAccionesRelevantes(AccionesRelevantes accionesRelevantes);
	public ArrayList<Comentarios> buscarComentariosByFilters(InComentarios inComentarios);
	public int insertOrUpdateComentarios(Comentarios aComentarios);
	public void deleteComentarios(Comentarios aComentarios);
	public ArrayList<KPIVistas> buscarKPIS();
	public ArrayList<Vista> buscarVistas();
	public ArrayList<ComentariosIncidencias> buscarComentariosIncidenciasByFilters(InComentarios inComentarios);
	public int insertOrUpdateComentariosIncidencias(ComentariosIncidencias aComentariosIncidencias);
	public void deleteComentariosIncidencias(ComentariosIncidencias aComentarios);
	public ArrayList<IncidenciasRelevantes> buscarIncidenciasRelevantesByFilters(IncidenciasRelevantes in);
	public void deleteIncidenciaRelevante(IncidenciasRelevantes incidenciaRelevante);
	public listadoIncidenciasRegularizada buscarIncidenciasRegularizadasByFilters(inRegularizaciones inRegularizaciones);
	public ListadoIncidenciasDisponibilidadLlamadasRegularizada buscarIncidenciasLlamadasRegularizadasByFilters(inRegularizaciones inRegularizaciones);
	public DatosAdicionalesRegularizaciones buscarDatosAdicionalesRegularizacionesByFilters(inRegularizaciones inRegularizaciones);
	public ArrayList<provincias> buscarProvincias();
	public int updateIncidenciaDatosAdicionalesRegularizada(DatosAdicionalesRegularizaciones datosAdicionalesRegularizaciones);
	public void updateListadoincidenciasRegularizada(listadoIncidenciasRegularizada listadoIncidenciasRegularizada);
	public void insertListadoincidenciasLlamadasRegularizada(
			ListadoIncidenciasDisponibilidadLlamadasRegularizada listadoIncidenciasDisponibilidadLlamadasRegularizada);
	public int getListadoincidenciasLlamadasRegularizada(
			ListadoIncidenciasDisponibilidadLlamadasRegularizada listadoIncidenciasDisponibilidadLlamadasRegularizada);
	public void insertListadoincidenciasLlamadasRegularizadaHistorico(
			ListadoIncidenciasDisponibilidadLlamadasRegularizada listadoIncidenciasDisponibilidadLlamadasRegularizada);
	public void deleteListadoincidenciasLlamadasRegularizadaHistorico(
			ListadoIncidenciasDisponibilidadLlamadasRegularizada listadoIncidenciasDisponibilidadLlamadasRegularizada);
	public int getListadoincidenciasRegularizada(listadoIncidenciasRegularizada listadoIncidenciasRegularizada);
	public int insertListadoincidenciasRegularizada(com.telefonica.entity.ListadoIncidenciasRegularizadaNumeric listadoIncidenciasRegularizadaNumeric);
	public int insertListadoincidenciasRegularizadaHistorico(
			com.telefonica.entity.ListadoIncidenciasRegularizadaNumeric listadoIncidenciasRegularizadaNumeric);
	public int deleteListadoincidenciasRegularizada(com.telefonica.entity.ListadoIncidenciasRegularizadaNumeric listadoIncidenciasRegularizadaNumeric);
}
