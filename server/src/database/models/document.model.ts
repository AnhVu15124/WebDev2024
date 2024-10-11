// List of Documents User create
import {
    Model,
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    Table,
    DefaultScope,
    HasMany
} from "sequelize-typescript";
import {User} from "./user.model";
import {DocumentUser} from "./document-user.model";

// Adding default scope
@DefaultScope(() => ({
    include: [
        {
            model: DocumentUser,
            include: [
                {
                    model: User,
                    attributes: ['email'],
                }
            ]
        }
    ]
}))

@Table({ tableName: "document", underscored: true })
class Document extends Model {
    @Column(DataType.STRING)
    title!: string;                 // Title of Doc

    @Column(DataType.STRING)
    content!: string;               // Content of Doc

    @ForeignKey(() => User)
    userID!: number;

    @BelongsTo(() => User)
    user!: User;

    @HasMany(() => DocumentUser, {
        onDelete: "CASCADE",
    })
    users!: DocumentUser[];         // Add Relationship

    @Default(false)
    @Column(DataType.BOOLEAN)
    isPublic!: boolean;             // is the Doc public or private
}

export { Document };