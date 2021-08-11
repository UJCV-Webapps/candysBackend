import { DataTypes } from 'sequelize';

import connection from '../db/connection';

export const MoldType = connection.define('moldTypes', {
    moldTypeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    mold: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
})