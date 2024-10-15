import {Op} from "sequelize";
import {Document} from "../database/models/document.model";
import {DocumentUser} from "../database/models/document-user.model";

class documentService {

    public findDocumentById = async (id: number, userId: number) => {
        // Fetch document from database
        let document = await Document.findOne({
            where: {
                [Op.or]: [                      // Operation OR
                    {id: id, userId: userId},
                    {id: id, isPublic: true},
                ],
            },
        });

        if (!document) {
            const sharedDocument = await DocumentUser.findOne({
                where: {
                    documentId: id,
                    userId: userId,
                },
                include: {
                    model: Document,
                }
            })

            if (!sharedDocument) return null;

            document = sharedDocument.document;
        }

        return document;
    }
}

export default new documentService();