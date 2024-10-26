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
exports.userController = void 0;
// Validate input req
const catch_async_1 = __importDefault(require("../../middleware/catch-async"));
const express_validator_1 = require("express-validator");
const user_service_1 = require("../../services/user.service");
const responses_1 = require("../../responses");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    constructor() {
        this.register = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            // Validate for request body if there is an error
            const error = (0, express_validator_1.validationResult)(req);
            if (!error.isEmpty) {
                return res.status(400).json(error);
            }
            const { email, password_register } = req.body; // register endpoint already structured in body
            // Call services to create a user
            yield user_service_1.userService.createUser(email, password_register);
            return res.sendStatus(200);
        }));
        this.getUser = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.id);
            const user = yield user_service_1.userService.findUserById(userId);
            if (user === null)
                return res.sendStatus(400);
            return res.status(200).json(user);
        }));
        this.resetPassword = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const error = (0, express_validator_1.validationResult)(req);
            if (!error.isEmpty) {
                return res.status(400).json(error);
            }
            const { email } = req.body;
            const user = yield user_service_1.userService.findUserByEmail(email);
            if (!user)
                return res.sendStatus(200).json(responses_1.resetPassword);
            yield user_service_1.userService.resetPassword(user);
            return res.status(200).json(responses_1.resetPassword);
        }));
        this.verifyEmail = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const verificationToken = req.params.token;
            jsonwebtoken_1.default.verify(verificationToken, "verify_email", (error, decoded) => __awaiter(this, void 0, void 0, function* () {
                if (error)
                    return res.sendStatus(403);
                try {
                    const { email } = decoded;
                    user_service_1.userService.findUserByVerificationToken(email, verificationToken).then((user) => {
                        if (!user || user.isVerified)
                            return res.sendStatus(400);
                        user_service_1.userService.updateIsVerified(user, true).then(() => {
                            return res.sendStatus(200);
                        })
                            .catch(() => {
                            return res.sendStatus(500);
                        });
                    }).catch(() => {
                        return res.sendStatus(500);
                    });
                }
                catch (error) {
                    console.log(error);
                    return res.sendStatus(403);
                }
            }));
        }));
        this.confirmResetPassword = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const error = (0, express_validator_1.validationResult)(req);
            if (!error.isEmpty) {
                return res.status(400).json(error);
            }
            const resetPasswordToken = req.params.token;
            const { password_register } = req.body;
            jsonwebtoken_1.default.verify(resetPasswordToken, "password_reset", (error, decoded) => __awaiter(this, void 0, void 0, function* () {
                if (error)
                    return res.sendStatus(403);
                try {
                    const { email } = decoded;
                    user_service_1.userService.findUserByPasswordResetToken(email, resetPasswordToken).then((user) => {
                        if (user === null)
                            return res.sendStatus(400);
                        user_service_1.userService.updatePassword(user, password_register).then(() => {
                            return res.sendStatus(200);
                        }).catch(() => {
                            return res.sendStatus(500);
                        });
                    }).catch(() => {
                        return res.sendStatus(500);
                    });
                }
                catch (error) {
                    console.log(error);
                    return res.sendStatus(403);
                }
            }));
        }));
    }
}
const userController = new UserController();
exports.userController = userController;
