// To accept a func & returning a req and func
import {Request, Response, NextFunction} from "express";

const catchAsync = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};

export default catchAsync;