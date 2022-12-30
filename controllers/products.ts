import { v4 as uuidV4 } from "https://deno.land/std@0.82.0/uuid/mod.ts";
import { Product } from "../types.ts";

let products: Product[] = [
  {
    name: "Name",
    description: "Description",
    price: 9.99,
    id: "1",
  },
  {
    name: "Second",
    description: "Description",
    price: 1.50,
    id: "2",
  },
  {
    name: "Third",
    description: "Description",
    price: 20,
    id: "3",
  },
  {
    name: "Fourth",
    description: "Description",
    price: 14.99,
    id: "4",
  },
];

//* @desc   get all products
//* @route    GET /api/v1/products
const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

//* @desc   get single product
//* @route    GET /api/v1/products/:id
const getProduct = (
  { params, response }: {
    params: { id: string };
    response: any;
  },
) => {
  const product: Product | undefined = products.find((p): boolean =>
    p.id === params.id
  );

  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No product found",
    };
  }
};

//* @desc   add product
//* @route    POST /api/v1/products
const addProduct = async (
  { response, request }: { response: any; request: any },
) => {
  try {
    const body = await request.body();
    const product: Product = await body.value;
    const uniqid = uuidV4.generate();
    product.id = uniqid;
    products.push(product);
    response.status = 201;
    response.body = {
      success: true,
      data: product,
    };
  } catch (error) {
    console.log(error);
    response.status = 404;
    response.body = {
      success: false,
      msg: "No data",
    };
  }
};

const updateProduct = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  try {
    const body = await request.body();
    console.log(await body.value);
    const updateData: { name?: string; description?: string; price?: number } =
      await body.value;

    products = products.map((p) =>
      p.id == params.id ? { ...p, ...updateData } : p
    );

    response.status = 200;
    response.body = {
      success: true,
      data: products,
    };
  } catch (error) {
    console.log(error);
    response.status = 404;
    response.body = {
      success: false,
      msg: "No product found",
    };
  }
};

const deleteProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  for (const p of products) {
    if (p.id === params.id) {
      products = products.filter((p) => p.id !== params.id);
      response.status = 202;
      response.body = {
        success: true,
        msg: "Product Removed",
      };
      break;
    } else if (p.id !== params.id) {
      response.status = 204;
      // Need to figure out why this is throwing an error (throw new Error("The response is not writable."))
      // response.body = {
      //   success: false,
      //   msg: "Product not found",
      // };
      continue;
    }
  }
};

export { addProduct, deleteProduct, getProduct, getProducts, updateProduct };
