package com.telefonica.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class IncidenciasRelevantes {
	
	
	private String id;
	private String id_comite;
	private String INDEX;
	private String anno_cdm;
	private String semana;
	@JsonFormat(pattern="dd-MM-yyyy")
	private String fecha_cdm;
	private String n_incidencia;
	private String tipo;
	private String subtipo;
	private String descripcion;
	private String severidad;
	@JsonFormat(pattern="dd-MM-yyyy' 'hh:mm")
	private Date fecha_inicio;
	@JsonFormat(pattern="dd-MM-yyyy' 'hh:mm")
	private Date fecha_fin;
	private String indisponibilidad;
	private String alias;
	private String servicio_afectado;
	private String causa;
	private String acciones_recuperacion;
	private String acciones_mejora_responsables;
	private String contacto;
	private String area;
	private String autor;
	@JsonFormat(pattern="dd-MM-yyyy' 'hh:mm")
	private Date timestamp;
	private String timestampString;
	
	
	public String getTimestampString() {
		return timestampString;
	}

	public void setTimestampString(String timestampString) {
		this.timestampString = timestampString;
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getId_comite() {
		return id_comite;
	}


	public void setId_comite(String id_comite) {
		this.id_comite = id_comite;
	}


	public String getINDEX() {
		return INDEX;
	}


	public void setINDEX(String iNDEX) {
		INDEX = iNDEX;
	}


	public String getAnno_cdm() {
		return anno_cdm;
	}


	public void setAnno_cdm(String anno_cdm) {
		this.anno_cdm = anno_cdm;
	}


	public String getSemana() {
		return semana;
	}


	public void setSemana(String semana) {
		this.semana = semana;
	}


	public String getFecha_cdm() {
		return fecha_cdm;
	}


	public void setFecha_cdm(String fecha_cdm) {
		this.fecha_cdm = fecha_cdm;
	}


	public String getN_incidencia() {
		return n_incidencia;
	}


	public void setN_incidencia(String n_incidencia) {
		this.n_incidencia = n_incidencia;
	}


	public String getTipo() {
		return tipo;
	}


	public void setTipo(String tipo) {
		this.tipo = tipo;
	}


	public String getSubtipo() {
		return subtipo;
	}


	public void setSubtipo(String subtipo) {
		this.subtipo = subtipo;
	}


	public String getDescripcion() {
		return descripcion;
	}


	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}


	public String getSeveridad() {
		return severidad;
	}


	public void setSeveridad(String severidad) {
		this.severidad = severidad;
	}


	public Date getFecha_inicio() {
		return fecha_inicio;
	}


	public void setFecha_inicio(Date fecha_inicio) {
		this.fecha_inicio = fecha_inicio;
	}


	public Date getFecha_fin() {
		return fecha_fin;
	}


	public void setFecha_fin(Date fecha_fin) {
		this.fecha_fin = fecha_fin;
	}


	public String getIndisponibilidad() {
		return indisponibilidad;
	}


	public void setIndisponibilidad(String indisponibilidad) {
		this.indisponibilidad = indisponibilidad;
	}


	public String getAlias() {
		return alias;
	}


	public void setAlias(String alias) {
		this.alias = alias;
	}


	public String getServicio_afectado() {
		return servicio_afectado;
	}


	public void setServicio_afectado(String servicio_afectado) {
		this.servicio_afectado = servicio_afectado;
	}


	public String getCausa() {
		return causa;
	}


	public void setCausa(String causa) {
		this.causa = causa;
	}


	public String getAcciones_recuperacion() {
		return acciones_recuperacion;
	}


	public void setAcciones_recuperacion(String acciones_recuperacion) {
		this.acciones_recuperacion = acciones_recuperacion;
	}


	public String getAcciones_mejora_responsables() {
		return acciones_mejora_responsables;
	}


	public void setAcciones_mejora_responsables(String acciones_mejora_responsables) {
		this.acciones_mejora_responsables = acciones_mejora_responsables;
	}


	public String getContacto() {
		return contacto;
	}


	public void setContacto(String contacto) {
		this.contacto = contacto;
	}


	public String getArea() {
		return area;
	}


	public void setArea(String area) {
		this.area = area;
	}


	public String getAutor() {
		return autor;
	}


	public void setAutor(String autor) {
		this.autor = autor;
	}


	public Date getTimestamp() {
		return timestamp;
	}


	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	@Override
	public String toString() {
		
		return "Incidencias_relevantes"
				+ " [id="+ id
				+ ", id_comite=" + id_comite
				+ ", INDEX=" + INDEX
				+ ", anno_cdm="+ anno_cdm 
				+ ", semana=" + semana
				+ ", fecha_cdm=" + fecha_cdm 
				+ ", n_incidencia=" + n_incidencia
				+ ", tipo=" + tipo
				+ ", subtipo=" + subtipo
				+ ", descripcion=" + descripcion
				+ ", severidad="+ severidad 
				+ ", fecha_inicio=" + fecha_inicio
				+ ", fecha_fin=" + fecha_fin
				+ ", indisponibilidad=" + indisponibilidad
				+ ", alias="+ alias
				+ ", servicio_afectado=" + servicio_afectado
				+ ", causa=" +causa 
				+ ", acciones_recuperacion=" + acciones_recuperacion
				+ ", acciones_mejora_responsables="+ acciones_mejora_responsables 
				+ ", contacto= "+ contacto
				+ ", area "+area
				+ ", timestamp "+timestamp
				+ ", autor "+autor+"]";
	}
	

}
