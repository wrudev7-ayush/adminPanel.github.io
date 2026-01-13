package org.dev.service;

import java.security.SecureRandom;

import org.dev.config.JwtUtil;
import org.dev.model.AdminUsers;
import org.dev.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminAuthService {

	private final UserRepository repo;
	private final PasswordEncoder encoder;
	private final JwtUtil jwtUtil;
	private final OtpService otpService;

	public AdminAuthService(UserRepository repo, PasswordEncoder encoder, OtpService otpService, JwtUtil jwtUtil) {
		this.repo = repo;
		this.otpService = otpService;
		this.encoder = encoder;
		this.jwtUtil = jwtUtil;
	}

	
	  @Transactional public void updatePassword(String password) { AdminUsers admin
	 = repo.findById(1L).orElseThrow(() -> new
	RuntimeException("Admin not found"));
	 admin.setPassword(encoder.encode(password)); repo.save(admin); }
	 
	@Transactional
	public void login(String email, String password) {
		AdminUsers admin = repo.findByEmail(email).orElseThrow(() -> new RuntimeException("Invalid email or password"));
		if (!admin.isActive()) {
			throw new RuntimeException("Admin account is disabled");
		}
		System.out.println("Password from DB: " + admin.getPassword());
		long t1 = System.currentTimeMillis();

		if (!encoder.matches(password.trim(), admin.getPassword())) {
			throw new RuntimeException("Invalid password");
		}
		long t2 = System.currentTimeMillis();
		System.out.println("Password check took " + (t2 - t1) + " ms");
		otpService.generateAndSendOtp(email);
	}

	@Transactional
	public String verifyOtpAndGenerateToken(String email, String otp) {

		if (!otpService.validateOtp(email, otp)) {
			System.out.println("OTP validation failed for email: " + email + " with OTP: " + otp);
			throw new RuntimeException("Invalid OTP");
		}

		return jwtUtil.generateAdminToken(email);
	}


}
