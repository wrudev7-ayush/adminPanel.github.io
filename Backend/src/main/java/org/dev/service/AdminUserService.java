package org.dev.service;


import org.dev.dto.AdminUserListDto;
import org.dev.model.User;
import org.dev.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class AdminUserService {

    private final UserRepository userRepository;

    public AdminUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Page<AdminUserListDto> getUsers(int page, int size) {

        return userRepository
                .findAll(PageRequest.of(page, size))
                .map(this::toDto);
    }

    private AdminUserListDto toDto(User u) {
        return new AdminUserListDto(
                u.getUserId(),
                u.getEmail(),
                u.getFirstName() + " " +
                        (u.getLastName() != null ? u.getLastName() : ""),
                u.getPhone(),
                u.getUserType(),
                u.getStatus()
        );
    }
}
