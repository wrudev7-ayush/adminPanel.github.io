package org.dev.model;

import jakarta.persistence.*;

@Entity
@Table(name = "admin_users")
public class AdminUsers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name="is_active",nullable = false)
    private boolean isActive;
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public boolean isActive() { return isActive; }
	@Override
	public String toString() {
		return "AdminUsers [id=" + id + ", email=" + email + ", password=" + password + ", isActive=" + isActive + "]";
	}
    
    
}