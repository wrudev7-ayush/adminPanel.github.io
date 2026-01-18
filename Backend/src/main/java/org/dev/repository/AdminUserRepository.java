package org.dev.repository;

import org.dev.model.AdminUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdminUserRepository extends JpaRepository<AdminUsers, Long> {
    Optional<AdminUsers> findByEmail(String email);
}
