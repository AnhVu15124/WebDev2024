"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = __importDefault(require("../../config/database.config"));
const user_model_1 = require("./user.model");
const refresh_token_model_1 = require("./refresh-token.model");
const role_model_1 = require("./role.model");
const user_role_model_1 = require("./user-role.model");
const document_user_model_1 = require("./document-user.model");
const document_model_1 = require("./document.model");
const sequelize_typescript_1 = require("sequelize-typescript");
database_config_1.default.addModels([
    user_model_1.User,
    refresh_token_model_1.RefreshToken,
    role_model_1.Role,
    user_role_model_1.UserRole,
    document_user_model_1.DocumentUser,
    document_model_1.Document,
]);
const database = {
    Sequelize: sequelize_typescript_1.Sequelize,
    sequelize: database_config_1.default,
    User: user_model_1.User,
    RefreshToken: refresh_token_model_1.RefreshToken,
    Role: role_model_1.Role,
    UserRole: user_role_model_1.UserRole,
    DocumentUser: document_user_model_1.DocumentUser,
    Document: document_model_1.Document,
};
exports.default = database;
// Database objects are ready and can be utilised at any point
