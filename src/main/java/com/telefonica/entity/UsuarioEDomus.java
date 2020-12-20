/*
 *      ARCHIVO: UsuarioEDomus.java
 *     PROYECTO: ACI-Web
 *  DESCRIPCION: Clase que almacena la informaci�n de una persona de Telef�nica
 *               registrada en eDomus
 *        AUTOR: Carlos Palacios Peinado
 *    VERSIONES: [27/01/2014] 1.0, Version inicial.
 *        NOTAS: --
 */
package com.telefonica.entity;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.StringTokenizer;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import javax.xml.bind.DatatypeConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Component;

import com.telefonica.mapper.ifsi.DB_IFSI_Mapper;



/*
 import presentacion.administracionSS.recursos.interfaces.helpers.I_UsuarioEdomus;
 import presentacion.recursos.excepciones.AciUIException;
 import recursos.interfaces.ILog;
 import recursos.interfaces.IPropiedades;
 */

/*
 import com.google.inject.Inject; //@Inject
 import com.google.inject.Singleton; //@Singleton
 */

//@Singleton
//public class UsuarioEDomus implements I_UsuarioEdomus {
@Configurable
public class UsuarioEDomus {

	//private static final String NOMBRE_FICHERO = "credencialesEdomus.properties";
	private static final String AUTHORIZATION = "Authorization";
	//private static final String URL_EDOMUS = "https://edomus.tesa/lt/portal/intranet/es/BuscadorPersonas?action=es.indra.telefonica.apps.buscadorpersonas.portlet.BuscadorPersonasAction&vgnextoid=bf7f6c2bc8ebb210VgnVCM10000055d81aacRCRD";
	private static final String URL_EDOMUS = "https://edomus.tesa/lt/portal/intranet/es/BuscadorPersonas?action=es.indra.telefonica.apps.buscadorpersonas.portlet.BuscadorPersonasAction&vgnextoid=bf7f6c2bc8ebb210VgnVCM10000055d81aacRCRD";
	//
	private static String user_edomus = ""; //"T698580";
	private static String password_edomus = ""; //"password";
	//private IPropiedades propUsuarios = null;
	//private ILog log = null;
	private String nombre = "";
	private String apellidos = "";
	private String identificador = "";
	private String unidadOrganizativa = "";
	private String fijo = "";
	private String movil = "";
	private String fijoCorto = "";
	private String email = "";
	private String cargo = "";

	@Autowired
	public  DB_IFSI_Mapper db_IFSI_Mapper;
	//@Inject
	//public UsuarioEDomus(ILog inLog, IPropiedades inProp) {
	public UsuarioEDomus(Consulta_DatosProxy consulta_DatosProxy) {
		/*
		this.log = inLog;
		this.propUsuarios = inProp;
		*/

		try {
			// Cargamos user/password para acceder a eDomus
			//this.propUsuarios.aplicarFichero(NOMBRE_FICHERO);
			initUser_Password_edomus(consulta_DatosProxy);
		} catch (Exception except) {
			// No deber�a llegarse aqu�, pues el fichero deber�a existir siempre
			//except.printStackTrace();
		}
	}
	
	@Override
	public String toString() {
		return "UsuarioEDomus [nombre=" + nombre + ", apellidos=" + apellidos
				+ ", identificador=" + identificador + ", unidadOrganizativa="
				+ unidadOrganizativa + ", fijo=" + fijo + ", movil=" + movil
				+ ", fijoCorto=" + fijoCorto + ", email=" + email + ", cargo="
				+ cargo + "]";
	}

	private void initUser_Password_edomus(Consulta_DatosProxy consulta_DatosProxy) {
		/* Para acceder al edomus, necesitamos un user/password de la INTRANET de Telef�nica
		   Lo cogemos del procedimiento almacenado en MRDAUX:IFSI.web_icorreo.Consulta_DatosProxy
		   Devuelve un registro con estos campos:
		   PROXY_HOST        , PROXY_PUERTO, PROXY_USUARIO, PASSWORD
		   proxyinternet.tesa, 8080        , ...          , ...
		*/
		try {
			user_edomus = consulta_DatosProxy.getProxy_usuario();
			password_edomus = consulta_DatosProxy.getPassword();
			// user_edomus = "TESA\T123456" --> debemos quitar "TESA\" --> user_edomus = "T123456"
			//String[] as_User = user_edomus.split("\"); --> "\" --> expresi�n regular escapada "\\" --> cadena java --> "\\\\" 
			String[] as_User = user_edomus.split("\\\\"); //URL: http://www.regexplanet.com/advanced/java/index.html 
			if ( as_User.length > 1 ) {
				user_edomus = as_User[1];
			}
		} catch (Exception except) {
			System.out.println(except.getMessage());
		}
	}

	public boolean cargarUsuario(String inIdentificador) throws Exception {
		boolean result = true;
		X509TrustManager trustManager509 = null;
		TrustManager[] trustAllCerts = null;
		SSLContext sslContext = null;
		SSLSocketFactory sslSocketFactory = null;
		URLConnection urlCon = null;
		BufferedReader input = null;
		String userPass = null;
		String basicAuth = null;

		// Reseteamos los campos
		this.resetCampos();

		trustManager509 = new X509TrustManager() {
			/*
			 * (non-Javadoc)
			 * 
			 * @see javax.net.ssl.X509TrustManager#getAcceptedIssuers()
			 */
			@Override
			public X509Certificate[] getAcceptedIssuers() {
				return null;
			}

			/*
			 * (non-Javadoc)
			 * 
			 * @see
			 * javax.net.ssl.X509TrustManager#checkServerTrusted(java.security
			 * .cert.X509Certificate[], java.lang.String)
			 */
			@Override
			public void checkServerTrusted(X509Certificate[] inCadena,
					String inTipoAuth) throws CertificateException {

			}

			/*
			 * (non-Javadoc)
			 * 
			 * @see
			 * javax.net.ssl.X509TrustManager#checkClientTrusted(java.security
			 * .cert.X509Certificate[], java.lang.String)
			 */
			@Override
			public void checkClientTrusted(X509Certificate[] inCadena,
					String inTipoAuth) throws CertificateException {

			}
		};

		try {
			// Install the all-trusting trust manager
			sslContext = SSLContext.getInstance("SSL");
			trustAllCerts = new TrustManager[] { trustManager509 };
			sslContext.init(null, trustAllCerts,
					new java.security.SecureRandom());

			// Create an ssl socket factory with our all-trusting manager
			sslSocketFactory = sslContext.getSocketFactory();

			// Todo configurado, introducimos la URL final
			//&identificador=&nombre=&apellidos=Torre+Mancebo&telefono=&extension=&movil=&extensionMovil=&nivelJerarquico=-1&unidadOrganizativa=-1&idDireccionGeneral=-1&idEmpresa=-1&tipoPersonal=-1&idProvincia=-1
			String sParametros = "&identificador=" + inIdentificador; //matr�cula de Telef�nica
			/*
			if ( StringUtils.isNumeric(inIdentificador) ) {
				// Nos han pasado el m�vil
				sParametros = "&movil=" + inIdentificador;
			}
			*/
			urlCon = new URL(URL_EDOMUS + sParametros).openConnection();

			// Le decimos a la URL que utilice nuestra socketfactory que ignora
			// los certificados
			((HttpsURLConnection) urlCon).setSSLSocketFactory(sslSocketFactory);

			userPass = user_edomus + ":" + password_edomus;
			basicAuth = "Basic "
					+ new String(DatatypeConverter.printBase64Binary(userPass
							.getBytes()));
			urlCon.setRequestProperty(AUTHORIZATION, basicAuth);

			input = new BufferedReader(new InputStreamReader(
					urlCon.getInputStream(), "UTF-8"));

			// Procesamos la informaci�n para construir el usuario de edomus
			// final
			this.procesarBuffer(input);

			input.close();

			// Pintamos los campos del usuario final
			//this.pintarUsuario();

		
		} catch (Exception inEx) {
			// La subimos hacia arriba //AIM Si no esta el usuario no interesa que lance una excepcion
			//throw inEx;
		}

		return result;
	}

	public String getNombre() {
		return nombre;
	}
	public String getApellidos() {
		return apellidos;
	}


	public String getIdentificador() {
		return identificador;
	}

	public String getUnidadOrganizativa() {
		return unidadOrganizativa;
	}

	public String getFijo() {
		return fijo;
	}

	public String getMovil() {
		return movil;
	}
	public String getFijoCorto() {
		return fijoCorto;
	}

	public String getEmail() {
		return email;
	}

	public String getCargo() {
		return cargo;
	}

	/*
	 * M�todo que procesa el buffer de entrada y rellena los campos del
	 * destinatario Devuelve true si el proceso se hizo correctamente, falso en
	 * caso contrario
	 */
	private boolean procesarBuffer(BufferedReader inBuffer) throws Exception {
		final String NO_ENCONTRADO = "M-WARN-000073. No encontrado en eDOMUS.";
		String inputLine = null;
		boolean result = false;

		try {
			while ((inputLine = inBuffer.readLine()) != null) {
				// Si la busqueda no contiene resultados, lanzamos excepci�n
				if (inputLine.contains("La b&uacute;squeda no retorna resultados.<br/>")) {
					throw new Exception(NO_ENCONTRADO);
				}
				
					// Llegamos a los datos de usuario
					if (inputLine.contains("<ul class=\"datos-user\">")) {
						inputLine = inBuffer.readLine();
	
						// Vamos a por el nombre si se cumple
						if (inputLine.contains("<li><h2>")) {
							this.procesarNombreCompleto(inputLine);
						}
	
					}
	
					// Identificador
					if (inputLine.contains("<li><span class=\"titular\">Identificador:</span>")) {
						this.procesarIdentificador(inputLine);
					}
					System.out.println(inputLine);
					// _Cargo o funci�n
					if (inputLine.contains("<span class=\"titular\">Cargo o funci&oacute;n:</span>")) {
						inputLine = inBuffer.readLine();
						inputLine = inBuffer.readLine();
						this.procesarCargo(inputLine);
					}
					
	
					// Unidad Organizativa
					if (inputLine.contains("<li><span class=\"titular\">Unidad Organizativa:</span>")) {
						this.procesarUnidadOrganizativa(inputLine);
					}
					
					// Tel�fono
					if (inputLine.contains("<li><span class=\"titular\">Tel&eacute;fono: </span>")) {
						this.procesarTelefono(inputLine);
					}
					/*
					// Extensi�n
					if (inputLine.contains("..............")) {
						this.procesarExtension(inputLine);
					}
					*/
	
					// M�vil
					if (inputLine.contains("<span class=\"titular\">M&oacute;vil: </span>")) {
						this.procesarMovil(inputLine);
					}
					// Tel�fono Corto
					if (inputLine.contains("class=\"movil\" title=\"N� corto\">")) {
						this.procesarNumeroCorto(inputLine);
					}
	
					// Email
					if (inputLine.contains("<li><span class=\"titular\">Email:</span> <a href=\"mailto:")) {
						this.procesarEMail(inputLine);
					}
					
					
	
					
					// Cargo Fase 1
					/*
					if (inputLine.contains("<!-- <i>MH:</i>&nbsp;  -->")) {
						this.procesarCargoFaseI(inputLine);
					}
					
					// Cargo Fase 2
					if (inputLine.contains("<li><span class=\"titular\">Unidad Organizativa:</span> ")) {
						this.procesarCargoFaseII(inputLine);
					}
					*/
				
				// Pintamos la linea para debug
				//System.out.println(inputLine);
			}
		} catch (IOException inEx) {
			throw inEx;
		}

		return result;
	}

	/*
	 * Procesa el cargo a partir de la l�nea donde se encuentra
	 */
	private void procesarCargo(String inInputLine) {
		String result = "";

		inInputLine = inInputLine.replace("<!-- <i>MH:</i>&nbsp;  -->", "");
		inInputLine = inInputLine.replace("\t", "");
		result = inInputLine.toString();
		

		this.cargo = result;
	}
	/*
	 * Procesa el cargo a partir de la l�nea donde se encuentra
	 */
	private void procesarCargoFaseI(String inInputLine) {
		String result = "";

		inInputLine = inInputLine.replace("<!-- <i>MH:</i>&nbsp;  -->", "");
		inInputLine = inInputLine.replace("\t", "");

		if (!inInputLine.equals("ASESOR BASE (ATC) TECNICO DE CLIENTE")) {
			result = inInputLine;
		}

		this.cargo = result;
	}

	/*
	 * Procesa el cargo a partir de la l�nea donde se encuentra
	 */
	private void procesarCargoFaseII(String inInputLine) {
		String result = "";

		inInputLine = inInputLine.replace(
				"<li><span class=\"titular\">Unidad Organizativa:</span> ", "");
		inInputLine = inInputLine.replace("\t", "");

		// 5 casos

		// Caso 1
		// 6 char + '-' + Cargo
		if (inInputLine.charAt(6) == '-') {
			result = inInputLine.substring(7, inInputLine.indexOf("<"));
		}

		// Caso 2 7 char + " "
		if (inInputLine.charAt(7) == '-') {
			result = inInputLine.substring(8, inInputLine.indexOf("<"));
		}

		// Caso 3 7 char + "- "
		if (inInputLine.charAt(7) == '-') {
			result = inInputLine.substring(9, inInputLine.indexOf("<"));
		}

		// Caso 4 4 char + '-J. '
		if ((inInputLine.charAt(4) == '-') && (inInputLine.charAt(5) == 'J')
				&& (inInputLine.charAt(6) == '.')) {
			result = inInputLine.substring(8, inInputLine.indexOf("<"));
		}

		// Caso 5 5 char + '-J. '
		if ((inInputLine.charAt(5) == '-') && (inInputLine.charAt(6) == 'J')
				&& (inInputLine.charAt(7) == '.')) {
			result = inInputLine.substring(9, inInputLine.indexOf("<"));
		}

		if (!this.cargo.isEmpty()) {
			result = this.cargo + " " + result;
		}

		this.cargo = result;
	}

	/*
	 * Procesa el n�mero corto a partir de la l�nea donde se encuentra
	 */
	private void procesarNumeroCorto(String inInputLine) {
		String result = null;

		inInputLine = inInputLine.replace(
				inInputLine.substring(0, inInputLine.indexOf(">") + 1), "");
		inInputLine = inInputLine.replace("\t", "");
		inInputLine = inInputLine.substring(0, 6);

		try {
			Integer.parseInt(inInputLine);

			result = inInputLine;
		} catch (NumberFormatException inEx) {
			result = "";
		}

		this.fijoCorto = result;
	}

	/*
	 * Procesa el tel�fono a partir de la l�nea donde se encuentra
	 */
	private void procesarTelefono(String inInputLine) {
		inInputLine = inInputLine.replace(
				"<li><span class=\"titular\">Tel&eacute;fono: </span>", "");
		inInputLine = inInputLine.substring(0, inInputLine.indexOf("/") - 1);
		inInputLine = inInputLine.replace("\t", "");

		this.fijo = inInputLine;
	}

	/*
	 * Procesa el m�vil a partir de la l�nea donde se encuentra
	 */
	private void procesarMovil(String inInputLine) {
		inInputLine = inInputLine.replace(
				"<span class=\"titular\">M&oacute;vil: </span>", "");
		inInputLine = inInputLine.substring(0, inInputLine.indexOf("/") - 1);
		inInputLine = inInputLine.replace("\t", "");

		this.movil = inInputLine;
	}

	/*
	 * Procesa el email a partir de la l�nea donde se encuentra
	 */
	private void procesarEMail(String inInputLine) {
		inInputLine = inInputLine.replace(
				"<li><span class=\"titular\">Email:</span> <a href=\"mailto:",
				"");
		inInputLine = inInputLine.substring(0, inInputLine.indexOf("\""));
		inInputLine = inInputLine.replace("\t", "");

		this.email = inInputLine;
	}

	/*
	 * Procesa el nombre a partir de la l�nea donde se encuentra
	 */
	private void procesarNombreCompleto(String inInputLine) {
		StringTokenizer st = null;
		String token = null;

		inInputLine = inInputLine.replace("<li><h2>", "");
		inInputLine = inInputLine.replace("</h2></li>", "");
		inInputLine = inInputLine.replace("\t", "");

		st = new StringTokenizer(inInputLine, ";");
		token = st.nextToken();

		this.nombre = token.replace("&nbsp", "");

		// Eliminamos el nombre completo y procesamos los dos apellidos aparte
		inInputLine = inInputLine.replace(this.nombre + "&nbsp;", "");

		this.apellidos = inInputLine;
	}

	/*
	 * Procesa el identificador a partir de la l�nea donde se encuentra
	 */
	private void procesarIdentificador(String inInputLine) {
		inInputLine = inInputLine.replace(
				"<li><span class=\"titular\">Identificador:</span> ", "");
		inInputLine = inInputLine.replace("</li>", "");
		inInputLine = inInputLine.replace("\t", "");

		this.identificador = inInputLine;
	}
	
	private void procesarUnidadOrganizativa(String inInputLine) {
		inInputLine = inInputLine.replace(
				"<li><span class=\"titular\">Unidad Organizativa:</span> ", "");
		inInputLine = inInputLine.replace("</li>", "");
		inInputLine = inInputLine.replace("\t", "");

		this.unidadOrganizativa = inInputLine;
	}

	/*
	 * Resetea todos los campos de la clase
	 */
	private void resetCampos() {
		this.nombre = "";
		this.apellidos = "";
		this.identificador = "";
		this.cargo = "";
		this.unidadOrganizativa = "";
		this.fijo = "";
		this.movil = "";
		this.fijoCorto = "";
		this.email = "";
	}

	/*
	 * M�todo que vuelca a consola todas las partes del usuario
	 */
	/*
	public void pintarUsuario() {
		log.info("Identificador: " + this.identificador);
		log.info("Nombre:        " + this.nombre);
		log.info("Apellidos:     " + this.apellidos);
		log.info("Email:         " + this.email);
		log.info("Cargo:         " + this.cargo);
		log.info("Corto:         " + this.fijoCorto);
		log.info("Tel�fono:      " + this.fijo);
		log.info("M�vil:         " + this.movil);
		log.info("unidadOrganizativa: " + this.unidadOrganizativa);
	}
	*/
	
}