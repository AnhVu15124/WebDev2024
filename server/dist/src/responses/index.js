"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.notVerified = exports.userNotFound = void 0;
const userNotFound = [
    {
        msg: "User Not Found: Incorrect email or password or user have not registered.",
    },
];
exports.userNotFound = userNotFound;
const notVerified = [
    {
        msg: "User Not Verified: Please verify your email address.",
    }
];
exports.notVerified = notVerified;
const resetPassword = [
    {
        msg: "If user exists, password reset instruction has been sent to your email.",
    },
];
exports.resetPassword = resetPassword;
