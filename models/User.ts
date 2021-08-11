import { DataTypes } from 'sequelize';

import connection from '../db/connection';

export const User = connection.define('users', {
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(70),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(8),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});