import { API } from "../../backend";

// CATEGORY CALLS

// Create a Category
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  })
};

// Get all Categories
export const getAllCategories = () => {
  return fetch(`${API}/categories`, {
    method: 'GET'
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  })
};


// PRODUCT CALLS

// Create a Product
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: product
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  })
};

// Get all Products
export const getAllProducts = () => {
  return fetch(`${API}/products`, {
    method: 'GET'
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  })
};

// Get a Product
export const getProduct = productId => {
  return fetch(`${API}/product/${productId}`, {
    method: 'GET'
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  })
};

// Update a Product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: product
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  })
};

// Delete a Product
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  })
};