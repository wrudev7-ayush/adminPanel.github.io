package org.dev.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUtil {

	@Value("${jwt.secret}")
	private String secret;

	@Value("${jwt.expiry}")
	private long expiry;

	
	   public String generateAdminToken(String email) {
		   System.out.println("Generating JWT for email: " + email);
	        return Jwts.builder()
	                .setSubject(email)
	                .addClaims(Map.of("role", "ADMIN"))
	                .setIssuedAt(new Date())
	                .setExpiration(new Date(System.currentTimeMillis() + expiry))
	                .signWith(
	                        Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)),
	                        SignatureAlgorithm.HS256
	                )
	                .compact();
	    }
	   
	   private void generateJwtSecret() {

		   byte[] key = new byte[32]; // 256 bits
	        new SecureRandom().nextBytes(key);
	        System.out.println(Base64.getEncoder().encodeToString(key));
	   
	    }
	   
}