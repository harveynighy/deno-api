import { v4 as uuidV4 } from "https://deno.land/std@0.82.0/uuid/mod.ts";
// import { Product } from "../types.ts";

interface Product {
  name: string;
  description: string;
  price: number;
  id: string;
}

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
  const body = await request.body();
  const product: Product = await body.value;

  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No data",
    };
  } else {
    const uniqid = uuidV4.generate();
    product.id = uniqid;
    products.push(product);
    console.log(product);
    response.status = 201;
    response.body = {
      success: true,
      data: product,
    };
  }
};

export { addProduct, getProduct, getProducts };
