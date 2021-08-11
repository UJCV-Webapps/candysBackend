import { DataTypes } from 'sequelize';

import connection from '../db/connection';

export const Material = connection.define('materials', {
    materialId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    material: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});