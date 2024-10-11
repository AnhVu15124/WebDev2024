// Validate input req
import catchAsync from "../../middleware/catch-async";
import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {userService} from "../../services/user.service";
import {resetPassword} from "../../responses";
import jwt, {VerifyErrors} from "jsonwebtoken";

class UserController {
    public register = catchAsync(async (req: Request, res: Response) => {
        // Validate for request body if there is an error
        const error = validationResult(req);
        if(!error.isEmpty){
            return res.status(400).json(error);
        }

        const {email, password_register} = req.body;             // register endpoint already structured in body

        // Call services to create a user
        await userService.createUser(email, password_register);
        return res.sendStatus(200);
    })

    public getUser = catchAsync(async (req: Request, res: Response) => {
        const userID = parseInt(req.params.id);

        const user = await userService.findUserById(userID);

        if(user === null) return res.sendStatus(400);

        return res.status(200).json(user);
    })

    public resetPassword = catchAsync(async (req: Request, res: Response) => {
        const error = validationResult(req);
        if(!error.isEmpty){
            return res.status(400).json(error);
        }

        const {email} = req.body;

        const user = await userService.findUserByEmail(email);
        if(!user) return res.sendStatus(200).json(resetPassword);

        await userService.resetPassword(user);

        return res.status(200).json(resetPassword);
    })

    public verifyEmail = catchAsync(async (req: Request, res: Response) => {
        const verificationToken = req.params.token;

        jwt.verify(verificationToken, "verify_email", async (error: VerifyErrors | null, decoded: unknown) => {
            if (error) return res.sendStatus(403);
            try {
                const {email} = decoded as { email:string };

                userService.findUserByVerificationToken(email, verificationToken).then((user) => {
                if (!user || user.isVerified) return res.sendStatus(400);

                    userService.updateIsVerified(user, true).then(() => {
                        return res.sendStatus(200)
                    }) 
                    .catch(() => {
                        return res.sendStatus(500);
                      });
                }).catch(() => {
                    return res.sendStatus(500)
                })
            } catch (error) {
                console.log(error);
                return res.sendStatus(403);
            }
        })
    })

    public confirmResetPassword = catchAsync(async (req: Request, res: Response) => {
        const error = validationResult(req);
        if (!error.isEmpty) {
            return res.status(400).json(error);
        }

        const resetPasswordToken = req.params.token;
        const {password_register} = req.body;

        jwt.verify(resetPasswordToken, "password_reset", async (error: VerifyErrors | null, decoded: unknown) => {
            if (error) return res.sendStatus(403);
            try {
                const {email} = decoded as { email: string };

                userService.findUserByPasswordResetToken(email, resetPasswordToken).then((user) => {
                    if (user === null) return res.sendStatus(400);

                    userService.updatePassword(user, password_register).then(() => {
                        return res.sendStatus(200);
                    }).catch(() => {
                        return res.sendStatus(500);
                    })
                }).catch(() => {
                    return res.sendStatus(500);
                })
            } catch(error) {
                console.log(error);
                return res.sendStatus(403);
            }
        })
    })
}

const userController = new UserController();

export { userController };