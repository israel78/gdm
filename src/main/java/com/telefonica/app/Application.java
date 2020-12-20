package com.telefonica.app;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
@SpringBootApplication(scanBasePackages={"com.telefonica.controller",
	"com.telefonica.entity",
	"com.telefonica.test",
	"com.telefonica.config",
	"com.telefonica.common"})
@MapperScan(basePackages = "com.telefonica.mapper")
@EnableAutoConfiguration
public class Application extends SpringBootServletInitializer {

	public static void main(String[] args) {
		//se crea el contexto necesario para que coincida con el nombre de la aplicacion definido en el pom
		System.setProperty("server.servlet.context-path", "/gdm");
		SpringApplication.run(Application.class, args);
	}
	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(Application.class);
    }
}

