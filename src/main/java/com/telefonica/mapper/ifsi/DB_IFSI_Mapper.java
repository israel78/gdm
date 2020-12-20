package com.telefonica.mapper.ifsi;
import java.util.ArrayList;   
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.telefonica.entity.Consulta_DatosProxy;


@Mapper
public interface DB_IFSI_Mapper {

	/* ******************************************************************** */
	/* 					CRUDs GEN�RICAS A TRAV�S DE MYBATIS 				*/
	/* ******************************************************************** */
	public ArrayList<HashMap> selectBySQL(@Param("sql") String sSQL);
	public int insertBySQL(@Param("sql") String sSQL);
	public int updateBySQL(@Param("sql") String sSQL);
	public int deleteBySQL(@Param("sql") String sSQL);

	
	/* ******************************************************************** */
	/* 				CONEXI�N A BD AUTOM�TICA PARA NO PERDERLA				*/
	/* ******************************************************************** */
	
	@SuppressWarnings("rawtypes")
	public java.util.Date selectNow();
	
	public Consulta_DatosProxy select_call_Consulta_DatosProxy(); 

}

	
