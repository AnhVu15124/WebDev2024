import { Request, Response, NextFunction } from "express";
import jwt, {VerifyErrors} from "jsonwebtoken";
import RoleEnum from "../types/enums/role-enum";
import {UserRole} from "../database/models/user-role.model";
import {Role} from "../database/models/role.model";

const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers["authorization"]

    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }                                                                // get token from header and check if token is valid

    jwt.verify(token, "access_token", (error: VerifyErrors | null, decoded: unknown) => {
        if (error) {
            res.sendStatus(403);
            return;
        }
        try {
            const { id, email, roles } = decoded as RequestUser;
            req.user = { id, email, roles };
            next();
        } catch (error) {
            console.log(error);
            res.sendStatus(403);
        }
    });                                                             // verify token
};

const authorize = (permittedRoles: RoleEnum[]) => {
    return async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        if(!req.user) {
            res.sendStatus(401);
            return;
        }
        const userID = req.user.id;

        UserRole.findAll({where: {userID}, include: Role}).then((data) => {
            const roles = data.map((userRole) => userRole.role.name);
            if (permittedRoles.some((permittedRole) => roles.includes(permittedRole))) {
                next();
            } else {
                return res.sendStatus(403);
            }
        }) .catch((error) => {
            console.log(error);
            res.sendStatus(403);
        });
    };
};

export { authenticate, authorize };