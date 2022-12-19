import { Router } from "https://deno.land/x/oak/mod.ts";
import { getProducts } from "./controllers/products";

const router = new Router();

router.get("/api/v1/products", getProducts);
