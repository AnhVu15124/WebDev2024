import {body} from "express-validator";

class DocumentValidator {
    public update = [
        body("title")
            .optional()
            .isLength({min: 0, max: 50})
            .withMessage("Title must be between 0 and 50 characters"),
        body("isPublic")
            .optional()
            .isBoolean()
            .withMessage("Must be true or false")
    ]
}

const documentValidator = new DocumentValidator();

export {documentValidator};