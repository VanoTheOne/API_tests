const { test, expect, request } = require('@playwright/test');
const apiClient = require('../helpers/apiClient');

// test('GET all products', async ({ request }) => {
//   const response = await apiClient.getAllProducts(request);
//   expect(response.status()).toBe(200);
//   const products = await response.json();
//   expect(Array.isArray(products)).toBeTruthy();
// });

// test('GET single product by ID', async ({ request }) => {
//   const id = 1;
//   const response = await apiClient.getSingleProductById(request, id);
//   expect(response.status()).toBe(200);
//   const product = await response.json();
//   expect(typeof product).toBe('object');
//   expect(product.id).toBe(String(id));
//   expect(product).toHaveProperty('name');
//   expect(product).toHaveProperty('data');
// });

// test('GET products by IDs', async ({ request }) => {
//   const id = [5, 7, 10];
//   const response = await apiClient.getProductsByIds(request, id[0], id[1], id[2]);
//   expect(response.status()).toBe(200);
//   const products = await response.json();
//   expect(products).toHaveLength(3);
//   const actualIds = products.map((p) => Number(p.id));
//   expect(actualIds).toEqual(id);
// });

test('Post new product', async ({ request }) => {
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
  expect(product.createdAt).toMatch(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(Z|[\+\-]\d{2}:\d{2})$/,
  );
});
