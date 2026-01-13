package org.dev.repository;

import java.util.Optional;

import org.dev.model.AdminOtp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface AdminOtpRepository extends JpaRepository<AdminOtp, Long> {

    Optional<AdminOtp> findByEmail(String email);

    @Modifying
    @Transactional
    @Query("DELETE FROM AdminOtp o WHERE o.email = :email")
    int deleteByEmailDirect(String email);
}