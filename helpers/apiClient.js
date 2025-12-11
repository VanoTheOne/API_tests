import { request } from 'playwright/test';

export const getAllProducts = async (request) => {
  const response = await request.get('https://api.restful-api.dev/objects');
  return response;
};

export const getSingleProductById = async (request, id) => {
  const response = await request.get(`https://api.restful-api.dev/objects/${id}`);
  return response;
};

export const getProductsByIds = async (request, id1, id2, id3) => {
  const response = await request.get(`https://api.restful-api.dev/objects?id=${id1}&id=${id2}&id=${id3}`);
  return response;
};

export const addNewProduct = async (request, objectData) => {
  const response = await request.post(`https://api.restful-api.dev/objects`, {
    data: objectData,
  });
  return response;
};

export const updateProductById = async (request, id, data) => {
  const response = await request.put(`https://api.restful-api.dev/objects/${id}`, { data });
  return response;
};

export const particallyUpdateProductById = async (request, id, data) => {
  const response = await request.patch(`https://api.restful-api.dev/objects/${id}`, { data });
  return response;
};

export const deleteProductById = async (request, id) => {
  const response = await request.delete(`https://api.restful-api.dev/objects/${id}`);
  return response;
};
