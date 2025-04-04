export const APIURL = {
  baseUrl: 'https://localhost:7128/api',

  product: {
    getAll: '/products/getAllProducts',
    add: '/products/addProduct',
    update: '/products/updateProduct',
    delete: '/products/deleteProduct'
  },

  auth: {
    login: '/users/login',
    register: '/users/register'
  }
};
