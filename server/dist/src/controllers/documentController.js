import prisma from "../lib/prisma.js";
import { DocumentCategory } from "../generated/prisma/enums.js";
import fs from "fs";
import { createHistory } from "../utilis/historyHelper.js";
// ============================================
// HELPERS
// ============================================
const getParam = (value) => {
    return Array.isArray(value) ? value[0] : value;
};
// ============================================
// GET DOCUMENT TYPE FROM MIME TYPE
// ============================================
const getDocumentType = (mimeType) => {
    switch (mimeType) {
        case "application/pdf":
            return "PDF";
        case "image/jpeg":
            return "JPG";
        case "image/png":
            return "PNG";
        default:
            return null;
    }
};
// ============================================
// GET DOCUMENT CATEGORY
// ============================================
const getDocumentCategory = (category) => {
    switch (category.toUpperCase()) {
        case "IDENTIFICATION":
            return DocumentCategory.IDENTIFICATION;
        case "CONSENT":
            return DocumentCategory.CONSENT;
        case "PHOTO":
            return DocumentCategory.PHOTO;
        case "MEDICAL":
            return DocumentCategory.MEDICAL;
        case "EDUCATION":
            return DocumentCategory.EDUCATION;
        case "OTHER":
            return DocumentCategory.OTHER;
        default:
            return null;
    }
};
// ============================================
// DELETE PHYSICAL FILE SAFELY
// ============================================
const deletePhysicalFile = (filePath) => {
    if (!filePath) {
        return;
    }
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
    catch (error) {
        console.error("Failed to delete physical file:", error);
    }
};
// ============================================
// GET ALL DOCUMENTS FOR A CHILD
// GET /api/children/:childId/documents
// ============================================
export const getDocuments = async (req, res) => {
    try {
        const childId = getParam(req.params.childId);
        if (!childId) {
            res.status(400).json({
                message: "Child ID is required",
            });
            return;
        }
        const documents = await prisma.document.findMany({
            where: {
                childId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.status(200).json(documents);
    }
    catch (error) {
        console.error("Get documents error:", error);
        res.status(500).json({
            message: "Failed to fetch documents",
        });
    }
};
// ============================================
// GET ONE DOCUMENT
// GET /api/documents/:id
// ============================================
export const getDocumentById = async (req, res) => {
    try {
        const id = getParam(req.params.id);
        if (!id) {
            res.status(400).json({
                message: "Document ID is required",
            });
            return;
        }
        const document = await prisma.document.findUnique({
            where: {
                id,
            },
        });
        if (!document) {
            res.status(404).json({
                message: "Document not found",
            });
            return;
        }
        res.status(200).json(document);
    }
    catch (error) {
        console.error("Get document error:", error);
        res.status(500).json({
            message: "Failed to fetch document",
        });
    }
};
// ============================================
// CREATE / UPLOAD DOCUMENT
// POST /api/children/:childId/documents
// ============================================
export const createDocument = async (req, res) => {
    try {
        const childId = getParam(req.params.childId);
        if (!childId) {
            res.status(400).json({
                message: "Child ID is required",
            });
            return;
        }
        // ========================================
        // CHECK CHILD EXISTS
        // ========================================
        const child = await prisma.child.findUnique({
            where: {
                id: childId,
            },
        });
        if (!child) {
            res.status(404).json({
                message: "Child not found",
            });
            return;
        }
        // ========================================
        // CHECK FILE
        // ========================================
        const file = req.file;
        if (!file) {
            res.status(400).json({
                message: "Document file is required",
            });
            return;
        }
        const { name, category } = req.body;
        // ========================================
        // VALIDATE NAME AND CATEGORY
        // ========================================
        if (!name || !category) {
            deletePhysicalFile(file.path);
            res.status(400).json({
                message: "Document name and category are required",
            });
            return;
        }
        // ========================================
        // VALIDATE CATEGORY
        // ========================================
        const documentCategory = getDocumentCategory(String(category));
        if (!documentCategory) {
            deletePhysicalFile(file.path);
            res.status(400).json({
                message: "Invalid document category",
            });
            return;
        }
        // ========================================
        // VALIDATE FILE TYPE
        // ========================================
        const type = getDocumentType(file.mimetype);
        if (!type) {
            deletePhysicalFile(file.path);
            res.status(400).json({
                message: "Unsupported document type. Only PDF, JPG and PNG are allowed.",
            });
            return;
        }
        // ========================================
        // CREATE FILE URL
        // ========================================
        const fileUrl = `${req.protocol}://${req.get("host")}/uploads/documents/${file.filename}`;
        // ========================================
        // SAVE DOCUMENT
        // ========================================
        const document = await prisma.document.create({
            data: {
                name: String(name),
                type,
                category: documentCategory,
                fileName: file.filename,
                originalName: file.originalname,
                filePath: file.path,
                fileUrl,
                mimeType: file.mimetype,
                size: file.size,
                childId,
            },
        });
        await createHistory({
            title: "Document uploaded",
            description: `Document "${document.name}" was uploaded.`,
            type: "DOCUMENT",
            user: "System",
            childId: document.childId,
        });
        res.status(201).json(document);
    }
    catch (error) {
        console.error("Create document error:", error);
        if (req.file?.path) {
            deletePhysicalFile(req.file.path);
        }
        res.status(500).json({
            message: "Failed to upload document",
        });
    }
};
// ============================================
// UPDATE DOCUMENT
// PUT /api/documents/:id
// ============================================
export const updateDocument = async (req, res) => {
    try {
        const id = getParam(req.params.id);
        if (!id) {
            res.status(400).json({
                message: "Document ID is required",
            });
            return;
        }
        // ========================================
        // FIND EXISTING DOCUMENT
        // ========================================
        const existingDocument = await prisma.document.findUnique({
            where: {
                id,
            },
        });
        if (!existingDocument) {
            if (req.file?.path) {
                deletePhysicalFile(req.file.path);
            }
            res.status(404).json({
                message: "Document not found",
            });
            return;
        }
        const { name, category } = req.body;
        // ========================================
        // BUILD UPDATE DATA
        // ========================================
        const updateData = {};
        // ========================================
        // UPDATE NAME
        // ========================================
        if (name !== undefined) {
            updateData.name = String(name);
        }
        // ========================================
        // UPDATE CATEGORY
        // ========================================
        if (category !== undefined) {
            const documentCategory = getDocumentCategory(String(category));
            if (!documentCategory) {
                if (req.file?.path) {
                    deletePhysicalFile(req.file.path);
                }
                res.status(400).json({
                    message: "Invalid document category",
                });
                return;
            }
            updateData.category = documentCategory;
        }
        // ========================================
        // REPLACE FILE IF NEW FILE WAS UPLOADED
        // ========================================
        if (req.file) {
            const newFile = req.file;
            const newType = getDocumentType(newFile.mimetype);
            if (!newType) {
                deletePhysicalFile(newFile.path);
                res.status(400).json({
                    message: "Unsupported document type. Only PDF, JPG and PNG are allowed.",
                });
                return;
            }
            updateData.type = newType;
            updateData.fileName = newFile.filename;
            updateData.originalName = newFile.originalname;
            updateData.filePath = newFile.path;
            updateData.fileUrl = `${req.protocol}://${req.get("host")}/uploads/documents/${newFile.filename}`;
            updateData.mimeType = newFile.mimetype;
            updateData.size = newFile.size;
        }
        // ========================================
        // UPDATE DATABASE RECORD
        // ========================================
        const updatedDocument = await prisma.document.update({
            where: {
                id,
            },
            data: updateData,
        });
        await createHistory({
            title: "Document updated",
            description: `Document "${updatedDocument.name}" was updated.`,
            type: "DOCUMENT",
            user: "System",
            childId: updatedDocument.childId,
        });
        // ========================================
        // DELETE OLD FILE
        // ========================================
        if (req.file &&
            existingDocument.filePath &&
            existingDocument.filePath !== req.file.path) {
            deletePhysicalFile(existingDocument.filePath);
        }
        res.status(200).json(updatedDocument);
    }
    catch (error) {
        console.error("Update document error:", error);
        // Delete newly uploaded file if update fails
        if (req.file?.path) {
            deletePhysicalFile(req.file.path);
        }
        res.status(500).json({
            message: "Failed to update document",
        });
    }
};
// ============================================
// DELETE DOCUMENT
// DELETE /api/documents/:id
// ============================================
export const deleteDocument = async (req, res) => {
    try {
        const id = getParam(req.params.id);
        if (!id) {
            res.status(400).json({
                message: "Document ID is required",
            });
            return;
        }
        // ========================================
        // FIND DOCUMENT
        // ========================================
        const document = await prisma.document.findUnique({
            where: {
                id,
            },
        });
        if (!document) {
            res.status(404).json({
                message: "Document not found",
            });
            return;
        }
        // ========================================
        // DELETE DATABASE RECORD
        // ========================================
        await createHistory({
            title: "Document deleted",
            description: `Document "${document.name}" was deleted.`,
            type: "DOCUMENT",
            user: "System",
            childId: document.childId,
        });
        await prisma.document.delete({
            where: {
                id,
            },
        });
        // ========================================
        // DELETE PHYSICAL FILE
        // ========================================
        deletePhysicalFile(document.filePath);
        res.status(200).json({
            message: "Document deleted successfully",
        });
    }
    catch (error) {
        console.error("Delete document error:", error);
        res.status(500).json({
            message: "Failed to delete document",
        });
    }
};
