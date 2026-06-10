const DB_NAME = "pdf_workspace_db";
const STORE_NAME = "files";
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
        });
      }
    };
  });
}

export async function saveFile(file) {
  const db = await openDB();

  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  store.add({
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    favorite: false,
    type: "pdf",
    ...file,
  });

  return tx.complete;
}

export async function getFiles() {
  const db = await openDB();

  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();

    req.onsuccess = () => resolve(req.result);
  });
}

export async function deleteFile(id) {
  const db = await openDB();

  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).delete(id);
}

export async function toggleFavorite(id) {
  const db = await openDB();

  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  const req = store.get(id);

  req.onsuccess = () => {
    const file = req.result;
    if (!file) return;

    store.put({
      ...file,
      favorite: !file.favorite,
    });
  };
}

export async function clearFiles() {
  const db = await openDB();

  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).clear();
}