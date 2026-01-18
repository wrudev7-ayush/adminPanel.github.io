package org.dev.dto;

public class AdminUserListDto {

    private Integer userId;
    private String email;
    private String fullName;
    private Long phone;
    private Integer userType;
    private Integer status;

    public AdminUserListDto(Integer userId, String email,
                            String fullName, Long phone,
                            Integer userType, Integer status) {
        this.userId = userId;
        this.email = email;
        this.fullName = fullName;
        this.phone = phone;
        this.userType = userType;
        this.status = status;
    }

    public Integer getUserId() { return userId; }
    public String getEmail() { return email; }
    public String getFullName() { return fullName; }
    public Long getPhone() { return phone; }
    public Integer getUserType() { return userType; }
    public Integer getStatus() { return status; }
}
