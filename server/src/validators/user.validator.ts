import {body} from "express-validator";
import {userService} from "../services/user.service";

class UserValidator {
    public register = [
        body("email")                           // check for email issue
            .isEmail()
            .normalizeEmail()
            .withMessage("Valid Email is required"),

        body("email").custom(async (value) => {
            const user = await userService.findUserByEmail(value);

            if (user) {
                return Promise.reject("User already exists");
            }
            return true;                        // check if user already exist via Email
        }),

        body("password_register")               // check password length
            .isLength({min: 8, max: 20})
            .withMessage("Password must be between 8 and 20 characters"),
        body("password_register")               // check password for number (improve security)
            .matches(/\d/)
            .withMessage("Password must have at least 1 number"),
        body("password_confirmation").custom((value, {req}) => {
            if (value !== req.body.password_register) {
                throw new Error("Passwords do not match");
            }
            return true;                        //check password confirmation
        }),
    ];

    public resetPassword = [
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Valid Email is required"),
    ];

    public confirmResetPassword = [
        body("password_register")
            .isLength({min: 8, max: 20})
            .withMessage("Password must be between 8 and 20 characters"),
        body("password_register")
            .matches(/\d/)
            .withMessage("Password must have at least 1 number"),
        body("password_confirmation").custom((value, {req}) => {
            if (value !== req.body.password_register) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),
    ];
}

const userValidator = new UserValidator();

export {userValidator};