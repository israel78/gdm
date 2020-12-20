package com.telefonica.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class InBusquedaAcciones {
	private String id,numSemanaMes,annioBusqueda,tipo,subtipo;
	
	@JsonFormat(pattern="dd-MM-yyyy' 'hh:mm")
	private Date fecha_fin;
	@JsonFormat(pattern="dd-MM-yyyy' 'hh:mm")
	private Date fecha_inicio;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNumSemanaMes() {
		return numSemanaMes;
	}

	public void setNumSemanaMes(String numSemanaMes) {
		this.numSemanaMes = numSemanaMes;
	}

	public String getAnnioBusqueda() {
		return annioBusqueda;
	}

	public void setAnnioBusqueda(String annioBusqueda) {
		this.annioBusqueda = annioBusqueda;
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

	public Date getFecha_fin() {
		return fecha_fin;
	}

	public void setFecha_fin(Date fecha_fin) {
		this.fecha_fin = fecha_fin;
	}

	public Date getFecha_inicio() {
		return fecha_inicio;
	}

	public void setFecha_inicio(Date fecha_inicio) {
		this.fecha_inicio = fecha_inicio;
	}
	
	

	
	
	
	
	

}
