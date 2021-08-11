import { DataTypes } from 'sequelize';

import connection from '../db/connection';

export const Role = connection.define('roles', {
    roleId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
});