const STORAGE_KEY = "pdf_workspace_files";

/* 取得全部檔案 */
export function getFiles() {
  return JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );
}

/* 新增紀錄 */
export function saveFile(file) {
  const files = getFiles();

  files.unshift({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    favorite: false,
    ...file,
  });

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(files)
  );
}

/* 刪除 */
export function deleteFile(id) {
  const files = getFiles().filter(
    (f) => f.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(files)
  );
}

/* 收藏 */
export function toggleFavorite(id) {
  const files = getFiles().map((file) =>
    file.id === id
      ? {
          ...file,
          favorite: !file.favorite,
        }
      : file
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(files)
  );
}

/* 重新命名 */
export function renameFile(id, name) {
  const files = getFiles().map((file) =>
    file.id === id
      ? {
          ...file,
          name,
        }
      : file
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(files)
  );
}

/* 清空 */
export function clearFiles() {
  localStorage.removeItem(STORAGE_KEY);
}