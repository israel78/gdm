package com.telefonica.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;

public class Usuario {
	
private int id_usuario;
private String matricula;
private String password;
private String nombre;
private String apellido_1;
private String apellido_2;
private int activo;
private Date f_alta;
private Date f_baja;
private String centro;
private String cargo;
private int enviar_correo;


public String getCargo() {
	return cargo;
}
public void setCargo(String cargo) {
	this.cargo = cargo;
}
public int getId_usuario() {
	return id_usuario;
}
public void setId_usuario(int id_usuario) {
	this.id_usuario = id_usuario;
}
public String getMatricula() {
	return matricula;
}
public void setMatricula(String matricula) {
	this.matricula = matricula;
}
public String getPassword() {
	return password;
}
public void setPassword(String password) {
	this.password = password;
}
public String getNombre() {
	return nombre;
}
public void setNombre(String nombre) {
	this.nombre = nombre;
}
public String getApellido_1() {
	return apellido_1;
}
public void setApellido_1(String apellido_1) {
	this.apellido_1 = apellido_1;
}
public String getApellido_2() {
	return apellido_2;
}
public void setApellido_2(String apellido_2) {
	this.apellido_2 = apellido_2;
}
public int getActivo() {
	return activo;
}
public void setActivo(int activo) {
	this.activo = activo;
}
public Date getF_alta() {
	return f_alta;
}
public void setF_alta(Date f_alta) {
	this.f_alta = f_alta;
}
public Date getF_baja() {
	return f_baja;
}
public void setF_baja(Date f_baja) {
	this.f_baja = f_baja;
}
public String getCentro() {
	return centro;
}
public void setCentro(String centro) {
	this.centro = centro;
}
public int getEnviar_correo() {
	return enviar_correo;
}
public void setEnviar_correo(int enviar_correo) {
	this.enviar_correo = enviar_correo;
}


}
