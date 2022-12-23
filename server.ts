import { Application, Context, Router } from "https://deno.land/x/oak/mod.ts";
import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";

import { addProduct, getProducts, getProduct } from "./controllers/products.ts";

(async () => {
  const port: number = 8080;

  const app = new Application();
  const router = new Router();

  router.get("/api/v1/products", (context) => {
    getProducts(context);
  })
  .get("/api/v1/products/:id", (context: Context) => {
    getProduct(context);
  })
    .post("/api/v1/products", async (context: Context) => {
      await addProduct(context);
    })
    .get("/", (context) => {
      context.response.body = "Hello world!";
    });

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.addEventListener("listen", ({ secure, hostname, port }) => {
    const protocol = secure ? "https://" : "http://";
    const url = `${protocol}${hostname ?? "localhost"}:${port}`;
    console.log(`${yellow("Listening on:")} ${green(url)}`);
  });

  await app.listen({ port });
})();
