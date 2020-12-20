
package com.telefonica.entity;

import java.util.Date;

//import org.apache.log4j.Logger;
//import com.opensymphony.xwork2.ActionContext;
//import com.opensymphony.xwork2.util.LocalizedTextUtil;

//Stored Procedure "MRDAUX:IFSI.web_icorreo.Consulta_DatosProxy". //URL: http://docs.oracle.com/javase/1.5.0/docs/guide/jdbc/getstart/mapping.html
public class Consulta_DatosProxy {
	//static Logger logger = Logger.getLogger(Consulta_DatosProxy.class.getName()); // Logger
	
	private String proxy_host;
	private Integer proxy_puerto;
	private String proxy_usuario;
	private String password;
	
	@Override
	public String toString() {
		return "Consulta_DatosProxy [proxy_host=" + proxy_host
				+ ", proxy_puerto=" + proxy_puerto + ", proxy_usuario="
				+ proxy_usuario + ", password=" + password + "]";
	}

	public String getProxy_host() {
		return proxy_host;
	}

	public void setProxy_host(String proxy_host) {
		this.proxy_host = proxy_host;
	}

	public Integer getProxy_puerto() {
		return proxy_puerto;
	}

	public void setProxy_puerto(Integer proxy_puerto) {
		this.proxy_puerto = proxy_puerto;
	}

	public String getProxy_usuario() {
		return proxy_usuario;
	}

	public void setProxy_usuario(String proxy_usuario) {
		this.proxy_usuario = proxy_usuario;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
