package com.telefonica.entity;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Comentarios {
	
	private String id_comite;
	private String tipo_periodo;
	private String vista;
	private String id_vista;
	private String kpi;
	private String tipo_comentario;
	private String autor;
	private String comentario_1;
	private String comentario_2;
	private String comentario_3;
	private String n_periodo;
	private String annio_sel;
	@JsonFormat(pattern="dd-MM-yyyy")
	private Date fecha;
	@JsonFormat(pattern="dd-MM-yyyy' 'HH:mm:ss")
	private Date timestamp;
	private String timestampString;

	
	
	
	
	
	public String getTimestampString() {
		return timestampString;
	}






	public void setTimestampString(String timestampString) {
		this.timestampString = timestampString;
	}






	public String getN_periodo() {
		return n_periodo;
	}



	


	public String getAnnio_sel() {
		return annio_sel;
	}






	public void setAnnio_sel(String annio_sel) {
		this.annio_sel = annio_sel;
	}






	public void setN_periodo(String n_periodo) {
		this.n_periodo = n_periodo;
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





	public String getVista() {
		return vista;
	}





	public void setVista(String vista) {
		this.vista = vista;
	}





	public String getId_vista() {
		return id_vista;
	}





	public void setId_vista(String id_vista) {
		this.id_vista = id_vista;
	}





	




	public String getKpi() {
		return kpi;
	}





	public void setKpi(String kpi) {
		this.kpi = kpi;
	}





	public String getTipo_comentario() {
		return tipo_comentario;
	}





	public void setTipo_comentario(String tipo_comentario) {
		this.tipo_comentario = tipo_comentario;
	}





	public String getAutor() {
		return autor;
	}





	public void setAutor(String autor) {
		this.autor = autor;
	}





	public String getComentario_1() {
		return comentario_1;
	}





	public void setComentario_1(String comentario_1) {
		this.comentario_1 = comentario_1;
	}





	public String getComentario_2() {
		return comentario_2;
	}





	public void setComentario_2(String comentario_2) {
		this.comentario_2 = comentario_2;
	}





	public String getComentario_3() {
		return comentario_3;
	}





	public void setComentario_3(String comentario_3) {
		this.comentario_3 = comentario_3;
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





	@Override
	public String toString() {	
		return "Comentarios [id_comite=" + id_comite + 
				", Tipo_periodo="+ tipo_periodo + 
				", Vista=" + vista + 
				", id_vista=" + id_vista + 
				", KPI=" + kpi +
				", Tipo_comentario="+ tipo_comentario + 
				", Autor="+ autor + 
				", Comentario_1="+ comentario_1 + 
				", Comentario_2="+ comentario_2 + 
				", Comentario_3="+ comentario_3 + 
				", Fecha="+ fecha +
				", N_periodo="+ n_periodo + 
				", annio_sel="+ annio_sel + 
				", timestampString="+ timestampString +
				", timestamp=" + timestamp +"]";
	}

}
