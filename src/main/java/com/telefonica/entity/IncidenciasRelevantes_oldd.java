package com.telefonica.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class IncidenciasRelevantes_oldd {
	
	private String alias;
	private String tipo;
	private String num_incidencia;
	private String descripcion;
	private String servicio_afectado;
	private String causa;
	private String acciones_recuperacion;
	private String acciones_mejora_responsables;
	private String area;
	private String contacto;
	private String severidad;
	private float indisponibilidad;
	@JsonFormat(pattern="dd-MM-yyyy' 'hh:mm")
	private Date fecha_inicio;
	private String provincia;
	private String cod_provincia;
	@JsonFormat(pattern="dd-MM-yyyy' 'hh:mm")
	private Date fecha_fin;
	private String Semana;
	@JsonFormat(pattern="dd-MM-yyyy' 'hh:mm")
	private Date fecha;
	
	private String fecha_texto;
	String fecha_fin_texto,fecha_inicio_texto,indisponibilidad_texto;

	public String getIndisponibilidad_texto() {
		return indisponibilidad_texto;
	}
	public void setIndisponibilidad_texto(String indisponibilidad_texto) {
		this.indisponibilidad_texto = indisponibilidad_texto;
	}
	public String getFecha_fin_texto() {
		return fecha_fin_texto;
	}
	public void setFecha_fin_texto(String fecha_fin_texto) {
		this.fecha_fin_texto = fecha_fin_texto;
	}
	public String getFecha_inicio_texto() {
		return fecha_inicio_texto;
	}
	public void setFecha_inicio_texto(String fecha_inicio_texto) {
		this.fecha_inicio_texto = fecha_inicio_texto;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	
	public String getSemana() {
		return Semana;
	}
	public void setSemana(String tipoSemMes) {
		this.Semana = tipoSemMes;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public String getNum_incidencia() {
		return num_incidencia;
	}
	public void setNum_incidencia(String num_incidencia) {
		this.num_incidencia = num_incidencia;
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
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getContacto() {
		return contacto;
	}
	public void setContacto(String contacto) {
		this.contacto = contacto;
	}
	public String getSeveridad() {
		return severidad;
	}
	public void setSeveridad(String severidad) {
		this.severidad = severidad;
	}
	public float getIndisponibilidad() {
		return indisponibilidad;
	}
	public void setIndisponibilidad(float indisponibiliadad) {
		this.indisponibilidad = indisponibiliadad;
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
	public String getProvincia() {
		return provincia;
	}
	public void setProvincia(String provincia) {
		this.provincia = provincia;
	}
	public String getCod_provincia() {
		return cod_provincia;
	}
	public void setCod_provincia(String cod_provincia) {
		this.cod_provincia = cod_provincia;
	}
	public String getFecha_texto() {
		return fecha_texto;
	}
	public void setFecha_texto(String fecha_texto) {
		this.fecha_texto = fecha_texto;
	}
	@Override
	public String toString() {
		
		return "TelcoNotificacion [alias="
				+ alias + ", tipo=" + tipo
				+ ", num_incidencia=" + num_incidencia + ", descripcion="
				+ descripcion + ", servicio_afectado=" + servicio_afectado
				+ ", causa=" + causa + ", acciones_recuperacion=" + acciones_recuperacion
				+ ", acciones_mejora_responsables=" + acciones_mejora_responsables + ", area=" + area
				+ ", contacto=" + contacto + ", severidad="
				+ severidad + ", indisponibilidad=" + indisponibilidad + ", fecha_inicio="
				+ fecha_inicio + " provincia=" + provincia +", fecha_fin="+ fecha_fin + ", Semana=" + Semana + ","
				+ " fecha_inicio_texto=" +fecha_inicio_texto + " fecha_fin_texto=" + fecha_fin_texto +", indisponibilidad_texto="+ indisponibilidad_texto 
				+ ", fecha= "+ fecha + ", cod_provincia "+cod_provincia+"fecha_texto "+fecha_texto+"]";
	}
	

}
