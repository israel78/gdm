package com.telefonica.entity;


public class Regularizaciones {
	
	private DatosAdicionalesRegularizaciones datosAdicionalesRegularizaciones;
	private ListadoIncidenciasDisponibilidadLlamadasRegularizada listadoIncidenciasDisponibilidadLlamadasRegularizada;
	private listadoIncidenciasRegularizada listadoIncidenciasRegularizada;
	
	
	public DatosAdicionalesRegularizaciones getDatosAdicionalesRegularizaciones() {
		return datosAdicionalesRegularizaciones;
	}
	public void setDatosAdicionalesRegularizaciones(DatosAdicionalesRegularizaciones datosAdicionalesRegularizaciones) {
		this.datosAdicionalesRegularizaciones = datosAdicionalesRegularizaciones;
	}
	public ListadoIncidenciasDisponibilidadLlamadasRegularizada getListadoIncidenciasDisponibilidadLlamadasRegularizada() {
		return listadoIncidenciasDisponibilidadLlamadasRegularizada;
	}
	public void setListadoIncidenciasDisponibilidadLlamadasRegularizada(
			ListadoIncidenciasDisponibilidadLlamadasRegularizada listadoIncidenciasDisponibilidadLlamadasRegularizada) {
		this.listadoIncidenciasDisponibilidadLlamadasRegularizada = listadoIncidenciasDisponibilidadLlamadasRegularizada;
	}
	public listadoIncidenciasRegularizada getListadoIncidenciasRegularizada() {
		return listadoIncidenciasRegularizada;
	}
	public void setListadoIncidenciasRegularizada(listadoIncidenciasRegularizada listadoIncidenciasRegularizada) {
		this.listadoIncidenciasRegularizada = listadoIncidenciasRegularizada;
	}
	
	
	public String toString() { 
		   return "Regularizaciones  ["+
		    						",datosAdicionalesRegularizaciones ="+ datosAdicionalesRegularizaciones +
		    						",listadoIncidenciasDisponibilidadLlamadasRegularizada  ="+ listadoIncidenciasDisponibilidadLlamadasRegularizada +
		    						",listadoIncidenciasRegularizada  ="+ listadoIncidenciasRegularizada +	    						
		"]";

		}

		
	
	

}
