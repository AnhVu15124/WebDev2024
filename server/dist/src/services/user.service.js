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
exports.userService = void 0;
const user_model_1 = require("../database/models/user.model");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refresh_token_model_1 = require("../database/models/refresh-token.model");
const dotenv_1 = __importDefault(require("dotenv"));
const mail_service_1 = require("./mail.service");
dotenv_1.default.config();
class UserService {
    constructor() {
        this.findUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.User.findOne({ raw: true, where: { email } });
                return user; // find user by email and return the user
            }
            catch (error) {
                console.error("Error finding user by email: ", error);
                throw error;
            }
        });
        this.createUser = (email, password) => __awaiter(this, void 0, void 0, function* () {
            const salt = yield (0, bcrypt_1.genSalt)(); // RNG val for password
            const hashedPassword = yield (0, bcrypt_1.hash)(password, salt);
            const verificationToken = jsonwebtoken_1.default.sign({ email }, "verify_email");
            const user = yield user_model_1.User.create({
                email: email,
                password: hashedPassword,
                verificationToken: verificationToken,
            });
            // Call method to send a verification email
            yield this.sendVerificationEmail(user);
        });
        this.sendVerificationEmail = (user) => __awaiter(this, void 0, void 0, function* () {
            const mail = {
                from: process.env.SMTP_USER,
                to: user.email,
                subject: "Verify your email for our Collaborative Note-Taing App",
                text: `Click this link to verify your email: http://192.168.1.178:3000/user/verify-email/${user.verificationToken}`
            };
            yield mail_service_1.mailService.sendMail(mail);
        });
        this.checkPassword = (user, password) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, bcrypt_1.compare)(password, user.password);
        });
        this.getRequestUser = (user) => __awaiter(this, void 0, void 0, function* () {
            if (user instanceof user_model_1.User) {
                const userWithRoles = yield user_model_1.User.scope('withRoles').findByPk(user.id);
                const roles = userWithRoles === null || userWithRoles === void 0 ? void 0 : userWithRoles.userRoles.map((userRole) => userRole.role.name);
                return {
                    id: user.id,
                    email: user.email,
                    roles: roles
                };
            }
            else
                return user;
        });
        this.generateAuthResponse = (user) => __awaiter(this, void 0, void 0, function* () {
            const requestUser = yield this.getRequestUser(user);
            const accessToken = jsonwebtoken_1.default.sign(requestUser, "access_token", {
                expiresIn: '1h'
            });
            const refreshToken = jsonwebtoken_1.default.sign(requestUser, "refresh_token", {
                expiresIn: '1h'
            });
            yield refresh_token_model_1.RefreshToken.destroy({
                force: true,
                where: { userId: requestUser.id }
            });
            yield refresh_token_model_1.RefreshToken.create({
                token: refreshToken,
                userId: requestUser.id
            });
            return { accessToken, refreshToken };
        });
        this.getIsTokenActive = (token) => __awaiter(this, void 0, void 0, function* () {
            const refreshToken = yield refresh_token_model_1.RefreshToken.findOne({
                where: { token }
            });
            return refreshToken !== null;
        });
        this.logoutUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            yield refresh_token_model_1.RefreshToken.destroy({
                where: { userId }
            });
        });
        this.findUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findByPk(id);
            return user;
        });
        this.resetPassword = (user) => __awaiter(this, void 0, void 0, function* () {
            const passwordResetToken = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, "password_reset", {
                expiresIn: '1h',
            });
            yield user.update({ passwordResetToken });
            // Send password reset email, method called here
            yield this.sendPasswordResetEmail(user);
        });
        this.sendPasswordResetEmail = (user) => __awaiter(this, void 0, void 0, function* () {
            const mail = {
                from: process.env.SMTP_USER,
                to: user.email,
                subject: "Reset your password for our Collaborative Note-Taking App",
                text: `Click this link to reset your password: http://192.168.1.178:3000/user/reset-email/${user.passwordResetToken}`
            };
            yield mail_service_1.mailService.sendMail(mail);
        });
        this.findUserByPasswordResetToken = (email, passwordResetToken) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({
                where: { email, passwordResetToken }
            });
            return user;
        });
        this.updatePassword = (user, password) => __awaiter(this, void 0, void 0, function* () {
            const salt = yield (0, bcrypt_1.genSalt)();
            const hashedPassword = yield (0, bcrypt_1.hash)(password, salt);
            yield user.update({ password: hashedPassword });
        });
        this.findUserByVerificationToken = (email, verificationToken) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({
                where: { email, verificationToken }
            });
            return user;
        });
        this.updateIsVerified = (user, isVerified) => __awaiter(this, void 0, void 0, function* () {
            yield user.update({ isVerified });
        });
    }
}
const userService = new UserService();
exports.userService = userService;
