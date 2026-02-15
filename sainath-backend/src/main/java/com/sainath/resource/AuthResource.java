package com.sainath.resource;

import com.sainath.entity.User;
import io.smallrye.jwt.build.Jwt;
import jakarta.annotation.security.PermitAll;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Arrays;
import java.util.HashSet;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    @POST
    @Path("/register")
    @Transactional
    @PermitAll
    public Response register(User user) {
        if (User.find("email", user.email).count() > 0) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Email already exists").build();
        }
        // In a real app, hash the password here!
        user.persist();
        return Response.ok(user).build();
    }

    @POST
    @Path("/login")
    @PermitAll
    public Response login(User loginRequest) {
        User user = User.find("email", loginRequest.email).firstResult();
        if (user != null && user.password.equals(loginRequest.password)) {
            String token = Jwt.issuer("https://sainath-mobile.com")
                    .upn(user.email)
                    .groups(new HashSet<>(Arrays.asList(user.role)))
                    .sign();
            return Response.ok(new AuthResponse(user, token)).build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid credentials").build();
    }

    public static class AuthResponse {
        public User user;
        public String token;

        public AuthResponse(User user, String token) {
            this.user = user;
            this.token = token;
        }
    }
}
