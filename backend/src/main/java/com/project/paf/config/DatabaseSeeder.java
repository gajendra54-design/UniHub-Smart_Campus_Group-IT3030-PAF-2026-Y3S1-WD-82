package com.project.paf.config;

import com.project.paf.modules.user.model.Role;
import com.project.paf.modules.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseSeeder {
    @Bean
    public CommandLineRunner initDatabase(UserRepository repository,
            @Value("${APP_ADMIN_EMAIL:}") String adminEmail) {
        return args -> {
            if (adminEmail.isBlank()) return;
            repository.findByEmail(adminEmail).ifPresent(user -> {
                if (user.getRole() != Role.ADMIN) {
                    user.setRole(Role.ADMIN);
                    repository.save(user);
                }
            });
        };
    }
}
