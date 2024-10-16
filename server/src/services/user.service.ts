import {User} from "../database/models/user.model";
import {compare, genSalt, hash} from "bcrypt";
import jwt from "jsonwebtoken";
import {RefreshToken} from "../database/models/refresh-token.model";

import dotenv from "dotenv";
import {mailService} from "./mail.service";
dotenv.config();

class UserService {
    public findUserByEmail = async (email: string): Promise<User | null> => {
        try {
            const user = await User.findOne({raw: true, where: {email}});
            return user;                                    // find user by email and return the user
        } catch (error) {
            console.error("Error finding user by email: ", error);
            throw error;
        }
    };

    public createUser = async (email: string, password: string) => {
        const salt = await genSalt();           // RNG val for password
        const hashedPassword = await hash(password, salt);
        const verificationToken = jwt.sign({email},"verify_email");
        const user = await User.create({
            email: email,
            password: hashedPassword,
            verificationToken: verificationToken,
        });

        // Call method to send a verification email
        await this.sendVerificationEmail(user);
    };

    private sendVerificationEmail = async (user: User) => {
        const mail = {
            from: process.env.SMTP_USER,
            to: user.email,
            subject: "Verify your email for our Collaborative Note-Taing App",
            text: `Click this link to verify your email: http://192.168.245.23:3000/user/verify-email/${user.verificationToken}`
        }

        await mailService.sendMail(mail);
    }

    public checkPassword = async (
        user: User,
        password: string,
    ) : Promise<boolean> => {
        return await compare(password, user.password);
    };

    public getRequestUser = async (
        user: User | RequestUser
    ) : Promise<RequestUser> => {
        if (user instanceof User) {
            const userWithRoles = await User.scope('withRoles').findByPk(user.id);
            const roles = userWithRoles?.userRoles.map(
                (userRole) => userRole.role.name
            )
            return {
                id: user.id,
                email: user.email,
                roles: roles
            } as RequestUser;
        } else return user;
    }

    public generateAuthResponse = async (
        user: RequestUser | User
    ) : Promise<TokenPair> => {
        const requestUser = await this.getRequestUser(user)

        const accessToken = jwt.sign(requestUser, "access_token", {
            expiresIn: '1h'
        })

        const refreshToken = jwt.sign(requestUser, "refresh_token", {
            expiresIn: '1h'
        })

        await RefreshToken.destroy({
            force: true,
            where: {userId: requestUser.id}
        })

        await RefreshToken.create({
            token: refreshToken,
            userId: requestUser.id
        })

        return {accessToken, refreshToken};
    };

    public getIsTokenActive = async (token:string) : Promise<boolean> => {
        const refreshToken = await RefreshToken.findOne({
            where: {token}
        });

        return refreshToken !== null;
    };

    public logoutUser = async (userId: number) => {
        await RefreshToken.destroy({
            where: {userId}
        });
    };

    public findUserById = async (id: number) : Promise<User | null> => {
            const user = await User.findByPk(id);
            return user;
    };

    public resetPassword = async (user: User) => {
        const passwordResetToken = jwt.sign({id: user.id, email: user.email}, "password_reset", {
            expiresIn: '1h',
        });

        await user.update({passwordResetToken});

        // Send password reset email, method called here
        await this.sendPasswordResetEmail(user);
    };

    public sendPasswordResetEmail = async (user: User) => {
        const mail = {
            from: process.env.SMTP_USER,
            to: user.email,
            subject: "Reset your password for our Collaborative Note-Taking App",
            text: `Click this link to reset your password: http://192.168.245.23:3000/user/reset-email/${user.passwordResetToken}`
        }

        await mailService.sendMail(mail);
    }

    public findUserByPasswordResetToken = async (email: string, passwordResetToken: string) : Promise<User | null> => {
        const user = await User.findOne({
            where: {email, passwordResetToken}
        });
        return user;
    }

    public updatePassword = async (user: User, password: string) => {
        const salt = await genSalt();
        const hashedPassword = await hash(password, salt);
        await user.update({password: hashedPassword});
    }

    public findUserByVerificationToken = async (email: string, verificationToken: string) : Promise<User | null> => {
        const user = await User.findOne({
            where: {email, verificationToken}
        });
        return user;
    }

    public updateIsVerified = async (user: User, isVerified: boolean) => {
        await user.update({isVerified});
    }
}

const userService = new UserService();

export { userService };