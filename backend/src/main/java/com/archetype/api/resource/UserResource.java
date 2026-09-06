package com.archetype.api.resource;

import com.archetype.api.domain.User;
import com.archetype.api.repository.UserRepository;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.JsonWebToken;
import java.util.List;

@Path("/api/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {

    @Inject
    UserRepository userRepository;

    @Inject
    JsonWebToken jwt;

    @GET
    @RolesAllowed({"admin", "user"})
    public Response getAllUsers() {
        List<User> users = userRepository.listAll();
        return Response.ok(users).build();
    }

    @GET
    @Path("/me")
    @RolesAllowed({"admin", "user"})
    public Response getCurrentUserInfo() {
        // Obtenemos el email del subject (sub) del token JWT
        String email = jwt.getSubject();
        return userRepository.findByEmail(email)
                .map(user -> Response.ok(user).build())
                .orElse(Response.status(Response.Status.NOT_FOUND).build());
    }
}
