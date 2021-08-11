import { DataTypes } from 'sequelize';

import connection from '../db/connection';

export const Color = connection.define('colors', {
    colorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    colorName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    hex: {
        type: DataTypes.STRING(6),
        allowNull: false
    }
})