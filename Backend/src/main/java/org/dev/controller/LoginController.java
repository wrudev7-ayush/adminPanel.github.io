package org.dev.controller;

import java.util.Map;

import org.dev.dto.AdminLoginRequest;
import org.dev.dto.AdminOtpVerifyRequest;
import org.dev.service.AdminAuthService;
import org.dev.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/admin/auth")
@CrossOrigin
public class LoginController {

	private final AdminAuthService service;
	private final EmailService emailService;
	public LoginController(AdminAuthService service,EmailService emailService) {
		this.service = service;
		 this.emailService = emailService;
	}

	
	@PostMapping("/login")
	public ResponseEntity<String> login(@Valid @RequestBody AdminLoginRequest request) {
		System.out.println(request.getEmail() +" "+request.getPassword());
		service.login(request.getEmail(), request.getPassword());
       
		return ResponseEntity.ok("OTP sent to registered email");
	}
	 @PostMapping("/verify-otp")
	 public ResponseEntity<Map<String, String>> verifyOtp(
	            @Valid @RequestBody AdminOtpVerifyRequest request) {

	        String jwt = service
	                .verifyOtpAndGenerateToken(request.getEmail(), request.getOtp());
	        System.out.println("Generated JWT: " + jwt);
	        return ResponseEntity.ok(
	                Map.of("token", jwt)
	        );
	    }
	 
	
		
		/*
		 * @GetMapping("/password") public ResponseEntity<String>
		 * updatePassword(@RequestParam String to) {
		 * 
		 * service.updatePassword(to);
		 * 
		 * return ResponseEntity.ok("Test admin password changed successfully"); }
		 */
		 
	 

	    /**
	     * ✅ TEST SMTP CONFIGURATION
	     * Example:
	     * GET /admin/auth/email?to=yourgmail@gmail.com
	     */
	    @GetMapping("/email")
	    public ResponseEntity<String> testEmail(@RequestParam String to) {

	        emailService.sendTestEmail(to);

	        return ResponseEntity.ok("Test email sent successfully");
	    }
}
