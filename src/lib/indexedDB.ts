
import { openDB } from 'idb';

const DB_NAME = 'truthTunnel';
const STORE_NAME = 'keysStore';

// Initialize the database
async function initDB() {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME);
    },
  });
  return db;
}

// Save a private key to IndexedDB
export async function savePrivateKey(key: string) {
  const db = await initDB();
  await db.put(STORE_NAME, key, 'privateKey');
}

// Retrieve the private key from IndexedDB
export async function getPrivateKey() {
  const db = await initDB();
  return await db.get(STORE_NAME, 'privateKey');
}

// Optionally, you can implement a delete function
export async function deletePrivateKey() {
  const db = await initDB();
  await db.delete(STORE_NAME, 'privateKey');
}
