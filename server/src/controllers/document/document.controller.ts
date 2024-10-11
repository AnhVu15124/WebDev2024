import catchAsync from "../../middleware/catch-async";
import {Request, Response} from "express";
import documentService from "../../services/document.service";
import {Document} from "../../database/models/document.model";
import {DocumentUser} from "../../database/models/document-user.model";
import {validationResult} from "express-validator";

class DocumentController {

    public getOne = catchAsync(async (req: Request, res: Response) => {
        // Receive ID as request parameter then fetch document from database
        if (!req.user) return res.sendStatus(401)

        const {id} = req.params

        const document = await documentService.findDocumentById(
            parseInt(id),
            parseInt(req.user.id)
        )

        if(document === null) return res.sendStatus(404)

        return res.status(200).json(document)
    })

    public getAll = catchAsync(async (req: Request, res: Response) => {
        // Fetch all documents from database
        const documents = await Document.findAll({
            where: {
                userID: req.user?.id,
            },
        })

        const documentUsers = await DocumentUser.findAll({
            where: {
                userID: req.user?.id,
            },
            include: {
                model: Document,
            }
        })

        const sharedDocuments = documentUsers.map(
            (documentUser) => documentUser.document
        )

        documents.push(...sharedDocuments)

        return res.status(200).json(documents)
    })

    public update = catchAsync(async (req: Request, res: Response) => {
        // Receive ID as request parameter then update document in database
        const error = validationResult(req);
        if (!error.isEmpty()) return res.status(400).json(error)

        if (!req.user) return res.sendStatus(401)

        const {id} = req.params;
        const {title, content, isPublic} = req.body;

        const document = await documentService.findDocumentById(
            parseInt(id),
            parseInt(req.user.id)
        )

        if (document === null) return res.sendStatus(404)

        if (title !== undefined && title !== null) document.title = title;
        if (content !== undefined && content !== null) document.content = content;
        if (isPublic !== undefined && isPublic !== null) document.isPublic = isPublic;

        await document.save();

        return res.sendStatus(200);
    })

    public create = catchAsync(async (req: Request, res: Response) => {
        // Create a new document in the database
        const document = await Document.create({
            userID: req.user?.id
        })

        return res.status(201).json(document)
    })

    public delete = catchAsync(async (req: Request, res: Response) => {
        // Receive ID as request parameter then delete document from database
        const {id} = req.params

        await Document.destroy({
            where: {
                id: id,
                userID: req.user?.id,
            }
        });

        return res.sendStatus(200)
    })
}

const documentController = new DocumentController();

export {documentController};