import { Application, Context, Router } from "https://deno.land/x/oak/mod.ts";
import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";

import { addProduct, getProduct, getProducts } from "./controllers/products.ts";
import router from './routes.ts'
(async () => {
  const port: number = 8080;

  const app = new Application();

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.addEventListener("listen", ({ secure, hostname, port }) => {
    const protocol = secure ? "https://" : "http://";
    const url = `${protocol}${hostname ?? "localhost"}:${port}`;
    console.log(`${yellow("Listening on:")} ${green(url)}`);
  });

  await app.listen({ port });
})();
