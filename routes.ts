import { Router } from "https://deno.land/x/oak/mod.ts";
import { addProduct, getProduct, getProducts } from "./controllers/products.ts";

const router = new Router();

router.get("/api/v1/products", (context) => {
  getProducts(context);
})
  .get("/api/v1/products/:id", (context) => {
    getProduct(context);
  })
  .post("/api/v1/products", async (context) => {
    await addProduct(context);
  })
  .get("/", (context) => {
    context.response.body = "Hello world!";
  });

  
export default router;