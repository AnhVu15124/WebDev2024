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
exports.userValidator = void 0;
const express_validator_1 = require("express-validator");
const user_service_1 = require("../services/user.service");
class UserValidator {
    constructor() {
        this.register = [
            (0, express_validator_1.body)("email") // check for email issue
                .isEmail()
                .normalizeEmail()
                .withMessage("Valid Email is required"),
            (0, express_validator_1.body)("email").custom((value) => __awaiter(this, void 0, void 0, function* () {
                const user = yield user_service_1.userService.findUserByEmail(value);
                if (user) {
                    return Promise.reject("User already exists");
                }
                return true; // check if user already exist via Email
            })),
            (0, express_validator_1.body)("password_register") // check password length
                .isLength({ min: 8, max: 20 })
                .withMessage("Password must be between 8 and 20 characters"),
            (0, express_validator_1.body)("password_register") // check password for number (improve security)
                .matches(/\d/)
                .withMessage("Password must have at least 1 number"),
            (0, express_validator_1.body)("password_confirmation").custom((value, { req }) => {
                if (value !== req.body.password_register) {
                    throw new Error("Passwords do not match");
                }
                return true; //check password confirmation
            }),
        ];
        this.resetPassword = [
            (0, express_validator_1.body)("email")
                .isEmail()
                .normalizeEmail()
                .withMessage("Valid Email is required"),
        ];
        this.confirmResetPassword = [
            (0, express_validator_1.body)("password_register")
                .isLength({ min: 8, max: 20 })
                .withMessage("Password must be between 8 and 20 characters"),
            (0, express_validator_1.body)("password_register")
                .matches(/\d/)
                .withMessage("Password must have at least 1 number"),
            (0, express_validator_1.body)("password_confirmation").custom((value, { req }) => {
                if (value !== req.body.password_register) {
                    throw new Error("Passwords do not match");
                }
                return true;
            }),
        ];
    }
}
const userValidator = new UserValidator();
exports.userValidator = userValidator;
