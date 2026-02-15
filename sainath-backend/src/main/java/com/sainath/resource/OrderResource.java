package com.sainath.resource;

import com.sainath.entity.Order;
import com.sainath.entity.OrderItem;
import com.sainath.entity.User;
import io.quarkus.security.Authenticated;
import jakarta.annotation.security.RolesAllowed;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import java.util.List;

@Path("/api/orders")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Authenticated
public class OrderResource {

    @POST
    @Transactional
    @RolesAllowed("USER")
    public Response placeOrder(Order order, @Context SecurityContext securityContext) {
        String email = securityContext.getUserPrincipal().getName();
        User user = User.find("email", email).firstResult();
        
        if (user == null) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        order.userId = user.id;
        order.id = "ORD-" + System.currentTimeMillis();
        
        // Link items to order
        if (order.items != null) {
            for (OrderItem item : order.items) {
                item.order = order;
            }
        }
        
        order.persist();
        return Response.ok(order).build();
    }

    @GET
    @RolesAllowed("USER")
    public List<Order> getMyOrders(@Context SecurityContext securityContext) {
        String email = securityContext.getUserPrincipal().getName();
        User user = User.find("email", email).firstResult();
        if (user != null) {
            return Order.list("userId", user.id);
        }
        return List.of();
    }
}
