import sequelize from "../../config/database.config";
import {User} from "./user.model";
import {RefreshToken} from "./refresh-token.model";
import {Role} from "./role.model";
import {UserRole} from "./user-role.model";
import {DocumentUser} from "./document-user.model";
import {Document} from "./document.model";
import {Sequelize} from "sequelize-typescript";

sequelize.addModels([
    User,
    RefreshToken,
    Role,
    UserRole,
    DocumentUser,
    Document,
])

const database = {
    Sequelize,
    sequelize,
    User,
    RefreshToken,
    Role,
    UserRole,
    DocumentUser,
    Document,
};

export default database;

// Database objects are ready and can be utilised at any point