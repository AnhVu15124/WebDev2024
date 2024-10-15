import catchAsync from "../../../middleware/catch-async";
import {validationResult} from "express-validator";
import {Request, Response} from "express";
import {Document} from "../../../database/models/document.model";
import {User} from "../../../database/models/user.model";
import {DocumentUser} from "../../../database/models/document-user.model";

import dotenv from 'dotenv';
import {mailService} from "../../../services/mail.service";
dotenv.config();

class ShareController {

    public create = catchAsync(async (req: Request, res: Response) => {
        const error = validationResult(req);
        if (!error.isEmpty()) return res.status(400).json(error)

        const {id} = req.params;

        // Fetch document from database
        const document = await Document.findByPk(id);
        if(!document) return res.sendStatus(404);

        // Check if owner is sharing document
        if(!req.user?.id || document.userId !== parseInt(req.user.id)) return res.sendStatus(400);

        const {email, permission} = req.body;

        const sharedUser = await User.findOne({
            where: {
                email
            }
        })

        if(!sharedUser) return res.sendStatus(400);

        const documentUser = await DocumentUser.create({
            documentId: id,
            userId: sharedUser.id,
            permission: permission,
            title: document.title
        })

        const mail = {
            from: process.env.SMTP_USER,
            to: sharedUser.email,
            subject: `${req.user.email} shared a document with you`,
            text: `You have been granted access to the document ${document.title}.
                   You can view the document at http://192.168.1.110:3000/document/${id}`,
        }

        // Send email to shared user
        await mailService.sendMail(mail);

        return res.status(201).json(documentUser);
    })

    public delete = catchAsync(async (req: Request, res: Response) => {
        const error = validationResult(req);
        if (!error.isEmpty()) return res.status(400).json(error);

        const {documentId, userId} = req.params;

        const document = await Document.findOne({
            where: {
                id: documentId,
                userId: req.user?.id
            }
        });

        if(!document) return res.sendStatus(400);

        const query = {
            where: {
                documentId,
                userId
            }
        }

        const documentUser = await DocumentUser.findOne(query);

        if(!documentUser) return res.sendStatus(400);

        await DocumentUser.destroy(query);

        return res.sendStatus(200);
    })
}

const shareController = new ShareController();

export {shareController};