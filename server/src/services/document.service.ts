import {Op} from "sequelize";
import {Document} from "../database/models/document.model";
import {DocumentUser} from "../database/models/document-user.model";

class documentService {

    public findDocumentById = async (id: number, userID: number) => {
        // Fetch document from database
        let document = await Document.findOne({
            where: {
                [Op.or]: [                      // Operation OR
                    {id: id, userID: userID},
                    {id: id, isPublic: true},
                ],
            },
        });

        if (!document) {
            const sharedDocument = await DocumentUser.findOne({
                where: {
                    documentID: id,
                    userID: userID,
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