import { DataTypes } from 'sequelize';

import connection from '../db/connection';

export const ProductType = connection.define('productTypes', {
    productTypeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});