package com.example.medical.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;

import java.util.List;

public class SwaggerConfig {
    @Bean
    public OpenAPI apiInfo() {
        return new OpenAPI()
                .info(new Info()
                        .title("Medical API")
                        .description("APIs for Medical Application")
                        .version("1.0"))
                .servers(List.of(new Server().url("http://localhost:8080").description("Local Server")));
    }
}
