package com.sainath.resource;

import com.sainath.entity.Brand;
import com.sainath.entity.Category;
import com.sainath.entity.Product;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @GET
    @Path("/products")
    public List<Product> getAllProducts(@QueryParam("brandId") String brandId, @QueryParam("categoryId") String categoryId) {
        if (brandId != null) {
            return Product.list("brandId", brandId);
        }
        if (categoryId != null) {
            return Product.list("categoryId", categoryId);
        }
        return Product.listAll();
    }

    @GET
    @Path("/products/{id}")
    public Product getProduct(@PathParam("id") String id) {
        return Product.findById(id);
    }

    @GET
    @Path("/categories")
    public List<Category> getAllCategories() {
        return Category.listAll();
    }

    @GET
    @Path("/brands")
    public List<Brand> getAllBrands() {
        return Brand.listAll();
    }
}
