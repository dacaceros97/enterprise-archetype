package com.archetype.api.resource;

import com.archetype.api.domain.User;
import com.archetype.api.repository.UserRepository;
import io.smallrye.jwt.build.Jwt;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.time.Duration;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;

@Path("/api/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    @Inject
    UserRepository userRepository;

    @POST
    @Path("/register")
    @Transactional
    public Response register(AuthDto.RegisterRequest request) {
        if (userRepository.findByEmail(request.email).isPresent()) {
            return Response.status(Response.Status.CONFLICT)
                    .entity("El email ya está registrado").build();
        }

        User user = new User();
        user.email = request.email;
        user.passwordHash = request.password; // Para el arquetipo base
        user.role = request.role != null ? request.role : "user";
        
        userRepository.persist(user);
        return Response.status(Response.Status.CREATED).entity(user).build();
    }

    @POST
    @Path("/login")
    public Response login(AuthDto.LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.email);

        if (userOpt.isEmpty() || !userOpt.get().passwordHash.equals(request.password)) {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("Credenciales inválidas").build();
        }

        User user = userOpt.get();

        // Generar JWT con duración de 24 horas y asignación de grupo (Rol)
        String token = Jwt.issuer("https://archetype-auth.com")
                .upn(user.email)
                .subject(user.email)
                .groups(new HashSet<>(Arrays.asList(user.role)))
                .expiresIn(Duration.ofHours(24))
                .sign();

        return Response.ok(new AuthDto.AuthResponse(token, user.email, user.role)).build();
    }
}
