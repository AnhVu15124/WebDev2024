// Model for User
import {Model, DataType, HasMany, Table, Column, BelongsToMany, Scopes} from "sequelize-typescript";
import {RefreshToken} from "./refresh-token.model";
import {Role} from "./role.model";
import {UserRole} from "./user-role.model";
import {DocumentUser} from "./document-user.model";

// Add Scopes to help with common queries
@Scopes(() => ({
    withRoles: {
        include:[
            {
                model: UserRole,
                attributes: ['createAt','updatedAt'],
                include: [Role],
            }
        ]
    }
}))

// Decorating using table from sqlize
@Table({tableName: 'users', underscored:true})
class User extends Model {
    @Column(DataType.STRING)
    email!: string;

    @Column(DataType.STRING)
    password!: string;

    @Column(DataType.BOOLEAN)
    isVerified!: boolean;           // see if user is Verified or not

    @Column(DataType.STRING)
    verificationToken!: string;     // token for verification if user is Verified

    @Column(DataType.STRING)
    passwordResetToken!: string;    // for password reset

    @HasMany(() => RefreshToken, {
        onDelete: "CASCADE" })
    refreshToken!: RefreshToken[]

    // Relationship between roles
    @BelongsToMany(() => Role, {
        through: {
            model: () => UserRole,
        }
    })
    roles!: Role[];

    @HasMany(() => UserRole, {
        onDelete: "CASCADE"
    })
    userRoles!: UserRole[];

    @HasMany(() => DocumentUser, {
        onDelete: "CASCADE"
    })
    sharedDocument!: DocumentUser[];
    // End of relationship between roles
}

export { User };