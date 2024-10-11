import catchAsync from "../../middleware/catch-async";
import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {userService} from "../../services/user.service";
import {notVerified, userNotFound} from "../../responses";
import jwt, {VerifyErrors} from "jsonwebtoken";

class AuthController {
    public login = catchAsync(async (req: Request, res: Response) => {
        // Validate for request body if there is an error
        const error = validationResult(req);
        if(!error.isEmpty){
            return res.status(400).json(error);
        }

        const {email, password} = req.body;             // login endpoint already structured in body

        const user = await userService.findUserByEmail(email);
        if(!user) return res.status(401).json({errors: userNotFound});              // check if user is found or not via email

        const validPassword = await userService.checkPassword(user, password);
        if(!validPassword) return res.status(401).json({errors: userNotFound});     // check if user is found or not via password

        if(!user.isVerified) res.status(403).json({errors: notVerified});           // check if user is verified via email

        const authResponse = await userService.generateAuthResponse(user);
        return res.status(200).json(authResponse);                                  // authenticator response
    })

    public refreshToken = catchAsync(async (req: Request, res: Response) => {
        // Validate for request body if there is an error
        const error = validationResult(req);
        if(!error.isEmpty){
            return res.status(400).json(error);
        }

        const refreshToken = req.body.token;                                  // refresh token endpoint already structured in body

        const isTokenActive = await userService.getIsTokenActive(refreshToken);
        if(!isTokenActive) return res.sendStatus(403);                             // check if token is active or not

        jwt.verify(refreshToken, "refresh_token", async (error: VerifyErrors | null, decoded:unknown) => {
            if(error) return res.sendStatus(403);
            try {
                const {id, email, roles} = decoded as RequestUser;
                const user = {id, email, roles};

                const authResponse = await userService.generateAuthResponse(user);
                return res.status(200).json(authResponse);
            } catch (error) {
                console.log(error)
                res.sendStatus(403);
            }
        })                                                                        // verify refresh token
    })

    public logout = catchAsync(async (req: Request, res: Response) => {
        if (!req.user) return res.sendStatus(401);

        const userID = parseInt(req.user.id);
        await userService.logoutUser(userID);

        return res.sendStatus(200);
    })
}

const authController = new AuthController();

export { authController };