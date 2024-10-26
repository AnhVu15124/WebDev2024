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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareController = void 0;
const catch_async_1 = __importDefault(require("../../../middleware/catch-async"));
const express_validator_1 = require("express-validator");
const document_model_1 = require("../../../database/models/document.model");
const user_model_1 = require("../../../database/models/user.model");
const document_user_model_1 = require("../../../database/models/document-user.model");
const dotenv_1 = __importDefault(require("dotenv"));
const mail_service_1 = require("../../../services/mail.service");
dotenv_1.default.config();
class ShareController {
    constructor() {
        this.create = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const error = (0, express_validator_1.validationResult)(req);
            if (!error.isEmpty())
                return res.status(400).json(error);
            const { id } = req.params;
            // Fetch document from database
            const document = yield document_model_1.Document.findByPk(id);
            if (!document)
                return res.sendStatus(404);
            // Check if owner is sharing document
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || document.userId !== parseInt(req.user.id))
                return res.sendStatus(400);
            const { email, permission } = req.body;
            const sharedUser = yield user_model_1.User.findOne({
                where: {
                    email
                }
            });
            if (!sharedUser)
                return res.sendStatus(400);
            const documentUser = yield document_user_model_1.DocumentUser.create({
                documentId: id,
                userId: sharedUser.id,
                permission: permission,
                title: document.title
            });
            const mail = {
                from: process.env.SMTP_USER,
                to: sharedUser.email,
                subject: `${req.user.email} shared a document with you`,
                text: `You have been granted access to the document ${document.title}.
                   You can view the document at http://192.168.1.178:3000/document/${id}`,
            };
            // Send email to shared user
            yield mail_service_1.mailService.sendMail(mail);
            return res.status(201).json(documentUser);
        }));
        this.delete = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            const error = (0, express_validator_1.validationResult)(req);
            if (!error.isEmpty())
                return res.status(400).json(error);
            const { documentId, userId } = req.params;
            const document = yield document_model_1.Document.findOne({
                where: {
                    id: documentId,
                    userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id
                }
            });
            if (!document)
                return res.sendStatus(400);
            const query = {
                where: {
                    documentId,
                    userId
                }
            };
            const documentUser = yield document_user_model_1.DocumentUser.findOne(query);
            if (!documentUser)
                return res.sendStatus(400);
            yield document_user_model_1.DocumentUser.destroy(query);
            return res.sendStatus(200);
        }));
    }
}
const shareController = new ShareController();
exports.shareController = shareController;
