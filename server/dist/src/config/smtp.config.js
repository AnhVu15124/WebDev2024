"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = (0, nodemailer_1.createTransport)({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    secure: true
});
exports.default = transporter;
