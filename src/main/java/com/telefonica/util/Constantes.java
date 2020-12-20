package com.telefonica.util;


public class Constantes {

	public static String REGEX_FICHEROS_LOG = ".+\\.log";
	public static String ALMACEN_TEMPORAL;
	
	// Hostname en producci�n de la aplicaci�n.
	public static final String HOSTNAME_PRODUCCION_STR = "grilloweb"; 	//"grilloweb.sdr.tesa"
	
	// Variables de session (Keys)
	public static final String SESSION_USERNAME_STR = "userName";       //EJEMPLO: usuario. "t698580"
	public static final String SESSION_USERNAME_ID_STR = "userName_id"; //EJEMPLO: Id de usuario "1"

	public static final String USUARIO_SESSION_STR = "usuario";
	public static final String ID_SESSION_STR = "idEnSesion";
	public static final String USUARIO_EDITAR_STR = "usuarioEditar";
	public static final String ID_EDITAR_STR = "idUsuarioEditar";
	
	public static final String PASSWORD_NO_CAMBIA_STR = "[sin_cambios]";	
	
	public static String sCSV_Init = "\"";         //"
	public static String sCSV_Separator = "\";\""; //";"
	
	// CODIGOS DE CENTROS
	public static final String ALL_CEN = "ALL";	// TODAS
	public static final String TELCO_CEN = "TEL";	// telco
	public static final String ELECNOR_CEN = "ELECNOR";	// telco
	public static final String SYCAR_CEN = "SYC";	// sycar
	public static final String GRILLO_CEN = "GRI";	// grillo
	public static final String ER_CEN = "RELEVANTES";
	public static final String MAX_SEMANA = "max_semana";
	public static final String MAX_MES = "max_mes";

	
	// Constantes que uso para logger
	public static final String INFO_EJECUTANDO = "Ejecutando - ";
	public static final String MATRICULA = "matricula";
	public static final String AREA = "area";
}
