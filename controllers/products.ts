import { v4 as uuidV4 } from "https://deno.land/std@0.82.0/uuid/mod.ts";
// import { Product } from "../types.ts";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

const products: Product[] = [
  {
    id: "1",
    name: "Name",
    description: "Description",
    price: 9.99,
  },
  {
    id: "2",
    name: "Second",
    description: "Description",
    price: 1.50,
  },
  {
    id: "3",
    name: "Third",
    description: "Description",
    price: 20,
  },
  {
    id: "4",
    name: "Fourth",
    description: "Description",
    price: 14.99,
  },
];

//* @desc   get all products
//* @route    GET /api/v1/products
const getProducts = (ctx) => {
  ctx.response.body = {
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
    const body = request.body().value;
    const product: Product = await body;
    const uniqid = uuidV4.generate();

    product.id = uniqid;
    products.push(product);
    console.log(product);
    response.status = 201;
    response.body = {
      success: true,
      msg: "Recieved data to return",
      data: product,
    };
  } catch (error) {
    console.log(error);
    response.status = 400;
    response.body = {
      success: false,
      msg: "The request must have a body",
    };
    return;
  }
};

export { addProduct, getProduct, getProducts };
