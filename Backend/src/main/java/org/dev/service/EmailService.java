package org.dev.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    
	@Async 
    public void sendOtpEmail(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Admin Login OTP");
        message.setText(
                "Your OTP is: " + otp +
                "\n\nValid for 5 minutes.\nDo not share this OTP."
        );

        mailSender.send(message);
        System.out.println("OTP email sent to " + toEmail);
    }
    
    @Async
    public void sendTestEmail(String toEmail) {
    	try {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("SMTP Test - Spring Boot");
        message.setText(
                "This is a test email.\n\n" +
                "If you received this, Gmail SMTP is configured correctly."
        );

        mailSender.send(message);
    	}catch (Exception ex) {
            // IMPORTANT: Never throw exception from async method
            System.out.println("Failed to send OTP email to {}"+toEmail+" "+ex);
        }
    }
}

