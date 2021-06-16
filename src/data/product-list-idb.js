import { openDB } from 'idb';

const DATABASE_NAME = 'PRODUCT_LIST_DB';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'products';

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'name' });
  },
});

const ProductListIdb = {
  async retrieve(name) {
    if (!name) {
      return null;
    }

    return (await dbPromise).get(OBJECT_STORE_NAME, name);
  },

  async list() {
    const res = (await dbPromise).getAll(OBJECT_STORE_NAME);
    return res;
  },

  async put(product) {
    const { name } = product;
    if (!name) {
      return null;
    }

    return (await dbPromise).put(OBJECT_STORE_NAME, product);
  },

  async delete(name) {
    if (!name) {
      return null;
    }

    return (await dbPromise).delete(OBJECT_STORE_NAME, name);
  },
};

export default ProductListIdb;
