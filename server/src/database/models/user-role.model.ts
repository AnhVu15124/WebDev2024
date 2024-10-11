// Roles of Users
import {Model, Column, ForeignKey, PrimaryKey, Table, BelongsTo} from "sequelize-typescript";
import {User} from "./user.model";
import {Role} from "./role.model";

@Table({tableName: 'user_role', underscored: true})
class UserRole extends Model {
    @BelongsTo(() => User)
    user!: User;

    @ForeignKey(() => User)
    @PrimaryKey
    @Column
    userID!: number;                // "Which User"

    @BelongsTo(() => Role)
    role!: Role;

    @ForeignKey(() => Role)
    @PrimaryKey
    @Column
    roleID!: number;                // "Which Role"
}

export { UserRole };