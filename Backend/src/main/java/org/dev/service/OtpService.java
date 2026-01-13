package org.dev.service;

import org.dev.model.AdminOtp;

import org.dev.repository.AdminOtpRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.security.SecureRandom;

@Service
public class OtpService {

	private static final int OTP_EXPIRY_MINUTES = 5;
	private static final int MAX_ATTEMPTS = 3;

	private final AdminOtpRepository otpRepo;
	private final EmailService emailService;

	public OtpService(AdminOtpRepository otpRepo, EmailService emailService) {
		this.otpRepo = otpRepo;
		this.emailService = emailService;
	}

	@Transactional
	public void generateAndSendOtp(String email) {

		// invalidate old OTP if exists
		long t1 = System.currentTimeMillis();
		
		otpRepo.deleteByEmailDirect(email);
		long t2 = System.currentTimeMillis();
		System.out.println("delete by email query " + (t2 - t1) + " ms");
		
		String otp = String.valueOf(new SecureRandom().nextInt(900000) + 100000);
		System.out.println("Generated OTP: " + otp);
		AdminOtp adminOtp = new AdminOtp();
		adminOtp.setEmail(email);
		adminOtp.setOtpHash(sha256(otp));
		
		adminOtp.setExpiryTime(LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES));
		adminOtp.setAttempts(0);
		adminOtp.setUsed(false);
		adminOtp.setCreatedAt(LocalDateTime.now());
		long t5 = System.currentTimeMillis();
		otpRepo.save(adminOtp);
		long t6 = System.currentTimeMillis();
		System.out.println("otp db time" + (t6 - t5) + " ms");
		
		emailService.sendOtpEmail(email, otp);
	}

	public boolean validateOtp(String email, String otp) {

		AdminOtp adminOtp = otpRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("OTP not found"));
		if (LocalDateTime.now().isAfter(adminOtp.getExpiryTime())) {
			otpRepo.delete(adminOtp);
			throw new RuntimeException("OTP expired");
		}
		
		if (adminOtp.isUsed()) {
			throw new RuntimeException("OTP already used");
		}

		if (adminOtp.getAttempts() >= MAX_ATTEMPTS) {
			throw new RuntimeException("OTP attempts exceeded");
		}		

		if (!sha256(otp).equals( adminOtp.getOtpHash())) {
			adminOtp.setAttempts(adminOtp.getAttempts() + 1);
			System.out.println("OTP attempts: " + adminOtp.getAttempts());
			otpRepo.save(adminOtp);
			return false;
		}

		adminOtp.setUsed(true);
		otpRepo.save(adminOtp);
		return true;
	}
	
	
	

	    public static String sha256(String otp) {
	        try {
	            MessageDigest digest = MessageDigest.getInstance("SHA-256");
	            byte[] hash = digest.digest(otp.getBytes(StandardCharsets.UTF_8));
	            return java.util.Base64.getEncoder().encodeToString(hash);
	        } catch (Exception e) {
	            throw new RuntimeException(e);
	        }
	    
	}

}
