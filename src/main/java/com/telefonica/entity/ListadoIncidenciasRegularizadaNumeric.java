/*
 * Java domain class for entity "ListadoIncidenciasRegularizada" 
 * Created on 2020-11-23 ( Date ISO 2020-11-23 - Time 17:17:38 )
 * Generated by Telosys Tools Generator ( version 3.1.2 )
 */
package com.telefonica.entity;

import java.io.Serializable;

import java.math.BigDecimal;
import java.util.Date;

/**
 * Domain class for entity "ListadoIncidenciasRegularizada"
 *
 * @author Telosys Tools Generator
 *
 */
public class ListadoIncidenciasRegularizadaNumeric implements Serializable {

    private static final long serialVersionUID = 1L;

    //----------------------------------------------------------------------
    // ENTITY PRIMARY KEY 
    //----------------------------------------------------------------------

    //----------------------------------------------------------------------
    // ENTITY DATA FIELDS 
    //----------------------------------------------------------------------    
    private String     tipo         ;
    private String     red          ;
    private String     equipo       ;
    private String     provincia    ;
    private String     id           ;
    private String     responsable  ;
    private Date       fechaCreacion ;
    private Date       fechaReparacion ;
    private Date       fechaFranqueo ;
    private Date       fechaCierre  ;
    private Integer    baCobreClientes ;
    private BigDecimal baCobreIndisponibilidadPonderada ;
    private BigDecimal baCobreDuracionPonderada ;
    private BigDecimal baCobreIndisponibilidad ;
    private BigDecimal baCobreDuracion ;
    private Integer    baFibraClientes ;
    private BigDecimal baFibraIndisponibilidadPonderada ;
    private BigDecimal baFibraDuracionPonderada ;
    private BigDecimal baFibraIndisponibilidad ;
    private BigDecimal baFibraDuracion ;
    private Integer    baClientes   ;
    private BigDecimal baIndisponibilidadPonderada ;
    private BigDecimal baDuracionPonderada ;
    private BigDecimal baIndisponibilidad ;
    private BigDecimal baDuracion   ;
    private Integer    tvCobreClientes ;
    private BigDecimal tvCobreIndisponibilidadPonderada ;
    private BigDecimal tvCobreDuracionPonderada ;
    private BigDecimal tvCobreIndisponibilidad ;
    private BigDecimal tvCobreDuracion ;
    private Integer    tvFibraClientes ;
    private BigDecimal tvFibraIndisponibilidadPonderada ;
    private BigDecimal tvFibraDuracionPonderada ;
    private BigDecimal tvFibraIndisponibilidad ;
    private BigDecimal tvFibraDuracion ;
    private Integer    tvClientes   ;
    private BigDecimal tvIndisponibilidadPonderada ;
    private BigDecimal tvDuracionPonderada ;
    private BigDecimal tvIndisponibilidad ;
    private BigDecimal tvDuracion   ;
    private Integer    vozCobreClientes ;
    private BigDecimal vozCobreIndisponibilidadPonderada ;
    private BigDecimal vozCobreDuracionPonderada ;
    private BigDecimal vozCobreIndisponibilidad ;
    private BigDecimal vozCobreDuracion ;
    private Integer    vozFibraClientes ;
    private BigDecimal vozFibraIndisponibilidadPonderada ;
    private BigDecimal vozFibraDuracionPonderada ;
    private BigDecimal vozFibraIndisponibilidad ;
    private BigDecimal vozFibraDuracion ;
    private Integer    vozClientes  ;
    private BigDecimal vozIndisponibilidadPonderada ;
    private BigDecimal vozDuracionPonderada ;
    private BigDecimal vozIndisponibilidad ;
    private BigDecimal vozDuracion  ;
    private BigDecimal mfeClientes  ;
    private BigDecimal mfeIndisponibilidadPonderada ;
    private BigDecimal mfeDuracionPonderada ;
    private BigDecimal mfeIndisponibilidad ;
    private BigDecimal mfeDuracion  ;
    private String     fq1          ;
    private String     fq2          ;
    private String     fq3          ;
    private String     fq4          ;
    private String     fq5          ;
    private String     fq6          ;
    private String     suministrador ;
    private String     tecnologia   ;
    private String     modelo       ;
    private String     tipoDeSintoma ;
    private String     faltaRepuesto ;
    private Integer    tiempoMetereologico ;
    private Date       fecha        ;
    private String     causa        ;
    private String     causaIgri    ;
    private String     subcausaIgri ;
    private BigDecimal severidad    ;
    private Date       aciFInicio   ;
    private Date       aciFFin      ;
    private String     aciDescripcion ;
    private String     aciCausa     ;
    private String     aciSaf       ;
    private String     aciAnalisis  ;
    private Integer    aciSeveridad ;
    private String     aciLocalizacion ;
    private String     idProblema   ;
    private String     concatInc1   ;
    private String     concatIncAvePla ;
    private String     concatIncAvePla2 ;
    private String     redIncidencia ;
    private String     edificioDslam ;
    private Boolean    supermasivas ;
    private String     estadoGestion ;
    private Integer    nebaFibraClientes ;
    private Integer    nebaFibraIndisponibilidad ;
    private Integer    nebaLocalClientes ;
    private Integer    nebaLocalIndisponibilidad ;
    private Integer    nebaCobreClientes ;
    private Long       nebaCobreIndisponibilidad ;
    private Integer    nebaFibraDuracion ;
    private Integer    nebaLocalDuracion ;
    private Integer    nebaCobreDuracion ;

    //----------------------------------------------------------------------
    // ENTITY LINKS ( RELATIONSHIP )
    //----------------------------------------------------------------------

    //----------------------------------------------------------------------
    // CONSTRUCTOR(S)
    //----------------------------------------------------------------------
    public ListadoIncidenciasRegularizadaNumeric() {
		super();
    }
    
    //----------------------------------------------------------------------
    // GETTER & SETTER FOR "KEY FIELD(S)"
    //----------------------------------------------------------------------

    //----------------------------------------------------------------------
    // GETTERS & SETTERS FOR "DATA FIELDS"
    //----------------------------------------------------------------------
    public void setTipo( String tipo ) {
        this.tipo = tipo ;
    }
    public String getTipo() {
        return this.tipo;
    }

    public void setRed( String red ) {
        this.red = red ;
    }
    public String getRed() {
        return this.red;
    }

    public void setEquipo( String equipo ) {
        this.equipo = equipo ;
    }
    public String getEquipo() {
        return this.equipo;
    }

    public void setProvincia( String provincia ) {
        this.provincia = provincia ;
    }
    public String getProvincia() {
        return this.provincia;
    }

    public void setId( String id ) {
        this.id = id ;
    }
    public String getId() {
        return this.id;
    }

    public void setResponsable( String responsable ) {
        this.responsable = responsable ;
    }
    public String getResponsable() {
        return this.responsable;
    }

    public void setFechaCreacion( Date fechaCreacion ) {
        this.fechaCreacion = fechaCreacion ;
    }
    public Date getFechaCreacion() {
        return this.fechaCreacion;
    }

    public void setFechaReparacion( Date fechaReparacion ) {
        this.fechaReparacion = fechaReparacion ;
    }
    public Date getFechaReparacion() {
        return this.fechaReparacion;
    }

    public void setFechaFranqueo( Date fechaFranqueo ) {
        this.fechaFranqueo = fechaFranqueo ;
    }
    public Date getFechaFranqueo() {
        return this.fechaFranqueo;
    }

    public void setFechaCierre( Date fechaCierre ) {
        this.fechaCierre = fechaCierre ;
    }
    public Date getFechaCierre() {
        return this.fechaCierre;
    }

    public void setBaCobreClientes( Integer baCobreClientes ) {
        this.baCobreClientes = baCobreClientes ;
    }
    public Integer getBaCobreClientes() {
        return this.baCobreClientes;
    }

    public void setBaCobreIndisponibilidadPonderada( BigDecimal baCobreIndisponibilidadPonderada ) {
        this.baCobreIndisponibilidadPonderada = baCobreIndisponibilidadPonderada ;
    }
    public BigDecimal getBaCobreIndisponibilidadPonderada() {
        return this.baCobreIndisponibilidadPonderada;
    }

    public void setBaCobreDuracionPonderada( BigDecimal baCobreDuracionPonderada ) {
        this.baCobreDuracionPonderada = baCobreDuracionPonderada ;
    }
    public BigDecimal getBaCobreDuracionPonderada() {
        return this.baCobreDuracionPonderada;
    }

    public void setBaCobreIndisponibilidad( BigDecimal baCobreIndisponibilidad ) {
        this.baCobreIndisponibilidad = baCobreIndisponibilidad ;
    }
    public BigDecimal getBaCobreIndisponibilidad() {
        return this.baCobreIndisponibilidad;
    }

    public void setBaCobreDuracion( BigDecimal baCobreDuracion ) {
        this.baCobreDuracion = baCobreDuracion ;
    }
    public BigDecimal getBaCobreDuracion() {
        return this.baCobreDuracion;
    }

    public void setBaFibraClientes( Integer baFibraClientes ) {
        this.baFibraClientes = baFibraClientes ;
    }
    public Integer getBaFibraClientes() {
        return this.baFibraClientes;
    }

    public void setBaFibraIndisponibilidadPonderada( BigDecimal baFibraIndisponibilidadPonderada ) {
        this.baFibraIndisponibilidadPonderada = baFibraIndisponibilidadPonderada ;
    }
    public BigDecimal getBaFibraIndisponibilidadPonderada() {
        return this.baFibraIndisponibilidadPonderada;
    }

    public void setBaFibraDuracionPonderada( BigDecimal baFibraDuracionPonderada ) {
        this.baFibraDuracionPonderada = baFibraDuracionPonderada ;
    }
    public BigDecimal getBaFibraDuracionPonderada() {
        return this.baFibraDuracionPonderada;
    }

    public void setBaFibraIndisponibilidad( BigDecimal baFibraIndisponibilidad ) {
        this.baFibraIndisponibilidad = baFibraIndisponibilidad ;
    }
    public BigDecimal getBaFibraIndisponibilidad() {
        return this.baFibraIndisponibilidad;
    }

    public void setBaFibraDuracion( BigDecimal baFibraDuracion ) {
        this.baFibraDuracion = baFibraDuracion ;
    }
    public BigDecimal getBaFibraDuracion() {
        return this.baFibraDuracion;
    }

    public void setBaClientes( Integer baClientes ) {
        this.baClientes = baClientes ;
    }
    public Integer getBaClientes() {
        return this.baClientes;
    }

    public void setBaIndisponibilidadPonderada( BigDecimal baIndisponibilidadPonderada ) {
        this.baIndisponibilidadPonderada = baIndisponibilidadPonderada ;
    }
    public BigDecimal getBaIndisponibilidadPonderada() {
        return this.baIndisponibilidadPonderada;
    }

    public void setBaDuracionPonderada( BigDecimal baDuracionPonderada ) {
        this.baDuracionPonderada = baDuracionPonderada ;
    }
    public BigDecimal getBaDuracionPonderada() {
        return this.baDuracionPonderada;
    }

    public void setBaIndisponibilidad( BigDecimal baIndisponibilidad ) {
        this.baIndisponibilidad = baIndisponibilidad ;
    }
    public BigDecimal getBaIndisponibilidad() {
        return this.baIndisponibilidad;
    }

    public void setBaDuracion( BigDecimal baDuracion ) {
        this.baDuracion = baDuracion ;
    }
    public BigDecimal getBaDuracion() {
        return this.baDuracion;
    }

    public void setTvCobreClientes( Integer tvCobreClientes ) {
        this.tvCobreClientes = tvCobreClientes ;
    }
    public Integer getTvCobreClientes() {
        return this.tvCobreClientes;
    }

    public void setTvCobreIndisponibilidadPonderada( BigDecimal tvCobreIndisponibilidadPonderada ) {
        this.tvCobreIndisponibilidadPonderada = tvCobreIndisponibilidadPonderada ;
    }
    public BigDecimal getTvCobreIndisponibilidadPonderada() {
        return this.tvCobreIndisponibilidadPonderada;
    }

    public void setTvCobreDuracionPonderada( BigDecimal tvCobreDuracionPonderada ) {
        this.tvCobreDuracionPonderada = tvCobreDuracionPonderada ;
    }
    public BigDecimal getTvCobreDuracionPonderada() {
        return this.tvCobreDuracionPonderada;
    }

    public void setTvCobreIndisponibilidad( BigDecimal tvCobreIndisponibilidad ) {
        this.tvCobreIndisponibilidad = tvCobreIndisponibilidad ;
    }
    public BigDecimal getTvCobreIndisponibilidad() {
        return this.tvCobreIndisponibilidad;
    }

    public void setTvCobreDuracion( BigDecimal tvCobreDuracion ) {
        this.tvCobreDuracion = tvCobreDuracion ;
    }
    public BigDecimal getTvCobreDuracion() {
        return this.tvCobreDuracion;
    }

    public void setTvFibraClientes( Integer tvFibraClientes ) {
        this.tvFibraClientes = tvFibraClientes ;
    }
    public Integer getTvFibraClientes() {
        return this.tvFibraClientes;
    }

    public void setTvFibraIndisponibilidadPonderada( BigDecimal tvFibraIndisponibilidadPonderada ) {
        this.tvFibraIndisponibilidadPonderada = tvFibraIndisponibilidadPonderada ;
    }
    public BigDecimal getTvFibraIndisponibilidadPonderada() {
        return this.tvFibraIndisponibilidadPonderada;
    }

    public void setTvFibraDuracionPonderada( BigDecimal tvFibraDuracionPonderada ) {
        this.tvFibraDuracionPonderada = tvFibraDuracionPonderada ;
    }
    public BigDecimal getTvFibraDuracionPonderada() {
        return this.tvFibraDuracionPonderada;
    }

    public void setTvFibraIndisponibilidad( BigDecimal tvFibraIndisponibilidad ) {
        this.tvFibraIndisponibilidad = tvFibraIndisponibilidad ;
    }
    public BigDecimal getTvFibraIndisponibilidad() {
        return this.tvFibraIndisponibilidad;
    }

    public void setTvFibraDuracion( BigDecimal tvFibraDuracion ) {
        this.tvFibraDuracion = tvFibraDuracion ;
    }
    public BigDecimal getTvFibraDuracion() {
        return this.tvFibraDuracion;
    }

    public void setTvClientes( Integer tvClientes ) {
        this.tvClientes = tvClientes ;
    }
    public Integer getTvClientes() {
        return this.tvClientes;
    }

    public void setTvIndisponibilidadPonderada( BigDecimal tvIndisponibilidadPonderada ) {
        this.tvIndisponibilidadPonderada = tvIndisponibilidadPonderada ;
    }
    public BigDecimal getTvIndisponibilidadPonderada() {
        return this.tvIndisponibilidadPonderada;
    }

    public void setTvDuracionPonderada( BigDecimal tvDuracionPonderada ) {
        this.tvDuracionPonderada = tvDuracionPonderada ;
    }
    public BigDecimal getTvDuracionPonderada() {
        return this.tvDuracionPonderada;
    }

    public void setTvIndisponibilidad( BigDecimal tvIndisponibilidad ) {
        this.tvIndisponibilidad = tvIndisponibilidad ;
    }
    public BigDecimal getTvIndisponibilidad() {
        return this.tvIndisponibilidad;
    }

    public void setTvDuracion( BigDecimal tvDuracion ) {
        this.tvDuracion = tvDuracion ;
    }
    public BigDecimal getTvDuracion() {
        return this.tvDuracion;
    }

    public void setVozCobreClientes( Integer vozCobreClientes ) {
        this.vozCobreClientes = vozCobreClientes ;
    }
    public Integer getVozCobreClientes() {
        return this.vozCobreClientes;
    }

    public void setVozCobreIndisponibilidadPonderada( BigDecimal vozCobreIndisponibilidadPonderada ) {
        this.vozCobreIndisponibilidadPonderada = vozCobreIndisponibilidadPonderada ;
    }
    public BigDecimal getVozCobreIndisponibilidadPonderada() {
        return this.vozCobreIndisponibilidadPonderada;
    }

    public void setVozCobreDuracionPonderada( BigDecimal vozCobreDuracionPonderada ) {
        this.vozCobreDuracionPonderada = vozCobreDuracionPonderada ;
    }
    public BigDecimal getVozCobreDuracionPonderada() {
        return this.vozCobreDuracionPonderada;
    }

    public void setVozCobreIndisponibilidad( BigDecimal vozCobreIndisponibilidad ) {
        this.vozCobreIndisponibilidad = vozCobreIndisponibilidad ;
    }
    public BigDecimal getVozCobreIndisponibilidad() {
        return this.vozCobreIndisponibilidad;
    }

    public void setVozCobreDuracion( BigDecimal vozCobreDuracion ) {
        this.vozCobreDuracion = vozCobreDuracion ;
    }
    public BigDecimal getVozCobreDuracion() {
        return this.vozCobreDuracion;
    }

    public void setVozFibraClientes( Integer vozFibraClientes ) {
        this.vozFibraClientes = vozFibraClientes ;
    }
    public Integer getVozFibraClientes() {
        return this.vozFibraClientes;
    }

    public void setVozFibraIndisponibilidadPonderada( BigDecimal vozFibraIndisponibilidadPonderada ) {
        this.vozFibraIndisponibilidadPonderada = vozFibraIndisponibilidadPonderada ;
    }
    public BigDecimal getVozFibraIndisponibilidadPonderada() {
        return this.vozFibraIndisponibilidadPonderada;
    }

    public void setVozFibraDuracionPonderada( BigDecimal vozFibraDuracionPonderada ) {
        this.vozFibraDuracionPonderada = vozFibraDuracionPonderada ;
    }
    public BigDecimal getVozFibraDuracionPonderada() {
        return this.vozFibraDuracionPonderada;
    }

    public void setVozFibraIndisponibilidad( BigDecimal vozFibraIndisponibilidad ) {
        this.vozFibraIndisponibilidad = vozFibraIndisponibilidad ;
    }
    public BigDecimal getVozFibraIndisponibilidad() {
        return this.vozFibraIndisponibilidad;
    }

    public void setVozFibraDuracion( BigDecimal vozFibraDuracion ) {
        this.vozFibraDuracion = vozFibraDuracion ;
    }
    public BigDecimal getVozFibraDuracion() {
        return this.vozFibraDuracion;
    }

    public void setVozClientes( Integer vozClientes ) {
        this.vozClientes = vozClientes ;
    }
    public Integer getVozClientes() {
        return this.vozClientes;
    }

    public void setVozIndisponibilidadPonderada( BigDecimal vozIndisponibilidadPonderada ) {
        this.vozIndisponibilidadPonderada = vozIndisponibilidadPonderada ;
    }
    public BigDecimal getVozIndisponibilidadPonderada() {
        return this.vozIndisponibilidadPonderada;
    }

    public void setVozDuracionPonderada( BigDecimal vozDuracionPonderada ) {
        this.vozDuracionPonderada = vozDuracionPonderada ;
    }
    public BigDecimal getVozDuracionPonderada() {
        return this.vozDuracionPonderada;
    }

    public void setVozIndisponibilidad( BigDecimal vozIndisponibilidad ) {
        this.vozIndisponibilidad = vozIndisponibilidad ;
    }
    public BigDecimal getVozIndisponibilidad() {
        return this.vozIndisponibilidad;
    }

    public void setVozDuracion( BigDecimal vozDuracion ) {
        this.vozDuracion = vozDuracion ;
    }
    public BigDecimal getVozDuracion() {
        return this.vozDuracion;
    }

    public void setMfeClientes( BigDecimal mfeClientes ) {
        this.mfeClientes = mfeClientes ;
    }
    public BigDecimal getMfeClientes() {
        return this.mfeClientes;
    }

    public void setMfeIndisponibilidadPonderada( BigDecimal mfeIndisponibilidadPonderada ) {
        this.mfeIndisponibilidadPonderada = mfeIndisponibilidadPonderada ;
    }
    public BigDecimal getMfeIndisponibilidadPonderada() {
        return this.mfeIndisponibilidadPonderada;
    }

    public void setMfeDuracionPonderada( BigDecimal mfeDuracionPonderada ) {
        this.mfeDuracionPonderada = mfeDuracionPonderada ;
    }
    public BigDecimal getMfeDuracionPonderada() {
        return this.mfeDuracionPonderada;
    }

    public void setMfeIndisponibilidad( BigDecimal mfeIndisponibilidad ) {
        this.mfeIndisponibilidad = mfeIndisponibilidad ;
    }
    public BigDecimal getMfeIndisponibilidad() {
        return this.mfeIndisponibilidad;
    }

    public void setMfeDuracion( BigDecimal mfeDuracion ) {
        this.mfeDuracion = mfeDuracion ;
    }
    public BigDecimal getMfeDuracion() {
        return this.mfeDuracion;
    }

    public void setFq1( String fq1 ) {
        this.fq1 = fq1 ;
    }
    public String getFq1() {
        return this.fq1;
    }

    public void setFq2( String fq2 ) {
        this.fq2 = fq2 ;
    }
    public String getFq2() {
        return this.fq2;
    }

    public void setFq3( String fq3 ) {
        this.fq3 = fq3 ;
    }
    public String getFq3() {
        return this.fq3;
    }

    public void setFq4( String fq4 ) {
        this.fq4 = fq4 ;
    }
    public String getFq4() {
        return this.fq4;
    }

    public void setFq5( String fq5 ) {
        this.fq5 = fq5 ;
    }
    public String getFq5() {
        return this.fq5;
    }

    public void setFq6( String fq6 ) {
        this.fq6 = fq6 ;
    }
    public String getFq6() {
        return this.fq6;
    }

    public void setSuministrador( String suministrador ) {
        this.suministrador = suministrador ;
    }
    public String getSuministrador() {
        return this.suministrador;
    }

    public void setTecnologia( String tecnologia ) {
        this.tecnologia = tecnologia ;
    }
    public String getTecnologia() {
        return this.tecnologia;
    }

    public void setModelo( String modelo ) {
        this.modelo = modelo ;
    }
    public String getModelo() {
        return this.modelo;
    }

    public void setTipoDeSintoma( String tipoDeSintoma ) {
        this.tipoDeSintoma = tipoDeSintoma ;
    }
    public String getTipoDeSintoma() {
        return this.tipoDeSintoma;
    }

    public void setFaltaRepuesto( String faltaRepuesto ) {
        this.faltaRepuesto = faltaRepuesto ;
    }
    public String getFaltaRepuesto() {
        return this.faltaRepuesto;
    }

    public void setTiempoMetereologico( Integer tiempoMetereologico ) {
        this.tiempoMetereologico = tiempoMetereologico ;
    }
    public Integer getTiempoMetereologico() {
        return this.tiempoMetereologico;
    }

    public void setFecha( Date fecha ) {
        this.fecha = fecha ;
    }
    public Date getFecha() {
        return this.fecha;
    }

    public void setCausa( String causa ) {
        this.causa = causa ;
    }
    public String getCausa() {
        return this.causa;
    }

    public void setCausaIgri( String causaIgri ) {
        this.causaIgri = causaIgri ;
    }
    public String getCausaIgri() {
        return this.causaIgri;
    }

    public void setSubcausaIgri( String subcausaIgri ) {
        this.subcausaIgri = subcausaIgri ;
    }
    public String getSubcausaIgri() {
        return this.subcausaIgri;
    }

    public void setSeveridad( BigDecimal severidad ) {
        this.severidad = severidad ;
    }
    public BigDecimal getSeveridad() {
        return this.severidad;
    }

    public void setAciFInicio( Date aciFInicio ) {
        this.aciFInicio = aciFInicio ;
    }
    public Date getAciFInicio() {
        return this.aciFInicio;
    }

    public void setAciFFin( Date aciFFin ) {
        this.aciFFin = aciFFin ;
    }
    public Date getAciFFin() {
        return this.aciFFin;
    }

    public void setAciDescripcion( String aciDescripcion ) {
        this.aciDescripcion = aciDescripcion ;
    }
    public String getAciDescripcion() {
        return this.aciDescripcion;
    }

    public void setAciCausa( String aciCausa ) {
        this.aciCausa = aciCausa ;
    }
    public String getAciCausa() {
        return this.aciCausa;
    }

    public void setAciSaf( String aciSaf ) {
        this.aciSaf = aciSaf ;
    }
    public String getAciSaf() {
        return this.aciSaf;
    }

    public void setAciAnalisis( String aciAnalisis ) {
        this.aciAnalisis = aciAnalisis ;
    }
    public String getAciAnalisis() {
        return this.aciAnalisis;
    }

    public void setAciSeveridad( Integer aciSeveridad ) {
        this.aciSeveridad = aciSeveridad ;
    }
    public Integer getAciSeveridad() {
        return this.aciSeveridad;
    }

    public void setAciLocalizacion( String aciLocalizacion ) {
        this.aciLocalizacion = aciLocalizacion ;
    }
    public String getAciLocalizacion() {
        return this.aciLocalizacion;
    }

    public void setIdProblema( String idProblema ) {
        this.idProblema = idProblema ;
    }
    public String getIdProblema() {
        return this.idProblema;
    }

    public void setConcatInc1( String concatInc1 ) {
        this.concatInc1 = concatInc1 ;
    }
    public String getConcatInc1() {
        return this.concatInc1;
    }

    public void setConcatIncAvePla( String concatIncAvePla ) {
        this.concatIncAvePla = concatIncAvePla ;
    }
    public String getConcatIncAvePla() {
        return this.concatIncAvePla;
    }

    public void setConcatIncAvePla2( String concatIncAvePla2 ) {
        this.concatIncAvePla2 = concatIncAvePla2 ;
    }
    public String getConcatIncAvePla2() {
        return this.concatIncAvePla2;
    }

    public void setRedIncidencia( String redIncidencia ) {
        this.redIncidencia = redIncidencia ;
    }
    public String getRedIncidencia() {
        return this.redIncidencia;
    }

    public void setEdificioDslam( String edificioDslam ) {
        this.edificioDslam = edificioDslam ;
    }
    public String getEdificioDslam() {
        return this.edificioDslam;
    }

    public void setSupermasivas( Boolean supermasivas ) {
        this.supermasivas = supermasivas ;
    }
    public Boolean getSupermasivas() {
        return this.supermasivas;
    }

    public void setEstadoGestion( String estadoGestion ) {
        this.estadoGestion = estadoGestion ;
    }
    public String getEstadoGestion() {
        return this.estadoGestion;
    }

    public void setNebaFibraClientes( Integer nebaFibraClientes ) {
        this.nebaFibraClientes = nebaFibraClientes ;
    }
    public Integer getNebaFibraClientes() {
        return this.nebaFibraClientes;
    }

    public void setNebaFibraIndisponibilidad( Integer nebaFibraIndisponibilidad ) {
        this.nebaFibraIndisponibilidad = nebaFibraIndisponibilidad ;
    }
    public Integer getNebaFibraIndisponibilidad() {
        return this.nebaFibraIndisponibilidad;
    }

    public void setNebaLocalClientes( Integer nebaLocalClientes ) {
        this.nebaLocalClientes = nebaLocalClientes ;
    }
    public Integer getNebaLocalClientes() {
        return this.nebaLocalClientes;
    }

    public void setNebaLocalIndisponibilidad( Integer nebaLocalIndisponibilidad ) {
        this.nebaLocalIndisponibilidad = nebaLocalIndisponibilidad ;
    }
    public Integer getNebaLocalIndisponibilidad() {
        return this.nebaLocalIndisponibilidad;
    }

    public void setNebaCobreClientes( Integer nebaCobreClientes ) {
        this.nebaCobreClientes = nebaCobreClientes ;
    }
    public Integer getNebaCobreClientes() {
        return this.nebaCobreClientes;
    }

    public void setNebaCobreIndisponibilidad( Long nebaCobreIndisponibilidad ) {
        this.nebaCobreIndisponibilidad = nebaCobreIndisponibilidad ;
    }
    public Long getNebaCobreIndisponibilidad() {
        return this.nebaCobreIndisponibilidad;
    }

    public void setNebaFibraDuracion( Integer nebaFibraDuracion ) {
        this.nebaFibraDuracion = nebaFibraDuracion ;
    }
    public Integer getNebaFibraDuracion() {
        return this.nebaFibraDuracion;
    }

    public void setNebaLocalDuracion( Integer nebaLocalDuracion ) {
        this.nebaLocalDuracion = nebaLocalDuracion ;
    }
    public Integer getNebaLocalDuracion() {
        return this.nebaLocalDuracion;
    }

    public void setNebaCobreDuracion( Integer nebaCobreDuracion ) {
        this.nebaCobreDuracion = nebaCobreDuracion ;
    }
    public Integer getNebaCobreDuracion() {
        return this.nebaCobreDuracion;
    }


    //----------------------------------------------------------------------
    // GETTERS & SETTERS FOR LINKS
    //----------------------------------------------------------------------

    //----------------------------------------------------------------------
    // toString METHOD
    //----------------------------------------------------------------------

public String toString() { 
   return "ListadoIncidenciasRegularizada  ["+
    						",tipo  ="+ tipo +
    						",red  ="+ red +
    						",equipo  ="+ equipo +
    						",provincia  ="+ provincia +
    						",id  ="+ id +
    						",responsable  ="+ responsable +
    						",fechaCreacion  ="+ fechaCreacion +
    						",fechaReparacion  ="+ fechaReparacion +
    						",fechaFranqueo  ="+ fechaFranqueo +
    						",fechaCierre  ="+ fechaCierre +
    						",baCobreClientes  ="+ baCobreClientes +
    						",baCobreIndisponibilidadPonderada  ="+ baCobreIndisponibilidadPonderada +
    						",baCobreDuracionPonderada  ="+ baCobreDuracionPonderada +
    						",baCobreIndisponibilidad  ="+ baCobreIndisponibilidad +
    						",baCobreDuracion  ="+ baCobreDuracion +
    						",baFibraClientes  ="+ baFibraClientes +
    						",baFibraIndisponibilidadPonderada  ="+ baFibraIndisponibilidadPonderada +
    						",baFibraDuracionPonderada  ="+ baFibraDuracionPonderada +
    						",baFibraIndisponibilidad  ="+ baFibraIndisponibilidad +
    						",baFibraDuracion  ="+ baFibraDuracion +
    						",baClientes  ="+ baClientes +
    						",baIndisponibilidadPonderada  ="+ baIndisponibilidadPonderada +
    						",baDuracionPonderada  ="+ baDuracionPonderada +
    						",baIndisponibilidad  ="+ baIndisponibilidad +
    						",baDuracion  ="+ baDuracion +
    						",tvCobreClientes  ="+ tvCobreClientes +
    						",tvCobreIndisponibilidadPonderada  ="+ tvCobreIndisponibilidadPonderada +
    						",tvCobreDuracionPonderada  ="+ tvCobreDuracionPonderada +
    						",tvCobreIndisponibilidad  ="+ tvCobreIndisponibilidad +
    						",tvCobreDuracion  ="+ tvCobreDuracion +
    						",tvFibraClientes  ="+ tvFibraClientes +
    						",tvFibraIndisponibilidadPonderada  ="+ tvFibraIndisponibilidadPonderada +
    						",tvFibraDuracionPonderada  ="+ tvFibraDuracionPonderada +
    						",tvFibraIndisponibilidad  ="+ tvFibraIndisponibilidad +
    						",tvFibraDuracion  ="+ tvFibraDuracion +
    						",tvClientes  ="+ tvClientes +
    						",tvIndisponibilidadPonderada  ="+ tvIndisponibilidadPonderada +
    						",tvDuracionPonderada  ="+ tvDuracionPonderada +
    						",tvIndisponibilidad  ="+ tvIndisponibilidad +
    						",tvDuracion  ="+ tvDuracion +
    						",vozCobreClientes  ="+ vozCobreClientes +
    						",vozCobreIndisponibilidadPonderada  ="+ vozCobreIndisponibilidadPonderada +
    						",vozCobreDuracionPonderada  ="+ vozCobreDuracionPonderada +
    						",vozCobreIndisponibilidad  ="+ vozCobreIndisponibilidad +
    						",vozCobreDuracion  ="+ vozCobreDuracion +
    						",vozFibraClientes  ="+ vozFibraClientes +
    						",vozFibraIndisponibilidadPonderada  ="+ vozFibraIndisponibilidadPonderada +
    						",vozFibraDuracionPonderada  ="+ vozFibraDuracionPonderada +
    						",vozFibraIndisponibilidad  ="+ vozFibraIndisponibilidad +
    						",vozFibraDuracion  ="+ vozFibraDuracion +
    						",vozClientes  ="+ vozClientes +
    						",vozIndisponibilidadPonderada  ="+ vozIndisponibilidadPonderada +
    						",vozDuracionPonderada  ="+ vozDuracionPonderada +
    						",vozIndisponibilidad  ="+ vozIndisponibilidad +
    						",vozDuracion  ="+ vozDuracion +
    						",mfeClientes  ="+ mfeClientes +
    						",mfeIndisponibilidadPonderada  ="+ mfeIndisponibilidadPonderada +
    						",mfeDuracionPonderada  ="+ mfeDuracionPonderada +
    						",mfeIndisponibilidad  ="+ mfeIndisponibilidad +
    						",mfeDuracion  ="+ mfeDuracion +
    						",fq1  ="+ fq1 +
    						",fq2  ="+ fq2 +
    						",fq3  ="+ fq3 +
    						",fq4  ="+ fq4 +
    						",fq5  ="+ fq5 +
    						",fq6  ="+ fq6 +
    						",suministrador  ="+ suministrador +
    						",tecnologia  ="+ tecnologia +
    						",modelo  ="+ modelo +
    						",tipoDeSintoma  ="+ tipoDeSintoma +
    						",faltaRepuesto  ="+ faltaRepuesto +
    						",tiempoMetereologico  ="+ tiempoMetereologico +
    						",fecha  ="+ fecha +
    						",causa  ="+ causa +
    						",causaIgri  ="+ causaIgri +
    						",subcausaIgri  ="+ subcausaIgri +
    						",severidad  ="+ severidad +
    						",aciFInicio  ="+ aciFInicio +
    						",aciFFin  ="+ aciFFin +
    						",aciDescripcion  ="+ aciDescripcion +
    						",aciCausa  ="+ aciCausa +
    						",aciSaf  ="+ aciSaf +
    						",aciAnalisis  ="+ aciAnalisis +
    						",aciSeveridad  ="+ aciSeveridad +
    						",aciLocalizacion  ="+ aciLocalizacion +
    						",idProblema  ="+ idProblema +
    						",concatInc1  ="+ concatInc1 +
    						",concatIncAvePla  ="+ concatIncAvePla +
    						",concatIncAvePla2  ="+ concatIncAvePla2 +
    						",redIncidencia  ="+ redIncidencia +
    						",edificioDslam  ="+ edificioDslam +
    						",supermasivas  ="+ supermasivas +
    						",estadoGestion  ="+ estadoGestion +
    						",nebaFibraClientes  ="+ nebaFibraClientes +
    						",nebaFibraIndisponibilidad  ="+ nebaFibraIndisponibilidad +
    						",nebaLocalClientes  ="+ nebaLocalClientes +
    						",nebaLocalIndisponibilidad  ="+ nebaLocalIndisponibilidad +
    						",nebaCobreClientes  ="+ nebaCobreClientes +
    						",nebaCobreIndisponibilidad  ="+ nebaCobreIndisponibilidad +
    						",nebaFibraDuracion  ="+ nebaFibraDuracion +
    						",nebaLocalDuracion  ="+ nebaLocalDuracion +
    						",nebaCobreDuracion  ="+ nebaCobreDuracion +
"]";

}
}
