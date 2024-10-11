import {body} from "express-validator";
import PermissionEnum from "../types/enums/permission-enum";

class ShareValidator {
    public create = [
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Email must be valid to share the document"),
        body("permission").custom((value) => {
            if (!Object.values(PermissionEnum).includes(value))
                throw new Error("Permission must be valid");
                else return true;
        })
    ]
}

const shareValidator = new ShareValidator();

export {shareValidator};