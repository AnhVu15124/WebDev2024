import {Errback, NextFunction, Request, Response} from "express";

const errorHandler = (
    error: Errback,
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    console.error(error);
    res.status(500);
}

export default errorHandler;