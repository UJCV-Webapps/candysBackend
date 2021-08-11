import { DataTypes } from 'sequelize';

import connection from '../db/connection';

export const Size = connection.define('sizes', {
    sizeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    size: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
});