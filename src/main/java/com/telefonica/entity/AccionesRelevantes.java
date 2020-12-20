package com.telefonica.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class AccionesRelevantes {
	
	
	private int id;
	private String tipo;
	private String subtipo;
	@JsonFormat(pattern="dd-MM-yyyy' 'HH:mm")
	private Date fecha_inicio;
	@JsonFormat(pattern="dd-MM-yyyy' 'HH:mm")
	private Date fecha_fin;
	private String titulo;
	private String codigo_BTP_CRQ;
	private String descripcion;
	private String impacto;
	private String motivo;
	private String promotor;
	private String unidad_ejecutora;
	private String usuario_contacto;
	private String area;
	@JsonFormat(pattern="dd-MM-yyyy")
	private Date fecha_cdm;
	private String id_comite;
	private int index;
	private int anno_cdm;
	private int semana;
	private String autor;
	@JsonFormat(pattern="dd-MM-yyyy' 'HH:mm")
	private Date timestamp;
	private String timestampString;
	
	
	public String getTimestampString() {
		return timestampString;
	}
	public void setTimestampString(String timestampString) {
		this.timestampString = timestampString;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getCodigo_BTP_CRQ() {
		return codigo_BTP_CRQ;
	}
	public void setCodigo_BTP_CRQ(String codigo_BTP_CRQ) {
		this.codigo_BTP_CRQ = codigo_BTP_CRQ;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public String getImpacto() {
		return impacto;
	}
	public void setImpacto(String impacto) {
		this.impacto = impacto;
	}
	public String getMotivo() {
		return motivo;
	}
	public void setMotivo(String motivo) {
		this.motivo = motivo;
	}
	public String getPromotor() {
		return promotor;
	}
	public void setPromotor(String promotor) {
		this.promotor = promotor;
	}
	public String getUnidad_ejecutora() {
		return unidad_ejecutora;
	}
	public void setUnidad_ejecutora(String unidad_ejecutora) {
		this.unidad_ejecutora = unidad_ejecutora;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}

	public String getUsuario_contacto() {
		return usuario_contacto;
	}
	public void setUsuario_contacto(String usuario_contacto) {
		this.usuario_contacto = usuario_contacto;
	}
	public Date getFecha_cdm() {
		return fecha_cdm;
	}
	public void setFecha_cdm(Date fecha_cdm) {
		this.fecha_cdm = fecha_cdm;
	}
	public String getId_comite() {
		return id_comite;
	}
	public void setId_comite(String id_comite) {
		this.id_comite = id_comite;
	}
	public int getIndex() {
		return index;
	}
	public void setIndex(int index) {
		this.index = index;
	}
	public int getAnno_cdm() {
		return anno_cdm;
	}
	public void setAnno_cdm(int anno_cdm) {
		this.anno_cdm = anno_cdm;
	}
	public int getSemana() {
		return semana;
	}
	public void setSemana(int semana) {
		this.semana = semana;
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
		return "AccionesRelevantes [id="
				+ id+
				", tipo=" + tipo + 
				", subtipo="+ subtipo + 
				", fecha_inicio=" + fecha_inicio + 
				", fecha_fin=" + fecha_fin + 
				", titulo=" + titulo +
				", codigo_BTP_CRQ=" + codigo_BTP_CRQ + 
				", descripcion=" + descripcion+
				", impacto=" + impacto +
				", motivo="+ motivo + 
				", promotor=" + promotor +
				", unidad_ejecutora="+ unidad_ejecutora +
				", usuario_contacto=" + usuario_contacto +
				", area="+ area + 
				", timestamp="+ timestamp + 
				", autor="+ autor + 
				", semana="+ semana + 
				", anno_cdm="+ anno_cdm + 
				", index="+ index + 
				", id_comite="+ id_comite + 
				", timestampString="+ timestampString + 
				", fecha_cdm=" + fecha_cdm +"]";
	}
}
