import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  addProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from "./controllers/products.ts";

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
  .put("/api/v1/products/:id", async (context) => {
    await updateProduct(context);
  })
  .delete("/api/v1/products/:id", (context) => {
    deleteProduct(context);
  })
  .get("/", (context) => {
    context.response.body = "Hello world!";
  });

export default router;
