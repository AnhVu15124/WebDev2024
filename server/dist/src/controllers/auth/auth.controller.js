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
exports.authController = void 0;
const catch_async_1 = __importDefault(require("../../middleware/catch-async"));
const express_validator_1 = require("express-validator");
const user_service_1 = require("../../services/user.service");
const responses_1 = require("../../responses");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    constructor() {
        this.login = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            // Validate for request body if there is an error
            const error = (0, express_validator_1.validationResult)(req);
            if (!error.isEmpty) {
                return res.status(400).json(error);
            }
            const { email, password } = req.body; // login endpoint already structured in body
            const user = yield user_service_1.userService.findUserByEmail(email);
            if (!user)
                return res.status(401).json({ errors: responses_1.userNotFound }); // check if user is found or not via email
            const validPassword = yield user_service_1.userService.checkPassword(user, password);
            if (!validPassword)
                return res.status(401).json({ errors: responses_1.userNotFound }); // check if user is found or not via password
            if (!user.isVerified)
                res.status(403).json({ errors: responses_1.notVerified }); // check if user is verified via email
            const authResponse = yield user_service_1.userService.generateAuthResponse(user);
            return res.status(200).json(authResponse); // authenticator response
        }));
        this.refreshToken = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            // Validate for request body if there is an error
            const error = (0, express_validator_1.validationResult)(req);
            if (!error.isEmpty()) {
                return res.status(400).json(error);
            }
            const refreshToken = req.body.token; // refresh token endpoint already structured in body
            const isTokenActive = yield user_service_1.userService.getIsTokenActive(refreshToken);
            if (!isTokenActive)
                return res.sendStatus(403); // check if token is active or not
            jsonwebtoken_1.default.verify(refreshToken, "refresh_token", (error, decoded) => __awaiter(this, void 0, void 0, function* () {
                if (error)
                    return res.sendStatus(403);
                try {
                    const { id, email, roles } = decoded;
                    const user = { id, email, roles };
                    const authResponse = yield user_service_1.userService.generateAuthResponse(user);
                    return res.status(200).json(authResponse);
                }
                catch (error) {
                    console.log(error);
                    res.sendStatus(403);
                }
            })); // verify refresh token
        }));
        this.logout = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.user)
                return res.sendStatus(401);
            const userId = parseInt(req.user.id);
            yield user_service_1.userService.logoutUser(userId);
            return res.sendStatus(200);
        }));
    }
}
const authController = new AuthController();
exports.authController = authController;
