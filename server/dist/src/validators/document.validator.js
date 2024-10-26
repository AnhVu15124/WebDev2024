"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentValidator = void 0;
const express_validator_1 = require("express-validator");
class DocumentValidator {
    constructor() {
        this.update = [
            (0, express_validator_1.body)("title")
                .optional()
                .isLength({ min: 0, max: 50 })
                .withMessage("Title must be between 0 and 50 characters"),
            (0, express_validator_1.body)("isPublic")
                .optional()
                .isBoolean()
                .withMessage("Must be true or false")
        ];
    }
}
const documentValidator = new DocumentValidator();
exports.documentValidator = documentValidator;
