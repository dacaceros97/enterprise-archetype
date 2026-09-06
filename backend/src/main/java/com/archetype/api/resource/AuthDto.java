package com.archetype.api.resource;

public class AuthDto {

    public static class LoginRequest {
        public String email;
        public String password;
    }

    public static class RegisterRequest {
        public String email;
        public String password;
        public String role; // "admin" o "user"
    }

    public static class AuthResponse {
        public String token;
        public String email;
        public String role;

        public AuthResponse(String token, String email, String role) {
            this.token = token;
            this.email = email;
            this.role = role;
        }
    }
}
