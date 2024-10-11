import {body} from "express-validator";

class AuthValidator {
    public login = [            // Check login details
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Valid Email is required"),
        body("password").exists().withMessage("Password is required"),
    ];

    public refreshToken = [     // Check refresh token
        body("token").exists().withMessage("Valid token is required"),
    ];
}

const authValidator = new AuthValidator();

export {authValidator};