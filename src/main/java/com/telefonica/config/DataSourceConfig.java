package com.telefonica.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceBuilder;

@Configuration
public class DataSourceConfig {
    @Bean
    @ConfigurationProperties(prefix = "app.datasource.cdm")
    DruidDataSource dsOne() {
        return DruidDataSourceBuilder.create().build();
    }

    @Bean
    @ConfigurationProperties(prefix = "app.datasource.ifsi")
    DruidDataSource dsTwo() {
        return DruidDataSourceBuilder.create().build();
    }
}
