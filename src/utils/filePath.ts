import path from "path";
import fs from "fs";

export const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
export const EXPORT_DIR = path.join(__dirname, "..", "exports");

// Ensure both folders exist at startup
[UPLOAD_DIR, EXPORT_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

export const makeExportFilePath = () => {
  const fileName = `export-notion-${Date.now()}.xlsx`;
  return path.join(EXPORT_DIR, fileName);
};

