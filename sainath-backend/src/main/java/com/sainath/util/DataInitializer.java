package com.sainath.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sainath.entity.Brand;
import com.sainath.entity.Category;
import com.sainath.entity.Product;
import com.sainath.entity.RepairPricing;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.Iterator;
import java.util.Map;

@ApplicationScoped
public class DataInitializer {

    @Inject
    ObjectMapper objectMapper;

    @Transactional
    void onStart(@Observes StartupEvent ev) {
        if (Category.count() == 0) {
            initProducts();
        }
        if (RepairPricing.count() == 0) {
            initRepairs();
        }
    }

    private void initProducts() {
        try (InputStream is = getClass().getResourceAsStream("/data/products.json")) {
            if (is == null) return;
            JsonNode root = objectMapper.readTree(is);
            
            // Categories
            if (root.has("categories")) {
                for (JsonNode node : root.get("categories")) {
                    Category cat = new Category();
                    cat.id = node.get("id").asText();
                    cat.name = node.get("name").asText();
                    cat.description = node.has("description") ? node.get("description").asText() : null;
                    cat.image = node.has("image") ? node.get("image").asText() : null;
                    cat.persist();
                }
            }

            // Brands
            if (root.has("brands")) {
                for (JsonNode node : root.get("brands")) {
                    Brand brand = new Brand();
                    brand.id = node.get("id").asText();
                    brand.name = node.get("name").asText();
                    brand.logo = node.has("logo") ? node.get("logo").asText() : null;
                    brand.categoryId = node.get("categoryId").asText();
                    brand.persist();
                }
            }

            // Products
            if (root.has("products")) {
                for (JsonNode node : root.get("products")) {
                    Product p = new Product();
                    p.id = node.get("id").asText();
                    p.name = node.get("name").asText();
                    p.brandId = node.get("brandId").asText();
                    p.categoryId = node.get("categoryId").asText();
                    p.price = new BigDecimal(node.get("price").asDouble());
                    p.image = node.has("image") ? node.get("image").asText() : null;
                    p.inStock = node.has("inStock") && node.get("inStock").asBoolean();
                    p.rating = node.has("rating") ? node.get("rating").asDouble() : null;
                    if (node.has("specifications")) {
                        p.specifications = node.get("specifications").toString();
                    }
                    p.stockQuantity = 10;
                    p.persist();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void initRepairs() {
        try (InputStream is = getClass().getResourceAsStream("/data/repairData.json")) {
            if (is == null) return;
            JsonNode root = objectMapper.readTree(is);
            
            if (root.has("brands")) {
                for (JsonNode brandNode : root.get("brands")) {
                    String brandId = brandNode.get("id").asText();
                    JsonNode pricing = brandNode.get("pricing");
                    
                    if (pricing != null) {
                        Iterator<Map.Entry<String, JsonNode>> fields = pricing.fields();
                        while(fields.hasNext()) {
                            Map.Entry<String, JsonNode> entry = fields.next();
                            String problemId = entry.getKey();
                            JsonNode prices = entry.getValue();
                            
                            RepairPricing rp = new RepairPricing();
                            rp.brandId = brandId;
                            rp.problemId = problemId;
                            rp.minPrice = new BigDecimal(prices.get("min").asDouble());
                            rp.maxPrice = new BigDecimal(prices.get("max").asDouble());
                            rp.persist();
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
