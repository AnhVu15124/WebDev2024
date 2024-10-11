// Which user have access to which doc
import {Model, BelongsTo, Column, DataType, ForeignKey, PrimaryKey, Table} from "sequelize-typescript";
import PermissionEnum from "../../types/enums/permission-enum";
import {User} from "./user.model";
import {Document} from "./document.model";

@Table({tableName: "document_user", underscored: true})
class DocumentUser extends Model {
    @Column(DataType.ENUM('VIEW','EDIT'))
    permission!: PermissionEnum         // Permission to view or edit

    @BelongsTo(() => User)
    user!: User;

    @ForeignKey(() => User)
    @PrimaryKey
    @Column
    userID!: number;                    // "Which user"

    @BelongsTo(() => Document)
    document!: Document;

    @ForeignKey(() => Document)
    @PrimaryKey
    @Column
    documentID!: number;                // "Which doc"
}

export { DocumentUser };