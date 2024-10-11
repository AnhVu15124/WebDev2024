// Roles User can have
import {Model, Column, DataType, Table, BelongsToMany, HasMany} from "sequelize-typescript";
import RoleEnum from "../../types/enums/role-enum";
import {User} from "./user.model";
import {UserRole} from "./user-role.model";

// Decorate using sqlize
@Table({tableName: 'role', underscored: true, timestamps: false})
class Role extends Model {
    @Column(DataType.ENUM('ADMIN','SUPERADMIN'))
    name!: RoleEnum             // name the roles

    // Relationship with UserRoles
    @BelongsToMany(() => User,{
        through: () => UserRole
    })
    user!: User[];

    @HasMany(() => UserRole, {
        onDelete: "CASCADE"
    })
    userRole!: UserRole[];
    // End of relationship
}
export { Role };