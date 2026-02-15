package com.sainath.filter;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.container.PreMatching;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import java.io.IOException;

@Provider
@PreMatching
public class CorsFilter implements ContainerResponseFilter {

        @Override
        public void filter(ContainerRequestContext requestContext,
                        ContainerResponseContext responseContext) throws IOException {

                // Get the origin from the request
                String origin = requestContext.getHeaderString("Origin");

                // Allow requests from both frontend development servers
                if (origin != null
                                && (origin.equals("http://localhost:5173") || origin.equals("http://localhost:3000"))) {
                        responseContext.getHeaders().add("Access-Control-Allow-Origin", origin);
                } else if (origin != null) {
                        // For other origins, still add the header for development
                        responseContext.getHeaders().add("Access-Control-Allow-Origin", origin);
                }

                // Allow credentials (cookies, authorization headers, etc.)
                responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");

                // Allow specific HTTP methods
                responseContext.getHeaders().add("Access-Control-Allow-Methods",
                                "GET, POST, PUT, DELETE, OPTIONS, HEAD");

                // Allow specific headers
                responseContext.getHeaders().add("Access-Control-Allow-Headers",
                                "origin, content-type, accept, authorization, x-requested-with");

                // Expose headers to the client
                responseContext.getHeaders().add("Access-Control-Expose-Headers",
                                "location, info");

                // Cache preflight requests for 24 hours
                responseContext.getHeaders().add("Access-Control-Max-Age", "86400");

                // Handle OPTIONS (preflight) requests
                if ("OPTIONS".equalsIgnoreCase(requestContext.getMethod())) {
                        responseContext.setStatus(Response.Status.OK.getStatusCode());
                }
        }
}
