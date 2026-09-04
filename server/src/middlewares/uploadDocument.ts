import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const uploadDirectory = path.resolve("uploads/documents");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    const uniqueName = `${crypto.randomUUID()}${extension}`;

    cb(null, uniqueName);
  },
});

const fileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  cb,
) => {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    cb(
      new Error(
        "Only PDF, JPG, and PNG files are allowed",
      ),
    );
    return;
  }

  cb(null, true);
};

const uploadDocument = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default uploadDocument;