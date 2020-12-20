package com.telefonica.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ComentariosIncidencias {

	private String id_comite;
	private String tipo_periodo;
	private String n_periodo;
	private String id_incidencia;
	private String alias;
	private String descripcion_manual;
	private String autor;
	private String timestampString;
	private String annio_sel;
	@JsonFormat(pattern="dd-MM-yyyy")
	private Date fecha;
	@JsonFormat(pattern="dd-MM-yyyy' 'HH:mm:ss")
	private Date timestamp;
	
	
	
	public String getAnnio_sel() {
		return annio_sel;
	}
	public void setAnnio_sel(String annio_sel) {
		this.annio_sel = annio_sel;
	}
	public String getId_comite() {
		return id_comite;
	}
	public void setId_comite(String id_comite) {
		this.id_comite = id_comite;
	}
	public String getTipo_periodo() {
		return tipo_periodo;
	}
	public void setTipo_periodo(String tipo_periodo) {
		this.tipo_periodo = tipo_periodo;
	}
	public String getN_periodo() {
		return n_periodo;
	}
	public void setN_periodo(String n_periodo) {
		this.n_periodo = n_periodo;
	}
	public String getId_incidencia() {
		return id_incidencia;
	}
	public void setId_incidencia(String id_incidencia) {
		this.id_incidencia = id_incidencia;
	}
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	public String getDescripcion_manual() {
		return descripcion_manual;
	}
	public void setDescripcion_manual(String descripcion_manual) {
		this.descripcion_manual = descripcion_manual;
	}
	public String getAutor() {
		return autor;
	}
	public void setAutor(String autor) {
		this.autor = autor;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public Date getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}
	public String getTimestampString() {
		return timestampString;
	}
	public void setTimestampString(String timestampString) {
		this.timestampString = timestampString;
	}

	
	@Override
	public String toString() {	
		return "ComentariosIncidencias [id_comite=" + id_comite + 
				", tipo_periodo="+ tipo_periodo + 
				", n_periodo=" + n_periodo + 
				", id_incidencia=" + id_incidencia + 
				", alias=" + alias +
				", descripcion_manual="+ descripcion_manual + 
				", autor="+ autor + 
				", fecha="+ fecha + 
				", annio_sel="+ annio_sel + 
				", timestampString="+ timestampString +
				", timestamp=" + timestamp +"]";
	}	
	
}
