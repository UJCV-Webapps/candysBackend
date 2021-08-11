import { RoleModel } from './role';
export interface UserModel {
    userId: string;
    name: string;
    phone: string;
    password?: string;
    roleId: string;
    createdAt: Date;
    updatedAt: Date;
    role: RoleModel;
}