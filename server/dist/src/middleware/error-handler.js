"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.status(500);
};
exports.default = errorHandler;
