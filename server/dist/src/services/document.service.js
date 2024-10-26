"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const document_model_1 = require("../database/models/document.model");
const document_user_model_1 = require("../database/models/document-user.model");
class documentService {
    constructor() {
        this.findDocumentById = (id, userId) => __awaiter(this, void 0, void 0, function* () {
            // Fetch document from database
            let document = yield document_model_1.Document.findOne({
                where: {
                    [sequelize_1.Op.or]: [
                        { id: id, userId: userId },
                        { id: id, isPublic: true },
                    ],
                },
            });
            if (!document) {
                const sharedDocument = yield document_user_model_1.DocumentUser.findOne({
                    where: {
                        documentId: id,
                        userId: userId,
                    },
                    include: {
                        model: document_model_1.Document,
                    }
                });
                if (!sharedDocument)
                    return null;
                document = sharedDocument.document;
            }
            return document;
        });
    }
}
exports.default = new documentService();
