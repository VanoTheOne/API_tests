const { test, expect, request } = require('@playwright/test');
const apiClient = require('../helpers/apiClient');

test('GET all products', async ({ request }) => {
  const response = await apiClient.getAllProducts(request);
  expect(response.status()).toBe(200);
  const products = await response.json();
  expect(Array.isArray(products)).toBeTruthy();
});

test('GET single product by ID', async ({ request }) => {
  const id = 1;
  const response = await apiClient.getSingleProductById(request, id);
  expect(response.status()).toBe(200);
  const product = await response.json();
  expect(typeof product).toBe('object');
  expect(product.id).toBe(String(id));
  expect(product).toHaveProperty('name');
  expect(product).toHaveProperty('data');
});

test('GET products by IDs', async ({ request }) => {
  const id = [5, 7, 10];
  const response = await apiClient.getProductsByIds(request, id[0], id[1], id[2]);
  expect(response.status()).toBe(200);
  const products = await response.json();
  expect(products).toHaveLength(3);
  const actualIds = products.map((p) => Number(p.id));
  expect(actualIds).toEqual(id);
});

test('Add new product', async ({ request }) => {
  const object = {
    name: 'Apple MacBook Pro 16',
    data: {
      year: 2019,
      price: 1849.99,
      'CPU model': 'Intel Core i9',
      'Hard disk size': '1 TB',
    },
  };
  const response = await apiClient.addNewProduct(request, object);
  expect(response.status()).toBe(200);
  const product = await response.json();
  expect(product.name).toBe(`Apple MacBook Pro 16`);
  expect(product.data.year).toBe(2019);
  expect(product.data.price).toBe(1849.99);
  expect(product.data['CPU model']).toBe(`Intel Core i9`);
  expect(product.data['Hard disk size']).toBe(`1 TB`);
  expect(product.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(Z|[\+\-]\d{2}:\d{2})$/);
});

test('Update product by ID', async ({ request }) => {
  //create product
  const response = await request.post(`https://api.restful-api.dev/objects`, {
    data: {
      name: 'Apple MacBook Pro 16',
      data: {
        year: 2019,
        price: 1849.99,
        'CPU model': 'Intel Core i9',
        'Hard disk size': '1 TB',
      },
    },
  });
  expect(response.status()).toBe(200);
  const createdResponse = await response.json();
  const id = createdResponse.id;

  //update product
  const data = {
    name: 'Apple MacBook Pro 17',
    data: {
      year: 2020,
      price: 2000.99,
      'CPU model': 'Intel Core i10',
      'Hard disk size': '2 TB',
      color: 'silver',
    },
  };
  const updatedResponse = await apiClient.updateProductById(request, id, data);
  expect(updatedResponse.status()).toBe(200);
  const product = await updatedResponse.json();
  expect(product.name).toBe(`Apple MacBook Pro 17`);
  expect(product.data.year).toBe(2020);
  expect(product.data.price).toBe(2000.99);
  expect(product.data['CPU model']).toBe(`Intel Core i10`);
  expect(product.data['Hard disk size']).toBe(`2 TB`);
  expect(product.data.color).toBe('silver');
  expect(product.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(Z|[\+\-]\d{2}:\d{2})$/);
});

test('Partically update product by ID', async ({ request }) => {
  //create product
  const response = await request.post(`https://api.restful-api.dev/objects`, {
    data: {
      name: 'Apple MacBook Pro 16',
      data: {
        year: 2019,
        price: 1849.99,
        'CPU model': 'Intel Core i9',
        'Hard disk size': '1 TB',
      },
    },
  });
  expect(response.status()).toBe(200);
  const createdResponse = await response.json();
  const id = createdResponse.id;

  //partically update product
  const data = {
    name: 'Apple MacBook Pro 17',
  };
  const updatedResponse = await apiClient.particallyUpdateProductById(request, id, data);
  expect(updatedResponse.status()).toBe(200);
  const product = await updatedResponse.json();
  expect(product.name).toBe(`Apple MacBook Pro 17`);
  expect(product.data.year).toBe(2019);
  expect(product.data.price).toBe(1849.99);
  expect(product.data['CPU model']).toBe(`Intel Core i9`);
  expect(product.data['Hard disk size']).toBe(`1 TB`);
  expect(product.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(Z|[\+\-]\d{2}:\d{2})$/);
});

test('Delete product by ID', async ({ request }) => {
  //create product
  const response = await request.post(`https://api.restful-api.dev/objects`, {
    data: {
      name: 'Apple MacBook Pro 16',
      data: {
        year: 2019,
        price: 1849.99,
        'CPU model': 'Intel Core i9',
        'Hard disk size': '1 TB',
      },
    },
  });
  expect(response.status()).toBe(200);
  const createdResponse = await response.json();
  const id = createdResponse.id;

  //delete product
  const deleteResponse = await apiClient.deleteProductById(request, id);
  expect(deleteResponse.status()).toBe(200);

  //check if product is deleted
  const deletedProduct = await apiClient.getSingleProductById(request, id);
  expect(deletedProduct.status()).toBe(404);
});
